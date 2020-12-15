const { func } = require('joi');

db = require('./database.js');

var isFriend = function(req,res){
    db.friends
        .query(req.session.user)
        .where('friend').equals(req.params.id)
        .limit(1)
        .exec(db.callbackSkeleton(res,function(data){
            if(data.Count > 0){
                res.json({return: data.Items[0].attrs.accepted})
            } else {
                res.json({return: false});
            }
        }));
    //res.json({return: true});
}

var request = function(req,res){
    var params = {
        "PBuser": req.session.user,
        "friend": req.params.id,
        "request": true,
        "accepted": false,
    }
    var params2 = {
        "PBuser": req.params.id,
        "friend": req.session.user,
        "request": false,
        "accepted": false,
    }
    db.friends.create(params,db.callbackSkeleton(res,function(data){
        db.friends.create(params2, db.callbackSkeleton(res,function(data){
            res.json({success: true});
        }));
    }));
}

var accept = function(req,res){
    var params = {
        "PBuser": req.session.user,
        "friend": req.params.id,
        "accepted": true,
    }
    var params2 = {
        "PBuser": req.params.id,
        "friend": req.session.user,
        "accepted": true,
    }
    db.friends.update(params,db.callbackSkeleton(res,function(data){
        db.friends.update(params2, db.callbackSkeleton(res,function(data){
            res.json({success: true});
        }));
    }));
}

var getFriends = function(req, res){
    db.friends
        .query(req.session.user)
        .where("accepted").equals(true)
        .usingIndex("AcceptedIndex")
        .exec(db.extractCallback(res,"friend"));
}

var getTable = function(req, res){
    db.friends
        .scan()
        .loadAll()
        .exec(db.dataCallback(res));
}

var friends = {
    isFriend: isFriend,
    request: request,
    accept: accept,
    getFriends: getFriends,
    getTable: getTable
};

module.exports = friends;