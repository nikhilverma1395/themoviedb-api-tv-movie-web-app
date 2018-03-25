require('rootpath')();
var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
app.use(cors());
var jwt = require('jsonwebtoken');
var config = require('config.json');
var expressJwt = require('express-jwt');
var session = require('express-session');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
//ongoose.connect(config.connectionString);
app.set('superSecret', config.secret);
app.use(morgan('dev'));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({secret: config.secret, resave: false, saveUninitialized: true}));// initialize the session,‘secret‘ is
// used for cookie handling etc but we have to put some secret for managing Session in Express.
app.use('/api', expressJwt({secret: config.secret}).unless({path: ['/api/users/authenticate', '/api/users/register']}));
app.get('/', function (req, res) {
    res.send('Welcome');
});
app.use('/register', require('./controllers/register.controller'));
app.use('/login', require('./controllers/login.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
app.use('/api/recent', require('./controllers/api/recent.controller'));


app.get('/api/users', function (req, res) {
    res.send("Secured");
});
app.listen(3000, function () {
    console.log("Started on PORT 3000");
})