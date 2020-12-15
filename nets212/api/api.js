var express = require('express');
var session = require('express-session');
var cors = require("cors");

var app = express();
var router = express.Router()
app.use(cors());
app.use(express.urlencoded());
app.use(session({ secret: 'pennbook_user', cookie: { maxAge: 864000000 }}))

var user = require('./user.js');
var friends = require('./friends.js');
var posts = require('./posts.js');
var db = require('./database.js');

/* Below we install the routes. The first argument is the URL that we
   are routing, and the second argument is the handler function that
   should be invoked when someone opens that URL. Note the difference
   between app.get and app.post; normal web requests are GETs, but
   POST is often used when submitting web forms ('method="post"'). */


//router.use(() => {}); // General middleware
router.use(function (req, res, next) {
   console.log("\n ========================================= \n")
   console.log('Request received on route ', req.url)
   console.log('Logged in user: ', req.session.user)
   next()
 })
router.post('/authenticate', user.authenticate);
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
router.post('/posts/comments/create', posts.createComment);
router.post('/posts/comments/:id/get', posts.get);
router.post('/posts/:id/comments', posts.getComments)
router.post('/posts/reactions/:id', posts.getReactions);
router.post('/posts/homepage', posts.getAllIDs);//homepage);
router.post('/posts/wall/:id', posts.getAllIDs);//wall);


app.use('/api', router);

/* Run the server */

app.listen(8080);
console.log('API Server running on port 8080. Now open http://localhost:8080/ in your browser!');

var http = require('http').createServer(app);
var socketIo = require("socket.io")(http, {
   cors: {
      origin: '*',
    }
});
http.listen(8081, () => {
   console.log("Socket io listening on 8081");
});

socketIo.on('connection', (socket) => {
   console.log('user connected');
   socket.on('chat message', (msg) => {
      //Check that msg.user is equal to user currently logged in
      //Use socket.emit() to send the message to everyone in the group chat (msg.chat)
      //Add the user's name to the msg object please (msg.name = ____)
      db.user.get(msg.user, (err, data) => {
         if (err){
            //handle error
            console.log(err);
         } else {
            msg.name = data.attrs.first_name + ' ' + data.attrs.last_name;
            socketIo.emit('chat message', msg);
         }
      } )
   })

})