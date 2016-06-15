module.exports = (request, cardbase, collectionStore) => {
    return (req, res) => {
        request
          .get(`${cardbase}/mtg/cards/${req.query.id}`)
          .end((error, data) => {
              collectionStore.add(data.body).then(data => res.json(data));
          });
    };
};
