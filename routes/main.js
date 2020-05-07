const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const signUpController = require('../controllers/authentication/signUpController')
const signInController = require('../controllers/authentication/signInController')
router.get('/', homeController.home);
router.get('/categories', homeController.categories);
router.get('/category/:id', homeController.categoryBooks);
router.get('/books', homeController.books);
router.get('/book/:id', homeController.bookDetails);
router.post('/book/:id/rate', homeController.setRate);


const checkAuthentication = require('../middleware/checkAuthentication')
router.get('/', homeController.home);

router.get('/signup', checkAuthentication.redirectHome, signUpController.signUp)
router.post('/register', checkAuthentication.redirectHome, signUpController.register)

router.get('/signin', checkAuthentication.redirectHome, signInController.signIn)
router.post('/login', checkAuthentication.redirectHome, signInController.login)

router.get('/logout', signInController.logOut)


module.exports = router;