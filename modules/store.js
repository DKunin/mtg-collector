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
                return resolve(this.save());
            });
        });
    }

    update(key, updateObject) {
        return new Promise((resolve, reject) => {
            this.collection.update({ id: key }, updateObject, {}, (err) => {
                if (err) {
                    reject(err);
                }
                return resolve(this.save());
            });
        });
    }

    delete(key) {
        return new Promise((resolve, reject) => {
            this.collection.remove({ id: key }, {}, (err) => {
                if (err) {
                    reject(err);
                }
                return resolve(this.save());
            });
        });
    }

    getAll() {
        return this.save();
    }

    save() {
        return new Promise((resolve, reject) => {
            this.collection.find({}, (err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            });
        });
    }
};
