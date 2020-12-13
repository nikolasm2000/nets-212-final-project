// var AWS = require('aws-sdk');
// AWS.config.loadFromPath('./config.json');
// AWS.config.update({region:'us-east-1'});
//var db = new AWS.DynamoDB();

var dynamo = require('dynamodb');
dynamo.AWS.config.loadFromPath('config.json');

const Joi = require('joi');

//console.log(dynamo);

var Users = dynamo.define('Users', {
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

var Interests = dynamo.define('Interests', {
    hashKey: 'id',
    timestamps: false,
    schema:{
        id: dynamo.types.uuid(),
        name: Joi.string(),
    }
});

var UserInterests = dynamo.define('UserInterests',{
    hashKey: 'user',
    rangeKey: 'interest',
    schema:{
        user: Joi.number(),
        interest: Joi.number(),
    }
})

var Friends = dynamo.define('Friends', {
    hashKey:'user',
    rangeKey: 'friend',
    timestamps: false,
    schema: {
        user: Joi.number(),
        friend: Joi.number(),
        request: Joi.boolean(), //Do I need this? to be seen
        accepted: Joi.boolean()
    }
});

var Posts = dynamo.define('Posts', {
    hashKey: 'id',
    timestamps: true,
    schema: {
        id: dynamo.types.uuid(),
        author: Joi.number(),
        parent: Joi.number(),
        text: Joi.string(),
        privacy: Joi.number(),
        pictures: dynamo.types.stringSet(), //TODO think about this
    }
});

var Pictures = dynamo.define('Pictures',{
    hashKey: 'post',
    rangeKey: 'id',
    schema: {
        id: dynamo.types.uuid(),
        post: Joi.number(),
        link: Joi.string(),
    }
});

var Reactions = dynamo.define('Reactions',{
    hashKey: 'post',
    rangeKey: 'id',
    timestamps: true,

    schema: {
        id: dynamo.types.uuid(),
        post: Joi.number(),
        author: Joi.number(),
        reaction: Joi.number(),
    }
});

var Chats = dynamo.define('Chats',{
    hashKey: 'id',
    timestamps: true,
    updatedAt: false,
    schema: {
        id: dynamo.types.uuid(),
        name: Joi.string(),
        private: Joi.boolean(),
    }
});

var ChatMembers = dynamo.define('ChatMembers',{
    hashKey: 'chat',
    rangeKey: 'user',
    timestamps: false,
    schema:{
        chat: Joi.number(),
        user: Joi.number(),
        date_joined: Joi.number(),
        admin: Joi.boolean(),
    }
});

var Messages = dynamo.define('Messages',{
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
    create_table: createTables
};

 module.exports = database;
                                        