import { Router } from 'express';
import {
  getAllFiabilizacoes,
  getFiabilizacaoByCedula,
  getFiabilizacaoByDespachante,
  createFiabilizacao,
  updateFiabilizacao,
  deleteFiabilizacao,
  getFiabilizacoesVencidas,
  getFiabilizacoesVencendoEm
} from '../controllers/fiabilidadeController';
import {
  validateCreateFiabilidade,
  validateUpdateFiabilidade,
  validateCedula,
  validateNif
} from '../middleware/validation';

const router = Router();

// Rotas principais
router.get('/', getAllFiabilizacoes);
router.get('/cedula/:cedula', validateCedula, getFiabilizacaoByCedula);
router.get('/despachante/:nifDespachante', validateNif, getFiabilizacaoByDespachante);
router.post('/', validateCreateFiabilidade, createFiabilizacao);
router.put('/:cedula', validateCedula, validateUpdateFiabilidade, updateFiabilizacao);
router.delete('/:cedula', validateCedula, deleteFiabilizacao);

// Rotas de relatórios
router.get('/vencidas', getFiabilizacoesVencidas);
router.get('/vencendo/:dias', getFiabilizacoesVencendoEm);

export default router;