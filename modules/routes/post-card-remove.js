module.exports = (collectionStore) => {
    return (req, res) => {
        res.json(collectionStore.delete(req.query.id));
    };
};
