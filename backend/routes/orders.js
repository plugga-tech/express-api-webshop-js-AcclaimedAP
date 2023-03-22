var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

router.post('/add', function (req, res) {
  
})

router.get('/all', function (req, res) {
  req.app.locals.db.collection("orders").find().toArray()
    .then(results => {
    res.send(results)
  })
})