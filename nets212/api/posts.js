db = require('./database.js');
const { DateTime } = require("luxon");

var get = function(req,res){
    console.log("get called");
    db.posts.get(req.params.id,     
        function(err, data){
            console.log("callback for ", req.url, " called");
            if(err){
                //error from DB - return with error
                console.log("err:", err);
                res.json({'err': err});
            } else {
                if(typeof data != undefined && data != null){
                    //got data
                    data.attrs = db.convertDates(data.attrs);
                    //get comments
                    db.posts
                        .query(req.params.id)
                        .usingIndex('ParentIndex')
                        .loadAll()
                        .exec(function(err, data2){
                            if(err){
                                //error from DB - return with error
                                console.log("err:", err);
                                res.statusCode(400).json({'err': err});
                            } else {
                                var comments = [];
                                data2.Items.forEach(function(item){
                                    comments.push(item.attrs.id)
                                });
                                //return with data
                                data.attrs.comments = comments;
                                console.log("Returning post:", data.attrs);
                                res.json(data.attrs);
                            }
                        });
                } else {
                    res.status(404).json({"err":"Post not found"});
                }			
            }
        }
    );    
}

var create = function(req,res){
    console.log("create post called");
    req.body.parent = "0";
    db.posts.create(req.body, db.dataCallback(res));
}

var getComments = function(req, res){
    console.log("get all posts called")
    db.posts
    .query(req.params.id)
    .usingIndex('ParentIndex')
    .loadAll()
    // .exec(function(err, data){
    //     console.log("data:");
    //     console.log(data);
    // })
    .exec(db.dataCallback(res));
}

var createComment = function(req, res){
    console.log("create comment called");
    db.posts.create(req.body, db.dataCallback(res));
}

var createReaction = function(req, res){
    console.log("create reaction called");
    db.reactions.create(req.body, db.dataCallback(res));
}

var getReactions = function(req,res){
    console.log("get reactions called");
    db.reactions
        .query(req.params.id)
        .exec(db.dataCallback(res));
}

var update = function(req,res){
    console.log("update post called")
    db.posts.update(req.body, db.dataCallback(res));
}

var getAll = function(req, res){
    console.log("get all posts called")
    db.posts
    .query("0")
    .usingIndex('ParentIndex')
    .loadAll()
    // .exec(function(err, data){
    //     console.log("data:");
    //     console.log(data);
    // })
    .exec(db.dataCallback(res));
}

var getAllIDs = function(req, res){
    console.log("get all posts ID called")
    db.posts
    .query("0")
    .usingIndex('ParentIndex')
    .loadAll()
    // .exec(function(err, data){
    //     console.log("data:");
    //     console.log(data);
    // })
    .exec(function(err, data){
        if(err){
            //error from DB - return with error
            console.log("err:", err);
			res.statusCode(400).json({'err': err});
		} else {
            var result = [];
            data.Items.forEach(function(item){
                result.push(item.attrs.id)
            });
            //return with data
            console.log("data:", result);
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
    getComments: getComments,
};

module.exports = posts;