import { Prisma } from "@prisma/client";
import { database } from "../../../config/database";
import { CreatePedidoRequest, PedidoQuery } from "../../../validations/pedido_validacao";

export class PedidoRepository {
  
  // Criar pedido completo com todas as entidades relacionadas
async create(data: CreatePedidoRequest) {
  const { transporte, mercadorias, pagamento, documento, ...pedidoData } = data;
  

  try {
    return await database.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Criar pedido principal
      const pedido = await tx.pedido.create({
        data: {
          ...pedidoData,
          data_chegada: pedidoData.data_chegada
            ? new Date(pedidoData.data_chegada)
            : undefined,
        },
      });

      // 2. Criar transporte (único)
      const transporteCriado = await tx.transporte.create({
        data: {
          ...transporte,
          pedido_id: pedido.id_pedido,
        },
      });

      // 3. Criar mercadorias (array)
      const mercadoriasCriadas = await Promise.all(
        mercadorias.map((mercadoria) =>
          tx.mercadoria.create({
            data: {
              ...mercadoria,
              pedido_id: pedido.id_pedido,
            },
          })
        )
      );

      
      const pagamentoCriado = await tx.pagamento.create({
        data: {
          ...pagamento,
          pedido_id: pedido.id_pedido,
        },
      });

      // 5. Criar documento (único opcional)
      const documentoCriado = documento 
        ? await tx.documento.create({
            data: {
              ...documento,
              pedido_id: pedido.id_pedido,
            },
          })
        : null;

      // 6. Retornar pedido completo
      return {
        ...pedido,
  
      };
    });
  } catch (error: any) {
    console.log(error)
    throw new Error(`Erro ao criar pedido: ${error.message}`);
  }
}
  // Buscar todos os pedidos com filtros e paginação
  // async findMany(query: PedidoQuery) {
  //   const {  search, codigo_regime, despachante, pais_origem, data_inicio, data_fim } = query;
  //   const skip = (page - 1) * limit;

   
  //   const where: any = {};
    
  //   if (search) {
  //     where.OR = [
  //       { consignatario_importador: { contains: search, mode: 'insensitive' } },
  //       { despachante: { contains: search, mode: 'insensitive' } },
  //       { descricao_mercadoria: { contains: search, mode: 'insensitive' } },
  //       { manifesto_numero: { contains: search, mode: 'insensitive' } },
  //     ];
  //   }

  //   if (codigo_regime) where.codigo_regime = codigo_regime;
  //   if (despachante) where.despachante = { contains: despachante, mode: 'insensitive' };
  //   if (pais_origem) where.pais_origem = pais_origem;
    
  //   if (data_inicio || data_fim) {
  //     where.data_chegada = {};
  //     if (data_inicio) where.data_chegada.gte = new Date(data_inicio);
  //     if (data_fim) where.data_chegada.lte = new Date(data_fim);
  //   }

  //   const [pedidos, total] = await Promise.all([
  //     database.pedido.findMany({
  //       where,
  //       skip,
  //       take: limit,
  //       include: {
  //         transportes: true,
  //         mercadorias: true,
  //         pagamentos: true,
  //         documentos: true,
  //       },
  //       orderBy: { createdAt: 'desc' },
  //     }),
  //     database.pedido.count({ where }),
  //   ]);

  //   return { pedidos, total, page, limit, pages: Math.ceil(total / limit) };
  // }

}
