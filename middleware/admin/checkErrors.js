const {validationResult} = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        let backURL = req.header('Referer') || '/admin';
        return res.redirect(backURL);
    }
    next();
}