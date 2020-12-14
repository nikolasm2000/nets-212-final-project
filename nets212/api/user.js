var db = require('./database.js');
var sha256 = require('js-sha256');

var dataCallback = function(res){
    callback = function(err, data){
        if(err){
			//error from DB - return with error
			res.statusCode(400).json({'err': err});
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

    if(typeof res.body.password !== 'undefined'){
        console.log(res.body.password);
        res.body.password = sha256(res.body.password);
    }

    db.user.create(req.body,dataCallback(res));
}

var update = function(req,res){
    db.user.update(req.body,dataCallback(res));
}

var login = function(req,res){
    db.user.get(req.body.email,function(err,data){
        if(err){
			//error from DB - return with error
			res.json({'err': err});
		} else {
            console.log(data);
            //return with data
            if(sha256(req.body.password) == data.password){
                req.session.user = data.id;
                res.json({'success' : true});
                res.json(data);
            } else {
                res.statusCode(400).json({"err":"user not found"});
            }
		}
    })
    //res.json({'success' : true});
}

var logout = function(req,res){
    req.session.user = undefined;
    res.json({'success' : true});
}

var authenticate = function(req,res){
    if (req.session.user != undefined) {
        res.json({'id' : req.session.user});
    } else {
        res.statusCode(400).json({"err":"user not logged in"});
    }
}

var user = {
	get: get,
	create: create,
	update: update,
	login: login,
    logout: logout,
    authenticate: authenticate
};

module.exports = user;
