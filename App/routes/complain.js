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
	res.render('complain', { title: 'Evaluate' });
});

// POST
router.post('/', function(req, res, next) {
    // Retrieve Information
    var pid = req.body.pid;
    var did  = req.body.did;
	var cdate = req.body.cdate;
    var ctime  = req.body.ctime;
	var decription = req.body.decription;
	
	pool.query(sql_query.add_evaluation [did, pid, cdate, ctime, decription], (err, data) => {
        res.redirect('/viewStartedRide')
    });
});

module.exports = router;
