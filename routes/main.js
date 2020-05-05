const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const signUpController = require('../controllers/authentication/signUpController')
const signInController = require('../controllers/authentication/signInController')
router.get('/',signInController.isAuthenticated,homeController.home);

router.get('/signup', signInController.redirectHome,signUpController.signUp)
router.post('/register', signInController.redirectHome,signUpController.register)

router.get('/signin',signInController.redirectHome,signInController.signIn)
router.post('/login', signInController.redirectHome,signInController.login)

router.get('/logout', signInController.isAuthenticated, signInController.logOut)

// router.get('/', signInController.redirectLogin, signInController.homeRender)


module.exports = router;