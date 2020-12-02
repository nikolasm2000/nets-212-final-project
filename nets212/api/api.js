var express = require('express');
var session = require('express-session');
var user = require('user.js')
var app = express();
var router = express.Router()
app.use(express.urlencoded());
//app.use(session({ secret: 'restaurant_search', cookie: { maxAge: 864000000 }}))


/* Below we install the routes. The first argument is the URL that we
   are routing, and the second argument is the handler function that
   should be invoked when someone opens that URL. Note the difference
   between app.get and app.post; normal web requests are GETs, but
   POST is often used when submitting web forms ('method="post"'). */


//router.use(() => {}); // General middleware
router.post('/user/:id', user.get);
router.post('/user/create', user.create);
router.post('/user/:id/update', user.update);
router.post('/login', user.login);
router.post('/logout', user.logout);
router.post('/friends', friends.getAll);
router.post('/friends/:id/isfriend',friends.isFriend);
router.post('/friends/requests', friends.getAll);//requests);
router.post('/friends/suggestions', friends.getAll);//suggestions);
router.post('/posts/homepage', posts.getAll);//homepage);
router.post('/posts/wall/:id', posts.getAll);//wall);
router.post('/posts/:id', posts.get);


app.use('/api', router);

/* Run the server */

app.listen(80);
console.log('API Server running on port 80. Now open http://localhost:80/ in your browser!');