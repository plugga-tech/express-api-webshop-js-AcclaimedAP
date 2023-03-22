var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');

module.exports = router;

router.post('/add', function (req, res) {
  const order = {
    user: req.body.user,
    products: req.body.products
  }
  order.products.forEach(product => {
    req.app.locals.db.collection("products").updateOne({ "_id": new ObjectId(product.productId) }, {$inc: {lager: -product.quantity}})
  })
  req.app.locals.db.collection("orders").insertOne(order)
    .then(() => {
      res.send(order);
  })
});

router.get('/all', function (req, res) {
  req.app.locals.db.collection("orders").find().toArray()
    .then(results => {
      res.send(results)
    })
});