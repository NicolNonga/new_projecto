import fs from 'fs/promises';
import path from 'path';
import { ReferenceData, ReferenceType, ReferenceItem, CreateReferenceItemRequest, UpdateReferenceItemRequest } from '../types/reference';
import { AppError } from '../middleware/errorHandler';

export class ReferenceService {
  private dataPath = path.join(__dirname, '../repository/referenceData.json');

  private async loadData(): Promise<ReferenceData> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new AppError('Erro ao carregar dados de referência', 500);
    }
  }

  private async saveData(data: ReferenceData): Promise<void> {
    try {
      await fs.writeFile(this.dataPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      throw new AppError('Erro ao salvar dados de referência', 500);
    }
  }

  private validateReferenceType(type: string): ReferenceType {
    const validTypes: ReferenceType[] = [
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

    if (!validTypes.includes(type as ReferenceType)) {
      throw new AppError('Tipo de referência inválido', 400);
    }

    return type as ReferenceType;
  }

  async getAllByType(type: string): Promise<ReferenceItem[]> {
    const validType = this.validateReferenceType(type);
    const data = await this.loadData();
    return data[validType] || [];
  }

  async getById(type: string, id: number): Promise<ReferenceItem> {
    const validType = this.validateReferenceType(type);
    const data = await this.loadData();
    const items = data[validType] || [];
    
    const item = items.find(item => item.id === id);
    if (!item) {
      throw new AppError('Item não encontrado', 404);
    }

    return item;
  }

  async create(type: string, itemData: CreateReferenceItemRequest): Promise<ReferenceItem> {
    const validType = this.validateReferenceType(type);
    const data = await this.loadData();
    
    if (!data[validType]) {
      data[validType] = [];
    }

    // Verificar se o código já existe
    const existingItem = data[validType].find(item => item.codigo === itemData.codigo);
    if (existingItem) {
      throw new AppError('Código já existe', 409);
    }

    // Gerar novo ID
    const maxId = data[validType].length > 0 
      ? Math.max(...data[validType].map(item => item.id))
      : 0;
    
    const newItem: ReferenceItem = {
      id: maxId + 1,
      codigo: itemData.codigo,
      descricao: itemData.descricao
    };

    data[validType].push(newItem);
    await this.saveData(data);

    return newItem;
  }

  async update(type: string, id: number, itemData: UpdateReferenceItemRequest): Promise<ReferenceItem> {
    const validType = this.validateReferenceType(type);
    const data = await this.loadData();
    const items = data[validType] || [];
    
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      throw new AppError('Item não encontrado', 404);
    }

    // Verificar se o novo código já existe (se fornecido)
    if (itemData.codigo) {
      const existingItem = items.find(item => item.codigo === itemData.codigo && item.id !== id);
      if (existingItem) {
        throw new AppError('Código já existe', 409);
      }
    }

    const updatedItem: ReferenceItem = {
      ...items[itemIndex],
      ...(itemData.codigo && { codigo: itemData.codigo }),
      ...(itemData.descricao && { descricao: itemData.descricao })
    };

    data[validType][itemIndex] = updatedItem;
    await this.saveData(data);

    return updatedItem;
  }

  async delete(type: string, id: number): Promise<void> {
    const validType = this.validateReferenceType(type);
    const data = await this.loadData();
    const items = data[validType] || [];
    
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      throw new AppError('Item não encontrado', 404);
    }

    data[validType].splice(itemIndex, 1);
    await this.saveData(data);
  }

  async getAllTypes(): Promise<{ [key: string]: ReferenceItem[] }> {
    const data = await this.loadData();
    return data;
  }
}