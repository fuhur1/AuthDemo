var express = require('express');
var router = express.Router();
var isLogedIn = require('../midleware/isLogedIn');

/* GET home page. */
router.get('/:user', isLogedIn, function(req, res, next) {
  res.render('secret', { title: 'Secret page', user: req .params.user });
});

module.exports = router;
