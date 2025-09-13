const express = require('express');
const mercadoriaController = require('../controllers/mercadoriaController');

const router = express.Router();

router.get('/', mercadoriaController.index);
router.get('/:id', mercadoriaController.show);
router.post('/', mercadoriaController.store);
router.put('/:id', mercadoriaController.update);
router.delete('/:id', mercadoriaController.destroy);

module.exports = router;