import { PrismaClient } from '@prisma/client';
import { database } from '../../../../config/database';

export abstract class BaseRepository<T> {
  protected prisma: PrismaClient;
  protected  model: any; 

  constructor() {
    this.prisma = database; 
  }

  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    return await this.model.create({
      data,
    });
  }

  async findAll(): Promise<T[]> {
    return await this.model.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findUnique({
      where: { id },
    });
  }

  async findByCodigo(codigo: string): Promise<T | null> {
    return await this.model.findUnique({
      where: { codigo },
    });
  }

  async update(id: string, data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): Promise<T> {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<T> {
    return await this.model.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const item = await this.model.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!item;
  }

  async existsByCodigo(codigo: string, excludeId?: string): Promise<boolean> {
    const whereClause: any = { codigo };
    if (excludeId) {
      whereClause.id = { not: excludeId };
    }
    
    const item = await this.model.findFirst({
      where: whereClause,
      select: { id: true },
    });
    return !!item;
  }
}