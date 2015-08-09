/**
 * Created by lukedowell on 8/7/15.
 */
var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/*', function(req, res) {
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;