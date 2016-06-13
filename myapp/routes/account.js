var express = require('express');
var router = express.Router();

var User = require('../models/users');

/* GET about page. */
/*router.get('/*', function(req, res, next) {
  res.render('account', { 
  	title: req.user.username + '\'s Account' ,
  	 });
});*/

/**
checks if a user is logged in or not. 
if yes, displays their page as account/* (* being username)
else, route to login page and wait for authentication
*/

router.get('/*', accountGet);

function accountGet (req, res, next) {
	//check if user is logged in
  if (!req.user){
  	console.log('user isnt loggedin');
  	//find a way to fix the display message
    res.render('login', {message: req.session.messages}); 
    req.session.messages = null;
  } else {						//if user IS logged in 
  	res.render('account', { 
    title: req.user.username + '\'s Account' ,
  	 });
  }
  /*else{
  	console.log('user loggedin');
    res.redirect('/account/' + req.user.username);
  }*/
 
}

module.exports = router;
