db = require('database.js');

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

var createUser = function(params,callback){
    db.User.create(params,callback);
}

var get = function(res,req){
    db.User.get(req.params.id, dataCallback(res));
}

var create = function(res,req){
    db.User.create(req.body,dataCallback(res));
}