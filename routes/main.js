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




router.get('/signup', signInController.redirectHome,signUpController.signUp)
router.post('/register', signInController.redirectHome,signUpController.register)

router.get('/signin',signInController.redirectHome,signInController.signIn)
router.post('/login', signInController.redirectHome,signInController.login)

router.get('/logout', signInController.redirectLogin, signInController.logOut)

router.get('/home', signInController.redirectLogin, signInController.homeRender)

module.exports = router;