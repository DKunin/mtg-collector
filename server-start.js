'use strict';

const server = require('./server');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const appDir = path.dirname(require.main.filename);

const CONFIG = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname + '/config.yml'), 'utf8'));
const CollectionStoreClass = require('./modules/store');
const collectionStore = new CollectionStoreClass(appDir + '/' + CONFIG.server.db);
const usersStore = new CollectionStoreClass(appDir + '/' + CONFIG.server.usersdb);

server.start(collectionStore, usersStore);
