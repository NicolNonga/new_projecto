const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn'] : ['error'],
});

// Middleware para conectar/desconectar do banco
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Conectado ao banco de dados MySQL');
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

module.exports = { prisma, connectDB, disconnectDB };