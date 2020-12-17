db = require('./database.js');
const { DateTime } = require("luxon");
const { callbackSkeleton } = require('./database.js');

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
                                db.reactions
                                    .query(req.params.id)
                                    .loadAll()
                                    .exec(db.callbackSkeleton(res, function(reaction_data){
                                        data.attrs.likes = reaction_data.Count;
                                        console.log("likes: ", data.attrs.likes)
                                        db.reactions
                                        .query(req.params.id)
                                        .usingIndex("AuthorIndex")
                                        .where('author').equals(req.session.user)
                                        .exec(db.callbackSkeleton(res, function(reaction_data){
                                            data.attrs.has_liked = (reaction_data.Count > 0);
                                            console.log("Returning post:", data.attrs);
                                            res.json(data.attrs);
                                        }));
                                    }))
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
    db.posts.create(req.body, db.callbackSkeleton(res, function(postdata){
        sendToAllFriends(postdata.attrs.id, res, function(data){
            res.json(postdata);
        });
    }));
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
    .descending()
    .loadAll()
    // .exec(function(err, data){
    //     console.log("data:");
    //     console.log(data);
    // })
    .exec(db.dataCallback(res));
}

var toggleLike = function(req, res) {
    db.reactions
        .query(req.params.id)
        .usingIndex("AuthorIndex")
        .where('author').equals(req.session.user)
        .exec(db.callbackSkeleton(res, function(data){
            if(data.Count == 0){
                db.reactions.create({'post': req.params.id, 'author': req.session.user, 'reaction': 0}, db.callbackSkeleton(res, function(data){
                    res.json({liked: true});
                }));
            } else {
                console.log(data.Items[0].attrs.id);
                db.reactions.destroy(req.params.id,data.Items[0].attrs.id, db.callbackSkeletonNull(res, function(data){
                    res.json({liked: false});
                }));
            }
        }));
}

var numLikes = function(req, res) {
    db.reactions
    .query(req.params.id)
    .loadAll()
    .exec(db.callbackSkeleton(res, function(data){
        res.json({'likes': data.Count});
    }));
}

var homepage = function(req, res) {
    var time = DateTime.local().setZone("utc");
    if (req.body.oldest != undefined){
        console.log("received time: ", req.body.oldest);
        time = DateTime.fromSeconds(parseInt(req.body.oldest));
    }
    db.homepage
        .query(req.session.user)
        .usingIndex("TimestampIndex")
        .where("createdAt").lt(time.toISO())
        .descending()
        .loadAll()//.limit(3)
        .exec(db.extractCallback(res, "post"))
}

var wall = function(req, res){
    
    var time = DateTime.local().setZone("utc");
    if (req.body.oldest != undefined){
        console.log("received time: ", req.body.oldest);
        time = DateTime.fromSeconds(parseInt(req.body.oldest));
    }
    db.posts
    .query(req.params.id)
    .usingIndex('WallIndex')
    .where("createdAt").lt(time.toISO())
    .descending()
    .loadAll()//.limit(10)
    .exec(db.extractCallback(res, "id"))
}

var sendToAllFriends = function(post, res, callback){
    db.friends
        .query(res.req.session.user)
        .usingIndex("AcceptedIndex")
        .where("accepted").equals(1)
        .exec(db.extractCallbackSkeleton(res,"friend",function(data){
            params = [{"PBuser":res.req.session.user, "post": post}];
            data.forEach(function(friendID){
                params.push({"PBuser":friendID, "post": post})
            });
            db.homepage.create(params, callbackSkeleton(res, callback));
        }));
}

var getAllIDs = function(req, res){
    console.log("get all posts ID called")
    db.posts
    .query("0")
    .usingIndex('ParentIndex')
    .descending()
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

var getTable = function(req, res){
    db.posts
        .scan()
        .loadAll()
        .exec(db.dataCallback(res));
}

var posts = {
	get: get,
	create: create,
	update: update,
    getAll: getAll,
    getAllIDs: getAllIDs,
    homepage: homepage,
    wall: wall,
    createComment: createComment,
    createReaction: createReaction,
    getReactions: getReactions,
    getComments: getComments,
    numLikes: numLikes,
    toggleLike: toggleLike,
    getTable: getTable
};

module.exports = posts;