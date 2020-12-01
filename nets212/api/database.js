var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var db = new AWS.DynamoDB();

var dynamo = require('dynamodb');


/* Highlevel function of adding a generic item to a table. Recieves 
table name and schema, as well as item values. */
var putIntoTable = function(tableName, columns, values, callback) {
  var params_string = '{'//'{ "Item":{';
  var i;

  var variables_arr = [];

  for(i = 0; i < columns.length; i++){
	if (typeof(values[i]) == typeof(0)){
		variables_arr.push('"' + columns[i] + '": { "N":"' + values[i] + '"}');
	} else {
		variables_arr.push('"' + columns[i] + '": {"S":"' + values[i] + '"}');
	}
  }
  
  params_string += variables_arr.join(", ");
  params_string += '}'//'}, "TableName": "' + tableName + '", "ReturnValues": "ALL_OLD"}';
	
  //var params = JSON.parse(params_string);

  var item = JSON.parse(params_string);

  params = {
	"Item": item,
	"TableName": tableName,
	"ReturnValues": "NONE"
  }

  db.putItem(params, function(err, data){
    if (err)
      callback(err)
    else
      callback(null, item)
  });
}

/* Highlevel function of getting a generic item to a table. Recieves 
table name and schema, as well as item values. */
var getFromTable = function(tableName, columns, value, callback){
  var item_name = (tableName.slice(-1)=="s")? tableName.slice(0,-1) : tableName;
  console.log('Getting: ' + value); 

  var params = {
      KeyConditions: {
        [columns[0]]: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [ { S: value } ]
        }
      },
      TableName: tableName,
      AttributesToGet: columns
  };

  db.query(params, function(err, data) {
    if (err) {
      callback(err, null);
	} else if (data.Items.length == 0) {
	  callback('No ' + item_name + ' found', null);
    } else {
      callback(err, data.Items[0]);
    }
  });
}

/* Highlevel function of checking an item exists in the DB. Recieves 
table name and schema, as well as item values. */
var checkExists = function(tableName, partition_key, value, callback){
  var item_name = (tableName.slice(-1)=="s")? tableName.slice(0,-1) : tableName;
  console.log('Trying to find: ' + value); 

  var params = {
      KeyConditions: {
        [partition_key]: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [ { S: value } ]
        }
      },
      TableName: tableName,
      AttributesToGet: [partition_key]
  };

  db.query(params, function(err, data) {
    if (err) {
      callback(err, null, null);
	} else if (data.Items.length == 0) {
	  callback(null, false);
    } else {
      callback(null, true);
    }
  });
}

/* Highlevel function that returns all items in table. Recieves table name. */
var getAllItems = function (tableName, callback){
	
	//prepare params
	var params = {
	    TableName: tableName
	};
	
	//init data collector
	var all_data = [];
	
	//create callback
	var scanCallback = function(err, data){
		//add data to data collector
		all_data = all_data.concat(data.Items);
		//call scan again if not every item was returned
		if (typeof data.LastEvaluatedKey != "undefined") {
	        console.log("Scanning for more...");
	        params.ExclusiveStartKey = data.LastEvaluatedKey;
	        db.scan(params, scanCallback);
	    } else {
			//return to user callback with all collected data
			callback(err,all_data);
		}
	}
	
	//call initial scan
	db.scan(params,scanCallback);
}

/* Highlevel function of deleting a generic item from a table. Recieves 
table name and schema, as well as item values. */
var deleteFromTable = function(tableName, partition_key, value, callback){
  var item_name = (tableName.slice(-1)=="s")? tableName.slice(0,-1) : tableName;
  console.log('Deleting: ' + value); 

  //params for deletion
  var params = {
      Key: {
        [partition_key]: {
          S: value
        }
      },
      TableName: tableName,
	  ReturnValues: "ALL_OLD",
  };

  //delete
  db.deleteItem(params, function(err, data) {
	if (err) {
	  //send back error
      callback(err, null);
    } else {
	  //send back data that was deleted
      callback(err, data.Attributes);
    }
  });
}

//uses high level function to add a restaurant
var addRestaurant = function(name, latitude, longitude, description, creator, callback) {
	var columns = ["name","latitude","longitude","description","creator"];
	var values = [name, latitude,longitude,description,creator];
	putIntoTable("restaurants", columns, values, callback);
}

//uses high level function to add a user
var addUser = function(username, password, fullname, callback) {
	var columns = ["username","password","fullname"];
	var values = [username, password, fullname];
	putIntoTable("users", columns, values, callback);
}

//uses high level function to get a restaurant
var getRestaurant = function(name, callback){
	var columns = ["name","latitude","longitude","description","creator"];
	getFromTable("restaurants", columns, name, callback);
}

//uses high level function to check if restaurant exists
var restaurantExists = function(name, callback){
	checkExists("restaurants", "name", name, callback);
}

//uses high level function to check if restaurant exists
var removeRestaurant = function(name, callback){
	deleteFromTable("restaurants", "name", name, callback);
}

//uses high level function to get a user
var getUser = function(username, callback){
	var columns = ["username","password","fullname"];
	getFromTable("users", columns, username, callback);
}

//uses high level function to check if user exists
var userExists = function(username, callback){
	checkExists("users", "username", username, callback);
}

//uses high level function to return all restaurants
var getAllRestaurants = function(callback){
	getAllItems("restaurants", callback)
}


//create database object with methods
var database = { 
	getUser: getUser,
	getRestaurant: getRestaurant,
	addUser: addUser,
	addRestaurant: addRestaurant,
	removeRestaurant: removeRestaurant,
	getAllRestaurants: getAllRestaurants,
	userExists: userExists,
	restaurantExists: restaurantExists
};

module.exports = database;
                                        