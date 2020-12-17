const { data } = require('jquery');
const { builtinModules } = require('module');
const { extractCallback, user } = require('./database.js');

db = require('./database.js');

var add = function(table, searchtable, name, callback){
    table.create({"name": name}, function(err, data1){
        if (err) {
            //foward error to callback
            callback(err, null);
        } else {
            //create keyword search
            db.keywordCreator(searchtable, name, {"id": data1.attrs.id, "name": name, "weight" : 1}, function(err, data2){
                if (err){
                    callback(err, null);
                } else {
                    callback(null, data1);
                }
            })
        }
    })
}

var associateWithUser = function(table, usertable, searchtable, name, userid, callback){
    table.query(name)
        .limit(1)
        .usingIndex("NameIndex")
        .exec(function(err, data){
            if(err){
                //error from DB - return with error
                callback(err, null);
            } else {
                //check if item already exists
                if (data.Count == 0){
                    //create if not
                    add(table, searchtable, name, function(err, data){
                        if (err){
                            callback(err, null);
                        } else {
                            //then associate
                            usertable.create({'PBuser':userid, 'item_id': data.attrs.id}, callback);
                        }
                    })
                } else {
                    //associate item
                    usertable.create({'PBuser':userid, 'item_id': data.Items[0].attrs.id}, callback);
                }
               
            }
        });
}

var associateMultipleWithUser = function(table, usertable, searchtable, objs, userid, callback){
    console.log('hit 3');
    if (objs.length > 2){
        console.log('hit 4');
        associateWithUser(table, usertable, searchtable, objs.pop(), userid, function(err, data){
            if (err) {
                callback (err, null);
            } else {
                associateMultipleWithUser(table, usertable, searchtable, objs, userid, callback);
            }
        });
    } else {
        console.log('hit 5');
        associateWithUser(table, usertable, searchtable, objs.pop(), userid, callback);
    }
}

var getUserAffInt = function(table, usertable, userid, res, callback){
    usertable.query(userid)
        .loadAll()
        .exec(db.extractCallbackSkeleton(res, "item_id", function(ids){
            console.log(ids);
            if(ids.length < 2){
                ids = ids.pop();
                table.get(ids, db.callbackSkeleton(res, function(data) {
                    callback([data.attrs.name]);
                }));
            } else {
                table.get(ids, db.extractCallbackSkeleton(res, "name", function(data) {
                    callback(data);
                }));
            }
        }));
}

var getUserInterests = function(userid, res, callback){
    getUserAffInt(db.interests, db.userInterests, userid, res, callback);
}

var getUserAffiliations = function(userid, res, callback){
    getUserAffInt(db.affiliations, db.userAffiliations, userid, res, callback);
}


var addInterest = function (name, callback) {
    add(db.interests, db.interestSearch, name, callback);
}

var addAffiliation = function (name, callback) {
    add(db.affiliations, db.affiliationSearch, name, callback);
}

var assocAffiliation = function(names, userid, callback){
    associateMultipleWithUser(db.affiliations, db.userAffiliations, db.affiliationSearch, names, userid, callback)
}

var assocInterest = function(names, userid, callback){
    associateMultipleWithUser(db.interests, db.userInterests, db.interestSearch, names, userid, callback)
}

var search = function(searchtable, req, res){
    db.searchtable
        .query(req.body.keyword)
        .usingIndex("weightIndex")
        .descending
        .limit(5)
        .exec(extractCallback(res, "name"));
}

var affSearch = function(req, res){
    search(db.affiliationSearch, req, res);
}

var intSearch = function(req, res){
    search(db.interestSearch, req, res);
}

var getAffiliates = function(req, res){
    var userid = req.session.user;
    if(req.params.id != undefined){
        userid = req.params.id;
    }
    db.userAffiliations
        .query(userid)
        .exec(db.callbackSkeleton(res, function(data){
            if (data.Count > 0) {
                console.log(data);
                db.userAffiliations
                    .query(data.Items[0].attrs.item_id)
                    .usingIndex("AffiliationIndex")
                    .exec(db.extractCallback(res,"PBuser"));
            } else {
                res.status(400).json({'err': "No affiliation found."})
            }
    }));
}

var getAllAffiliations = function(req, res){
    db.affiliations
        .scan()
        .exec(extractCallback(res, "name"));
}

var getAllInterests = function(req, res){
    db.interests
        .scan()
        .exec(extractCallback(res, "name"));
}

var getIntUserTable = function(req, res){
    db.userInterests
        .scan()
        .loadAll()
        .exec(db.dataCallback(res));
}

var getAffUserTable = function(req, res){
    db.userAffiliations
        .scan()
        .loadAll()
        .exec(db.dataCallback(res));
}

var intAff = {
    addInterest: addInterest,
    addAffiliation: addAffiliation,
    affSearch: affSearch,
    intSearch: intSearch,
    assocInterest: assocInterest,
    assocAffiliation: assocAffiliation,
    getAffiliates: getAffiliates,
    getAllInterests: getAllInterests,
    getAllAffiliations: getAllAffiliations,
    getUserAffiliations: getUserAffiliations,
    getUserInterests: getUserInterests,
    getIntUserTable: getIntUserTable,
    getAffUserTable: getAffUserTable
}

module.exports = intAff;