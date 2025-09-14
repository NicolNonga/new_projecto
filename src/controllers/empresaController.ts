import { Request, Response } from 'express';
import { EmpresaService } from '../services/empresaService';
import { asyncHandler } from '../middleware/errorHandler';

const empresaService = new EmpresaService();

export const getAllEmpresas = asyncHandler(async (req: Request, res: Response) => {
  const empresas = await empresaService.getAllEmpresas();
  
  res.json({
    success: true,
    data: empresas,
    count: empresas.length
  });
});

export const getEmpresaByNif = asyncHandler(async (req: Request, res: Response) => {
  const { nif } = req.params;
  const empresa = await empresaService.getEmpresaByNif(nif);
  
  res.json({
    success: true,
    data: empresa
  });
});

export const createEmpresa = asyncHandler(async (req: Request, res: Response) => {
  const empresa = await empresaService.createEmpresa(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Empresa criada com sucesso',
    data: empresa
  });
});

export const updateEmpresa = asyncHandler(async (req: Request, res: Response) => {
  const { nif } = req.params;
  const empresa = await empresaService.updateEmpresa(nif, req.body);
  
  res.json({
    success: true,
    message: 'Empresa atualizada com sucesso',
    data: empresa
  });
});

export const deleteEmpresa = asyncHandler(async (req: Request, res: Response) => {
  const { nif } = req.params;
  await empresaService.deleteEmpresa(nif);
  
  res.json({
    success: true,
    message: 'Empresa deletada com sucesso'
  });
});

export const getEmpresasByDespachante = asyncHandler(async (req: Request, res: Response) => {
  const { nifDespachante } = req.params;
  const empresas = await empresaService.getEmpresasByDespachante(nifDespachante);
  
  res.json({
    success: true,
    data: empresas,
    count: empresas.length
  });
});