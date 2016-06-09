var fs = require('fs');

module.exports = (request, cardbase, collection, filename) => {
    return (req, res) => {
        request
          .get(`${cardbase}/mtg/cards/${req.query.id}`)
          .end((error, data) => {
              collection = collection.set(req.query.id, data.body);
              fs.writeFile(filename, JSON.stringify(collection.toJSON()), () => {});
              res.json(collection.toJSON());
          });
    };
};
