const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { connectDB } = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});

// Middlewares
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logger no modo desenvolvimento
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Rotas principais
app.use('/api', routes);

// 404 handler (ajustado)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint não encontrado'
  });
});

// Middleware de erros
app.use(errorHandler);

// Função para iniciar o servidor
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log('🚀 Servidor rodando em http://localhost:' + PORT);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⏹ Desligando servidor...');
  const { disconnectDB } = require('./config/database');
  await disconnectDB();
  process.exit(0);
});

startServer();
