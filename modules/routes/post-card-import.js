module.exports = (request, cardbase, collectionStore) => {
    return (req, res) => {
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
                result
                    .filter(Boolean)
                    .filter(identity => Object.keys(identity).length)
                    .forEach(singleCardObject => {
                        collectionStore.set(singleCardObject.id, singleCardObject);
                    });
                res.json(collectionStore.toJSON());
            });
    };
};
