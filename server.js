'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = 7801;
var stylus = require('stylus');
app.use(stylus.middleware({
    src: __dirname + '/src/styles',
    dest: __dirname + '/dist/styles',
    debug: true,
    force: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./dist'));

app.get('/test', function(req, res) {
    res.json({ test: true });
});

app.listen(PORT);

console.log('listening on port ' +  PORT);
