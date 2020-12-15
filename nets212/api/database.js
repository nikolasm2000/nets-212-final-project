// var AWS = require('aws-sdk');
// AWS.config.loadFromPath('./config.json');
// AWS.config.update({region:'us-east-1'});
//var db = new AWS.DynamoDB();

var dynamo = require('dynamodb');
dynamo.AWS.config.loadFromPath('config.json');
dynamo.AWS.config.update({region:'us-east-1'});

const Joi = require('joi');

const { DateTime } = require("luxon");


//console.log(dynamo);

var Users = dynamo.define('PB_User', {
    hashKey : 'id',

    timestamps : true,

    schema: {
        id: dynamo.types.uuid(),
        email: Joi.string().email(),
        password: Joi.string(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        last_login: Joi.number(),
        profile_pic: Joi.string(),
        birthday: Joi.number()
    },

    indexes: [{
        hashKey : 'email', name : 'EmailIndex', type : 'global'
      }]
});

var Interests = dynamo.define('PB_Interest', {
    hashKey: 'id',
    timestamps: false,
    schema:{
        id: dynamo.types.uuid(),
        name: Joi.string(),
    }
});

var UserInterests = dynamo.define('PB_UserInterest',{
    hashKey: 'PBuser',
    rangeKey: 'interest',
    schema:{
        PBuser: Joi.string(),
        interest: Joi.string(),
    }
})

var Friends = dynamo.define('PB_Friend', {
    hashKey:'PBuser',
    rangeKey: 'friend',
    timestamps: false,
    schema: {
        PBuser: Joi.string(),
        friend: Joi.string(),
        request: Joi.boolean(), //Do I need this? to be seen
        accepted: Joi.number()
    },

    indexes: [{
        hashKey : 'PBuser', rangeKey:'accepted', name : 'AcceptedIndex', type : 'local'
    }]

});

var Posts = dynamo.define('PB_Post', {
    hashKey: 'id',

    timestamps: true,
    schema: {
        id: dynamo.types.uuid(),
        author: Joi.string(),
        parent: Joi.string(),
        wall: Joi.string(),
        text: Joi.string(),
        privacy: Joi.number(),
        pictures: dynamo.types.stringSet(), //TODO think about this
    },

    indexes: [{
        hashKey : 'parent', rangeKey:'createdAt', name : 'ParentIndex', type : 'global'
    }]
});

var Pictures = dynamo.define('PB_Picture',{
    hashKey: 'post',
    rangeKey: 'id',
    schema: {
        id: dynamo.types.uuid(),
        post: Joi.string(),
        link: Joi.string(),
    }
});

var Notifications = dynamo.define('PB_Notification',{
    hashKey: 'PBuser',
    rangeKey: 'id',

    timestamps: true,

    schema: {
        id: dynamo.types.uuid(),
        PBuser: Joi.string(),
        type: Joi.number(), //0 = notification, 1 = friend request, 2 = chat request
        text: Joi.string(),
        relevant_id: Joi.string(),
        read: Joi.boolean(),
        dismissed: Joi.number(),
    },

    indexes: [{
        hashKey : 'PBuser', rangeKey:'createdAt', name : 'TimestampIndex', type : 'local'
    }]

})

var Reactions = dynamo.define('PB_Reaction',{
    hashKey: 'post',
    rangeKey: 'id',
    timestamps: true,

    schema: {
        id: dynamo.types.uuid(),
        post: Joi.string(),
        author: Joi.string(),
        reaction: Joi.number(),
    }
});

var NewsLikes = dynamo.define('PB_NewsLike',{
    hashKey: 'news',
    rangeKey: 'id',
    timestamps: true,

    schema: {
        id: dynamo.types.uuid(),
        news: Joi.string(),
        author: Joi.string(),
    }
});

var FinalWeights = dynamo.define('PB_FinalWeight',{
    hashKey: 'PBuser',
    rangeKey: 'article',

    schema: {
        PBuser: Joi.string(),
        article: Joi.string(),
        weight: Joi.number(),
    }
});

var Chats = dynamo.define('PB_Chat',{
    hashKey: 'id',
    timestamps: true,
    updatedAt: false,
    schema: {
        id: dynamo.types.uuid(),
        name: Joi.string(),
        private: Joi.boolean(),
    }
});

var ChatMembers = dynamo.define('PB_ChatMember',{
    hashKey: 'chat',
    rangeKey: 'PBuser',
    timestamps: false,
    schema:{
        chat: Joi.string(),
        PBuser: Joi.string(),
        date_joined: Joi.number(),
        admin: Joi.boolean(),
    },

    indexes: [{
        hashKey : 'PBuser', name : 'UserIndex', type : 'global'
    }]
});

var Messages = dynamo.define('PB_Message',{
    hashKey:'chat',
    rangeKey:'id',
    timestamps: true,
    schema:{
        id: dynamo.types.uuid(),
        chat: Joi.string(),
        PBuser: Joi.string(),
        text: Joi.string(),
    }
});

var Articles = dynamo.define('PB_Article',{
    hashKey:'articleID',

    schema: {
        articleID: Joi.string(),
        category: Joi.string(),
        authors: Joi.string(),
        headline: Joi.string(),
        link: Joi.string(),
        short_description: Joi.string(),
        articleDate: Joi.string()
    }
})

var Search = dynamo.define('PB_Inverted',{
    hashKey:'keyword',
    rangeKey:'id',
    timestamps: false,
    schema:{
        keyword: Joi.string(),
        id: dynamo.types.uuid(),
        article: Joi.boolean(),
        PBuser: Joi.boolean(),
        obj_id: Joi.string(),
    }

});

//var News = dynamo.define()


var createTables = function(){
    dynamo.createTables(function(err) {
        if (err) {
          console.log('Error creating tables: ', err);
        } else {
          console.log('Tables have been created');
        }
      });
}

var dataCallback = function(res){
    callback = function(err, data){
        console.log("callback for ", res.req.url, " called");
        if(err){
            console.log("err:", err);
			//error from DB - return with error 
			res.json({'err': err});
		} else {
            //return with data
            if(typeof data != undefined && data != null){
                data.attrs = convertDates(data.attrs);
                console.log("data:", data.attrs);
                res.json(data);
            } else {
                console.log("err: Not found")
                res.status(404).json({"err":"User not found"});
            }			
		}
    }
    return callback;
}

var callbackSkeleton = function(res, user_callback){
    callback = function(err, data){
        console.log("callback for ", res.req.url, " called");
        if(err){
            console.log("err:", err);
			//error from DB - return with error 
			res.json({'err': err});
		} else {
            //return with data
            if(typeof data != undefined && data != null){
                console.log("data:", data.attrs);
                user_callback(data);
            } else {
                console.log("err: Not found")
                res.status(404).json({"err":"User not found"});
            }			
		}
    }
    return callback;
}

var extractCallback = function(res, param){
    callback = function(err, data){
        console.log("callback for ", res.req.url, " called");
        if(err){
            console.log("err:", err);
			//error from DB - return with error 
			res.json({'err': err});
		} else {
            //return with data
            if(typeof data != undefined && data != null){
                var result = [];
                data.Items.forEach(function(item){
                    result.push(item.get(param));
                });
                //return with data
                console.log("data:", result);
                res.json(result);
            } else {
                console.log("err: Not found")
                res.status(404).json({"err":"User not found"});
            }			
		}
    }
    return callback;
}

var convertDates = function(params){
    if(params != undefined){
        console.log(params);
        if(typeof params.createdAt != undefined){
            var createDate = DateTime.fromISO(params.createdAt);
            params.createdAt = createDate.toSeconds();
        }

        if(typeof params.updatedAt != undefined){
            var updateDate = DateTime.fromISO(params.updatedAt);
            params.updatedAt = updateDate.toSeconds();
        }
    }
    return params;
}


//create database object with database classes
var database = {
	user: Users,
	friends: Friends,
    posts: Posts,
    notifications: Notifications,
	pictures: Pictures,
	reactions: Reactions,
	chats: Chats,
    chatMembers: ChatMembers,
    messages: Messages,
    create_table: createTables,
    dataCallback: dataCallback,
    convertDates: convertDates,
    extractCallback: extractCallback,
    callbackSkeleton: callbackSkeleton
};

 module.exports = database;

