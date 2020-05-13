const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const profileController = require('../controllers/profileController');
const authorCotroller = require('../controllers/authorController');
const aboutController = require('../controllers/aboutController');

router.get('/profile', profileController.all);
router.post('/profile', profileController.bookStatus);
router.get('/profile/current', profileController.current);
router.get('/profile/finished', profileController.finished);
router.get('/profile/read', profileController.read);
router.get('/about', aboutController.about);
router.get('/authors', authorCotroller.authors);
router.get('/authors/:id', authorCotroller.author_details);
router.post('/authors/:id', authorCotroller.bookStatus);
const signUpController = require('../controllers/authentication/signUpController')
const signInController = require('../controllers/authentication/signInController')
router.get('/', homeController.home);
router.get('/categories', homeController.categories);
router.get('/category/:id', homeController.categoryBooks);
router.get('/books', homeController.books);
router.get('/book/:id', homeController.bookDetails);
router.post('/books', homeController.bookStatus);
router.post('/book/:id/rate', homeController.setRate);


const checkAuthentication = require('../middleware/checkAuthentication')
const searchController = require('../controllers/searchController')

router.get('/',homeController.home);



router.get('/signup', checkAuthentication.redirectHome, signUpController.signUp)
router.post('/register', checkAuthentication.redirectHome, signUpController.register)

router.get('/signin', checkAuthentication.redirectHome, signInController.signIn)
router.post('/login', checkAuthentication.redirectHome, signInController.login)

router.get('/searchpage', searchController.search)
router.post('/search', searchController.search)
router.post('/search/advsearch', searchController.advancedSearch)

router.get('/search/:name', searchController.getBookByCategory)

router.get('/logout', signInController.logOut)


module.exports = router;