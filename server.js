'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var request = require('superagent');
var I = require('immutable');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var fs = require('fs');
var helpers = require('./modules/helpers');
var cockieParser = require('cookie-parser');
var expressSession = require('express-session');
var ensureLogin = require('connect-ensure-login');

var app = express();
var PORT = 7801;
var head = helpers.head;
const FILENAME = './collection.json';

var savedJSON = JSON.parse(fs.readFileSync(FILENAME).toString());
var editionsCodesForMtgRu = JSON.parse(fs.readFileSync('./editions.json').toString());
var COLLECTION = I.Map(savedJSON);

passport.use(new Strategy(
  function(username, password, cb) {
      var user = { password: 'supercat' };
      if (!user) {
          return cb(null, false);
      }
      if (user.password != password) {
          return cb(null, false);
      }
      return cb(null, user);
  }));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    var err = null;
    var user = {};
    if (err) {
        return cb(err);
    }
    cb(null, user);
});

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
app.use(cockieParser());
app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(express.static('./dist'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/search/:query', ensureLogin.ensureLoggedIn('/#!/login'), function(req, res) {
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
    const constructedObject = req.body['edition-key'].map(singleKey => {
        return {
            id: singleKey,
            edition: req.body[`edition-${singleKey}`],
            comment: req.body[`comment-${singleKey}`],
            price: req.body[`price-${singleKey}`],
            foiled: req.body[`foiled-${singleKey}`]
        };
    });
    COLLECTION = COLLECTION.update(req.query.id, item => {
        item.owned = constructedObject;
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
