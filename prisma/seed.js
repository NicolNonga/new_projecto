const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
 

  // Criar pedidos
  const pedido1 = await prisma.pedido.create({
    data: {
      codigo_multas: 'MUL001',
      codigo_regime: 'REG001',
      consignatario_importador: 'Importadora XYZ',
      manifesto_numero: 'MAN001',
      numero_total_adicoes: 5,
      despachante: 'João Silva',
      descricao_mercadoria: 'Equipamentos eletrônicos',
      pais_origem: 'China',
      pais_destino: 'Brasil',
      porto_entrada: 'Santos',
      data_chegada: new Date('2024-01-15'),
      numero_fatura_proforma: 'FAT001'
    }
  });

  const pedido2 = await prisma.pedido.create({
    data: {
      codigo_multas: 'MUL002',
      codigo_regime: 'REG002',
      consignatario_importador: 'Importadora ABC',
      manifesto_numero: 'MAN002',
      numero_total_adicoes: 3,
      despachante: 'Maria Santos',
      descricao_mercadoria: 'Produtos químicos',
      pais_origem: 'Alemanha',
      pais_destino: 'Brasil',
      porto_entrada: 'Rio de Janeiro',
      data_chegada: new Date('2024-01-20'),
      numero_fatura_proforma: 'FAT002'
    }
  });

  // Criar transportes
  await prisma.transporte.create({
    data: {
      pedido_id: pedido1.id_pedido,
      meio_transporte: 'Navio',
      nacionalidade_meio_transporte: 'Libéria',
      registro_meio_transporte: 'NAV001',
      num_documento_transporte: 'DOC001',
      estancia_aduaneira: 'Santos',
      porto_origem: 'Shanghai',
      peso_bruto: 15000.50,
      local_embarque: 'Shanghai Port',
      local_desalfandegamento: 'Porto de Santos',
      pais_precedencia: 'China'
    }
  });

  await prisma.transporte.create({
    data: {
      pedido_id: pedido2.id_pedido,
      meio_transporte: 'Avião',
      nacionalidade_meio_transporte: 'Brasil',
      registro_meio_transporte: 'AV002',
      num_documento_transporte: 'DOC002',
      estancia_aduaneira: 'Galeão',
      porto_origem: 'Frankfurt',
      peso_bruto: 5000.25,
      local_embarque: 'Frankfurt Airport',
      local_desalfandegamento: 'Aeroporto do Galeão',
      pais_precedencia: 'Alemanha'
    }
  });

  // Criar mercadorias
  await prisma.mercadoria.create({
    data: {
      pedido_id: pedido1.id_pedido,
      linha: 1,
      codigo_pautal: '85171200',
      quantidade: 100,
      pais_origem_2: 'China',
      peso: 500.25,
      moeda_estrangeira: 'USD',
      valor_fob: 10000.00,
      valor_frete: 1500.00,
      valor_cif: 11500.00,
      unidade_medida: 'UN'
    }
  });

  await prisma.mercadoria.create({
    data: {
      pedido_id: pedido2.id_pedido,
      linha: 1,
      codigo_pautal: '28070000',
      quantidade: 50,
      pais_origem_2: 'Alemanha',
      peso: 200.75,
      moeda_estrangeira: 'EUR',
      valor_fob: 5000.00,
      valor_frete: 800.00,
      valor_cif: 5800.00,
      unidade_medida: 'KG'
    }
  });

  // Criar pagamentos
  await prisma.pagamento.create({
    data: {
      pedido_id: pedido1.id_pedido,
      metodo_avaliacao: 'Valor da transação',
      banco_comercial: 'Banco do Brasil',
      forma_pagamento: 'Carta de crédito',
      qtd_volume: 50,
      codigo_volume: 'VOL001',
      unidade: 'Caixas'
    }
  });

  await prisma.pagamento.create({
    data: {
      pedido_id: pedido2.id_pedido,
      metodo_avaliacao: 'Valor da transação',
      banco_comercial: 'Itaú',
      forma_pagamento: 'Transferência bancária',
      qtd_volume: 25,
      codigo_volume: 'VOL002',
      unidade: 'Tambores'
    }
  });

  // Criar documentos
  await prisma.documento.create({
    data: {
      pedido_id: pedido1.id_pedido,
      tipo_documento: 'Fatura comercial',
      caminho_arquivo: '/uploads/fatura_001.pdf',
      codigo_pre_licenciamento: 'LIC001'
    }
  });

  await prisma.documento.create({
    data: {
      pedido_id: pedido2.id_pedido,
      tipo_documento: 'Certificado de origem',
      caminho_arquivo: '/uploads/certificado_002.pdf',
      codigo_pre_licenciamento: 'LIC002'
    }
  });

  console.log('Seed concluído com sucesso!');


}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });