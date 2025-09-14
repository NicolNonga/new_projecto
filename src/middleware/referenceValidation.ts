import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const createReferenceItemSchema = Joi.object({
  codigo: Joi.string().required().min(1).max(50),
  descricao: Joi.string().required().min(1).max(255)
});

const updateReferenceItemSchema = Joi.object({
  codigo: Joi.string().optional().min(1).max(50),
  descricao: Joi.string().optional().min(1).max(255)
}).min(1);

export const validateCreateReferenceItem = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createReferenceItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validateUpdateReferenceItem = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateReferenceItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validateReferenceId = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: 'ID deve ser um número válido'
    });
  }
  next();
};

export const validateReferenceType = (req: Request, res: Response, next: NextFunction) => {
  const { type } = req.params;
  const validTypes = [
    'CodigoMultas',
    'CodigoRegime',
    'NacionalidadeMeioTransporte',
    'PaisOrigem',
    'PaisDestino',
    'PortoEntradaSaida',
    'MeiosTransporte',
    'EstanciasAduaneira',
    'PostoFronteirico',
    'LocalEmbarque',
    'PaisProcedencia'
  ];

  if (!validTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      message: 'Tipo de referência inválido',
      validTypes
    });
  }
  next();
};