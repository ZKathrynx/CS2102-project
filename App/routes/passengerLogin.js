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
  res.render('passengerLogin', { title: 'Passenger Login' });
});

router.post('/', function(req, res, next) {
	var input_id = req.body.userId;
	var input_password = req.body.password;
	
	// Construct Specific SQL Query
	
	pool.query(sql_query.userpass, [uid, password], (err, data) => {
		if (data.rows[0] == undefined) {
			alert("Login failed! Invalid user ID or password.")
		} else {
			res.redirect('/passengerFunction');
		}
		
	});
});

module.exports = router;

