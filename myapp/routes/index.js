var express = require('express');
var router = express.Router();
var validUrl = require('valid-url');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: 'URL Shortner'
  	 });
});

router.post('/', urlPost);

function urlPost(req, res, next){
	console.log("index urlpost");
	var input = req.body.input;

	req.checkBody('input','Input URL is empty').notEmpty();
	var errors = req.validationErrors();
	console.log("urlpost errors " + errors);
	if (errors) {
		res.render('index', {
			errors: errors
		});
	} else {
		if (isValid(input)) {
			res.render('index', {
				error: input + 'is valid'
			})
		} else {
			res.render('index', {
				error: 'Input is not a valid URL'
			})
		}
	}
}
function isValid(url){
	if (validUrl.isUri(url)){
		console.log('Looks like an URI');
		return 1;
	} else {
		console.log('Not a URI');
		return 0;
	}
}

module.exports = router;
