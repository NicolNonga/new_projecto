import { Router } from 'express';
import {
  getAllDespachantes,
  getDespachanteByNif,
  createDespachante,
  updateDespachante,
  deleteDespachante,
  checkFiabilizacao,
  associarEmpresa,
  desassociarEmpresa
} from '../controllers/despachanteController';
import {
  validateCreateDespachante,
  validateUpdateDespachante,
  validateNif,
  validateAssociacaoEmpresa
} from '../middleware/validation';

const router = Router();

// Rotas principais
router.get('/', getAllDespachantes);
router.get('/:nif', validateNif, getDespachanteByNif);
router.post('/', validateCreateDespachante, createDespachante);
router.put('/:nif', validateNif, validateUpdateDespachante, updateDespachante);
router.delete('/:nif', validateNif, deleteDespachante);

// Rota de verificação de fiabilização
router.get('/:nif/fiabilizacao', validateNif, checkFiabilizacao);

// Rotas de associação com empresas
router.post('/:nif/empresas', validateNif, validateAssociacaoEmpresa, associarEmpresa);
router.delete('/:nif/empresas/:nifEmpresa', validateNif, desassociarEmpresa);

export default router;