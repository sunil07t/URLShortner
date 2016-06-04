var express = require('express');
var path = require('path'); //file path
var favicon = require('serve-favicon');
var logger = require('morgan'); //logging info in terminal
var cookieParser = require('cookie-parser'); //handling cookies
var bodyParser = require('body-parser');  //handling text/json body

var routes = require('./routes/index');   //controller
var about = require('./routes/about');   //controller
var users = require('./routes/users');    //controller

var app = express(); //initialize express

app.locals.points = "1,500";
app.locals.videodata = require('./videodata.json');
// view engine setup
app.set('views', path.join(__dirname, 'views'));  //where/how views are handled
app.set('view engine', 'ejs');  //view engine. ejs vs jade

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//define new pages here
//then create a new route (controller)
//routes will render a view
app.use('/', routes);
app.use('/users', users);
app.use('/about', about);

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


module.exports = app;
