module.exports = (collection) => {
    return (req, res) => {
        res.json(collection.toJSON());
    };
};
