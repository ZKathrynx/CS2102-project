var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('errorOccur', { title: 'Error Occurred' });
});

module.exports = router;
