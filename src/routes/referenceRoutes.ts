import { Router } from 'express';
import {
  getAllTypes,
  getAllByType,
  getById,
  create,
  update,
  deleteItem
} from '../controllers/referenceController';
import {
  validateCreateReferenceItem,
  validateUpdateReferenceItem,
  validateReferenceId,
  validateReferenceType
} from '../middleware/referenceValidation';

const router = Router();

// Rota para obter todos os tipos de referência
router.get('/', getAllTypes);

// Rotas para operações por tipo
router.get('/:type', validateReferenceType, getAllByType);
router.get('/:type/:id', validateReferenceType, validateReferenceId, getById);
router.post('/:type', validateReferenceType, validateCreateReferenceItem, create);
router.put('/:type/:id', validateReferenceType, validateReferenceId, validateUpdateReferenceItem, update);
router.delete('/:type/:id', validateReferenceType, validateReferenceId, deleteItem);

export default router;