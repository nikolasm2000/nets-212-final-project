const { useReducer } = require('react');
const { chatMembers, callbackSkeleton } = require('./database.js');

db = require('./database.js');

var getPrivateChat = function(curr_user, user){

}

var createNewChat = function(req, res){
    db.chat.create({}, callback);
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
                data.Items.foreach(function(item){
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

var invite = function(req, res){
    db.chat.create({}, db.callbackSkeleton(res, function(chatdata){
        params1 = {"chat": chatdata.attrs.id, "PBuser": req.session.user}
        params2 = {"chat": chatdata.attrs.id, "PBuser": req.params.id}
        db.chatMembers.create([params1, params2], db.callbackSkeleton(res, function(data){
            var params3 = {
                "PBuser": req.session.user,
                "type": 0,
                "text": "Your chat session has been created",
                "urlText": "Click here to join the session",
                "url": "/chats/" + chatdata.attrs.id,
                "dismissed" : false,
                "read" : false
            }
            var params4 = {
                "PBuser": req.params.id,
                "type": 2,
                "relevant_id": req.session.user,
                "url": "/chats/" + chatdata.attrs.id,
                "dismissed" : false,
                "read" : false
            }
            db.notifications.create([params3,params4],db.callbackSkeleton(res,function(data){
                res.json(chatdata);
            }));
        }))
    }))
}

var saveMessage = function(user, chat, message, callback){
    db.messages.create({"chat": chat, "PBuser": user, "text": message}, callback);
}

var chats = {
    createNewChat: createNewChat,
    getChatUsers: getChatUsers,
    getChatUsersRoute: getChatUsersRoute,
    saveMessage: saveMessage,
    invite: invite,
};

module.exports = chats;