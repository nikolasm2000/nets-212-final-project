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
    },

    indexes: [{
        hashKey : 'name', name : 'NameIndex', type : 'global'
    }]
});

var InterestSearch = dynamo.define('PB_InterestSearch',{
    hashKey: 'keyword',
    rangeKey: 'id',
    timestamps: false,
    schema:{
        keyword: Joi.string(),
        id: dynamo.types.uuid(),
        name: Joi.string(),
        weight: Joi.number(),
    },

    indexes: [
        {hashKey : 'id', name : 'idIndex', type : 'global'},
        {hashKey : 'keyword', rangeKey: 'weight', name:'weightIndex', type : 'local' }
    ]
});

var UserInterests = dynamo.define('PB_UserInterest',{
    hashKey: 'PBuser',
    rangeKey: 'item_id',
    schema:{
        PBuser: Joi.string(),
        item_id: Joi.string(),
    },

    indexes: [{
        hashKey : 'item_id', rangeKey:'PBuser', name : 'InterestIndex', type : 'global'
    }]
});

var Affiliations = dynamo.define('PB_Affiliation', {
    hashKey: 'id',
    timestamps: false,
    schema:{
        id: dynamo.types.uuid(),
        name: Joi.string(),
    },

    indexes: [{
        hashKey : 'name', name : 'NameIndex', type : 'global'
    }]
});

var UserAffiliations = dynamo.define('PB_UserAffiliation',{
    hashKey: 'PBuser',
    rangeKey: 'item_id',
    schema:{
        PBuser: Joi.string(),
        item_id: Joi.string(),
    },

    indexes: [{
        hashKey : 'item_id', rangeKey:'PBuser', name : 'AffiliationIndex', type : 'global'
    }]
})

var AffiliationSearch = dynamo.define('PB_AffiliationSearch',{
    hashKey: 'keyword',
    rangeKey: 'id',
    timestamps: false,
    schema:{
        keyword: Joi.string(),
        id: dynamo.types.uuid(),
        name: Joi.string(),
        weight: Joi.number(),
    },

    indexes: [
        {hashKey : 'id', name : 'idIndex', type : 'global'},
        {hashKey : 'keyword', rangeKey: 'weight', name:'weightIndex', type : 'local' }
    ]
});

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
        dismissed: Joi.boolean(),
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
    },

    indexes: [{
        hashKey : 'post', rangeKey:'author', name : 'AuthorIndex', type : 'local'
    }]
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

var Sockets = dynamo.define('PB_Socket',{
    hashKey: 'user_id',

    schema: {
        user_id: Joi.string(),
        socket_id: Joi.string(),
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

var callbackSkeletonNull = function(res, user_callback){
    callback = function(err, data){
        console.log("callback for ", res.req.url, " called");
        if(err){
            console.log("err:", err);
			//error from DB - return with error 
			res.json({'err': err});
		} else {
            //return with data
            user_callback(data);
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

var extractCallbackSkeleton = function(res, param, callback){
    callbackfunc = function(err, data){
        console.log("callback for ", res.req.url, " called");
        if(err){
            console.log("err:", err);
			//error from DB - return with error 
			res.json({'err': err});
		} else {
            //return with data
            if(typeof data != undefined && data != null){
                console.log(data);
                var result = [];
                if(data.Items == undefined){
                    data.forEach(function(item){
                        result.push(item.get(param));
                    });
                } else {
                    data.Items.forEach(function(item){
                        result.push(item.get(param));
                    });
                }
                //return with data
                console.log("data:", result);
                callback(result);
            } else {
                console.log("err: Not found")
                res.status(404).json({"err":"Not found"});
            }			
		}
    }
    return callbackfunc;
}

var convertDates = function(params){
    if(params != undefined){
        console.log(params);
        if(params.createdAt != undefined){
            var createDate = DateTime.fromISO(params.createdAt);
            params.createdAt = createDate.toSeconds();
        }

        if(params.updatedAt != undefined){
            var updateDate = DateTime.fromISO(params.updatedAt);
            params.updatedAt = updateDate.toSeconds();
        }
    }
    return params;
}

var keywordCreator = function (table, keyword, object, callback){
    console.log("creating keywords for ", keyword);
    var items = [];
    for (var i = 1; i <= keyword.length; i++){
        var item = object;
        item.keyword = keyword.slice(0,i);
        items.push(item);
    }
    
    table.create(items, callback);
}



//create database object with database classes
var database = {
    user: Users,
    interests: Interests,
    interestSearch: InterestSearch,
    userInterests: UserInterests,
    affiliations: Affiliations,
    affiliationSearch: AffiliationSearch,
    userAffiliations: UserAffiliations,
	friends: Friends,
    posts: Posts,
    notifications: Notifications,
	pictures: Pictures,
	reactions: Reactions,
	chats: Chats,
    chatMembers: ChatMembers,
    messages: Messages,
    sockets: Sockets,
    search: Search,
    create_table: createTables,
    dataCallback: dataCallback,
    convertDates: convertDates,
    extractCallback: extractCallback,
    callbackSkeleton: callbackSkeleton,
    callbackSkeletonNull: callbackSkeletonNull,
    keywordCreator: keywordCreator,
    extractCallbackSkeleton: extractCallbackSkeleton
};

 module.exports = database;

