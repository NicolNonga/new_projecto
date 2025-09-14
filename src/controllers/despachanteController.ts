import { Request, Response } from 'express';
import { DespachanteService } from '../services/despachanteService';
import { asyncHandler } from '../middleware/errorHandler';

const despachanteService = new DespachanteService();

export const getAllDespachantes = asyncHandler(async (req: Request, res: Response) => {
  const despachantes = await despachanteService.getAllDespachantes();
  
  res.json({
    success: true,
    data: despachantes,
    count: despachantes.length
  });
});

export const getDespachanteByNif = asyncHandler(async (req: Request, res: Response) => {
  const { nif } = req.params;
  const despachante = await despachanteService.getDespachanteByNif(nif);
  
  res.json({
    success: true,
    data: despachante
  });
});

export const createDespachante = asyncHandler(async (req: Request, res: Response) => {
  const despachante = await despachanteService.createDespachante(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Despachante criado com sucesso',
    data: despachante
  });
});

export const updateDespachante = asyncHandler(async (req: Request, res: Response) => {
  const { nif } = req.params;
  const despachante = await despachanteService.updateDespachante(nif, req.body);
  
  res.json({
    success: true,
    message: 'Despachante atualizado com sucesso',
    data: despachante
  });
});

export const deleteDespachante = asyncHandler(async (req: Request, res: Response) => {
  const { nif } = req.params;
  await despachanteService.deleteDespachante(nif);
  
  res.json({
    success: true,
    message: 'Despachante deletado com sucesso'
  });
});

export const checkFiabilizacao = asyncHandler(async (req: Request, res: Response) => {
  const { nif } = req.params;
  const result = await despachanteService.checkFiabilizacao(nif);
  
  res.json({
    success: true,
    data: result
  });
});

export const associarEmpresa = asyncHandler(async (req: Request, res: Response) => {
  const { nif } = req.params;
  const { nif_empresa, cargo } = req.body;
  
  const associacao = await despachanteService.associarEmpresa(nif, nif_empresa, cargo);
  
  res.status(201).json({
    success: true,
    message: 'Despachante associado à empresa com sucesso',
    data: associacao
  });
});

export const desassociarEmpresa = asyncHandler(async (req: Request, res: Response) => {
  const { nif, nifEmpresa } = req.params;
  
  await despachanteService.desassociarEmpresa(nif, nifEmpresa);
  
  res.json({
    success: true,
    message: 'Associação removida com sucesso'
  });
});