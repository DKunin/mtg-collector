module.exports = collectionStore => {
    return (req, res) => {
        collectionStore.find({ owner: req.session.passport.user._id }).then(data => res.json(data));
    };
};
