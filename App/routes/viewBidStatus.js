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
	var pid = req.cookies["id"];
	pool.query(sql_query.get_bids_passenger, [pid], (err, data) => {
		res.render('viewBidStatus', { title: 'Database Connect', data: data.rows });
	});
});

module.exports = router;
