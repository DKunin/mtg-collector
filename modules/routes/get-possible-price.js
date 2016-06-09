module.exports = (request, prices) => {
    return (req, res) => {
        request
            .get(`${prices}/cfb/price.json?cardname=${req.query.query}`)
            .end((error, data) => {
                res.json(data.body);
            });
    };
};
