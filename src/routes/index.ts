import pedidoRouter from "./pedidos/pedido_routes";

import express from "express";

// const transporteRoutes = require('./transporteRoutes');
// const mercadoriaRoutes = require('./mercadoriaRoutes');
// const pagamentoRoutes = require('./pagamentoRoutes');
// const documentoRoutes = require('./documentoRoutes');



export  const routerApplicaction = express.Router();

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
routerApplicaction.use('/pedidos', pedidoRouter);
// router.use('/transportes', transporteRoutes);
// router.use('/mercadorias', mercadoriaRoutes);
// router.use('/pagamentos', pagamentoRoutes);
// router.use('/documentos', documentoRoutes);
