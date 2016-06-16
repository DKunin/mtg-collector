module.exports = collectionStore => {
    return (req, res) => {
        const owner = req.session.passport.user._id;
        const constructedObject = req.body['edition-key'].map(singleKey => {
            return {
                id: singleKey,
                edition: req.body[`edition-${singleKey}`],
                comment: req.body[`comment-${singleKey}`],
                price: req.body[`price-${singleKey}`],
                foiled: req.body[`foiled-${singleKey}`]
            };
        });
        collectionStore
            .update({ id: req.query.id, owner }, { $set: { owned: constructedObject } })
            .then(() => collectionStore.find({ owner }).then(data => res.json(data)));
    };
};
