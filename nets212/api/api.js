var express = require('express');
var session = require('express-session');

var app = express();
var router = express.Router()
app.use(express.urlencoded());
app.use(session({ secret: 'pennbook_user', cookie: { maxAge: 864000000 }}))

var user = require('./user.js');
var friends = require('./friends.js');
var posts = require('./posts.js');
/* Below we install the routes. The first argument is the URL that we
   are routing, and the second argument is the handler function that
   should be invoked when someone opens that URL. Note the difference
   between app.get and app.post; normal web requests are GETs, but
   POST is often used when submitting web forms ('method="post"'). */


//router.use(() => {}); // General middleware
router.post('/user/:id/get', user.get);
router.post('/user/create', user.create);
router.post('/user/:id/update', user.update);
router.post('/login', user.login);
router.post('/logout', user.logout);
router.post('/friends', friends.getAll);
router.post('/friends/:id/isfriend',friends.isFriend);
router.post('/friends/:id/request',friends.request);
router.post('/friends/:id/accept',friends.accept);
router.post('/friends/requests', friends.getAll);//requests);
router.post('/friends/suggestions', friends.getAll);//suggestions);
router.post('/posts/:id/get', posts.get);
router.post('/posts/create', posts.create);
router.post('/posts/homepage', posts.getAll);//homepage);
router.post('/posts/wall/:id', posts.getAll);//wall);


app.use('/api', router);

/* Run the server */

app.listen(8080);
console.log('API Server running on port 80. Now open http://localhost:80/ in your browser!');