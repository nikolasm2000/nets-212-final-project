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

var get = function(req,res){
    db.user.get(req.params.id, dataCallback(res));
}

var create = function(req,res){
    console.log("user create called");
    db.user.create(req.body,dataCallback(res));
}

var update = function(req,res){
    db.user.update(req.body,dataCallback(res));
}

var login = function(req,res){
    res.json({'success' : true});
}

var logout = function(req,res){
    res.json({'success' : true});
}

var user = { 
	get: get,
	create: create,
	update: update,
	login: login,
	logout: logout,
};

module.exports = user;