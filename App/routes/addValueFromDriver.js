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
	res.render('addValueFromDriver', { title: 'Add Value' });
});

// POST
router.post('/', function(req, res, next) {
	// Retrieve Information
	// var matric  = req.body.matric;
	// var name    = req.body.name;
	// var faculty = req.body.faculty;
	
	// // Construct Specific SQL Query
	// var insert_query = sql_query + "('" + matric + "','" + name + "','" + faculty + "')";
	
	// pool.query(insert_query, (err, data) => {
	// 	res.redirect('/select')
	// });

	var input_userId = req.cookies["id"];
	var input_amount = req.body.amount;

	// Construct Specific SQL Query
	pool.query(sql_query.add_balance,[input_userId, input_amount], (err, data) => {	
    if (err) {
		res.redirect('/errorOccur');
        //alert("Login failed! Invalid user ID or password")
    } else {
		  res.redirect('/driverFunctions');
  	}
	});
});

module.exports = router;
