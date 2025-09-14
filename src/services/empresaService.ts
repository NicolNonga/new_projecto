import prisma from '../config/database';
import { CreateEmpresaRequest, UpdateEmpresaRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

export class EmpresaService {
  async getAllEmpresas() {
    return await prisma.empresa.findMany({
      include: {
        despachante_empresas: {
          include: {
            despachante: {
              include: {
                fiabilizacao: true
              }
            },
            pedidos: {
              include: {
                transporte: true,
                mercadorias: true,
                pagamento: true,
                documentos: true,
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  async getEmpresaByNif(nif: string) {
    const empresa = await prisma.empresa.findUnique({
      where: { nif },
      include: {
        despachante_empresas: {
          include: {
            despachante: {
              include: {
                fiabilizacao: true
              }
            },
            pedidos: {
              include: {
                transporte: true,
                mercadorias: true,
                pagamento: true,
                documentos: true,
              }
            }
          }
        }
      }
    });

    if (!empresa) {
      throw new AppError('Empresa não encontrada', 404);
    }

    return empresa;
  }

  async createEmpresa(data: CreateEmpresaRequest) {
    // Verificar se já existe empresa com mesmo NIF
    const existingEmpresa = await prisma.empresa.findUnique({
      where: { nif: data.nif }
    });

    if (existingEmpresa) {
      throw new AppError('Empresa já existe com este NIF', 409);
    }

    return await prisma.empresa.create({
      data,
      include: {
        despachante_empresas: {
          include: {
            despachante: true
          }
        }
      }
    });
  }

  async updateEmpresa(nif: string, data: UpdateEmpresaRequest) {
    // Verificar se a empresa existe
    await this.getEmpresaByNif(nif);

    return await prisma.empresa.update({
      where: { nif },
      data,
      include: {
        despachante_empresas: {
          include: {
            despachante: true
          }
        }
      }
    });
  }

  async deleteEmpresa(nif: string) {
    // Verificar se a empresa existe
    await this.getEmpresaByNif(nif);

    await prisma.empresa.delete({
      where: { nif }
    });

    return { message: 'Empresa deletada com sucesso' };
  }

  async getEmpresasByDespachante(nifDespachante: string) {
    return await prisma.empresa.findMany({
      where: {
        despachante_empresas: {
          some: {
            nif_despachante: nifDespachante,
            ativo: true
          }
        }
      },
      include: {
        despachante_empresas: {
          where: {
            nif_despachante: nifDespachante
          },
          include: {
            pedidos: {
              include: {
                transporte: true,
                mercadorias: true,
                pagamento: true,
                documentos: true,
              }
            }
          }
        }
      }
    });
  }
}