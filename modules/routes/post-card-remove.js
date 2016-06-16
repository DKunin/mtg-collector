module.exports = (collectionStore) => {
    return (req, res) => {
        const owner = req.session.passport.user._id;
        collectionStore
            .delete({ id: req.query.id, owner })
            .then(() => collectionStore.find({ owner }).then(data => res.json(data)));
    };
};
