'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var request = require('superagent');
var I = require('immutable');
var app = express();
var fs = require('fs');
var PORT = 7801;
var helpers = require('./modules/helpers');
var head = helpers.head;
const FILENAME = './collection.json';
var savedJSON = JSON.parse(fs.readFileSync(FILENAME).toString());
var editionsCodesForMtgRu = JSON.parse(fs.readFileSync('./editions.json').toString());
var COLLECTION = I.Map(savedJSON);

function getSingleCardByName(name) {
    return new Promise(resolve => {
        request
          .get(`https://api.deckbrew.com/mtg/cards?name=${name}`)
          .end((error, data) => {
              if (error) {
                  resolve(false);
              }
              resolve(data.body[0]);
          });
    });
}
app.use(stylus.middleware({
    src: __dirname + '/src/styles',
    dest: __dirname + '/dist/styles',
    debug: true,
    force: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./dist'));

app.get('/api/search/:query', function(req, res) {
    request
      .get(`https://api.deckbrew.com/mtg/cards?name=${req.params.query}`)
      .end((error, data) => {
          res.json(data.body);
      });
});

app.get('/api/possible-price', function(req, res) {
    request
      .get(`http://magictcgprices.appspot.com/api/cfb/price.json?cardname=${req.query.query}`)
      .end((error, data) => {
          res.json(data.body);
      });
});

app.get('/api/collection', function(req, res) {
    res.json(COLLECTION.toJSON());
});

app.get('/api/collectionexport', function(req, res) {
    var jsonColleciton = COLLECTION.toJSON();
    var response = Object.keys(jsonColleciton).map(singleObjectKey => {
        var singleObject = jsonColleciton[singleObjectKey];
        var edition = head(singleObject.editions);
        var editioncode = editionsCodesForMtgRu.find(singleEdition => {
            return edition.set.indexOf(singleEdition.name) !== -1;
        });
        return Object.assign({}, singleObject, {
            editioncode: editioncode ? editioncode.code : '---'
        });
    });
    res.json(response);
});

app.post('/api/addCard', function(req, res) {
    request
      .get(`https://api.deckbrew.com/mtg/cards/${req.query.id}`)
      .end((error, data) => {
          COLLECTION = COLLECTION.set(req.query.id, data.body);
          fs.writeFile(FILENAME, JSON.stringify(COLLECTION.toJSON()), () => {});
          res.json(COLLECTION.toJSON());
      });
});
app.post('/api/addCard', function(req, res) {
    request
      .get(`https://api.deckbrew.com/mtg/cards/${req.query.id}`)
      .end((error, data) => {
          COLLECTION = COLLECTION.set(req.query.id, data.body);
          fs.writeFile(FILENAME, JSON.stringify(COLLECTION.toJSON()), () => {});
          res.json(COLLECTION.toJSON());
      });
});

app.post('/api/removeCard', function(req, res) {
    COLLECTION = COLLECTION.delete(req.query.id);
    fs.writeFile(FILENAME, JSON.stringify(COLLECTION.toJSON()), () => {});
    res.json(COLLECTION.toJSON());
});

app.post('/api/updateCard', function(req, res) {
    const keys = ['comment', 'foil', 'notforsale', 'posessedEdition', 'quantity', 'price'];
    COLLECTION = COLLECTION.update(req.query.id, item => {
        keys.forEach(singleKey => {
            item[singleKey] = req.body[singleKey] || null;
        });
        return item;
    });
    fs.writeFile(FILENAME, JSON.stringify(COLLECTION.toJSON()), () => {});
    res.json(COLLECTION.toJSON());
});

app.post('/api/importCards', function(req, res) {
    Promise
        .all(req.body.map(getSingleCardByName))
        .then(result => {
            result.filter(Boolean).filter(identity => Object.keys(identity).length).forEach(singleCardObject => {
                COLLECTION = COLLECTION.set(singleCardObject.id, singleCardObject);
                fs.writeFile(FILENAME, JSON.stringify(COLLECTION.toJSON()), () => {});
            });
            res.json(COLLECTION.toJSON());
        });
});

app.listen(PORT);

console.log('listening on port ' +  PORT);
