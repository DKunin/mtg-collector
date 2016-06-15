module.exports = collectionStore => {
    return (req, res) => {
        collectionStore.getAll().then(data => res.json(data));
    };
};
