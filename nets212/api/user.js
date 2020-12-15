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

    if(typeof req.body.email == 'undefined'){
        res.status(400).json({"err:" : "Email needed."});
        return;
    }

    if(typeof req.body.password == 'undefined'){
        res.status(400).json({"err:" : "Password needed."});
        return;
    }

    req.body.password = sha256(req.body.password);

    db.user
        .query(req.body.email)
        .usingIndex('EmailIndex')
        .exec(function(err, data){
            if(err){
                //error from DB - return with error
                res.status(400).json({'err': err});
            } else {
                //check if email already exists
                if (data.Count > 0){
                    res.status(400).json({"err":"Email already in use"});
                } else {
                    db.user.create(req.body,db.dataCallback(res));
                }
               
            }
        });
    
}

var update = function(req,res){
    //req.body.id = req.session.user;
    if(typeof req.body.password == 'undefined'){
        req.body.password = sha256(req.body.password);
    }
    console.log("data received:", req.body);
    db.user.update(req.body,db.dataCallback(res));
}

var login = function(req,res){
    console.log('login called')
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
                if(data.Count == 0){
                    res.status(400).json({"err":"User not found"});
                } else if(sha256(req.body.password) == data.Items[0].attrs.password){
                    console.log("login correct")
                    console.log("user:",data.Items[0].attrs);
                    req.session.user = data.Items[0].attrs.id;
                    console.log("session: ", req.session.user);
                    res.json(data.Items[0].attrs);
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

var allUserIds = function(req, res){
    db.user
        .scan()
        .loadAll()
        .exec(db.extractCallback(res,"id"));
}

var getTable = function(req, res){
    db.user
        .scan()
        .loadAll()
        .exec(db.dataCallback(res));
}

var user = {
	get: get,
	create: create,
	update: update,
	login: login,
    logout: logout,
    authenticate: authenticate,
    allUserIds: allUserIds,
    getTable: getTable
};

module.exports = user;
