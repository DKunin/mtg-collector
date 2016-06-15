module.exports = (collectionStore) => {
    return (req, res) => {
        collectionStore.delete(req.query.id).then(data => res.json(data));
    };
};
