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

/* SQL Query */
var sql_query = "SELECT password FROM Driver WHERE";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('driverLogin', { title: 'Driver Login' });
});

router.post('/', function(req, res, next) {
	// Retrieve Information
	var input_userId = req.body.userId;
	var input_password = req.body.password;
	
	// Construct Specific SQL Query
	var sql_query = sql_query + "userId = " + input_userId;
	
	pool.query(insert_query, (err, data) => {
    if (data == input_password) {
      res.redirect('/driverFunctions')
    } else {
      alert("Login failed! Invalid user ID or password")
    };

	});
});

module.exports = router;
