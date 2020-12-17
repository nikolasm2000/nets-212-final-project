var serverUrl = "http://ec2-3-81-78-203.compute-1.amazonaws.com:8080/api";
var socketUrl = "http://ec2-3-81-78-203.compute-1.amazonaws.com:8081";

// var serverUrl = "http://localhost:8080/api";
// var socketUrl = "http://localhost:8081";

var refreshTime = 8000;
var config = { serverUrl: serverUrl, refreshTime: refreshTime, socketUrl: socketUrl};
module.exports = config;