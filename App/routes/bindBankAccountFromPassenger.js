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
  res.render('bindBankAccount', { title: 'Bind Bank Account' });
});

router.post('/', function(req, res, next) {
	var input_bId = req.body.bankId;
    var input_bname = req.body.bname;
   
	//balance: assign default value
    pool.query(sql_query.add_bankaccount,[input_bId, input_bname], (err, data))
    pool.query(sql_query.add_bind,[input_userId, input_bId], (err, data)) 
    res.redirect('/passengerFunctions') 
    
});

module.exports = router;
