'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('superagent');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const cockieParser = require('cookie-parser');
const expressSession = require('express-session');

const {
        getLogin,
        postLogin,
        getSearch,
        getPossiblePrice,
        getCollection,
        postCardAdd,
        postCardRemove,
        postCardUpdate,
        postCardImport
    } = require('./modules/routes');
const { server, externalapi, user } = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname + '/config.yml'), 'utf8'));

const PORT = server.port;
const CARDBASE = externalapi.cardbase;
const PRICES = externalapi.prices;
const app = express();
const CollectionStoreClass = require('./modules/store');
const collectionStore = new CollectionStoreClass(server.db);

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
app.get('/api/collection', getCollection(collectionStore));
app.get('/api/collectionexport', getCollection(collectionStore));
app.post('/api/addCard', postCardAdd(request, CARDBASE, collectionStore));
app.post('/api/removeCard', postCardRemove(collectionStore));
app.post('/api/updateCard', postCardUpdate(collectionStore));
app.post('/api/importCards', postCardImport(request, CARDBASE, collectionStore));

module.exports = {
    port: () => PORT,
    start: function() {
        app.listen(PORT);
        console.log(`listening on port ${PORT}`);
    }
};
