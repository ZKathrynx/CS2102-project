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
	res.clearCookie("rdate", { httpOnly: true });
	res.clearCookie("rtime", { httpOnly: true });
	var did = req.cookies["id"];
	pool.query(sql_query.auto_select, [did, rdate, rtime], (err, data) => {
		res.render('autoSelect', { title: 'Auto Select', data: data.rows });
	});
});

router.post('/', function(req, res, next) {
    // Retrieve Information
    var rdate = req.body.rdate;
    var rtime  = req.body.rtime;
	var uid = req.cookies["id"];
	
	pool.query(sql_query.auto_select, [uid, rdate, rtime], (err, data) => {
		res.cookie("rdate", rdate, { httpOnly: true });
		res.cookie("rtime", rtime, { httpOnly: true });
		res.redirect('/autoSelectResult')
    });
});

module.exports = router;
