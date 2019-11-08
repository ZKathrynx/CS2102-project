var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('welcome', { title: 'You have logined in!' });
});

module.exports = router;
