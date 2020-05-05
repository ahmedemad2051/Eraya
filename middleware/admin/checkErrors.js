const {validationResult} = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        // req.flash('form_data', req.body);
        let backURL = req.header('Referer') || '/admin';
        return res.redirect(backURL);
    }
    next();
}