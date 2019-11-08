var express = require('express');
var router = express.Router();

var sql_query = "SELECT * FROM Users WHERE";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
	// Retrieve Information
	var input_username = req.body.username;
	var input_password = req.body.password;
	
	// Construct Specific SQL Query
	var select_query = sql_query + "uid = " + input_password;
	
	pool.query(insert_query, (err, data) => {
		res.redirect('/select')
	});
});

module.exports = router;
