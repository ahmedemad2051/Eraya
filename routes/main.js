const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const profileController = require('../controllers/profileController');
const authorCotroller = require('../controllers/authorController');


router.get('/profile', profileController.all);
router.get('/profile/current', profileController.current);
router.get('/profile/finished', profileController.finished);
router.get('/authors/:id', authorCotroller.author_details);
router.post('/authors/:id', authorCotroller.bookStatus);
const signUpController = require('../controllers/authentication/signUpController')
const signInController = require('../controllers/authentication/signInController')
router.get('/', homeController.home);

router.get('/signup', signInController.redirectHome,signUpController.signUp)
router.post('/register', signInController.redirectHome,signUpController.register)

router.get('/signin',signInController.redirectHome,signInController.signIn)
router.post('/login', signInController.redirectHome,signInController.login)

router.get('/logout', signInController.redirectLogin, signInController.logOut)

router.get('/home', signInController.redirectLogin, signInController.homeRender)

module.exports = router;