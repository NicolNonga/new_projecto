import { Request, Response } from 'express';
import { FiabilidadeService } from '../services/fiabilidadeService';
import { asyncHandler } from '../middleware/errorHandler';

const fiabilidadeService = new FiabilidadeService();

export const getAllFiabilizacoes = asyncHandler(async (req: Request, res: Response) => {
  const fiabilizacoes = await fiabilidadeService.getAllFiabilizacoes();
  
  res.json({
    success: true,
    data: fiabilizacoes,
    count: fiabilizacoes.length
  });
});

export const getFiabilizacaoByCedula = asyncHandler(async (req: Request, res: Response) => {
  const { cedula } = req.params;
  const fiabilizacao = await fiabilidadeService.getFiabilizacaoByCedula(cedula);
  
  res.json({
    success: true,
    data: fiabilizacao
  });
});

export const getFiabilizacaoByDespachante = asyncHandler(async (req: Request, res: Response) => {
  const { nifDespachante } = req.params;
  const fiabilizacao = await fiabilidadeService.getFiabilizacaoByDespachante(nifDespachante);
  
  res.json({
    success: true,
    data: fiabilizacao
  });
});

export const createFiabilizacao = asyncHandler(async (req: Request, res: Response) => {
  const fiabilizacao = await fiabilidadeService.createFiabilizacao(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Fiabilização criada com sucesso',
    data: fiabilizacao
  });
});

export const updateFiabilizacao = asyncHandler(async (req: Request, res: Response) => {
  const { cedula } = req.params;
  const fiabilizacao = await fiabilidadeService.updateFiabilizacao(cedula, req.body);
  
  res.json({
    success: true,
    message: 'Fiabilização atualizada com sucesso',
    data: fiabilizacao
  });
});

export const deleteFiabilizacao = asyncHandler(async (req: Request, res: Response) => {
  const { cedula } = req.params;
  await fiabilidadeService.deleteFiabilizacao(cedula);
  
  res.json({
    success: true,
    message: 'Fiabilização deletada com sucesso'
  });
});

export const getFiabilizacoesVencidas = asyncHandler(async (req: Request, res: Response) => {
  const fiabilizacoes = await fiabilidadeService.getFiabilizacoesVencidas();
  
  res.json({
    success: true,
    data: fiabilizacoes,
    count: fiabilizacoes.length
  });
});

export const getFiabilizacoesVencendoEm = asyncHandler(async (req: Request, res: Response) => {
  const { dias } = req.params;
  const fiabilizacoes = await fiabilidadeService.getFiabilizacoesVencendoEm(parseInt(dias));
  
  res.json({
    success: true,
    data: fiabilizacoes,
    count: fiabilizacoes.length
  });
});