const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/admin/dashboardController');
const categoryController = require('../../controllers/admin/categoryController');
const authorController = require('../../controllers/admin/authorController');
const bookController = require('../../controllers/admin/bookController');

const categoryValidation = require('../../middleware/admin/categoryValidation');
const checkErrors = require('../../middleware/admin/checkErrors');

let categoriesRoutes = {
    "index": "/categories",
    "create": "/categories/create",
    "store": "/categories/create",
    "edit": "/categories/:id/edit",
    "update": "/categories/:id/update",
    "destroy": "/categories/:id/delete",

}
router.get('/', dashboardController.index);

router.get(categoriesRoutes.index, categoryController.index);
router.get(categoriesRoutes.create, categoryController.create);
router.post(categoriesRoutes.store, categoryValidation, checkErrors, categoryController.store);
router.get(categoriesRoutes.edit, categoryController.edit);
router.post(categoriesRoutes.update, categoryValidation, checkErrors, categoryController.update);
router.post(categoriesRoutes.destroy, categoryController.destroy);


router.get('/authors', authorController.index);
router.get('/authors/create', authorController.create);
router.post('/authors/create', authorController.store);
router.get('/authors/:id/edit', authorController.edit);
router.post('/authors/:id/edit', authorController.update);
router.post('/authors/:id/delete', authorController.destroy);


router.get('/books', bookController.index);
router.get('/books/create', bookController.create);
router.post('/books/create', bookController.store);
router.get('/books/:id/edit', bookController.edit);
router.post('/books/:id/edit', bookController.update);
router.post('/books/:id/delete', bookController.destroy);

module.exports = router;