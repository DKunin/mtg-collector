module.exports = collectionStore => {
    return (req, res) => {
        res.json(collectionStore.getAll());
    };
};
