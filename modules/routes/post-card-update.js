module.exports = collectionStore => {
    return (req, res) => {
        const constructedObject = req.body['edition-key'].map(singleKey => {
            return {
                id: singleKey,
                edition: req.body[`edition-${singleKey}`],
                comment: req.body[`comment-${singleKey}`],
                price: req.body[`price-${singleKey}`],
                foiled: req.body[`foiled-${singleKey}`]
            };
        });
        res.json(collectionStore.update(req.query.id, item => {
            item.owned = constructedObject;
            return item;
        }));
    };
};
