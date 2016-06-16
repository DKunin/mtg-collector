const Datastore = require('nedb');

module.exports = class Collection {
    constructor(fileName) {
        this.fileName = fileName;
        this.collection = new Datastore({ filename: this.fileName, autoload: true });
    }

    add(value) {
        return new Promise((resolve, reject) => {
            this.collection.insert(value, (err) => {
                if (err) {
                    reject(err);
                }
                return resolve();
            });
        });
    }

    update(query, updateObject) {
        return new Promise((resolve, reject) => {
            this.collection.update(query, updateObject, {}, (err) => {
                if (err) {
                    reject(err);
                }
                return resolve();
            });
        });
    }

    delete(query) {
        return new Promise((resolve, reject) => {
            this.collection.remove(query, {}, (err) => {
                if (err) {
                    reject(err);
                }
                return resolve();
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.collection.find({}, (err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            });
        });
    }

    find(query) {
        return new Promise((resolve, reject) => {
            this.collection.find(query, (err, doc) => {
                if (err || !doc) {
                    reject(err);
                }
                return resolve(doc);
            });
        });
    }

    findOne(query) {
        return new Promise((resolve, reject) => {
            this.collection.findOne(query, (err, doc) => {
                if (err || !doc) {
                    reject(err);
                }
                return resolve(doc);
            });
        });
    }
};
