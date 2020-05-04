const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const profileController = require('../controllers/profileController');
const authorCotroller = require('../controllers/authorController');


router.get('/', homeController.home);
router.get('/profile', profileController.all);
router.get('/profile/current', profileController.current);
router.get('/profile/finished', profileController.finished);
router.get('/authors/:id', authorCotroller.author_details);
router.post('/authors/:id', authorCotroller.bookStatus);
module.exports = router;