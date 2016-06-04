var express = require('express');
var router = express.Router();
var videodata = require ('../videodata.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Express',
  	x : 'this is routes/index.js',
  	videodata: videodata,
  	 });
});

module.exports = router;
