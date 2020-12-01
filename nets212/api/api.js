var express = require('express');
var routes = require('./routes/routes.js');
var session = require('express-session');
var app = express();
var router = express.Router()
app.use(express.urlencoded());
//app.use(session({ secret: 'restaurant_search', cookie: { maxAge: 864000000 }}))


/* Below we install the routes. The first argument is the URL that we
   are routing, and the second argument is the handler function that
   should be invoked when someone opens that URL. Note the difference
   between app.get and app.post; normal web requests are GETs, but
   POST is often used when submitting web forms ('method="post"'). */

app.get('/', routes.get_main);
app.post('/checklogin', routes.login);
app.get('/signup', routes.get_signup);
app.post('/createaccount', routes.create_account);
app.get('/restaurants', routes.show_restaurants);
app.post('/addrestaurant', routes.create_restaurant);
app.post('/removerestaurant', routes.delete_restaurant);
app.post('/getrestaurants', routes.get_restaurants);
app.get('/logout', routes.logout);


router.use(() => {}); // General middleware
router.get('/route1', () => {})
router.get('/route2', () => {})
router.post('/route2', () => {})

app.use('/api', router);

/* Run the server */

app.listen(80);
console.log('API Server running on port 80. Now open http://localhost:80/ in your browser!');