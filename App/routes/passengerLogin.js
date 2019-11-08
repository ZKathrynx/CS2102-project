var express = require('express');
var router = express.Router();


var sql_query = "SELECT * FROM Passengers WHERE";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('passengerLogin', { title: 'Passenger Login' });
});

router.post('/', function(req, res, next) {
// Retrieve Informationvar input_username = req.body.username;
// 	var input_password = req.body.password;
	
// 	// Construct Specific SQL Query
// 	var select_query = sql_query + "uid = " + input_password;
	
// 	pool.query(insert_query, (err, data) => {
// 		res.redirect('/select')
// 	});
// });

	var input_id = req.body.password;
	var input_password = req.body.password;
	
	// Construct Specific SQL Query
	var insert_query = sql_query + "userId = " + input_id " AND " + "password = " + input_password;
	
	pool.query(insert_query, (err, data) => {
		if (data.rows[0] == undefined) {
			alert("I am an alert box!")
		} else {
			res.redirect('/passengerFunction');
		}
		
	});
});

module.exports = router;

