/**
 * Created by lukedowell on 8/7/15.
 */
var express = require('express');
var Post = require('../models/Post');
var router = express.Router();

router.get("/", function(req, res) {
    Post.find(function(err, posts) {
        console.log(posts);
        res.send(posts);
    });
});

router.post("/", function(req, res) {
    var post = new Post({content: req.body.message, author: req.body.author});
    post.save(function(err, post) {
        if(err) {
            console.log(err);
        }
        res.send("Post successful!");
    })
});

router.delete("/", function(req, res) {
    
});

module.exports = router;