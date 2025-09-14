import { Router } from 'express';
import {
  getAllPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
  getPedidosByEmpresa,
  getPedidosByDespachante,
  getPedidosByDespachanteEmpresa
} from '../controllers/pedidoController';
import {
  validateCreatePedido,
  validateUpdatePedido,
  validatePedidoId,
  validateNif
} from '../middleware/validation';

const router = Router();

// Rotas principais
router.get('/', getAllPedidos);
router.get('/:id', validatePedidoId, getPedidoById);
router.post('/', validateCreatePedido, createPedido);
router.put('/:id', validatePedidoId, validateUpdatePedido, updatePedido);
router.delete('/:id', validatePedidoId, deletePedido);

// Rotas de filtro
router.get('/empresa/:nifEmpresa', validateNif, getPedidosByEmpresa);
router.get('/despachante/:nifDespachante', validateNif, getPedidosByDespachante);
router.get('/despachante/:nifDespachante/empresa/:nifEmpresa', validateNif, getPedidosByDespachanteEmpresa);

export default router;