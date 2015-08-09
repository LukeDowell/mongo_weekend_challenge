/**
 * Created by lukedowell on 8/7/15.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var user = require('./routes/user');
var message = require('./routes/message');

var app = express();

var mongoURI = "mongodb://localhost/message_board";
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err) {
    if(err) {
        console.log("ლ(ಠ益ಠლ) - DAT ERR: " + err);
    }
});
mongoDB.once('open', function() {
    console.log('(⌐■_■)CONNECTED TO MONGO(⌐■_■)');
});


app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));
app.use('/message', message);
app.use('/user', user);
app.use('/', index);


app.listen(app.get('port'), function() {
    console.log("Now listening on port: " + app.get('port'));
});