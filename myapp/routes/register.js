var express = require('express');
var router = express.Router();

var User = require('../models/users');

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('register', { 
    title: 'Register',
  	 });
});

// Registering the user
router.post('/', function(req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
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
 if(errors){
  	res.render('register',{
  		errors: errors
  	});
  }
  else{
  	var newUser =  new User({
      username: username,
      password: password,
      email: email
    });

    User.createUser(newUser, function(err,user){
      if(err)
        throw err;
      console.log(user); //Check on this later
    })
    console.log("SUCESS!");
    res.render('index', {
      'success_msg': 'Welcome to Sikkad!'
    });
    errors: "";
  }
});

module.exports = router;
