module.exports = (request, cardbase, collectionStore) => {
    return (req, res) => {
        request
          .get(`${cardbase}/mtg/cards/${req.query.id}`)
          .end((error, data) => {
              res.json(collectionStore.set(req.query.id, data.body));
          });
    };
};
