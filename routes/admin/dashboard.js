const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/admin/dashboardController');
const categoryController = require('../../controllers/admin/categoryController');
const authorController = require('../../controllers/admin/authorController');
const bookController = require('../../controllers/admin/bookController');

router.get('/', dashboardController.index);
router.get('/categories', categoryController.index);
router.get('/categories/create', categoryController.create);
router.post('/categories/create', categoryController.store);


router.get('/authors', authorController.index);
router.get('/authors/create', authorController.create);
router.post('/authors/create', authorController.store);

router.get('/books', bookController.index);
router.get('/books/create', bookController.create);
router.post('/books/create', bookController.store);

module.exports = router;