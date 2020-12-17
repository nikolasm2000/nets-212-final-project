db = require('./database.js');

get = function(req, res){
    db.articles.get(req.params.id,db.dataCallback(res));
}

var articles = {
    get: get
};

module.exports = articles;