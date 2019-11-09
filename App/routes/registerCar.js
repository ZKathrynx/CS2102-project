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
  res.render('registerCar', { title: 'Register car' });
});

router.post('/', function(req, res, next) {
	// Retrieve Information
	var input_plateNumber = req.body.plateNumber;
	var input_type = req.body.type;
	var input_model = req.body.model;
	var input_userId = req.cookies["id"];
	// Construct Specific SQL Query
	pool.query(sql_query.add_car,[input_plateNumber, input_type, input_model], (err, data) => {
		pool.query(sql_query.add_own,[input_userId, input_plateNumber], (err, data) => {
			if (err) {
				throw err
			}
			res.redirect('/driverFunctions')
		});
	});
});

module.exports = router;
