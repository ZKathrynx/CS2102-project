var sql_query = require('../sql/sqllist.js');
var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
/* --- V7: Using Dot Env ---
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '********',
  port: 5432,
})
*/
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});


router.get('/', function(req, res, next) {
	pool.query(sql_query.get_all_rides, (err, data) => {
		res.render('viewAllAvailableRides', { title: 'View All Available Rides', data: data.rows });
	});
});

router.post('/', function(req, res, next) {
	var driverId = req.body.driverId;
	var rdate = req.body.rdate;
	var rtime = req.body.rtime;
	var price = req.body.price;
	var uid = req.cookies["id"];
	// Construct Specific SQL Query
	pool.query(sql_query.add_bid,[driverId, uid, rdate, rtime, price], (err, data) => {	
		res.redirect('/viewBidStatus');
	});
});

module.exports = router;
