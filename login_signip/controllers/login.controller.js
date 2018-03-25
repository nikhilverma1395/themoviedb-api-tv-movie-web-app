var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
//
router.get('/', function (req, res) {
    // log user out
    delete req.session.token;
    delete req.session.success;
});

router.post('/', function (req, res) {
    // authenticate using api to maintain clean separation between layers
    console.log(req.body);
    request.post({
        url: config.apiUrl + '/users/authenticate',
        form: req.body,
        json: true
    }, function (error, response, body) {
        console.log(error);
        if ((error === null) && error) {
            console.log(error + " Error in post ");
            return res.send('An error occurred');
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