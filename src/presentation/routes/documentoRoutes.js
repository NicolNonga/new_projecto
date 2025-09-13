const express = require('express');
const documentoController = require('../controllers/documentoController');

const router = express.Router();

router.get('/', documentoController.index);
router.get('/:id', documentoController.show);
router.post('/', documentoController.store);
router.put('/:id', documentoController.update);
router.delete('/:id', documentoController.destroy);

module.exports = router;