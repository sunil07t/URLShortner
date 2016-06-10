var express = require('express');
var router = express.Router();


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

  console.log (username, email, password, password2);

  //Validation
  req.checkBody('username', 'Username is required').isEmail();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password', 'Password has to be at least 8 character long and a number').isLength({min: 8}).isInt({min: 1});
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  
  //Check errors
  var errors = req.validationErrors();
  console.log("2");
  console.log(errors);

 if(errors){
  for (var i = 0; i < errors.length; i++) {
    console.log(errors[i].msg);
  }
  	res.render('register',{
      title: 'Register',
  		errors: errors
  	});
  }
  else{
  	console.log('PASSED');
  }
});

module.exports = router;
