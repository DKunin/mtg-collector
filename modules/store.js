const I = require('immutable');
const fs = require('fs');
const path = require('path');

module.exports = class Collection {
    constructor(fileName) {
        this.fileName = path.resolve(fileName);
        this.collection = I.Map(JSON.parse(fs.readFileSync(this.fileName).toString()));
    }

    add(key, value) {
        this.collection = this.collection.set(key, value);
        return this.collection.toJSON();
    }

    update(key, updaterFn) {
        this.collection = this.collection.update(key, updaterFn);
        return this.collection.toJSON();
    }

    delete(key) {
        this.collection = this.collection.delete(key);
        return this.collection.toJSON();
    }

    getAll() {
        return this.collection.toJSON();
    }

    save() {
        // console.log(this.fileName, );
        fs.writeFileSync(this.fileName, JSON.stringify(this.getAll()));
        return this.collection.toJSON();
    }
};
