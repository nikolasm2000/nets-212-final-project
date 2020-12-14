var db = require('./database.js');
var sha256 = require('js-sha256');

var get = function(req,res){
    console.log("user get called");
    // db.user
    //     .query(req.params.id)
    //     .usingIndex('IDIndex')
    //     .limit(1)
    //     .exec(function(err, data){
    //         console.log("user get result:")
    //         console.log(data);
    //         if(err){
    //             //error from DB - return with error
    //             res.status(400).json({'err': err});
    //         } else {
    //             //return with data
    //             res.json(data.Items[0]);
    //         }
    //     })


    db.user.get(req.params.id, db.dataCallback(res));
}

var create = function(req,res){
    console.log("user create called");
    console.log("data received:");
    console.log(req.body);

    if(typeof req.body.password !== 'undefined'){
        console.log("pre hash:")
        console.log(req.body.password);
        req.body.password = sha256(req.body.password);
        console.log("post hash:")
        console.log(req.body.password);
    }

    db.user.create(req.body,db.dataCallback(res));
}

var update = function(req,res){
    db.user.update(req.body,db.dataCallback(res));
}

var login = function(req,res){
    db.user
        .query(req.body.email)
        .usingIndex('EmailIndex')
        .limit(1)
        .exec(function(err, data){
            console.log("user get result:")
            console.log(data);
            if(err){
                //error from DB - return with error
                res.status(400).json({'err': err});
            } else {
                //return with data
                if(sha256(req.body.password) == data.Items[0].password){
                    req.session.user = data.Items[0].id;
                    res.json(data.Items[0]);
                } else {
                    res.status(400).json({"err":"Password incorrect"});
                }
            }
        });

}

var logout = function(req,res){
    req.session.user = undefined;
    res.json({'success' : true});
}

var authenticate = function(req,res){
    if (req.session.user != undefined) {
        res.json({'id' : req.session.user});
    } else {
        res.status(400).json({"err":"user not logged in"});
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
