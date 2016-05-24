var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db.js');

var port = process.env.PORT || 3000;

var app = express();
//to allow front to access back
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};
app.use(allowCrossDomain);

require('./config/passport.js')(passport, Strategy);

app.set('view engine', 'ejs');

//middleware
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(session({secret: config.sessions_secret, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

//setting routes
var hostRoutes = require('./routes/hosts.js');
app.use('/hosts', hostRoutes);
var guestRoutes = require('./routes/guests.js');
app.use('/guests', guestRoutes);

app.listen(port);
console.log('puppies are listenng on port ' + port);


