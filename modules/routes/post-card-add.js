module.exports = (request, cardbase, collectionStore) => {
    return (req, res) => {
        request
          .get(`${cardbase}/mtg/cards/${req.query.id}`)
          .end((error, data) => {
              collectionStore.add(Object.assign({}, data.body, { owner: req.session.passport.user._id })).then(data => res.json(data));
          });
    };
};
