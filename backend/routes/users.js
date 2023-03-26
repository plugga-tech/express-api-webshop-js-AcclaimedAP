var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");
const { ObjectId } = require('mongodb');
module.exports = router;
const _salt = "I write spaghetti"

/* GET users listing. */
router.get('/', function (req, res, next) {
    req.app.locals.db.collection("users").find({}, {name: 1}).toArray()
        .then(results => {
            let userList = [];
            for (user in results) {
                userList.push({
                    _id: results[user]._id,
                    name: results[user].name,
                    email: results[user].email
                });
            }
            res.send(userList);

        })
});

router.post('/', function (req, res) {
    console.log(req.body.id);
    req.app.locals.db.collection("users").findOne({ "_id": new ObjectId(req.body.id) })
        .then(results => {
            console.log(results);
            res.send(results);
    })
})


router.post('/add', function (req, res) {
    req.app.locals.db.collection("users").find({ email: req.body.email }).toArray()
        .then(results => {
        console.log(results);
        if (results.length > 0) {
            res.send("Email already in use!");
        } else {
            const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, _salt).toString();
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: encryptedPassword
            }

            req.app.locals.db.collection("users").insertOne(user)
            .then(() => {
                res.send("Added user " + req.body.name);
            })
        }
    })

});

router.post('/login', function (req, res) {
    req.app.locals.db.collection("users").findOne({ email: req.body.email })
        .then(results => {
            const bytes = CryptoJS.AES.decrypt(results.password, _salt);
            const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.password === decryptedPassword) {
                res.send(results._id)
            } else {
                res.send("Incorrect login information");
            }
    })

});