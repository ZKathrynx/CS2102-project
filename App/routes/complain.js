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
	res.render('complain', { title: 'Complain' });
});

// POST
router.post('/', function(req, res, next) {
    // Retrieve Information
    var pid = req.body.pid;
    var did  = req.body.did;
	var edate = req.body.edate;
    var etime  = req.body.etime;
	var description = req.body.description;
	
	pool.query(sql_query.add_complain, [did, pid, edate, etime, description], (err, data) => {
		if (err) {
			throw err
		}
        res.redirect('/viewStartedRide')
    });
});

module.exports = router;
