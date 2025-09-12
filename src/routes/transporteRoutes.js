const express = require('express');
const transporteController = require('../controllers/transporteController');

const router = express.Router();

router.get('/', transporteController.index);
router.get('/:id', transporteController.show);
router.post('/', transporteController.store);
router.put('/:id', transporteController.update);
router.delete('/:id', transporteController.destroy);

module.exports = router;