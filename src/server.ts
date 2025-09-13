import { database } from "./config/database";
import { zodErrorHandler } from "./middleware/zod_error_handler";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";


const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


require('dotenv').config();


import { routerApplicaction } from "./routes";

// const { connectDB } = require('./config/database');
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


// Rotas principais
app.use('/api', routerApplicaction);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// 404 handler (ajustado)
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Endpoint não encontrado'
//   });
// });

// Middleware de erros
app.use(zodErrorHandler)
app.use(errorHandler);


// Função para iniciar o servidor
const port: number | string = process.env.PORT || 3000;

async function startServer() {
  try {
    // 1. Conectar ao banco
    await database.$connect();
    console.log("✅ Database connected successfully");

    // 2. Iniciar servidor
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database", error);
    process.exit(1); // encerra se não conectar
  }
}

startServer();

// Graceful shutdown
// process.on('SIGINT', async () => {
//   console.log('\n⏹ Desligando servidor...');
//   const { disconnectDB } = require('./config/database');
//   await disconnectDB();
//   process.exit(0);
// });


