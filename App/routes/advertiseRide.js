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
	res.render('registerUser', { title: 'Creating Account' });
});

// POST
router.post('/', function(req, res, next) {
	// Retrieve Information
	var rdate = req.body.rdate;
	var rtime  = req.body.rtime;
	var origin  = req.body.origin;
	var destination = req.body.destination;
	var max = req.body.max;
	
	pool.query(sql_query.add_ride [userid, username, password, phoneNo], (err, data) => {
        res.redirect('/registerCar')
    }
	
});

module.exports = router;
