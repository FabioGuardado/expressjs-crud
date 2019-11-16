const express = require('express');
const router = express.Router();
const ProvidersController = require('../controllers/providersController');

router.get('/providers', ProvidersController.list);
router.post('/add-provider', ProvidersController.save);
router.get('/delete-provider/:id', ProvidersController.delete);

router.get('/update-provider-panel/:id', ProvidersController.edit);
router.post('/update-provider/:id', ProvidersController.update);

module.exports = router;