var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
//
router.get('/', function (req, res) {
    delete req.session.token;
});

router.put('/', function (req, res) {
    request.put({
        url: config.apiUrl + '/users/:_id',
        form: req.body,
        json: true
    }, function (error, response, body) {
        console.log(error);
        res.send("Hello");
        if (error) {
            return res.append('An error occurred');
        }

        if (!body.token) {
            return res.send('Username or password is incorrect');
        }
        if (body.token) {
            req.session.token = body.token;
            return res.send({
                "message": "Authentication Sucessfull",
                "token": body.token,
                "success": true,
                "data": body.data
            });
        }


        // save JWT token in the session to make it available to the angular app

        // redirect to returnUrl
        //      var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
        //    res.redirect(returnUrl);
    });
});

module.exports = router;