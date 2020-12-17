const { exec } = require('child_process');
const { syncBuiltinESMExports } = require('module');
const { extractCallback, callbackSkeleton } = require('./database.js');
const { update } = require('./user.js');

db = require('./database.js');

var get = function(req, res){
    db.articles.get(req.params.id,db.dataCallback(res));
}

var show = function(req, res){
    db.finalWeights
    .query(req.session.user)
    //.usingIndex("WeightIndex")
    .descending()
    .filter('seen').ne(true)
    .limit(4)
    //.exec(db.dataCallback(res));
    .exec(db.extractCallbackSkeleton(res, "article", function (data){
        if(data.Count >= 4){
            db.finalWeights.update({PBuser: req.session.user, article: data[0], seen: true}, db.callbackSkeleton(res, function(data2){
                db.finalWeights.update({PBuser: req.session.user, article: data[1], seen: true}, db.callbackSkeleton(res, function(data3){
                    res.json(data);
                }));
            }));
        } else {
            res.json(data);
        }
    }));
}

var getFinalWeightsTable = function(req, res){
    db.finalWeights
        .scan()
        .loadAll()
        .exec(db.dataCallback(res));
}

var toggleLike = function(req, res) {
    db.reactions
        .query(req.params.id)
        .usingIndex("AuthorIndex")
        .where('author').equals(req.session.user)
        .exec(db.callbackSkeleton(res, function(data){
            if(data.Count == 0){
                db.reactions.create({'post': req.params.id, 'author': req.session.user, 'reaction': 0}, db.callbackSkeleton(res, function(data){
                    res.json({liked: true});
                }));
            } else {
                console.log(data.Items[0].attrs.id);
                db.reactions.destroy(req.params.id,data.Items[0].attrs.id, db.callbackSkeletonNull(res, function(data){
                    res.json({liked: false});
                }));
            }
        }));
}

var articles = {
    get: get,
    show: show,
    getFinalWeightsTable: getFinalWeightsTable
};

module.exports = articles;