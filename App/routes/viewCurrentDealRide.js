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
	var uid = req.cookies["id"];
	pool.query(sql_query.get_current_deal, [uid], (err, data) => {
		res.render('viewCurrentDealRide', { title: 'View Current Deal Ride', data: data.rows });
	});
});

router.post('/', function(req, res, next) {
	var driverId = req.body.driverId;
	var rdate = req.body.rdate;
	var rtime = req.body.rtime;
	var uid = req.cookies["id"];
	
	// Construct Specific SQL Query
	pool.query(sql_query.update_start_time,[driverId, rdate, rtime], (err, data) => {	
		res.redirect('/viewStartedRide');
	});
});

module.exports = router;
