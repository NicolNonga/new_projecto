import { CreateRequest, UpdateRequest, ApiResponse  } from '../../core/types';
import { BaseRepository } from '../../core/repository/pedido/repositories_selects/BaseRepository';

export interface BaseEntity {
  id?: string;
  codigo: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class BaseService<T extends BaseEntity> {
  protected repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async create(data: CreateRequest): Promise<ApiResponse<T>> {
    try {
      const existingItem = await this.repository.findByCodigo(data.codigo);
      if (existingItem) {
        return {
          success: false,
          error: 'Código já existe no sistema',
        };
      }

      const createData = {
        codigo: data.codigo,
        descricao: data.descricao
      } as Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
      
      const item = await this.repository.create(createData);
      
      return {
        success: true,
        data: item,
        message: 'Item criado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };
    }
  }

  async findAll(): Promise<ApiResponse<T[]>> {
    try {
      const items = await this.repository.findAll();
      return {
        success: true,
        data: items,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };
    }
  }

  async findById(id: string): Promise<ApiResponse<T>> {
    try {
      const item = await this.repository.findById(id);
      if (!item) {
        return {
          success: false,
          error: 'Item não encontrado',
        };
      }
      return {
        success: true,
        data: item,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };
    }
  }

  async findByCodigo(codigo: string): Promise<ApiResponse<T>> {
    try {
      const item = await this.repository.findByCodigo(codigo);
      if (!item) {
        return {
          success: false,
          error: 'Item não encontrado',
        };
      }
      return {
        success: true,
        data: item,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };
    }
  }

  async update(id: string, data: UpdateRequest): Promise<ApiResponse<T>> {
    try {
      const existingItem = await this.repository.findById(id);
      if (!existingItem) {
        return {
          success: false,
          error: 'Item não encontrado',
        };
      }

      if (data.codigo) {
        const itemWithSameCode = await this.repository.existsByCodigo(data.codigo, id);
        if (itemWithSameCode) {
          return {
            success: false,
            error: 'Já existe outro item com este código',
          };
        }
      }

      const updateData: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>> = {};
      if (data.codigo !== undefined) updateData.codigo = data.codigo;
      if (data.descricao !== undefined) updateData.descricao = data.descricao;
      
      const updatedItem = await this.repository.update(id, updateData);
      
      return {
        success: true,
        data: updatedItem,
        message: 'Item atualizado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };
    }
  }

  async delete(id: string): Promise<ApiResponse<T>> {
    try {
      const existingItem = await this.repository.findById(id);
      if (!existingItem) {
        return {
          success: false,
          error: 'Item não encontrado',
        };
      }

      const deletedItem = await this.repository.delete(id);
      return {
        success: true,
        data: deletedItem,
        message: 'Item excluído com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };
    }
  }
}