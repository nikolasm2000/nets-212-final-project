// var AWS = require('aws-sdk');
// AWS.config.loadFromPath('./config.json');
// AWS.config.update({region:'us-east-1'});
//var db = new AWS.DynamoDB();

var dynamo = require('dynamodb');
dynamo.AWS.config.loadFromPath('config.json');

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
        accepted: Joi.boolean()
    }
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
        hashKey : 'parent', name : 'ParentIndex', type : 'global'
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
        chat: Joi.number(),
        user: Joi.number(),
        text: Joi.string(),
    }
});

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
        console.log("callback called");
        console.log("err:", err);
        console.log("data:", data);
        if(err){
			//error from DB - return with error 
			res.json({'err': err});
		} else {
            //return with data
            if(typeof data != undefined && data != null){
                if(typeof data.attrs.createdAt != undefined){
                    console.log(data.attrs.createdAt);
                    var createDate = DateTime.fromISO(data.attrs.createdAt);
                    data.attrs.createdAt = createDate.toSeconds();
                    console.log(createDate.toSeconds())
                }
                if(typeof data.attrs.updatedAt != undefined){
                    console.log(data.attrs.updatedAt);
                    var updateDate = DateTime.fromISO(data.attrs.updatedAt);
                    data.attrs.updatedAt = updateDate.toSeconds();
                    console.log(updateDate.toSeconds())
                }

                res.json(data);
            }

			res.status(404).json({"err":"User not found"});
		}
    }
    return callback;
}


//create database object with database classes
var database = {
	user: Users,
	friends: Friends,
	posts: Posts,
	pictures: Pictures,
	reactions: Reactions,
	chats: Chats,
    chatMembers: ChatMembers,
    messages: Messages,
    create_table: createTables,
    dataCallback: dataCallback
};

 module.exports = database;

