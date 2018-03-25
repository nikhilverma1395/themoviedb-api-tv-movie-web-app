var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('service/user-service');

// routes
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.get('/current', getCurrentUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);

module.exports = router;

function authenticateUser(req, res) {
    console.log("auth UserController");
    userService.authenticate(req.body.username, req.body.password)
        .then(function (data) {
            if (data === undefined) {
                console.log("data is null");
                res.status(400).send("data is null");
                return;
            }
            if (data.token) {
                console.log("success");
                console.log(data.data);
                // authentication successful
                res.send(data);
            } else {
                console.log("error");
                // authentication failed
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            console.log("at catch" + err);
            res.status(400).send(err);
        });
}

function registerUser(req, res) {
    console.log('Here');
    userService.create(req.body)
        .then(function () {
            console.log('Done saving');
            res.sendStatus(200);
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });
}

function getCurrentUser(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    userService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}