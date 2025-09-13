const express = require('express');
const pagamentoController = require('../controllers/pagamentoController');

const router = express.Router();

router.get('/', pagamentoController.index);
router.get('/:id', pagamentoController.show);
router.post('/', pagamentoController.store);
router.put('/:id', pagamentoController.update);
router.delete('/:id', pagamentoController.destroy);

module.exports = router;