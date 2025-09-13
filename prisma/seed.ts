import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed do banco de dados...');

  // Seed para CodigoMulta
  console.log(' Inserindo códigos de multa...');
  const codigosMulta = [
    { codigo: '001', descricao: 'Excesso de velocidade até 20% acima do limite' },
    { codigo: '002', descricao: 'Excesso de velocidade entre 20% e 50% acima do limite' },
    { codigo: '003', descricao: 'Excesso de velocidade acima de 50% do limite' },
    { codigo: '004', descricao: 'Dirigir sob influência de álcool' },
    { codigo: '005', descricao: 'Não usar cinto de segurança' },
    { codigo: '006', descricao: 'Usar telefone celular ao dirigir' },
    { codigo: '007', descricao: 'Estacionar em local proibido' },
    { codigo: '008', descricao: 'Avançar sinal vermelho' },
  ];

  for (const multa of codigosMulta) {
    await prisma.codigoMulta.upsert({
      where: { codigo: multa.codigo },
      update: {},
      create: multa,
    });
  }

  // Seed para CodigoRegime
  console.log('Inserindo códigos de regime...');
  const codigosRegime = [
    { codigo: 'REG001', descricao: 'Regime de Importação Comum' },
    { codigo: 'REG002', descricao: 'Regime de Exportação Comum' },
    { codigo: 'REG003', descricao: 'Regime de Trânsito Aduaneiro' },
    { codigo: 'REG004', descricao: 'Regime de Entreposto Aduaneiro' },
    { codigo: 'REG005', descricao: 'Regime de Zona Franca' },
    { codigo: 'REG006', descricao: 'Regime de Drawback' },
    { codigo: 'REG007', descricao: 'Regime de Admissão Temporária' },
  ];

  for (const regime of codigosRegime) {
    await prisma.codigoRegime.upsert({
      where: { codigo: regime.codigo },
      update: {},
      create: regime,
    });
  }

  // Seed para NacionalidadeMeioTransporte
  console.log('Inserindo nacionalidades de meio de transporte...');
  const nacionalidadesTransporte = [
    { codigo: 'BR', descricao: 'Brasileiro' },
    { codigo: 'AR', descricao: 'Argentino' },
    { codigo: 'UY', descricao: 'Uruguaio' },
    { codigo: 'PY', descricao: 'Paraguaio' },
    { codigo: 'CL', descricao: 'Chileno' },
    { codigo: 'BO', descricao: 'Boliviano' },
    { codigo: 'PE', descricao: 'Peruano' },
    { codigo: 'US', descricao: 'Americano' },
  ];

  for (const nacionalidade of nacionalidadesTransporte) {
    await prisma.nacionalidadeMeioTransporte.upsert({
      where: { codigo: nacionalidade.codigo },
      update: {},
      create: nacionalidade,
    });
  }

  // Seed para PaisOrigem
  console.log('Inserindo países de origem...');
  const paisesOrigem = [
    { codigo: 'BR', descricao: 'Brasil' },
    { codigo: 'AR', descricao: 'Argentina' },
    { codigo: 'UY', descricao: 'Uruguai' },
    { codigo: 'PY', descricao: 'Paraguai' },
    { codigo: 'CL', descricao: 'Chile' },
    { codigo: 'BO', descricao: 'Bolívia' },
    { codigo: 'PE', descricao: 'Peru' },
    { codigo: 'CO', descricao: 'Colômbia' },
    { codigo: 'VE', descricao: 'Venezuela' },
    { codigo: 'EC', descricao: 'Equador' },
    { codigo: 'US', descricao: 'Estados Unidos' },
    { codigo: 'CN', descricao: 'China' },
  ];

  for (const pais of paisesOrigem) {
    await prisma.paisOrigem.upsert({
      where: { codigo: pais.codigo },
      update: {},
      create: pais,
    });
  }

  // Seed para PaisDestino
  console.log('Inserindo países de destino...');
  const paisesDestino = [
    { codigo: 'BR', descricao: 'Brasil' },
    { codigo: 'AR', descricao: 'Argentina' },
    { codigo: 'UY', descricao: 'Uruguai' },
    { codigo: 'PY', descricao: 'Paraguai' },
    { codigo: 'CL', descricao: 'Chile' },
    { codigo: 'BO', descricao: 'Bolívia' },
    { codigo: 'PE', descricao: 'Peru' },
    { codigo: 'CO', descricao: 'Colômbia' },
    { codigo: 'US', descricao: 'Estados Unidos' },
    { codigo: 'DE', descricao: 'Alemanha' },
    { codigo: 'FR', descricao: 'França' },
    { codigo: 'IT', descricao: 'Itália' },
  ];

  for (const pais of paisesDestino) {
    await prisma.paisDestino.upsert({
      where: { codigo: pais.codigo },
      update: {},
      create: pais,
    });
  }

  // Seed para PortoEntradaSaida
  console.log('Inserindo portos de entrada e saída...');
  const portosEntradaSaida = [
    { codigo: 'BRSSZ', descricao: 'Porto de Santos - SP' },
    { codigo: 'BRRIO', descricao: 'Porto do Rio de Janeiro - RJ' },
    { codigo: 'BRPNG', descricao: 'Porto de Paranaguá - PR' },
    { codigo: 'BRRIG', descricao: 'Porto do Rio Grande - RS' },
    { codigo: 'BRFOR', descricao: 'Porto de Fortaleza - CE' },
    { codigo: 'BRSSA', descricao: 'Porto de Salvador - BA' },
    { codigo: 'BRVIX', descricao: 'Porto de Vitória - ES' },
    { codigo: 'BRPEC', descricao: 'Porto de Recife - PE' },
    { codigo: 'BRMAN', descricao: 'Porto de Manaus - AM' },
    { codigo: 'BRBEL', descricao: 'Porto de Belém - PA' },
  ];

  for (const porto of portosEntradaSaida) {
    await prisma.portoEntradaSaida.upsert({
      where: { codigo: porto.codigo },
      update: {},
      create: porto,
    });
  }

  // Seed para MeioTransporte
  console.log('Inserindo meios de transporte...');
  const meiosTransporte = [
    { codigo: 'ROD', descricao: 'Rodoviário' },
    { codigo: 'FER', descricao: 'Ferroviário' },
    { codigo: 'MAR', descricao: 'Marítimo' },
    { codigo: 'AER', descricao: 'Aéreo' },
    { codigo: 'FLU', descricao: 'Fluvial' },
    { codigo: 'LAC', descricao: 'Lacustre' },
    { codigo: 'DUT', descricao: 'Dutoviário' },
    { codigo: 'MUL', descricao: 'Multimodal' },
  ];

  for (const meio of meiosTransporte) {
    await prisma.meioTransporte.upsert({
      where: { codigo: meio.codigo },
      update: {},
      create: meio,
    });
  }

  // Seed para EstanciaAduaneira
  console.log('Inserindo estâncias aduaneiras...');
  const estanciasAduaneiras = [
    { codigo: 'SP001', descricao: 'Alfândega do Porto de Santos' },
    { codigo: 'RJ001', descricao: 'Alfândega do Porto do Rio de Janeiro' },
    { codigo: 'PR001', descricao: 'Alfândega do Porto de Paranaguá' },
    { codigo: 'RS001', descricao: 'Alfândega do Porto do Rio Grande' },
    { codigo: 'GRU01', descricao: 'Alfândega do Aeroporto de Guarulhos' },
    { codigo: 'GIG01', descricao: 'Alfândega do Aeroporto do Galeão' },
    { codigo: 'BSB01', descricao: 'Alfândega do Aeroporto de Brasília' },
    { codigo: 'URU01', descricao: 'Alfândega de Uruguaiana - RS' },
    { codigo: 'FOZ01', descricao: 'Alfândega de Foz do Iguaçu - PR' },
  ];

  for (const estancia of estanciasAduaneiras) {
    await prisma.estanciaAduaneira.upsert({
      where: { codigo: estancia.codigo },
      update: {},
      create: estancia,
    });
  }

  // Seed para PostoFronteirico
  console.log('Inserindo postos fronteiriços...');
  const postosFronteiricos = [
    { codigo: 'URU001', descricao: 'Posto Fronteiriço de Uruguaiana/Paso de los Libres' },
    { codigo: 'FOZ001', descricao: 'Posto Fronteiriço de Foz do Iguaçu/Puerto Iguazu' },
    { codigo: 'SAN001', descricao: 'Posto Fronteiriço de Santana do Livramento/Rivera' },
    { codigo: 'CHU001', descricao: 'Posto Fronteiriço de Chuí/Chuy' },
    { codigo: 'QUA001', descricao: 'Posto Fronteiriço de Quaraí/Artigas' },
    { codigo: 'JAG001', descricao: 'Posto Fronteiriço de Jaguarão/Rio Branco' },
    { codigo: 'BAR001', descricao: 'Posto Fronteiriço de Barra do Quaraí/Bella Unión' },
    { codigo: 'COR001', descricao: 'Posto Fronteiriço de Corumbá/Puerto Quijarro' },
  ];

  for (const posto of postosFronteiricos) {
    await prisma.postoFronteirico.upsert({
      where: { codigo: posto.codigo },
      update: {},
      create: posto,
    });
  }

  // Seed para LocalEmbarque
  console.log('Inserindo locais de embarque...');
  const locaisEmbarque = [
    { codigo: 'SP-SAN', descricao: 'Terminal de Contêineres de Santos' },
    { codigo: 'RJ-RIO', descricao: 'Terminal de Contêineres do Rio de Janeiro' },
    { codigo: 'PR-PNG', descricao: 'Terminal de Contêineres de Paranaguá' },
    { codigo: 'RS-RIG', descricao: 'Terminal de Contêineres do Rio Grande' },
    { codigo: 'SP-GRU', descricao: 'Terminal de Cargas do Aeroporto de Guarulhos' },
    { codigo: 'RJ-GIG', descricao: 'Terminal de Cargas do Aeroporto do Galeão' },
    { codigo: 'CE-FOR', descricao: 'Terminal de Contêineres de Fortaleza' },
    { codigo: 'BA-SSA', descricao: 'Terminal de Contêineres de Salvador' },
    { codigo: 'ES-VIX', descricao: 'Terminal de Contêineres de Vitória' },
  ];

  for (const local of locaisEmbarque) {
    await prisma.localEmbarque.upsert({
      where: { codigo: local.codigo },
      update: {},
      create: local,
    });
  }

  // Seed para PaisProcedencia
  console.log('Inserindo países de procedência...');
  const paisesProcedencia = [
    { codigo: 'BR', descricao: 'Brasil' },
    { codigo: 'AR', descricao: 'Argentina' },
    { codigo: 'UY', descricao: 'Uruguai' },
    { codigo: 'PY', descricao: 'Paraguai' },
    { codigo: 'CL', descricao: 'Chile' },
    { codigo: 'BO', descricao: 'Bolívia' },
    { codigo: 'PE', descricao: 'Peru' },
    { codigo: 'CO', descricao: 'Colômbia' },
    { codigo: 'US', descricao: 'Estados Unidos' },
    { codigo: 'CN', descricao: 'China' },
    { codigo: 'JP', descricao: 'Japão' },
    { codigo: 'KR', descricao: 'Coreia do Sul' },
    { codigo: 'DE', descricao: 'Alemanha' },
    { codigo: 'FR', descricao: 'França' },
    { codigo: 'IT', descricao: 'Itália' },
  ];

  for (const pais of paisesProcedencia) {
    await prisma.paisProcedencia.upsert({
      where: { codigo: pais.codigo },
      update: {},
      create: pais,
    });
  }

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(' Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });