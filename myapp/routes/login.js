var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/users');


/* GET about page. */

/**
req.user checks if a user is logged in or not. 
if yes, go to accout/* page (* is username)
else, render a login page
*/
router.get('/', loginGet);
router.post('/', loginPost);

function loginGet (req, res, next) {
  if (!req.user){
    res.render('login', {message: req.session.messages});
    req.session.messages = null;
  }
  else{
    res.redirect('/account/' + req.user.username);
  }
/*  res.render('login', { 
    title: 'login',
  	 });*/
}

/*// logining the user
router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  console.log (username, password);

  //Validation
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  
  //Check errors
  var errors = req.validationErrors();
  for (var i = 0; i < errors.length; i++) {
    console.log(errors[i]);
  }
 if(errors){
  	res.render('login',{
  		errors: errors
  	});
  }
  else{
  	console.log('PASSED');
  }
});*/

passport.use(new LocalStrategy(
  function(username, password, done){
    User.getUsersByUsername(username, function(err, user){
      if(err) throw err;
      if (!user){
        return done(null, false, {message: 'Invalid Username!'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if (err) throw err;
        if (isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: "Invalid Password!"});
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


/*router.post('/', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login', failureFlash: true}),
  function(req, res){
    res.redirect('/account');
  });*/

/*router.post('/', passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/account/' + req.user.username);
    // res.render('index', { 
    // success_msg: 'Signed in as ' + req.user.username,
    //  });
  });*/

function loginPost(req, res, next) {
  // ask passport to authenticate
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      // if error happens
      return next(err);
    }
    
    if (!user) {
      // if authentication fail, get the error message that we set
      // from previous (info.message) step, assign it into to
      // req.session and redirect to the login page again to display
      req.session.messages = info.message;
      return res.redirect('/login');
    }

    // if everything's OK
    req.logIn(user, function(err) {
      if (err) {
        req.session.messages = "Error";
        return next(err);
      }

      // set the message
      req.session.messages = "Login successfully";
      return res.redirect('/account/' + req.user.username);
    });
    
  })(req, res, next);
}




module.exports = router;
