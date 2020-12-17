var db = require('./database.js');
var sha256 = require('js-sha256');
var intaff = require('./interestsAffiliations.js')

const { assocInterest, assocAffiliation } = require('./interestsAffiliations.js');
const { callbackSkeleton } = require('./database.js');

var fullGet = function(req,res){
    console.log("user full get called");
    db.user.get(req.params.id, {AttributesToGet : ['id','first_name', 'last_name', 'profile_pic', 'birthday', 'email']}, db.callbackSkeleton(res, function(userdata){
        console.log("interests:");
        intaff.getUserInterests(req.params.id, res, function(interests){
            console.log("affiliations:")
            intaff.getUserAffiliations(req.params.id, res, function(affiliations){
                userdata.attrs.interests = interests;
                userdata.attrs.affiliations = affiliations;
                console.log("user data: ", userdata);
                res.json(userdata);
            })
        })
    }));
}

var get = function(req,res){
    console.log("user light get called");

    db.user.get(req.params.id, {AttributesToGet : ['id','first_name', 'last_name', 'profile_pic']}, db.dataCallback(res));
}

var create = function(req,res){
    console.log("user create called");
    console.log("data received:");
    console.log(req.body);

    if(typeof req.body.email == 'undefined'){
        res.status(400).json({"err:" : "Email needed."});
        return;
    }

    if(typeof req.body.password == 'undefined'){
        res.status(400).json({"err:" : "Password needed."});
        return;
    }

    req.body.password = sha256(req.body.password);

    db.user
        .query(req.body.email)
        .usingIndex('EmailIndex')
        .exec(function(err, data){
            if(err){
                //error from DB - return with error
                res.status(400).json({'err': err});
            } else {
                //check if email already exists
                if (data.Count > 0){
                    res.status(400).json({"err":"Email already in use"});
                } else {
                    var interest = req.body.interest;
                    delete req.body.interest;
                    var affiliation = req.body.affiliation;
                    delete req.body.affiliation;
                    
                    console.log("item being sent", req.body);
                    db.user.create(req.body,db.callbackSkeleton(res, function(data1){
                        console.log('hit 1');
                        intaff.assocInterest(interest, data1.attrs.id, db.callbackSkeleton(res, function(data2){
                            console.log('hit 2');
                            intaff.assocAffiliation(affiliation, data1.attrs.id, db.callbackSkeleton(res, function(data3){
                                console.log("hit 7")
                                db.keywordCreator(db.search, data1.attrs.first_name, {'article': false, 'PBuser': true, 'obj_id': data1.attrs.id}, db.callbackSkeleton(res, function (data){
                                    console.log('hit 8');
                                    db.keywordCreator(db.search, data1.attrs.last_name, {'article': false, 'PBuser': true, 'obj_id': data1.attrs.id}, db.callbackSkeleton(res, function (data){
                                        //adding back interest and affiliation
                                        data1.attrs.interest = interest;
                                        data1.attrs.affiliation = affiliation;
                                        //logging user in
                                        req.session.user = data1.attrs.id;
                                        res.json({data1});
                                    }));
                                }));
                            }));
                        }));
                    }));
                }
            }
        });
}

var update = function(req,res){
    //req.body.id = req.session.user;
    if(typeof req.body.password != 'undefined'){
        req.body.password = sha256(req.body.password);
    }
    console.log("data received:", req.body);

    req.body.id = req.session.id;

    var interest = req.body.interest;
    delete req.body.interest;
    var affiliation = req.body.affiliation;
    delete req.body.affiliation;
    db.user.update(req.body,db.callbackSkeleton(res, function(data1){
        intaff.assocInterest(interest, data1.attrs.id, callbackSkeleton(res, function(data2){
            intaff.assocAffiliation(affiliation, data1.attrs.id, callbackSkeleton(res, function(data3){
                //adding back interest and affiliation
                data1.attrs.interest = interest;
                data1.attrs.affiliation = affiliation;
                //logging user in
                res.json({data1});
            }));
        }));
    }));
}

var login = function(req,res){
    console.log('login called')
    db.user
        .query(req.body.email)
        .usingIndex('EmailIndex')
        .limit(1)
        .exec(function(err, data){
            console.log("user get result:")
            console.log(data);
            if(err){
                //error from DB - return with error
                res.status(400).json({'err': err});
            } else {
                //return with data
                if(data.Count == 0){
                    res.status(400).json({"err":"User not found"});
                } else if(sha256(req.body.password) == data.Items[0].attrs.password){
                    console.log("login correct")
                    console.log("user:",data.Items[0].attrs);
                    req.session.user = data.Items[0].attrs.id;
                    console.log("session: ", req.session.user);
                    res.json(data.Items[0].attrs);
                } else {
                    res.status(400).json({"err":"Password incorrect"});
                }
            }
        });

}

var logout = function(req,res){
    req.session.user = undefined;
    res.json({'success' : true});
}

var authenticate = function(req,res){
    console.log('authenticating...')
    if (req.session.user != undefined) {
        console.log('authentication successful')
        res.json({'id' : req.session.user});
    } else {
        console.log('authentication unsuccessful')
        res.status(400).json({"err":"user not logged in"});
    }
}

var search = function(req, res){
    db.search
        .query(req.body.keyword)
        //.usingIndex("weightIndex")
        //.descending
        .limit(5)
        .exec(db.callbackSkeleton(res, function(data){
            if(typeof data != undefined && data != null){
                var result = [];
                data.Items.forEach(function(item){
                    result.push({'id': item.obj_id, 'article': item.attrs.article, 'user': item.attrs.PBuser});
                });
                //return with data
                console.log("data:", result);
                res.json(result);
            } else {
                console.log("err: Not found")
                res.status(404).json({"err":"Not found"});
            }	
        }));
}

var allUserIds = function(req, res){
    db.user
        .scan()
        .loadAll()
        .exec(db.extractCallback(res,"id"));
}

var getTable = function(req, res){
    db.user
        .scan()
        .loadAll()
        .exec(db.dataCallback(res));
}

var user = {
    get: get,
    fullGet: fullGet,
	create: create,
	update: update,
	login: login,
    logout: logout,
    authenticate: authenticate,
    allUserIds: allUserIds,
    getTable: getTable,
    search: search
};

module.exports = user;
