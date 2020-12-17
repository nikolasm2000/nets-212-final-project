const { useReducer } = require('react');
const { chatMembers, callbackSkeleton } = require('./database.js');

db = require('./database.js');

var getPrivateChat = function(req, res){
    db.chats
    .query(req.session.user)
    .usingIndex("UserIndex")
    .where('user2').equals(req.params.id)
    .limit(1)
    .exec(callbackSkeleton(res, function(data){
        if(data.Count > 0){
            invite(data.Items[0].attrs.id, req, res);
        } else {
            db.chats
            .query(req.session.user)
            .usingIndex("UserInvIndex")
            .where('user1').equals(req.params.id)
            .limit(1)
            .exec(callbackSkeleton(res, function(data){
                if(data.Count > 0){
                    invite(data.Items[0].attrs.id, req, res);
                } else {
                    //create new chat if none exists
                    db.chats.create({private: true, user1: req.session.user, user2: req.params.id}, db.callbackSkeleton(res, function(chatdata){
                        invite(chatdata.attrs.id, req, res);
                    }));
                }
            }));
        }
    }));
}

var createNewChat = function(req, res){
    db.chat.create({}, callback);
}

var getAllMessages = function(req, res){
    db.messages
    .query(req.params.id)
    .usingIndex('TimestampIndex')
    .loadAll()
    .ascending()
    .exec(db.dataCallback(res));
}

var getChatUsers = function(chat, callback){
    db.chatMembers
        .query(chat)
        .loadAll()
        .exec(function(err, data){
            if (err){
                callback(err, null)
            } else {
                result = [];
                console.log(data);
                data.Items.forEach(function(item){
                    result.push(item.attrs.PBuser);
                })
                callback(null, result);
            }
        })
}

var getChatUsersRoute = function(req, res){
    getChatUsers(req.params.id, db.callbackSkeleton(res, function(data){
        res.json(data);
    }));
}

var invite = function(id, req, res){
    
    //if no chat exists
    params1 = {"chat": id, "PBuser": req.session.user}
    params2 = {"chat": id, "PBuser": req.params.id}
    db.chatMembers.create([params1, params2], db.callbackSkeleton(res, function(data){
        var params3 = {
            "PBuser": req.session.user,
            "type": 0,
            "text": "Your chat session has been created",
            "urlText": "Click here to join the session",
            "url": "/chats/" + id,
            "dismissed" : false,
            "read" : false
        }
        var params4 = {
            "PBuser": id,
            "type": 2,
            "relevant_id": req.session.user,
            "url": "/chats/" + id,
            "dismissed" : false,
            "read" : false
        }
        db.notifications.create([params3,params4],db.callbackSkeleton(res,function(data){
            res.json({'id': id});
        }));
    }));
}

var saveMessage = function(user, chat, message, callback){
    db.messages.create({"chat": chat, "PBuser": user, "message": message}, callback);
}

var chats = {
    createNewChat: createNewChat,
    getChatUsers: getChatUsers,
    getChatUsersRoute: getChatUsersRoute,
    saveMessage: saveMessage,
    invite: invite,
    getAllMessages: getAllMessages,
    getPrivateChat: getPrivateChat
};

module.exports = chats;