db = require('./database.js');

var dataCallback = function(res){
    callback = function(err, data){
        if(err){
			//error from DB - return with error 
			res.json({'err': err});
		} else {
			//return with data
			res.json(data);
		}
    }
    return callback;
}

var isFriend = function(req,res){
    res.json({return: true});
}

var request = function(req,res){
    db.friends.create(req.body,dataCallback(res));
}

var accept = function(req,res){
    db.posts.update(req.body,dataCallback(res));
}

var getAll = function(req, res){
    db.friends
    .scan()
    .loadAll()
    .exec(dataCallback(res));
}

var friends = {
    isFriend: isFriend,
    request: request,
    accept: accept,
    getAll: getAll,
};

module.exports = friends;