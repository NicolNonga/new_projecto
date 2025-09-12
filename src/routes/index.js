const express = require('express');
const pedidoRoutes = require('./pedidoRoutes');
const transporteRoutes = require('./transporteRoutes');
const mercadoriaRoutes = require('./mercadoriaRoutes');
const pagamentoRoutes = require('./pagamentoRoutes');
const documentoRoutes = require('./documentoRoutes');

const router = express.Router();

// Status da API
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Pedidos funcionando!',
    version: '1.0.0',
    endpoints: {
      pedidos: '/api/pedidos',
      transportes: '/api/transportes',
      mercadorias: '/api/mercadorias',
      pagamentos: '/api/pagamentos',
      documentos: '/api/documentos'
    }
  });
});

// Rotas da API
router.use('/pedidos', pedidoRoutes);
router.use('/transportes', transporteRoutes);
router.use('/mercadorias', mercadoriaRoutes);
router.use('/pagamentos', pagamentoRoutes);
router.use('/documentos', documentoRoutes);

module.exports = router;