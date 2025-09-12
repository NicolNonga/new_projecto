const express = require('express');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

router.get('/', pedidoController.index);
router.get('/:id', pedidoController.show);
router.post('/', pedidoController.store);
router.put('/:id', pedidoController.update);
router.delete('/:id', pedidoController.destroy);

module.exports = router;