var express = require('express');
var path = require('path'); //file path
var favicon = require('serve-favicon');
var logger = require('morgan'); //logging info in terminal
var cookieParser = require('cookie-parser'); //handling cookies
var bodyParser = require('body-parser');  //handling text/json body
var expressValidator = require('express-validator');//to validate the input
var flash = require('connect-flash'); //flash
var session = require('express-session'); //expression session
var passport = require('passport'); //passport authentication
var exphbs = require('express-handlebars');// express engine

//var HttpStrategy = require('passport-http').Strategy;
var monogdb = require('mongodb');
var mongoose = require('mongoose');// Mondodc ORM
mongoose.connect('mongodb://localhost/test'); //connect to the login db
var db = mongoose.connection; //set db to mondoose connection

var app = express(); //initialize express

app.locals.points = "1,500";
// view engine setup
app.set('views', path.join(__dirname, 'views'));  //where/how views are handled
app.engine('handlebars', exphbs({defaultLayout:'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'handlebars');  //view engine. ejs vs jade

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var routes = require('./routes/index');  //controller
var about = require('./routes/about');  
var account = require ('./routes/account');
var login = require ('./routes/login');
var register = require ('./routes/register');
var logout = require ('./routes/logout');
//define new pages here
//then create a new route (controller)
//routes will render a view
app.use('/', routes); //home
app.use('/account', account);
app.use('/login', login);
app.use('/register', register);
app.use('/about', about);
app.use('/logout', logout);

Users = require('./models/users.js');
Urls = require('./models/urls.js');

app.get('/api/users', function(req, res){ 
  Users.getUsers(function(err, users){
    if(err){
      throw err;
    }
    res.json(users);
  });
});

app.get('/api/urls', function(req, res){ 
  Urls.getUrls(function(err, urls){
    if(err){
      throw err;
    }
    res.json(urls);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Express Session have to looking this
app.use(session({
  secert: 'topSecret',
  saveUninitialize: true,
  resave: true,
}));
// Connect flash middleware
app.use(flash());

// Global Vars for flash messages
app.use(function (req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error'); //passport sends its own errow message
  next();
})

//Passport initialization
app.use(passport.initialize());
app.use(passport.session());

//Express Validator from the express validator github
/*app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));*/






module.exports = app;
