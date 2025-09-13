import express from "express";
import {Router} from 'express';
import pedidoRouter from "./pedidos/pedido_routes";
import { DespachanteRoute } from "./despachante/DespachanteRoute";
import { QRCodeRoute } from "./qrcodegenerate/QRCodeRoutes";

const routerApplicaction = Router();

routerApplicaction.use('/pedidos', pedidoRouter);
routerApplicaction.use('/despachante', DespachanteRoute);
routerApplicaction.use('/qrcode', QRCodeRoute);

export {routerApplicaction}

// const transporteRoutes = require('./transporteRoutes');
// const mercadoriaRoutes = require('./mercadoriaRoutes');
// const pagamentoRoutes = require('./pagamentoRoutes');
// const documentoRoutes = require('./documentoRoutes');

// Status da API
// router.get('/', (req:Request, res:Response) => {
//   res.json({
//     success: true,
//     message: 'API de Pedidos funcionando!',
//     version: '1.0.0',
//     endpoints: {
//       pedidos: '/api/pedidos',
//       transportes: '/api/transportes',
//       mercadorias: '/api/mercadorias',
//       pagamentos: '/api/pagamentos',
//       documentos: '/api/documentos'
//     }
//   });
// });

// Rotas da API
// router.use('/transportes', transporteRoutes);
// router.use('/mercadorias', mercadoriaRoutes);
// router.use('/pagamentos', pagamentoRoutes);
// router.use('/documentos', documentoRoutes);