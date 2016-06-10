'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var request = require('superagent');
var I = require('immutable');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var fs = require('fs');
var yaml = require('js-yaml');
var cockieParser = require('cookie-parser');
var expressSession = require('express-session');
var { getLogin, postLogin, getSearch, getPossiblePrice, getCollection, postCardAdd, postCardRemove } = require('./modules/routes');
const { server, externalapi, user } = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
const PORT = server.port;
const FILENAME = server.db;
const CARDBASE = externalapi.cardbase;
const PRICES = externalapi.prices;
var app = express();
var savedJSON = JSON.parse(fs.readFileSync(FILENAME).toString());
var COLLECTION = I.Map(savedJSON);

passport.use(new Strategy(
  function(username, password, cb) {
      if (!user) {
          return cb(null, false);
      }
      if (user.password != password) {
          return cb(null, false);
      }
      return cb(null, user);
  }));

passport.serializeUser(function(userObj, cb) {
    cb(null, userObj);
});

passport.deserializeUser(function(userObj, cb) {
    var err = null;
    if (err) {
        return cb(err);
    }
    cb(null, userObj);
});

app.use(cockieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static('./dist'));
app.use(passport.initialize());
app.use(passport.session());

app.post('/api/login', passport.authenticate('local'), postLogin);
app.get('/api/login', getLogin);
app.get('/api/search/:query', getSearch(request, CARDBASE));
app.get('/api/possible-price', getPossiblePrice(request, PRICES));
app.get('/api/collection', getCollection(COLLECTION));
app.get('/api/collectionexport', getCollection(COLLECTION));
app.post('/api/addCard', postCardAdd(request, CARDBASE, COLLECTION, FILENAME));
app.post('/api/removeCard', postCardRemove(COLLECTION, FILENAME));

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
        .all(req.body.map(name => {
            return new Promise(resolve => {
                request
                  .get(`${CARDBASE}/mtg/cards?name=${name}`)
                    .end((error, data) => {
                        if (error) {
                            resolve(false);
                        }
                        resolve(data.body[0]);
                    });
            });
        }))
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
