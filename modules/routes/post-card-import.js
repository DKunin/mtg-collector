module.exports = (request, cardbase, collectionStore) => {
    return (req, res) => {
        const owner = req.session.passport.user._id;
        Promise
            .all(req.body.map(name => {
                return new Promise(resolve => {
                    request
                      .get(`${cardbase}/mtg/cards?name=${name}`)
                        .end((error, data) => {
                            if (error) {
                                resolve(false);
                            }
                            resolve(data.body[0]);
                        });
                });
            }))
            .then(result => {
                const toImport = result
                    .filter(Boolean)
                    .filter(identity => Object.keys(identity).length)
                    .map(singleCardToImport => Object.assign({}, singleCardToImport, { owner }));

                collectionStore.add(toImport)
                    .then(() => collectionStore.find({ owner }).then(data => res.json(data)));
            });
    };
};
