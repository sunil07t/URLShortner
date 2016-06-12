var express = require('express');
var router = express.Router();
var flash = require('connect-flash');

var User = require('../models/users');

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('register', { 
    title: 'Register',
  	 });
});

// Registering the user
router.post('/', function(req, res, next) {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password;


  //Validation
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  //req.checkBody('password', 'Password has to be at least 8 character long and a number').isLength({min: 8}).isInt({min: 1});
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  
  //Check errors
  var errors = req.validationErrors();
  for (var i = 0; i < errors.length; i++) {
    console.log(errors[i]);
  }
 if(errors){
  	res.render('register',{
  		errors: errors
  	});
  }
  else{
  	console.log('PASSED');
    //send the signup data to model to enter in database

    
  	var newUser =  new User({
      username: username,
      password: password,
      email: email
    });

    User.createUser(newUser, function(err,user){
      if(err)
        throw err;
      console.log(user); //Check on this later
    });
    //req.flash('success_msg', 'Welcome to Sikkad');
    res.redirect('/login');
    console.log("SUCESS!");
    errors: "";
  }
});

module.exports = router;
