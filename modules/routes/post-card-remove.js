var fs = require('fs');

module.exports = (collection, filename) => {
    return (req, res) => {
        collection = collection.delete(req.query.id);
        fs.writeFile(filename, JSON.stringify(collection.toJSON()), () => {});
        res.json(collection.toJSON());
    };
};
