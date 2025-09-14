import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = {
  despachantes: [
    {
      nif: "5417039144",
      nome: "João Carlos Silva",
      sexo: "M",
      email: "joao.silva@despachante.ao",
      bilhete_identidade: "004567890LA041",
      telefone: "+244923456789",
      perfil: "Despachante Sênior"
    },
    {
      nif: "5417039145",
      nome: "Maria Fernanda Costa",
      sexo: "F",
      email: "maria.costa@despachante.ao",
      bilhete_identidade: "004567891LA041",
      telefone: "+244923456790",
      perfil: "Despachante Júnior"
    },
    {
      nif: "5417039146",
      nome: "António Manuel Santos",
      sexo: "M",
      email: "antonio.santos@despachante.ao",
      bilhete_identidade: "004567892LA041",
      telefone: "+244923456791",
      perfil: "Despachante Especialista"
    }
  ],
  empresas: [
    {
      nif: "5401234567",
      nome: "Importadora Angola Ltda",
      endereco: "Rua da Missão, 123, Luanda",
      telefone: "+244222123456",
      email: "geral@importadora-angola.ao"
    },
    {
      nif: "5401234568",
      nome: "Comercial Luanda S.A.",
      endereco: "Avenida 4 de Fevereiro, 456, Luanda",
      telefone: "+244222123457",
      email: "info@comercial-luanda.ao"
    },
    {
      nif: "5401234569",
      nome: "Distribuidora Benguela Ltda",
      endereco: "Rua Direita, 789, Benguela",
      telefone: "+244272123458",
      email: "contato@distribuidora-benguela.ao"
    }
  ],
  fiabilizacoes: [
    {
      cedula_despachante: "DES001/2024",
      nif_despachante: "5417039144",
      descricao: "Fiabilização para operações de importação e exportação",
      emissao: new Date("2024-01-15"),
      validade: new Date("2025-01-15"),
      resgate: null,
      valor: 50000.00
    },
    {
      cedula_despachante: "DES002/2024",
      nif_despachante: "5417039146",
      descricao: "Fiabilização para operações especializadas de importação",
      emissao: new Date("2024-02-01"),
      validade: new Date("2025-02-01"),
      resgate: null,
      valor: 75000.00
    }
  ],
  associacoes: [
    {
      nif_despachante: "5417039144",
      nif_empresa: "5401234567",
      cargo: "Despachante Principal",
      ativo: true
    },
    {
      nif_despachante: "5417039144",
      nif_empresa: "5401234568",
      cargo: "Despachante Consultor",
      ativo: true
    },
    {
      nif_despachante: "5417039145",
      nif_empresa: "5401234568",
      cargo: "Despachante Assistente",
      ativo: true
    },
    {
      nif_despachante: "5417039146",
      nif_empresa: "5401234569",
      cargo: "Despachante Especialista",
      ativo: true
    }
  ],
  pedidos: [
    {
      codigo_multas: "MUL001",
      codigo_regime: "REG40",
      consignatario_importador: "João Silva Santos",
      codigo_avaliacao_autorizado: "AVL001",
      nome_entidade_angola: "Importadora Angola Ltda",
      manifesto_numero: "MAN2024001",
      numero_total_adicoes: 3,
      entidade_estrangeira: "Global Trade Company Ltd",
      descricao_mercadoria: "Equipamentos eletrônicos e componentes industriais",
      pais_origem: "China",
      pais_destino: "Angola",
      porto_entrada: "Porto de Luanda",
      data_chegada: "2024-01-15",
      numero_fatura_proforma: "INV2024001",
      transporte: {
        meio_transporte: "Navio Cargueiro",
        nacionalidade_meio_transporte: "Panamá",
        registro_meio_transporte: "PA-2024-001",
        num_documento_transporte: "BL2024001",
        estancia_aduaneira: "Luanda Alfândega",
        porto_origem: "Porto de Shenzhen",
        posto_fronteirico: "Fronteira Marítima",
        peso_bruto: 15000.50,
        local_embarque: "Shenzhen, China",
        local_desalfandegamento: "Luanda, Angola",
        pais_precedencia: "China",
        referencia_processo_interno: "PROC2024001"
      },
      mercadorias: [
        {
          linha: 1,
          codigo_pautal: "8517.12.00",
          quantidade: 100,
          pais_origem_2: "China",
          peso: 5000.25,
          moeda_estrangeira: "USD",
          valor_fob: 25000.00,
          valor_frete: 2500.00,
          valor_cif: 27500.00,
          unidade_medida: "UN"
        },
        {
          linha: 2,
          codigo_pautal: "8471.30.00",
          quantidade: 50,
          pais_origem_2: "China",
          peso: 7500.15,
          moeda_estrangeira: "USD",
          valor_fob: 45000.00,
          valor_frete: 4500.00,
          valor_cif: 49500.00,
          unidade_medida: "UN"
        },
        {
          linha: 3,
          codigo_pautal: "8504.40.00",
          quantidade: 25,
          pais_origem_2: "China",
          peso: 2500.10,
          moeda_estrangeira: "USD",
          valor_fob: 15000.00,
          valor_frete: 1500.00,
          valor_cif: 16500.00,
          unidade_medida: "UN"
        }
      ],
      pagamento: {
        metodo_avaliacao: "Valor CIF",
        banco_comercial: "Banco Angolano de Investimentos",
        forma_pagamento: "Carta de Crédito",
        qtd_volume: 150,
        codigo_volume: "VOL001",
        unidade: "Caixas"
      },
      documentos: [
        {
          tipo_documento: "Fatura Comercial",
          caminho_arquivo: "/documentos/fatura_comercial_001.pdf",
          codigo_pre_licenciamento: "LIC2024001"
        },
        {
          tipo_documento: "Conhecimento de Embarque",
          caminho_arquivo: "/documentos/conhecimento_embarque_001.pdf",
          codigo_pre_licenciamento: "LIC2024001"
        },
        {
          tipo_documento: "Certificado de Origem",
          caminho_arquivo: "/documentos/certificado_origem_001.pdf",
          codigo_pre_licenciamento: "LIC2024001"
        }
      ]
    },
    {
      codigo_multas: "MUL002",
      codigo_regime: "REG41",
      consignatario_importador: "Maria Fernanda Costa",
      codigo_avaliacao_autorizado: "AVL002",
      nome_entidade_angola: "Comercial Luanda S.A.",
      manifesto_numero: "MAN2024002",
      numero_total_adicoes: 2,
      entidade_estrangeira: "European Machinery Export",
      descricao_mercadoria: "Máquinas industriais e peças de reposição",
      pais_origem: "Alemanha",
      pais_destino: "Angola",
      porto_entrada: "Porto de Lobito",
      data_chegada: "2024-01-20",
      numero_fatura_proforma: "INV2024002",
      transporte: {
        meio_transporte: "Navio Porta-Contêiner",
        nacionalidade_meio_transporte: "Alemanha",
        registro_meio_transporte: "DE-2024-002",
        num_documento_transporte: "BL2024002",
        estancia_aduaneira: "Lobito Alfândega",
        porto_origem: "Porto de Hamburgo",
        posto_fronteirico: "Fronteira Marítima",
        peso_bruto: 25000.75,
        local_embarque: "Hamburgo, Alemanha",
        local_desalfandegamento: "Lobito, Angola",
        pais_precedencia: "Alemanha",
        referencia_processo_interno: "PROC2024002"
      },
      mercadorias: [
        {
          linha: 1,
          codigo_pautal: "8479.89.00",
          quantidade: 5,
          pais_origem_2: "Alemanha",
          peso: 15000.50,
          moeda_estrangeira: "EUR",
          valor_fob: 85000.00,
          valor_frete: 8500.00,
          valor_cif: 93500.00,
          unidade_medida: "UN"
        },
        {
          linha: 2,
          codigo_pautal: "8483.10.00",
          quantidade: 200,
          pais_origem_2: "Alemanha",
          peso: 10000.25,
          moeda_estrangeira: "EUR",
          valor_fob: 25000.00,
          valor_frete: 2500.00,
          valor_cif: 27500.00,
          unidade_medida: "KG"
        }
      ],
      pagamento: {
        metodo_avaliacao: "Valor CIF",
        banco_comercial: "Banco de Fomento Angola",
        forma_pagamento: "Transferência Bancária",
        qtd_volume: 25,
        codigo_volume: "VOL002",
        unidade: "Paletes"
      },
      documentos: [
        {
          tipo_documento: "Fatura Comercial",
          caminho_arquivo: "/documentos/fatura_comercial_002.pdf",
          codigo_pre_licenciamento: "LIC2024002"
        },
        {
          tipo_documento: "Conhecimento de Embarque",
          caminho_arquivo: "/documentos/conhecimento_embarque_002.pdf",
          codigo_pre_licenciamento: "LIC2024002"
        }
      ]
    },
    {
      codigo_multas: "MUL003",
      codigo_regime: "REG42",
      consignatario_importador: "Pedro Manuel Oliveira",
      codigo_avaliacao_autorizado: "AVL003",
      nome_entidade_angola: "Distribuidora Benguela Ltda",
      manifesto_numero: "MAN2024003",
      numero_total_adicoes: 4,
      entidade_estrangeira: "Brazilian Food Exports Ltd",
      descricao_mercadoria: "Produtos alimentícios e bebidas",
      pais_origem: "Brasil",
      pais_destino: "Angola",
      porto_entrada: "Porto de Namibe",
      data_chegada: "2024-01-25",
      numero_fatura_proforma: "INV2024003",
      transporte: {
        meio_transporte: "Navio Frigorífico",
        nacionalidade_meio_transporte: "Brasil",
        registro_meio_transporte: "BR-2024-003",
        num_documento_transporte: "BL2024003",
        estancia_aduaneira: "Namibe Alfândega",
        porto_origem: "Porto de Santos",
        posto_fronteirico: "Fronteira Marítima",
        peso_bruto: 18000.30,
        local_embarque: "Santos, Brasil",
        local_desalfandegamento: "Namibe, Angola",
        pais_precedencia: "Brasil",
        referencia_processo_interno: "PROC2024003"
      },
      mercadorias: [
        {
          linha: 1,
          codigo_pautal: "0201.10.00",
          quantidade: 1000,
          pais_origem_2: "Brasil",
          peso: 8000.00,
          moeda_estrangeira: "USD",
          valor_fob: 12000.00,
          valor_frete: 1200.00,
          valor_cif: 13200.00,
          unidade_medida: "KG"
        },
        {
          linha: 2,
          codigo_pautal: "1701.14.00",
          quantidade: 500,
          pais_origem_2: "Brasil",
          peso: 5000.15,
          moeda_estrangeira: "USD",
          valor_fob: 8000.00,
          valor_frete: 800.00,
          valor_cif: 8800.00,
          unidade_medida: "KG"
        },
        {
          linha: 3,
          codigo_pautal: "2202.10.00",
          quantidade: 2000,
          pais_origem_2: "Brasil",
          peso: 3000.10,
          moeda_estrangeira: "USD",
          valor_fob: 6000.00,
          valor_frete: 600.00,
          valor_cif: 6600.00,
          unidade_medida: "LT"
        },
        {
          linha: 4,
          codigo_pautal: "1905.90.00",
          quantidade: 800,
          pais_origem_2: "Brasil",
          peso: 2000.05,
          moeda_estrangeira: "USD",
          valor_fob: 4000.00,
          valor_frete: 400.00,
          valor_cif: 4400.00,
          unidade_medida: "KG"
        }
      ],
      pagamento: {
        metodo_avaliacao: "Valor CIF",
        banco_comercial: "Banco Millennium Atlântico",
        forma_pagamento: "Cobrança Documentária",
        qtd_volume: 180,
        codigo_volume: "VOL003",
        unidade: "Contêineres"
      },
      documentos: [
        {
          tipo_documento: "Fatura Comercial",
          caminho_arquivo: "/documentos/fatura_comercial_003.pdf",
          codigo_pre_licenciamento: "LIC2024003"
        },
        {
          tipo_documento: "Conhecimento de Embarque",
          caminho_arquivo: "/documentos/conhecimento_embarque_003.pdf",
          codigo_pre_licenciamento: "LIC2024003"
        },
        {
          tipo_documento: "Certificado Sanitário",
          caminho_arquivo: "/documentos/certificado_sanitario_003.pdf",
          codigo_pre_licenciamento: "LIC2024003"
        },
        {
          tipo_documento: "Certificado de Origem",
          caminho_arquivo: "/documentos/certificado_origem_003.pdf",
          codigo_pre_licenciamento: "LIC2024003"
        }
      ]
    }
  ]
};

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  try {
    // Limpar dados existentes
    console.log('🧹 Limpando dados existentes...');
    await prisma.documento.deleteMany();
    await prisma.mercadoria.deleteMany();
    await prisma.pagamento.deleteMany();
    await prisma.transporte.deleteMany();
    await prisma.pedido.deleteMany();
    await prisma.despachanteEmpresa.deleteMany();
    await prisma.fiabilidade.deleteMany();
    await prisma.empresa.deleteMany();
    await prisma.despachante.deleteMany();

    // Criar despachantes
    console.log('👤 Criando despachantes...');
    for (const despachanteData of seedData.despachantes) {
      await prisma.despachante.create({
        data: despachanteData
      });
      console.log(`✅ Despachante criado: ${despachanteData.nome}`);
    }

    // Criar empresas
    console.log('🏢 Criando empresas...');
    for (const empresaData of seedData.empresas) {
      await prisma.empresa.create({
        data: empresaData
      });
      console.log(`✅ Empresa criada: ${empresaData.nome}`);
    }

    // Criar fiabilizações
    console.log('📋 Criando fiabilizações...');
    for (const fiabilizacaoData of seedData.fiabilizacoes) {
      await prisma.fiabilidade.create({
        data: fiabilizacaoData
      });
      console.log(`✅ Fiabilização criada: ${fiabilizacaoData.cedula_despachante}`);
    }

    // Criar associações despachante-empresa
    console.log('🔗 Criando associações despachante-empresa...');
    const associacoesIds: { [key: string]: number } = {};
    for (const associacaoData of seedData.associacoes) {
      const associacao = await prisma.despachanteEmpresa.create({
        data: associacaoData
      });
      const key = `${associacaoData.nif_despachante}-${associacaoData.nif_empresa}`;
      associacoesIds[key] = associacao.id;
      console.log(`✅ Associação criada: ${associacaoData.nif_despachante} -> ${associacaoData.nif_empresa}`);
    }

    // Criar pedidos com relacionamentos
    console.log('📦 Criando pedidos...');
    const pedidosAssociacoes = [
      '5417039144-5401234567', // João -> Importadora Angola
      '5417039145-5401234568', // Maria -> Comercial Luanda  
      '5417039146-5401234569'  // António -> Distribuidora Benguela
    ];

    for (let i = 0; i < seedData.pedidos.length; i++) {
      const pedidoData = seedData.pedidos[i];
      const { transporte, mercadorias, pagamento, documentos, ...pedido } = pedidoData;
      const associacaoKey = pedidosAssociacoes[i];
      const despachanteEmpresaId = associacoesIds[associacaoKey];

      const createdPedido = await prisma.pedido.create({
        data: {
          ...pedido,
          despachante_empresa_id: despachanteEmpresaId,
          transporte: {
            create: transporte
          },
          mercadorias: {
            create: mercadorias
          },
          pagamento: {
            create: pagamento
          },
          documentos: {
            create: documentos
          }
        },
        include: {
          despachante_empresa: {
            include: {
              despachante: true,
              empresa: true
            }
          },
          transporte: true,
          mercadorias: true,
          pagamento: true,
          documentos: true
        }
      });

      console.log(`✅ Pedido criado: ${createdPedido.id_pedido} - ${createdPedido.nome_entidade_angola}`);
    }

    console.log('🎉 Seed concluído com sucesso!');
    console.log(`📊 Dados criados:`);
    console.log(`   - ${seedData.despachantes.length} despachantes`);
    console.log(`   - ${seedData.empresas.length} empresas`);
    console.log(`   - ${seedData.fiabilizacoes.length} fiabilizações`);
    console.log(`   - ${seedData.associacoes.length} associações despachante-empresa`);
    console.log(`   - ${seedData.pedidos.length} pedidos com todos os relacionamentos`);

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });