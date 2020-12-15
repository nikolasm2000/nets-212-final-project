var db = require('./database.js');

var getActiveNotifications = function(req, res){
    db.notifications
        .query(req.session.user)
        .usingIndex("TimestampIndex")
        .descending()
        .filter("dismissed").equals(0)
        .exec(db.dataCallback(res));
}

var dismiss = function(req, res){
    var params = {
        "PBuser": req.session.user,
        "id": req.params.id,
        "dismissed" : 1,
    }
    console.log("received data:", params)
    db.friends.update(params,db.dataCallback(res));
}

var read = function(req, res){
    var params = {
        "PBuser": req.session.user,
        "id": req.params.id,
        "read" : true,
    }
    db.friends.update(params,db.dataCallback(res));
}

var unread = function(req, res){
    var params = {
        "PBuser": req.session.user,
        "id": req.params.id,
        "read" : false,
    }
    db.friends.update(params,db.dataCallback(res));
}

var createSampleNotifications = function(req, res){
    var params = {
        "PBuser": req.session.user,
        "type": 0,
        "text": "Very important notification, don't miss it!",
        "dismissed" : 0,
        "read" : false
    }
    var params2 = {
        "PBuser": req.session.user,
        "type": 1,
        "relevant_id": "cee95d7b-8d40-4008-8167-52deadac20fe",
        "dismissed" : 0,
        "read" : false
    }
    var params3 = {
        "PBuser": req.session.user,
        "type": 2,
        "relevant_id": "5423750293174-3fakeid343242352340",
        "dismissed" : 0,
        "read" : false
    }
    db.notifications.create(params,db.callbackSkeleton(res,function(data){
        db.notifications.create(params2, db.callbackSkeleton(res,function(data){
            db.notifications.create(params3, db.callbackSkeleton(res,function(data){
                res.json({success: true});
            }));
        }));
    }));
}

var notifications = {
    getActiveNotifications: getActiveNotifications,
    createSampleNotifications: createSampleNotifications,
    dismiss: dismiss,
    read: read,
    unread: unread,
};

module.exports = notifications;