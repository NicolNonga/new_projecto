
import express from "express";

import pedidoRouter from "./pedidos/pedido_routes";
import { CodigoMultaRoutes } from './pedidos/routes_select/CodigoMultaRoutes';
import { CodigoRegimeRoutes } from './pedidos/routes_select/CodigoRegimeRoutes';
import { NacionalidadeMeioTransporteRoutes } from './pedidos/routes_select/NacionalidadeMeioTransporteRoutes';
import { PaisOrigemRoutes } from './pedidos/routes_select/PaisOrigemRoutes';
import { PaisDestinoRoutes } from './pedidos/routes_select/PaisDestinoRoutes';
import { PortoEntradaSaidaRoutes } from './pedidos/routes_select/PortoEntradaSaidaRoutes';
import { MeioTransporteRoutes } from './pedidos/routes_select/MeioTransporteRoutes';
import { EstanciaAduaneiraRoutes } from './pedidos/routes_select/EstanciaAduaneiraRoutes';
import { PostoFronteiricoRoutes } from './pedidos/routes_select/PostoFronteiricoRoutes';
import { LocalEmbarqueRoutes } from './pedidos/routes_select/LocalEmbarqueRoutes';
import { PaisProcedenciaRoutes } from './pedidos/routes_select/PaisProcedenciaRoutes';



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


// Rotas para os select 
routerApplicaction .use('/api/codigo-multa', new CodigoMultaRoutes().router);
routerApplicaction .use('/api/codigo-regime', new CodigoRegimeRoutes().router);
routerApplicaction .use('/api/nacionalidade-meio-transporte', new NacionalidadeMeioTransporteRoutes().router);
routerApplicaction .use('/api/pais-origem', new PaisOrigemRoutes().router);
routerApplicaction .use('/api/pais-destino', new PaisDestinoRoutes().router);
routerApplicaction .use('/api/porto-entrada-saida', new PortoEntradaSaidaRoutes().router);
routerApplicaction .use('/api/meio-transporte', new MeioTransporteRoutes().router);
routerApplicaction .use('/api/estancia-aduaneira', new EstanciaAduaneiraRoutes().router);
routerApplicaction .use('/api/posto-fronteirico', new PostoFronteiricoRoutes().router);
routerApplicaction .use('/api/local-embarque', new LocalEmbarqueRoutes().router);
routerApplicaction .use('/api/pais-procedencia', new PaisProcedenciaRoutes().router);
