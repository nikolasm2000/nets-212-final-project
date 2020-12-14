db = require('./database.js');

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
			res.json(data);
		}
    }
    return callback;
}

var get = function(req,res){
    console.log("get called");
    console.log("get really called");
    db.posts.get(req.params.id, dataCallback(res));
}

var create = function(req,res){
    console.log("create post called");
    console.log("req obj:")
    console.log(req);
    console.log("req.body:")
    console.log(req.body);
    console.log(req.query);
    db.posts.create(req.query,dataCallback(res));
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
};

module.exports = posts;