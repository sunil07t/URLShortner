var express = require('express');
var router = express.Router();


/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('login', { 
    title: 'login',
  	 });
});

// logining the user
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
    //send the signup data to model to enter in database
    
    res.redirect('/login');
    errors: "";
  }
});

module.exports = router;
