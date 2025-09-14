import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const transporteSchema = Joi.object({
  meio_transporte: Joi.string().required(),
  nacionalidade_meio_transporte: Joi.string().required(),
  registro_meio_transporte: Joi.string().required(),
  num_documento_transporte: Joi.string().required(),
  estancia_aduaneira: Joi.string().required(),
  porto_origem: Joi.string().required(),
  posto_fronteirico: Joi.string().required(),
  peso_bruto: Joi.number().positive().required(),
  local_embarque: Joi.string().required(),
  local_desalfandegamento: Joi.string().required(),
  pais_precedencia: Joi.string().required(),
  referencia_processo_interno: Joi.string().required(),
});

const mercadoriaSchema = Joi.object({
  linha: Joi.number().integer().positive().required(),
  codigo_pautal: Joi.string().required(),
  quantidade: Joi.number().integer().positive().required(),
  pais_origem_2: Joi.string().required(),
  peso: Joi.number().positive().required(),
  moeda_estrangeira: Joi.string().required(),
  valor_fob: Joi.number().positive().required(),
  valor_frete: Joi.number().positive().required(),
  valor_cif: Joi.number().positive().required(),
  unidade_medida: Joi.string().required(),
});

const pagamentoSchema = Joi.object({
  metodo_avaliacao: Joi.string().required(),
  banco_comercial: Joi.string().required(),
  forma_pagamento: Joi.string().required(),
  qtd_volume: Joi.number().integer().positive().required(),
  codigo_volume: Joi.string().required(),
  unidade: Joi.string().required(),
});

const documentoSchema = Joi.object({
  tipo_documento: Joi.string().required(),
  caminho_arquivo: Joi.string().required(),
  codigo_pre_licenciamento: Joi.string().required(),
});

const despachanteSchema = Joi.object({
  nif: Joi.string().required().min(9).max(20),
  nome: Joi.string().required().min(2).max(255),
  sexo: Joi.string().required().valid('M', 'F'),
  email: Joi.string().email().required(),
  bilhete_identidade: Joi.string().required().min(5).max(50),
  telefone: Joi.string().required().min(9).max(20),
  perfil: Joi.string().required().max(100)
});

const empresaSchema = Joi.object({
  nif: Joi.string().required().min(9).max(20),
  nome: Joi.string().required().min(2).max(255),
  endereco: Joi.string().optional().max(500),
  telefone: Joi.string().optional().min(9).max(20),
  email: Joi.string().email().optional()
});

const fiabilidadeSchema = Joi.object({
  cedula_despachante: Joi.string().required().max(50),
  nif_despachante: Joi.string().required().min(9).max(20),
  descricao: Joi.string().required(),
  emissao: Joi.date().required(),
  validade: Joi.date().required().greater(Joi.ref('emissao')),
  resgate: Joi.date().optional().allow(null),
  valor: Joi.number().positive().required()
});

const associacaoEmpresaSchema = Joi.object({
  nif_empresa: Joi.string().required().min(9).max(20),
  cargo: Joi.string().optional().max(100)
});

const createPedidoSchema = Joi.object({
  despachante_empresa_id: Joi.number().integer().positive().required(),
  codigo_multas: Joi.string().required(),
  codigo_regime: Joi.string().required(),
  consignatario_importador: Joi.string().required(),
  codigo_avaliacao_autorizado: Joi.string().required(),
  nome_entidade_angola: Joi.string().required(),
  manifesto_numero: Joi.string().required(),
  numero_total_adicoes: Joi.number().integer().positive().required(),
  entidade_estrangeira: Joi.string().required(),
  descricao_mercadoria: Joi.string().required(),
  pais_origem: Joi.string().required(),
  pais_destino: Joi.string().required(),
  porto_entrada: Joi.string().required(),
  data_chegada: Joi.string().required(),
  numero_fatura_proforma: Joi.string().required(),
  transporte: transporteSchema.required(),
  mercadorias: Joi.array().items(mercadoriaSchema).min(1).required(),
  pagamento: pagamentoSchema.required(),
  documentos: Joi.array().items(documentoSchema).min(0),
});

const updatePedidoSchema = createPedidoSchema.fork(
  Object.keys(createPedidoSchema.describe().keys),
  (schema) => schema.optional()
);

const updateDespachanteSchema = despachanteSchema.fork(
  Object.keys(despachanteSchema.describe().keys),
  (schema) => schema.optional()
);

const updateEmpresaSchema = empresaSchema.fork(
  Object.keys(empresaSchema.describe().keys),
  (schema) => schema.optional()
);

const updateFiabilidadeSchema = fiabilidadeSchema.fork(
  Object.keys(fiabilidadeSchema.describe().keys),
  (schema) => schema.optional()
);

export const validateCreateDespachante = (req: Request, res: Response, next: NextFunction) => {
  const { error } = despachanteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validateUpdateDespachante = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateDespachanteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validateCreateEmpresa = (req: Request, res: Response, next: NextFunction) => {
  const { error } = empresaSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validateUpdateEmpresa = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateEmpresaSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validateCreateFiabilidade = (req: Request, res: Response, next: NextFunction) => {
  const { error } = fiabilidadeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validateUpdateFiabilidade = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateFiabilidadeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validateAssociacaoEmpresa = (req: Request, res: Response, next: NextFunction) => {
  const { error } = associacaoEmpresaSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validateNif = (req: Request, res: Response, next: NextFunction) => {
  const { nif } = req.params;
  if (!nif || nif.length < 9 || nif.length > 20) {
    return res.status(400).json({
      success: false,
      message: 'NIF deve ter entre 9 e 20 caracteres'
    });
  }
  next();
};

export const validateCedula = (req: Request, res: Response, next: NextFunction) => {
  const { cedula } = req.params;
  if (!cedula || cedula.length < 1 || cedula.length > 50) {
    return res.status(400).json({
      success: false,
      message: 'Cédula deve ter entre 1 e 50 caracteres'
    });
  }
  next();
};

export const validateCreatePedido = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createPedidoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validateUpdatePedido = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updatePedidoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validatePedidoId = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: 'ID do pedido deve ser um número válido'
    });
  }
  next();
};