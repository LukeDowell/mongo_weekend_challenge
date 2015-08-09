/**
 * Created by lukedowell on 8/7/15.
 */
var express = require('express');
var User = require('../models/User');
var router = express.Router();

/**
 * Entry point for a login request
 */
router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    loginHandler(username, password, res)

});

/**
 * Handles our login request
 * @param username
 *      The request's username
 * @param password
 *      The request's password
 * @param response
 *      The response object
 */
function loginHandler(username, password, response) {
    User.findOne({'name' : username}, function(err, user) {
        if(err) console.log(err);
        if(user != null) {
            if(user.password === password) {
                response.send("success");
            } else {
                response.status(500).send("incorrectr password");
            }
        } else {
            var newUser = new User({name: username, password: password});
            newUser.save(function(err, user) {
                if(err) console.log(err);
                response.send("created");
            });
        }
    });
}

module.exports = router;