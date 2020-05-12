const {check} = require('express-validator');

module.exports = [
    check('fname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('First name is required'),
    check('lname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Last name is required'),
    check('dob')
        .toDate()
        .not()
        .isEmpty()
        .withMessage('Date of birth is required'),
    // check('image')
    //     .isEmpty()
    //     .withMessage('Image is required')
    //     .custom(val => {
    //         let extension = (path.extname(val)).toLowerCase();
    //         switch (extension) {
    //             case '.jpg':
    //                 return '.jpg';
    //             case '.jpeg':
    //                 return '.jpeg';
    //             case  '.png':
    //                 return '.png';
    //             default:
    //                 return false;
    //         }
    //     })
    //     .withMessage('Image valid'),
]

