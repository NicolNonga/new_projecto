import { Request, Response } from 'express';
import { ReferenceService } from '../services/referenceService';
import { asyncHandler } from '../middleware/errorHandler';

const referenceService = new ReferenceService();

export const getAllTypes = asyncHandler(async (req: Request, res: Response) => {
  const data = await referenceService.getAllTypes();
  
  res.json({
    success: true,
    data,
    message: 'Todos os tipos de referência obtidos com sucesso'
  });
});

export const getAllByType = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.params;
  const items = await referenceService.getAllByType(type);
  
  res.json({
    success: true,
    data: items,
    count: items.length,
    message: `Itens do tipo ${type} obtidos com sucesso`
  });
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { type, id } = req.params;
  const item = await referenceService.getById(type, parseInt(id));
  
  res.json({
    success: true,
    data: item,
    message: 'Item obtido com sucesso'
  });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.params;
  const item = await referenceService.create(type, req.body);
  
  res.status(201).json({
    success: true,
    data: item,
    message: 'Item criado com sucesso'
  });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const { type, id } = req.params;
  const item = await referenceService.update(type, parseInt(id), req.body);
  
  res.json({
    success: true,
    data: item,
    message: 'Item atualizado com sucesso'
  });
});

export const deleteItem = asyncHandler(async (req: Request, res: Response) => {
  const { type, id } = req.params;
  await referenceService.delete(type, parseInt(id));
  
  res.json({
    success: true,
    message: 'Item deletado com sucesso'
  });
});