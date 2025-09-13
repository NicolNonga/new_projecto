// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const estados = [
    { nome: 'PENDENTE', descricao: 'Pedido aguardando análise' },
    { nome: 'CONCLUIDO', descricao: 'Processo de licenciamento concluído' }
  ];

  for (const estado of estados) {
    await prisma.estadoPedidoLicenciamento.upsert({
      where: { nome: estado.nome },
      update: {},
      create: estado,
    });
  }

  console.log('Estados de pedido de licenciamento criados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });