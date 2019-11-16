const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/productsController');

router.get('/', ProductsController.list);
router.post('/add', ProductsController.save);
router.get('/delete/:id', ProductsController.delete);

router.get('/update/:id', ProductsController.edit);
router.post('/update-product/:id', ProductsController.update);

module.exports = router;