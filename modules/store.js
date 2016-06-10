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
        return this.save();
    }

    update(key, updaterFn) {
        this.collection = this.collection.update(key, updaterFn);
        return this.save();
    }

    delete(key) {
        this.collection = this.collection.delete(key);
        return this.save();
    }

    getAll() {
        return this.collection.toJSON();
    }

    save() {
        fs.writeFile(this.fileName, JSON.stringify(this.getAll()), () => {});
        return this.collection.toJSON();
    }
};
