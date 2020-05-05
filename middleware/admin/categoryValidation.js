const {check} = require('express-validator');

module.exports =  [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required'),
]

