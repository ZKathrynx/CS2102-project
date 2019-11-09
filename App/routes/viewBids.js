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
	var did = req.cookies["id"];
	pool.query(sql_query.get_bids_driver, [did], (err, data) => {
		res.render('viewBids', { title: 'View Bids', data: data.rows });
	});
});

router.post('/', function(req, res, next) {
	var passengerId = req.body.passengerId;
	var rdate = req.body.rdate;
	var rtime = req.body.rtime;
	var uid = req.cookies["id"];
	
	// Construct Specific SQL Query
	pool.query(sql_query.update_win_bid,[uid, passengerId, rdate, rtime], (err, data) => {	
		pool.query(sql_query.update_other_bid, [uid, rdate, rtime], (err, data) => {
			pool.query(sql_query.add_deal, [uid, passengerId, rdate, rtime], (err, data) => {
				res.redirect('/driverFunctions');
			});
		});
	});
});

module.exports = router;
