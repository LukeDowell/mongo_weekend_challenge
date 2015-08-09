/**
 * Created by lukedowell on 8/7/15.
 */
var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    content: String,
    author: String
});

module.exports = mongoose.model('post', PostSchema);