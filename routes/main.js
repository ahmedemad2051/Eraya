const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const signUpController = require('../controllers/authentication/signUpController')
const signInController = require('../controllers/authentication/signInController')
const checkAuthentication = require('../middleware/checkAuthentication')
router.get('/',checkAuthentication.isAuthenticated,homeController.home);

router.get('/signup', checkAuthentication.redirectHome,signUpController.signUp)
router.post('/register', checkAuthentication.redirectHome,signUpController.register)

router.get('/signin',checkAuthentication.redirectHome,signInController.signIn)
router.post('/login', checkAuthentication.redirectHome,signInController.login)

router.get('/logout', checkAuthentication.isAuthenticated, signInController.logOut)



module.exports = router;