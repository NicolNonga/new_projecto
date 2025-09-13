import { Request, Response } from 'express';
import { CreateRequest,UpdateRequest } from '../../../core/types';
import { BaseService } from '../../../services/services_select/BaseService';
import { BaseEntity } from '../../../services/services_select/BaseService';

export abstract class BaseController<T extends BaseEntity> {
  protected service: BaseService<T>;

  constructor(service: BaseService<T>) {
    this.service = service;
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data: CreateRequest = req.body;
      if (!data.codigo || !data.descricao) {
        return res.status(400).json({
          success: false,
          error: 'Código e descrição são obrigatórios',
        });
      }
      const result = await this.service.create(data);
      return result.success ? res.status(201).json(result) : res.status(400).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  };

  findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this.service.findAll();
      return result.success ? res.status(200).json(result) : res.status(500).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  };

  findById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID é obrigatório',
        });
      }
      const result = await this.service.findById(id);
      return result.success ? res.status(200).json(result) : res.status(404).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  };

  findByCodigo = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { codigo } = req.params;
      if (!codigo) {
        return res.status(400).json({
          success: false,
          error: 'Código é obrigatório',
        });
      }
      const result = await this.service.findByCodigo(codigo);
      return result.success ? res.status(200).json(result) : res.status(404).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const data: UpdateRequest = req.body;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID é obrigatório',
        });
      }
      if (!data.codigo && !data.descricao) {
        return res.status(400).json({
          success: false,
          error: 'Pelo menos um campo deve ser fornecido para atualização',
        });
      }
      const result = await this.service.update(id, data);
      return result.success ? res.status(200).json(result) : res.status(400).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID é obrigatório',
        });
      }
      const result = await this.service.delete(id);
      return result.success ? res.status(200).json(result) : res.status(404).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  };
}