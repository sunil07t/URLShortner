var express = require('express');
var router = express.Router();

/**
 * [logout if user visits /logout]
 */
router.get('/', function(req, res){
	req.logout();
	res.redirect('/');
})
module.exports = router;