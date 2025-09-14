import prisma from '../config/database';
import { CreateDespachanteRequest, UpdateDespachanteRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

export class DespachanteService {
  async getAllDespachantes() {
    return await prisma.despachante.findMany({
      include: {
        fiabilizacao: true,
        despachante_empresas: {
          include: {
            empresa: true,
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

  async getDespachanteByNif(nif: string) {
    const despachante = await prisma.despachante.findUnique({
      where: { nif },
      include: {
        fiabilizacao: true,
        despachante_empresas: {
          include: {
            empresa: true,
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

    if (!despachante) {
      throw new AppError('Despachante não encontrado', 404);
    }

    return despachante;
  }

  async createDespachante(data: CreateDespachanteRequest) {
    // Verificar se já existe despachante com mesmo NIF, email ou BI
    const existingDespachante = await prisma.despachante.findFirst({
      where: {
        OR: [
          { nif: data.nif },
          { email: data.email },
          { bilhete_identidade: data.bilhete_identidade }
        ]
      }
    });

    if (existingDespachante) {
      throw new AppError('Despachante já existe com este NIF, email ou bilhete de identidade', 409);
    }

    return await prisma.despachante.create({
      data,
      include: {
        fiabilizacao: true,
        despachante_empresas: {
          include: {
            empresa: true
          }
        }
      }
    });
  }

  async updateDespachante(nif: string, data: UpdateDespachanteRequest) {
    // Verificar se o despachante existe
    await this.getDespachanteByNif(nif);

    // Verificar conflitos se estiver atualizando email ou BI
    if (data.email || data.bilhete_identidade) {
      const existingDespachante = await prisma.despachante.findFirst({
        where: {
          AND: [
            { nif: { not: nif } },
            {
              OR: [
                ...(data.email ? [{ email: data.email }] : []),
                ...(data.bilhete_identidade ? [{ bilhete_identidade: data.bilhete_identidade }] : [])
              ]
            }
          ]
        }
      });

      if (existingDespachante) {
        throw new AppError('Já existe outro despachante com este email ou bilhete de identidade', 409);
      }
    }

    return await prisma.despachante.update({
      where: { nif },
      data,
      include: {
        fiabilizacao: true,
        despachante_empresas: {
          include: {
            empresa: true
          }
        }
      }
    });
  }

  async deleteDespachante(nif: string) {
    // Verificar se o despachante existe
    await this.getDespachanteByNif(nif);

    await prisma.despachante.delete({
      where: { nif }
    });

    return { message: 'Despachante deletado com sucesso' };
  }

  async checkFiabilizacao(nif: string) {
    const despachante = await this.getDespachanteByNif(nif);
    
    const isFiabilizado = !!despachante.fiabilizacao && 
                         new Date(despachante.fiabilizacao.validade) > new Date();

    return {
      nif: despachante.nif,
      nome: despachante.nome,
      fiabilizado: isFiabilizado,
      fiabilizacao: despachante.fiabilizacao ? {
        cedula: despachante.fiabilizacao.cedula_despachante,
        validade: despachante.fiabilizacao.validade,
        valor: despachante.fiabilizacao.valor,
        vencido: new Date(despachante.fiabilizacao.validade) <= new Date()
      } : null
    };
  }

  async associarEmpresa(nifDespachante: string, nifEmpresa: string, cargo?: string) {
    // Verificar se despachante e empresa existem
    const despachante = await this.getDespachanteByNif(nifDespachante);
    const empresa = await prisma.empresa.findUnique({ where: { nif: nifEmpresa } });
    
    if (!empresa) {
      throw new AppError('Empresa não encontrada', 404);
    }

    // Verificar se associação já existe
    const existingAssociation = await prisma.despachanteEmpresa.findUnique({
      where: {
        nif_despachante_nif_empresa: {
          nif_despachante: nifDespachante,
          nif_empresa: nifEmpresa
        }
      }
    });

    if (existingAssociation) {
      throw new AppError('Despachante já está associado a esta empresa', 409);
    }

    return await prisma.despachanteEmpresa.create({
      data: {
        nif_despachante: nifDespachante,
        nif_empresa: nifEmpresa,
        cargo,
        ativo: true
      },
      include: {
        despachante: true,
        empresa: true
      }
    });
  }

  async desassociarEmpresa(nifDespachante: string, nifEmpresa: string) {
    const association = await prisma.despachanteEmpresa.findUnique({
      where: {
        nif_despachante_nif_empresa: {
          nif_despachante: nifDespachante,
          nif_empresa: nifEmpresa
        }
      }
    });

    if (!association) {
      throw new AppError('Associação não encontrada', 404);
    }

    await prisma.despachanteEmpresa.delete({
      where: {
        nif_despachante_nif_empresa: {
          nif_despachante: nifDespachante,
          nif_empresa: nifEmpresa
        }
      }
    });

    return { message: 'Associação removida com sucesso' };
  }
}