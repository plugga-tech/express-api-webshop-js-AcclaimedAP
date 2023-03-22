var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var productsRouter = require('./products');
var ordersRouter = require('./orders');

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Api calls');
});

module.exports = router;
