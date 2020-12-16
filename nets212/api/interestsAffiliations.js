const { data } = require('jquery');
const { builtinModules } = require('module');
const { extractCallback } = require('./database.js');

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
                            usertable.create({'PBuser':userid, 'itemid': data.attrs.id}, callback);
                        }
                    })
                } else {
                    //associate item
                    usertable.create({'PBuser':userid, 'itemid': data.Items[0].attrs.id}, callback);
                }
               
            }
        });
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
                            usertable.create({'PBuser':userid, 'itemid': data.attrs.id}, callback);
                        }
                    })
                } else {
                    //associate item
                    usertable.create({'PBuser':userid, 'itemid': data.Items[0].attrs.id}, callback);
                }
               
            }
        });
}

var addInterest = function (name, callback) {
    add(db.interest, db.interestSearch, name, callback);
}

var addAffiliation = function (name, callback) {
    add(db.affiliation, db.affiliationSearch, name, callback);
}

var assocAffiliation = function(name, userid, callback){
    associateWithUser(db.affiliation, db.userAffiliations, db.affiliationSearch, name, userid, callback)
}

var assocInterest = function(name, userid, callback){
    associateWithUser(db.interest, db.userInterests, db.interestSearch, name, userid, callback)
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
    db.userAffiliation
        .query(req.session.id)
        .exec(db.callbackSkeleton(res, function(data){
        db.userAffiliation
            .query(data.item_id)
            .usingIndex("AffiliationIndex")
            .exec(db.extractCallback(res,"PB_User"));
    }));
    
}

var intAff = {
    addInterest: addInterest,
    addAffiliation: addAffiliation,
    affSearch: affSearch,
    intSearch: intSearch,
    assocInterest: assocInterest,
    assocAffiliation: assocAffiliation,
    getAffiliates: getAffiliates
}

module.exports = intAff;