import { Router } from 'express';
import pedidoRoutes from './pedidoRoutes';
import despachanteRoutes from './despachanteRoutes';
import empresaRoutes from './empresaRoutes';
import fiabilidadeRoutes from './fiabilidadeRoutes';
import referenceRoutes from './referenceRoutes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

// API routes
router.use('/api/pedidos', pedidoRoutes);
router.use('/api/despachantes', despachanteRoutes);
router.use('/api/empresas', empresaRoutes);
router.use('/api/fiabilizacoes', fiabilidadeRoutes);
router.use('/api/reference', referenceRoutes);

export default router;