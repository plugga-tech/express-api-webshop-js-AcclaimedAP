var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
module.exports = router;

router.get('/', function (req, res) {
  req.app.locals.db.collection("products").find().toArray()
    .then(results => {
      res.send(results)
    })
});

router.get('/:id', function (req, res) {
  console.log(req.body.id);
  req.app.locals.db.collection("products").findOne({ "_id": new ObjectId(req.params.id) })
    .then(results => {
      console.log(results);
      res.send(results);
    })
});

router.post('/add', function (req, res) {
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    lager: req.body.lager
  }
  req.app.locals.db.collection("products").insertOne(product)
    .then(() => {
      res.send("Added product " + req.body.name);
    })
});