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
	var balance = req.body.balance;
	var phoneNo = req.body.phoneNo;
	var userType = req.body.userType;
	
	if(userType == "driver") {
		pool.query(sql_query.add_user, [userid, username, password, phoneNo, balance], (err, data) => {
			if(err){
				throw err
			}
			pool.query(sql_query.add_driver, [userid], (err, data) => {
				if(err){
					throw err
				}
				res.redirect('/registerCar');
			});
	});
	} else if (userType == "passenger") {
		pool.query(sql_query.add_user, [userid, username, password, phoneNo, balance], (err, data) => {
			if(err){
				throw err
			}
			pool.query(sql_query.add_passenger, [userid], (err, data) => {
				if(err){
					throw err
				}
				res.redirect('/passengerFunctions');
			});
	});
	} else if (userType == "both") {
		pool.query(sql_query.add_user, [userid, username, password, phoneNo, balance], (err, data) => {
			if(err){
				throw err
			}
			pool.query(sql_query.add_driver, [userid], (err, data) => {
				if(err){
					throw err
				}
			});
			pool.query(sql_query.add_passenger, [userid], (err, data) => {
				if(err){
					throw err
				}
				res.redirect('/registerCar');
			});
	});
	} else {
		console.log("Invalid User Type!");
		res.redirect('/registerUser');
	}
	
});

module.exports = router;
