var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('service/user-service');

// routes
router.post('/addData', updateRecent);
router.post('/getData', getRecents);

module.exports = router;

function updateRecent(req, res) {
    userService.updateRecent(req.body)
        .then(function (data) {
            console.log("Saved Data");
        })
        .catch(function (err) {
            console.log("Not Saved Data");
            console.log("at catch" + err);
            res.status(400).send(err);
        });
}

function getRecents(req, res) {

    userService.getRecents(req.body.username)
        .then(function (data) {
            return res.send(data);
        })
        .catch(function (err) {
            console.log(err);
            console.log("error Get dAT");
            res.status(400).send(err);
        });
}
