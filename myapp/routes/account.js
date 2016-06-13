var express = require('express');
var router = express.Router();

var User = require('../models/users');

/* GET about page. */
router.get('/*', function(req, res, next) {
  res.render('account', { 
  	title: req.user.usenname + 'Account' ,
  	 });
});

module.exports = router;
