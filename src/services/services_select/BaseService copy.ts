import { CreateRequest, UpdateRequest, ApiResponse } from '../types';
import { BaseRepository } from '../repositories/BaseRepository';

export abstract class BaseService<T> {
  protected repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async create(data: CreateRequest): Promise<ApiResponse<T>> {
    try {
      // Verificar se o código já existe
      const existingItem = await this.repository.findByCodigo(data.codigo);
      if (existingItem) {
        return {
          success: false,
          error: 'Código já existe no sistema',
        };
      }

      const item = await this.repository.create(data);
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
      // Verificar se o item existe
      const existingItem = await this.repository.findById(id);
      if (!existingItem) {
        return {
          success: false,
          error: 'Item não encontrado',
        };
      }

      // Se estiver atualizando o código, verificar se não existe outro item com o mesmo código
      if (data.codigo) {
        const itemWithSameCode = await this.repository.existsByCodigo(data.codigo, id);
        if (itemWithSameCode) {
          return {
            success: false,
            error: 'Já existe outro item com este código',
          };
        }
      }

      const updatedItem = await this.repository.update(id, data);
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

