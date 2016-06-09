module.exports = function(req, res) {
    if (req.session.passport && req.session.passport.user) {
        res.json({ user: req.session.passport.user.username });
    } else {
        res.json({});
    }
}
