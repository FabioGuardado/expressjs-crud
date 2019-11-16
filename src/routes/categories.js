const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categoriesController');

router.get('/categories', CategoriesController.list);
router.post('/add-category', CategoriesController.save);
router.get('/delete-category/:id', CategoriesController.delete);

router.get('/update-category-panel/:id', CategoriesController.edit);
router.post('/update-category/:id', CategoriesController.update);

module.exports = router;