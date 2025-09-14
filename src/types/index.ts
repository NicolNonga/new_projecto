// Tipo para o Despachante
export interface Despachante {
  nif: string;
  nome: string;
  sexo: string;
  email: string;
  bilhete_identidade: string;
  telefone: string;
  perfil: string;
  created_at?: Date;
  updated_at?: Date;
  fiabilizacao?: Fiabilidade; 
  empresas?: Empresa[]; 
  pedidos?: Pedido[]; 
}

// Tipo para Fiabilidade
export interface Fiabilidade {
  cedula_despachante: string;
  nif_despachante: string;
  descricao: string;
  emissao: Date;
  validade: Date;
  resgate: Date | null;
  valor: number;
  created_at?: Date;
  updated_at?: Date;
  despachante?: Despachante;
}

// Tipo para Empresa
export interface Empresa {
  nif: string;
  nome: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
  despachantes?: Despachante[]; 
  pedidos?: Pedido[]; 
}

// Tipo para a tabela de junção Despachante_Empresa
export interface DespachanteEmpresa {
  id?: number; 
  nif_despachante: string;
  nif_empresa: string;
  data_associacao?: Date;
  ativo?: boolean;
  cargo?: string;
  created_at?: Date;
  updated_at?: Date;
  pedidos?: Pedido[]; 

  despachante?: Despachante;
  empresa?: Empresa;
}

// Tipo para Pedido (sempre associado a uma DespachanteEmpresa)
export interface Pedido {
  id_pedido: number;
  codigo_multas: string;
  codigo_regime: string;
  consignatario_importador: string;
  codigo_avaliacao_autorizado: string;
  nome_entidade_angola: string;
  manifesto_numero: string;
  numero_total_adicoes: number;
  despachante_empresa_id: number;
  entidade_estrangeira: string;
  descricao_mercadoria: string;
  pais_origem: string;
  pais_destino: string;
  porto_entrada: string;
  data_chegada: string;
  numero_fatura_proforma: string;
  created_at?: Date;
  updated_at?: Date;
  transporte?: Transporte;
  mercadorias?: Mercadoria[];
  pagamento?: Pagamento;
  documentos?: Documento[];
  despachante_empresa?: DespachanteEmpresa;
}

export interface Transporte {
  id_transporte: number;
  pedido_id: number;
  meio_transporte: string;
  nacionalidade_meio_transporte: string;
  registro_meio_transporte: string;
  num_documento_transporte: string;
  estancia_aduaneira: string;
  porto_origem: string;
  posto_fronteirico: string;
  peso_bruto: number;
  local_embarque: string;
  local_desalfandegamento: string;
  pais_precedencia: string;
  referencia_processo_interno: string;
}

export interface Mercadoria {
  id_mercadoria: number;
  pedido_id: number;
  linha: number;
  codigo_pautal: string;
  quantidade: number;
  pais_origem_2: string;
  peso: number;
  moeda_estrangeira: string;
  valor_fob: number;
  valor_frete: number;
  valor_cif: number;
  unidade_medida: string;
}

export interface Pagamento {
  id_pagamento: number;
  pedido_id: number;
  metodo_avaliacao: string;
  banco_comercial: string;
  forma_pagamento: string;
  qtd_volume: number;
  codigo_volume: string;
  unidade: string;
}

export interface Documento {
  id_documento: number;
  pedido_id: number;
  tipo_documento: string;
  caminho_arquivo: string;
  codigo_pre_licenciamento: string;
}

// Request types
export type CreateDespachanteRequest = Omit<Despachante, 'created_at' | 'updated_at' | 'fiabilizacao' | 'empresas' | 'pedidos'>;
export type UpdateDespachanteRequest = Partial<CreateDespachanteRequest>;

export type CreateEmpresaRequest = Omit<Empresa, 'created_at' | 'updated_at' | 'despachantes' | 'pedidos'>;
export type UpdateEmpresaRequest = Partial<CreateEmpresaRequest>;

export type CreateFiabilidadeRequest = Omit<Fiabilidade, 'created_at' | 'updated_at' | 'despachante'>;
export type UpdateFiabilidadeRequest = Partial<CreateFiabilidadeRequest>;

export type CreateDespachanteEmpresaRequest = Omit<DespachanteEmpresa, 'id' | 'created_at' | 'updated_at' | 'pedidos' | 'despachante' | 'empresa'>;
export type UpdateDespachanteEmpresaRequest = Partial<CreateDespachanteEmpresaRequest>;

export type CreatePedidoRequest = Omit<Pedido, 'id_pedido' | 'created_at' | 'updated_at' | 'despachante_empresa'> & {
  transporte: Omit<Transporte, 'id_transporte' | 'pedido_id'>;
  mercadorias: Array<Omit<Mercadoria, 'id_mercadoria' | 'pedido_id'>>;
  pagamento: Omit<Pagamento, 'id_pagamento' | 'pedido_id'>;
  documentos: Array<Omit<Documento, 'id_documento' | 'pedido_id'>>;
};

export type UpdatePedidoRequest = Partial<CreatePedidoRequest>;