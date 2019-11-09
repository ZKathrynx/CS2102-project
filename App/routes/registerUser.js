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

// GET
router.get('/', function(req, res, next) {
	res.render('registerUser', { title: 'Creating Account' });
});

// POST
router.post('/', function(req, res, next) {
	// Retrieve Information
	var userid  = req.body.userid;
	var username    = req.body.username;
	var password = req.body.password;
	var phoneNo = req.body.phoneNo;
	var userType = req.body.userType.toLowerCase();
	
	if(userType == "driver") {
		pool.query(sql_query.addUser, [userid, username, password, phoneNo], (err, data))
		pool.query(sql_query.addDriver, [userid], (err, data))
		res.redirect('/registerCar')
	} else if (userType == "passenger") {
		pool.query(sql_query.addUser, [userid, username, password, phoneNo], (err, data))
		pool.query(sql_query.addDriver, [userid], (err, data))
		res.redirect('/passengerFunctions')
	} else if (userType == "both") {
		pool.query(sql_query.addUser, [userid, username, password, phoneNo], (err, data)) 
		pool.query(sql_query.addDriver, [userid], (err, data))
		pool.query(sql_query.addDriver, [userid], (err, data))
		res.redirect('/registerCar')
	} else {
		alert("Invalid User Type!")
	}
	
});

module.exports = router;
