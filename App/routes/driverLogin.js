var sql_query = require('../sql/sqllist.js');
var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: '********',
//   port: 5432,
// })
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
})

/* GET home page. */
router.get('/', function(req, res, next) {
	res.clearCookie("id", { httpOnly: true });
    res.render('driverLogin', { title: 'Driver Login' });
});

router.post('/', function(req, res, next) {
	var input_userId = req.body.userId;
	var input_password = req.body.password;

	// Construct Specific SQL Query
	pool.query(sql_query.check_password,[input_userId, input_password], (err, data) => {	
    if (err || data.rows[0] == undefined) {
		res.redirect('/errorOccur');
        //alert("Login failed! Invalid user ID or password")
    } else {
		res.cookie("id", input_userId, { httpOnly: true });
		  res.redirect('/driverFunctions');
  	}
	});
});

module.exports = router;
