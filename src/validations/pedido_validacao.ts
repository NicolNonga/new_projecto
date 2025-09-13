
// =============================================
// 1. SCHEMAS DE VALIDAÇÃO (schemas/pedido.schemas.ts)
// =============================================

import { z } from 'zod';

// Schema para Transporte
export const transporteSchema = z.object({
  meio_transporte: z.string().max(100).optional(),
  nacionalidade_meio_transporte: z.string().max(100).optional(),
  registro_meio_transporte: z.string().max(100).optional(),
  num_documento_transporte: z.string().max(100).optional(),
  estancia_aduaneira: z.string().max(100).optional(),
  porto_origem: z.string().max(100).optional(),
  posto_fronteirico: z.string().max(100).optional(),
  peso_bruto: z.number().positive().optional(),
  local_embarque: z.string().max(100).optional(),
  local_desalfandegamento: z.string().max(100).optional(),
  pais_precedencia: z.string().max(100).optional(),
  referencia_processo_interno: z.string().max(50).optional(),
});

// Schema para Mercadoria
export const mercadoriaSchema = z.object({
  linha: z.number().int().positive().optional(),
  codigo_pautal: z.string().max(100).optional(),
  quantidade: z.number().int().positive().optional(),
  pais_origem_2: z.string().max(100).optional(),
  peso: z.number().positive().optional(),
  moeda_estrangeira: z.string().max(10).optional(),
  valor_fob: z.number().positive().optional(),
  valor_frete: z.number().positive().optional(),
  valor_cif: z.number().positive().optional(),
  unidade_medida: z.string().max(20).optional(),
});

// Schema para Pagamento
export const pagamentoSchema = z.object({
  metodo_avaliacao: z.string().max(100).optional(),
  banco_comercial: z.string().max(100).optional(),
  forma_pagamento: z.string().max(100).optional(),
  qtd_volume: z.number().int().positive().optional(),
  codigo_volume: z.string().max(50).optional(),
  unidade: z.string().max(20).optional(),
});

// Schema para Documento
export const documentoSchema = z.object({
  tipo_documento: z.string().max(50).optional(),
  codigo_pre_licenciamento: z.string().max(100).optional(),
});

// Schema COMPLETO para criar pedido (com relacionamentos incluídos)
export const createPedidoSchema = z.object({
  // Dados do Pedido Principal
  codigo_multas: z.string().max(20).optional(),
  codigo_regime: z.string().max(50).optional(),
  consignatario_importador: z.string().max(255).optional(),
  codigo_avaliacao_autorizado: z.string().max(255).optional(),
  nome_entidade_angola: z.string().max(100).optional(),
  manifesto_numero: z.string().max(50).optional(),
  numero_total_adicoes: z.number().int().positive().optional(),
  despachante: z.string().max(100).optional(),
  entidade_estrangeira: z.string().max(100).optional(),
  descricao_mercadoria: z.string().optional(),
  pais_origem: z.string().max(50).optional(),
  pais_destino: z.string().max(50).optional(),
  porto_entrada: z.string().max(100).optional(),
  data_chegada: z.string().datetime().optional(),
  numero_fatura_proforma: z.string().max(100).optional(),
  
  // Arrays de entidades relacionadas (obrigatórios na criação)
  transporte: transporteSchema,              // apenas um objeto
  mercadorias: z.array(mercadoriaSchema).min(1, "Pelo menos uma mercadoria é obrigatória"), // vários itens
  pagamento: pagamentoSchema,                // apenas um objeto
  documento: documentoSchema, 
});

// Schema para atualização (só dados do pedido principal)
export const updatePedidoSchema = z.object({
  codigo_multas: z.string().max(20).optional(),
  codigo_regime: z.string().max(50).optional(),
  consignatario_importador: z.string().max(255).optional(),
  codigo_avaliacao_autorizado: z.string().max(255).optional(),
  nome_entidade_angola: z.string().max(100).optional(),
  manifesto_numero: z.string().max(50).optional(),
  numero_total_adicoes: z.number().int().positive().optional(),
  despachante: z.string().max(100).optional(),
  entidade_estrangeira: z.string().max(100).optional(),
  descricao_mercadoria: z.string().optional(),
  pais_origem: z.string().max(50).optional(),
  pais_destino: z.string().max(50).optional(),
  porto_entrada: z.string().max(100).optional(),
  data_chegada: z.string().datetime().optional(),
  numero_fatura_proforma: z.string().max(100).optional(),
});

// Schemas para atualizações individuais das entidades
export const updateTransporteSchema = transporteSchema.partial().extend({
  id_transporte: z.number().int().positive().optional()
});

export const updateMercadoriaSchema = mercadoriaSchema.partial().extend({
  id_mercadoria: z.number().int().positive().optional()
});

export const updatePagamentoSchema = pagamentoSchema.partial().extend({
  id_pagamento: z.number().int().positive().optional()
});

export const updateDocumentoSchema = documentoSchema.partial().extend({
  id_documento: z.number().int().positive().optional()
});

// Schema para queries
export const pedidoQuerySchema = z.object({
  search: z.string().optional(),
  codigo_regime: z.string().optional(),
  despachante: z.string().optional(),
  pais_origem: z.string().optional(),
  data_inicio: z.string().datetime().optional(),
  data_fim: z.string().datetime().optional(),
});

// =============================================
// 2. TYPES (types/pedido.types.ts)
// =============================================

export type CreatePedidoRequest = z.infer<typeof createPedidoSchema>;
export type UpdatePedidoRequest = z.infer<typeof updatePedidoSchema>;
export type PedidoQuery = z.infer<typeof pedidoQuerySchema>;

export type TransporteData = z.infer<typeof transporteSchema>;
export type MercadoriaData = z.infer<typeof mercadoriaSchema>;
export type PagamentoData = z.infer<typeof pagamentoSchema>;
export type DocumentoData = z.infer<typeof documentoSchema>;

export type UpdateTransporteRequest = z.infer<typeof updateTransporteSchema>;
export type UpdateMercadoriaRequest = z.infer<typeof updateMercadoriaSchema>;
export type UpdatePagamentoRequest = z.infer<typeof updatePagamentoSchema>;
export type UpdateDocumentoRequest = z.infer<typeof updateDocumentoSchema>;