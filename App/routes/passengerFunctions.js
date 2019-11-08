var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('passengerFunctions', { title: 'Passenger Functions' });
});

module.exports = router;
