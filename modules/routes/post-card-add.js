module.exports = (request, cardbase, collectionStore) => {
    return (req, res) => {
        const owner = req.session.passport.user._id;
        request
          .get(`${cardbase}/mtg/cards/${req.query.id}`)
          .end((error, data) => {
              collectionStore.add(Object.assign({}, data.body, { owner }))
                .then(() => collectionStore.find({ owner }).then(data => res.json(data)));
          });
    };
};
