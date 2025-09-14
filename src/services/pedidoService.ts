import prisma from '../config/database';
import { CreatePedidoRequest, UpdatePedidoRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

export class PedidoService {
  async getAllPedidos() {
    return await prisma.pedido.findMany({
      include: {
        despachante_empresa: {
          include: {
            despachante: {
              include: {
                fiabilizacao: true
              }
            },
            empresa: true
          }
        },
        transporte: true,
        mercadorias: true,
        pagamento: true,
        documentos: true,
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  async getPedidoById(id: number) {
    const pedido = await prisma.pedido.findUnique({
      where: { id_pedido: id },
      include: {
        despachante_empresa: {
          include: {
            despachante: {
              include: {
                fiabilizacao: true
              }
            },
            empresa: true
          }
        },
        transporte: true,
        mercadorias: true,
        pagamento: true,
        documentos: true,
      },
    });

    if (!pedido) {
      throw new AppError('Pedido não encontrado', 404);
    }

    return pedido;
  }

  async createPedido(data: CreatePedidoRequest) {
    // Verificar se a associação despachante-empresa existe
    const despachanteEmpresa = await prisma.despachanteEmpresa.findUnique({
      where: { id: data.despachante_empresa_id }
    });

    if (!despachanteEmpresa) {
      throw new AppError('Associação despachante-empresa não encontrada', 404);
    }

    const { transporte, mercadorias, pagamento, documentos, ...pedidoData } = data;

    return await prisma.pedido.create({
      data: {
        ...pedidoData,
        transporte: {
          create: transporte,
        },
        mercadorias: {
          create: mercadorias,
        },
        pagamento: {
          create: pagamento,
        },
        documentos: {
          create: documentos,
        },
      },
      include: {
        despachante_empresa: {
          include: {
            despachante: {
              include: {
                fiabilizacao: true
              }
            },
            empresa: true
          }
        },
        transporte: true,
        mercadorias: true,
        pagamento: true,
        documentos: true,
      },
    });
  }

  async updatePedido(id: number, data: UpdatePedidoRequest) {
    // Verificar se o pedido existe
    await this.getPedidoById(id);

    // Se estiver atualizando a associação, verificar se existe
    if (data.despachante_empresa_id) {
      const despachanteEmpresa = await prisma.despachanteEmpresa.findUnique({
        where: { id: data.despachante_empresa_id }
      });

      if (!despachanteEmpresa) {
        throw new AppError('Associação despachante-empresa não encontrada', 404);
      }
    }

    const { transporte, mercadorias, pagamento, documentos, ...pedidoData } = data;

    const updateData: any = { ...pedidoData };

    if (transporte) {
      updateData.transporte = {
        upsert: {
          create: transporte,
          update: transporte,
        },
      };
    }

    if (pagamento) {
      updateData.pagamento = {
        upsert: {
          create: pagamento,
          update: pagamento,
        },
      };
    }

    if (mercadorias) {
      // Deletar mercadorias existentes e criar novas
      updateData.mercadorias = {
        deleteMany: {},
        create: mercadorias,
      };
    }

    if (documentos) {
      // Deletar documentos existentes e criar novos
      updateData.documentos = {
        deleteMany: {},
        create: documentos,
      };
    }

    return await prisma.pedido.update({
      where: { id_pedido: id },
      data: updateData,
      include: {
        despachante_empresa: {
          include: {
            despachante: {
              include: {
                fiabilizacao: true
              }
            },
            empresa: true
          }
        },
        transporte: true,
        mercadorias: true,
        pagamento: true,
        documentos: true,
      },
    });
  }

  async deletePedido(id: number) {
    // Verificar se o pedido existe
    await this.getPedidoById(id);

    await prisma.pedido.delete({
      where: { id_pedido: id },
    });

    return { message: 'Pedido deletado com sucesso' };
  }

  async getPedidosByEmpresa(nifEmpresa: string) {
    return await prisma.pedido.findMany({
      where: { 
        despachante_empresa: {
          nif_empresa: nifEmpresa
        }
      },
      include: {
        despachante_empresa: {
          include: {
            despachante: {
              include: {
                fiabilizacao: true
              }
            },
            empresa: true
          }
        },
        transporte: true,
        mercadorias: true,
        pagamento: true,
        documentos: true,
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  async getPedidosByDespachante(nifDespachante: string) {
    return await prisma.pedido.findMany({
      where: { 
        despachante_empresa: {
          nif_despachante: nifDespachante
        }
      },
      include: {
        despachante_empresa: {
          include: {
            despachante: {
              include: {
                fiabilizacao: true
              }
            },
            empresa: true
          }
        },
        transporte: true,
        mercadorias: true,
        pagamento: true,
        documentos: true,
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  async getPedidosByDespachanteEmpresa(nifDespachante: string, nifEmpresa: string) {
    return await prisma.pedido.findMany({
      where: { 
        despachante_empresa: {
          nif_despachante: nifDespachante,
          nif_empresa: nifEmpresa
        }
      },
      include: {
        despachante_empresa: {
          include: {
            despachante: {
              include: {
                fiabilizacao: true
              }
            },
            empresa: true
          }
        },
        transporte: true,
        mercadorias: true,
        pagamento: true,
        documentos: true,
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }
}