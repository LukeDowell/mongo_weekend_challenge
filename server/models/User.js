/**
 * Created by lukedowell on 8/7/15.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    isAdmin: Boolean
});

module.exports = mongoose.model('user', UserSchema);