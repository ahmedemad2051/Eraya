const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const signUpController = require('../controllers/authentication/signUpController')
const signInController = require('../controllers/authentication/signInController')
router.get('/', homeController.home);

router.get('/signup', signUpController.signUp)
router.post('/register', signUpController.register)

router.get('/signin',signInController.signIn)
router.post('/login', signInController.login)

router.get('/home', signInController.redirectLogin, signInController.homeRender)

module.exports = router;