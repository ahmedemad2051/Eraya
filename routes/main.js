const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.get('/categories', homeController.categories);
router.get('/categories/:categoryId', homeController.categoryBooks);
router.get('/books', homeController.books);
router.get('/books/:bookId', homeController.bookDetails);








module.exports = router;