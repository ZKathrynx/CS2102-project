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
	res.render('evaluate', { title: 'Evaluate' });
});

// POST
router.post('/', function(req, res, next) {
    // Retrieve Information
    var pid = req.body.pid;
    var did  = req.body.did;
	var rdate = req.body.rdate;
    var rtime  = req.body.rtime;
    var edate = req.body.edate;
	var etime  = req.body.etime;
	var rank  = req.body.rank;
	var comment = req.body.comment;
	
	pool.query(sql_query.add_evaluate, [did, pid, rdate, rtime, edate, etime, rank, comment], (err, data) => {
        res.redirect('/passengerFunctions')
    });
});

module.exports = router;
