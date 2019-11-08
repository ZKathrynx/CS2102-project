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
var sql_query = 'INSERT INTO Users VALUES';

// GET
router.get('/', function(req, res, next) {
	res.render('registerUser', { title: 'Creating Account' });
});

// POST
router.post('/', function(req, res, next) {
	// Retrieve Information
	var userid  = req.body.userid;
	var username    = req.body.username;
	var password = req.body.password;
	var phoneNo = req.body.phoneNo;
	// balance 设置成default就好
	
	// TODO: 这个插入到sql里面
	// Construct Specific SQL Query
	// var insert_query = sql_query + "('" + matric + "','" + name + "','" + faculty + "')";
	
	// pool.query(insert_query, (err, data) => {
	// 	res.redirect('/select')
	// });
});

module.exports = router;
