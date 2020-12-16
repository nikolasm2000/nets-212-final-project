const { func } = require('joi');

db = require('./database.js');

var isFriend = function(req,res){
    db.friends
        .query(req.session.user)
        .where('friend').equals(req.params.id)
        .limit(1)
        .exec(db.callbackSkeleton(res,function(data){
            if(data.Count > 0){
                if (data.Items[0].attrs.accepted){
                    console.log("returning 1");
                    res.json({result: 1});
                } else if (data.Items[0].attrs.request){
                    console.log("returning 2");
                    res.json({result: 2});
                } else {
                    console.log("returning 3");
                    res.json({result: 3});
                }
            } else {
                console.log("returning 0");
                res.json({result: 0});
            }
        }));
    //0 = Not a friend,
    //1 = Friend,
    //2 = Requested,
    //3 = Request received
}

var request = function(req,res){
    var params = {
        "PBuser": req.session.user,
        "friend": req.params.id,
        "request": true,
        "accepted": 0,
    }
    var params2 = {
        "PBuser": req.params.id,
        "friend": req.session.user,
        "request": false,
        "accepted": 0,
    }
    db.friends.create([params, params2],db.callbackSkeleton(res,function(data){
        res.json({success: true, result: 2});
    }));
}

var accept = function(req,res){
    var params = {
        "PBuser": req.session.user,
        "friend": req.params.id,
        "accepted": 1,
    }
    var params2 = {
        "PBuser": req.params.id,
        "friend": req.session.user,
        "accepted": 1,
    }
    db.friends.update(params,db.callbackSkeleton(res,function(data){
        db.friends.update(params2, db.callbackSkeleton(res,function(data){
            res.json({success: true, result: 1});
        }));
    }));
}

var reject = function(req,res){
    var params = {
        "PBuser": req.session.user,
        "friend": req.params.id,
        "accepted": 1,
    }
    var params2 = {
        "PBuser": req.params.id,
        "friend": req.session.user,
        "accepted": 1,
    }
    db.friends.update(params,db.callbackSkeleton(res,function(data){
        db.friends.update(params2, db.callbackSkeleton(res,function(data){
            res.json({success: true, result: 1});
        }));
    }));
}

var remove = function(req,res){
    var params = {
        "PBuser": req.session.user,
        "friend": req.params.id,
    }
    var params2 = {
        "PBuser": req.params.id,
        "friend": req.session.user,
    }
    db.friends.destroy(params,db.callbackSkeletonNull(res,function(data){
        db.friends.destroy(params2, db.callbackSkeletonNull(res,function(data){
            res.json({success: true, result:0});
        }));
    }));
}

var getFriends = function(req, res){
    db.friends
        .query(req.session.user)
        .usingIndex("AcceptedIndex")
        .where("accepted").equals(1)
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
    remove: remove,
    getFriends: getFriends,
    getTable: getTable
};

module.exports = friends;