module.exports = (request, cardbase) => {
    return (req, res) => {
        request
            .get(`${cardbase}/mtg/cards?name=${req.params.query}`)
            .end((error, data) => {
                res.json(data.body);
            });
    };
};
