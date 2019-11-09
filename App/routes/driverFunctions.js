var sql_query = require('../sql/sqllist.js');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('driverFunctions', { title: 'Driver Functions' });
});

module.exports = router;
