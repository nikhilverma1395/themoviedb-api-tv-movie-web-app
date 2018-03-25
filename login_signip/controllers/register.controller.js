var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/users/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        console.log(response.statusCode + "\t is the status code");
        if (error) {
            return res.send('An error occurred');
        }

        if (response.statusCode !== 200) {
            return res.send(JSON.stringify(response.body));
        }
        req.session.success = 'Registration successful';
        return res.send({redirect: '/login'});
    });
});

module.exports = router;