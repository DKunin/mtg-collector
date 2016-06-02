'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var request = require('superagent');
var app = express();
var PORT = 7801;

app.use(stylus.middleware({
    src: __dirname + '/src/styles',
    dest: __dirname + '/dist/styles',
    debug: true,
    force: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./dist'));

app.get('/search/:query', function(req, res) {
    request
      .get(`https://api.deckbrew.com/mtg/cards?name=${req.params.query}`)
      .end((error, data) => {
          res.json(data.body);
      });
});

app.listen(PORT);

console.log('listening on port ' +  PORT);
