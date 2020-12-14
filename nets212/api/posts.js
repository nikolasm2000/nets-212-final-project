db = require('./database.js');
const { DateTime } = require("luxon");

var dataCallback = function(res){
    callback = function(err, data){
        console.log("callback called");
        console.log(err);
        console.log(data);
        if(err){
			//error from DB - return with error 
			res.json({'err': err});
		} else {
            //return with data
            if(typeof data.attrs.createdAt != undefined){
                console.log(data.attrs.createdAt);
                var createDate = DateTime.fromISO(data.attrs.createdAt);
                console.log(createDate);
                data.attrs.createdAt = createDate.valueOf();
                console.log(createDate.valueOf())
            }

			res.json(data);
		}
    }
    return callback;
}

var get = function(req,res){
    console.log("get called");
    db.posts.get(req.params.id, dataCallback(res));
}

var create = function(req,res){
    console.log("create post called");
    req.body.parent = "";
    db.posts.create(req.body,dataCallback(res));
}

var createComment = function(req, res){
    console.log("create comment called");
    db.posts.create(req.body,dataCallback(res));
}

var createReaction = function(req, res){
    console.log("create reaction called");
    db.reactions.create(req.body,dataCallback(res));
}

var getReactions = function(req,res){
    console.log("get reactions called");
    db.reactions
        .query(req.params.id)
        .exec(dataCallback(res));
}

var update = function(req,res){
    console.log("update post called")
    db.posts.update(req.body,dataCallback(res));
}

var getAll = function(req, res){
    console.log("get all posts called")
    db.posts
    .scan()
    .loadAll()
    // .exec(function(err, data){
    //     console.log("data:");
    //     console.log(data);
    // })
    .exec(dataCallback(res));
}

var getAllIDs = function(req, res){
    console.log("get all posts ID called")
    db.posts
    .scan()
    .loadAll()
    // .exec(function(err, data){
    //     console.log("data:");
    //     console.log(data);
    // })
    .exec(function(err, data){
        if(err){
			//error from DB - return with error 
			res.statusCode(400).json({'err': err});
		} else {
            var result = [];
            console.log(data.Items);
            data.Items.forEach(function(item){
                console.log(item);
                result.push(item.attrs.id)
            });
			//return with data
			res.json(result);
		}
    });


}



var posts = {
	get: get,
	create: create,
	update: update,
    getAll: getAll,
    getAllIDs: getAllIDs,
    createComment: createComment,
    createReaction: createReaction,
    getReactions: getReactions,
};

module.exports = posts;