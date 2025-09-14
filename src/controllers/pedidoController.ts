import { Request, Response } from 'express';
import { PedidoService } from '../services/pedidoService';
import { asyncHandler } from '../middleware/errorHandler';

const pedidoService = new PedidoService();

export const getAllPedidos = asyncHandler(async (req: Request, res: Response) => {
  const pedidos = await pedidoService.getAllPedidos();
  
  res.json({
    success: true,
    data: pedidos,
    count: pedidos.length
  });
});

export const getPedidoById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const pedido = await pedidoService.getPedidoById(id);
  
  res.json({
    success: true,
    data: pedido
  });
});

export const createPedido = asyncHandler(async (req: Request, res: Response) => {
  const pedido = await pedidoService.createPedido(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Pedido criado com sucesso',
    data: pedido
  });
});

export const updatePedido = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const pedido = await pedidoService.updatePedido(id, req.body);
  
  res.json({
    success: true,
    message: 'Pedido atualizado com sucesso',
    data: pedido
  });
});

export const deletePedido = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await pedidoService.deletePedido(id);
  
  res.json({
    success: true,
    message: 'Pedido deletado com sucesso'
  });
});

export const getPedidosByEmpresa = asyncHandler(async (req: Request, res: Response) => {
  const { nifEmpresa } = req.params;
  const pedidos = await pedidoService.getPedidosByEmpresa(nifEmpresa);
  
  res.json({
    success: true,
    data: pedidos,
    count: pedidos.length
  });
});

export const getPedidosByDespachante = asyncHandler(async (req: Request, res: Response) => {
  const { nifDespachante } = req.params;
  const pedidos = await pedidoService.getPedidosByDespachante(nifDespachante);
  
  res.json({
    success: true,
    data: pedidos,
    count: pedidos.length
  });
});

export const getPedidosByDespachanteEmpresa = asyncHandler(async (req: Request, res: Response) => {
  const { nifDespachante, nifEmpresa } = req.params;
  const pedidos = await pedidoService.getPedidosByDespachanteEmpresa(nifDespachante, nifEmpresa);
  
  res.json({
    success: true,
    data: pedidos,
    count: pedidos.length
  });
});