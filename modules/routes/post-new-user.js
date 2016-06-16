module.exports = collectionStore => {
    return (req, res) => {
        collectionStore.add(req.body).then(data => res.json(data));
    };
};
