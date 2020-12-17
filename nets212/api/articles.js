const { syncBuiltinESMExports } = require('module');
const { extractCallback } = require('./database.js');

db = require('./database.js');

get = function(req, res){
    db.articles.get(req.params.id,db.dataCallback(res));
}

show = function(req, res){
    db.finalWeights
    .query(req.session.user)
    .usingIndex("WeightIndex")
    .descending()
    .limit(2)
    .exec(extractCallback(res, "article"));
}

var articles = {
    get: get,
    show: show
};

module.exports = articles;