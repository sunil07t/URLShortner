var express = require('express');
var router = express.Router();
var videodata = require ('../videodata.json');
var mongo = require ('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test'; //port 27017, db = test
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'URL Shortner'
  	 });
});

module.exports = router;
