import { Router } from 'express';
import {
  getAllEmpresas,
  getEmpresaByNif,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
  getEmpresasByDespachante
} from '../controllers/empresaController';
import {
  validateCreateEmpresa,
  validateUpdateEmpresa,
  validateNif
} from '../middleware/validation';

const router = Router();

// Rotas principais
router.get('/', getAllEmpresas);
router.get('/:nif', validateNif, getEmpresaByNif);
router.post('/', validateCreateEmpresa, createEmpresa);
router.put('/:nif', validateNif, validateUpdateEmpresa, updateEmpresa);
router.delete('/:nif', validateNif, deleteEmpresa);

// Rotas de filtro
router.get('/despachante/:nifDespachante', validateNif, getEmpresasByDespachante);

export default router;