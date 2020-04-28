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
router.get('/categories/:id/edit', categoryController.edit);
router.post('/categories/:id/update', categoryController.update);


router.get('/authors', authorController.index);
router.get('/authors/create', authorController.create);
router.post('/authors/create', authorController.store);
router.get('/authors/:id/edit', authorController.edit);
router.post('/authors/:id/update', authorController.update);

router.get('/books', bookController.index);
router.get('/books/create', bookController.create);
router.post('/books/create', bookController.store);

module.exports = router;