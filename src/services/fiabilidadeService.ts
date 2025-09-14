import prisma from '../config/database';
import { CreateFiabilidadeRequest, UpdateFiabilidadeRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

export class FiabilidadeService {
  async getAllFiabilizacoes() {
    return await prisma.fiabilidade.findMany({
      include: {
        despachante: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  async getFiabilizacaoByCedula(cedula: string) {
    const fiabilizacao = await prisma.fiabilidade.findUnique({
      where: { cedula_despachante: cedula },
      include: {
        despachante: true
      }
    });

    if (!fiabilizacao) {
      throw new AppError('Fiabilização não encontrada', 404);
    }

    return fiabilizacao;
  }

  async getFiabilizacaoByDespachante(nifDespachante: string) {
    const fiabilizacao = await prisma.fiabilidade.findUnique({
      where: { nif_despachante: nifDespachante },
      include: {
        despachante: true
      }
    });

    if (!fiabilizacao) {
      throw new AppError('Fiabilização não encontrada para este despachante', 404);
    }

    return fiabilizacao;
  }

  async createFiabilizacao(data: CreateFiabilidadeRequest) {
    // Verificar se o despachante existe
    const despachante = await prisma.despachante.findUnique({
      where: { nif: data.nif_despachante }
    });

    if (!despachante) {
      throw new AppError('Despachante não encontrado', 404);
    }

    // Verificar se já existe fiabilização para este despachante
    const existingFiabilizacao = await prisma.fiabilidade.findUnique({
      where: { nif_despachante: data.nif_despachante }
    });

    if (existingFiabilizacao) {
      throw new AppError('Despachante já possui fiabilização', 409);
    }

    // Verificar se a cédula já existe
    const existingCedula = await prisma.fiabilidade.findUnique({
      where: { cedula_despachante: data.cedula_despachante }
    });

    if (existingCedula) {
      throw new AppError('Cédula já existe', 409);
    }

    return await prisma.fiabilidade.create({
      data,
      include: {
        despachante: true
      }
    });
  }

  async updateFiabilizacao(cedula: string, data: UpdateFiabilidadeRequest) {
    // Verificar se a fiabilização existe
    await this.getFiabilizacaoByCedula(cedula);

    // Se estiver atualizando o NIF do despachante, verificar se existe
    if (data.nif_despachante) {
      const despachante = await prisma.despachante.findUnique({
        where: { nif: data.nif_despachante }
      });

      if (!despachante) {
        throw new AppError('Despachante não encontrado', 404);
      }

      // Verificar se outro despachante já tem fiabilização
      const existingFiabilizacao = await prisma.fiabilidade.findFirst({
        where: {
          AND: [
            { cedula_despachante: { not: cedula } },
            { nif_despachante: data.nif_despachante }
          ]
        }
      });

      if (existingFiabilizacao) {
        throw new AppError('Despachante já possui outra fiabilização', 409);
      }
    }

    return await prisma.fiabilidade.update({
      where: { cedula_despachante: cedula },
      data,
      include: {
        despachante: true
      }
    });
  }

  async deleteFiabilizacao(cedula: string) {
    // Verificar se a fiabilização existe
    await this.getFiabilizacaoByCedula(cedula);

    await prisma.fiabilidade.delete({
      where: { cedula_despachante: cedula }
    });

    return { message: 'Fiabilização deletada com sucesso' };
  }

  async getFiabilizacoesVencidas() {
    return await prisma.fiabilidade.findMany({
      where: {
        validade: {
          lt: new Date()
        }
      },
      include: {
        despachante: true
      },
      orderBy: {
        validade: 'desc'
      }
    });
  }

  async getFiabilizacoesVencendoEm(dias: number) {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + dias);

    return await prisma.fiabilidade.findMany({
      where: {
        AND: [
          { validade: { gte: new Date() } },
          { validade: { lte: dataLimite } }
        ]
      },
      include: {
        despachante: true
      },
      orderBy: {
        validade: 'asc'
      }
    });
  }
}