const { prisma } = require('../config/database');

class PedidoController {
  // Listar todos os pedidos
  async index(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);

      const [pedidos, total] = await Promise.all([
        prisma.pedido.findMany({
          skip,
          take: parseInt(limit),
          include: {
            _count: {
              select: {
                transportes: true,
                mercadorias: true,
                pagamentos: true,
                documentos: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }),
        prisma.pedido.count()
      ]);

      res.json({
        success: true,
        data: pedidos,
        pagination: {
          current_page: parseInt(page),
          total_pages: Math.ceil(total / limit),
          total_items: total
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Buscar pedido por ID (com todos os relacionamentos)
  async show(req, res, next) {
    try {
      const { id } = req.params;
      
      const pedido = await prisma.pedido.findUnique({
        where: { id_pedido: parseInt(id) },
        include: {
          transportes: true,
          mercadorias: true,
          pagamentos: true,
          documentos: true
        }
      });

      if (!pedido) {
        return res.status(404).json({
          success: false,
          message: 'Pedido não encontrado'
        });
      }

      res.json({
        success: true,
        data: pedido
      });
    } catch (error) {
      next(error);
    }
  }

  // Criar novo pedido
  async store(req, res, next) {
    try {
      const {
        codigo_multas,
        codigo_regime,
        consignatario_importador,
        codigo_avaliacao_autorizado,
        nome_entidade_angola,
        manifesto_numero,
        numero_total_adicoes,
        despachante,
        entidade_estrangeira,
        descricao_mercadoria,
        pais_origem,
        pais_destino,
        porto_entrada,
        data_chegada,
        numero_fatura_proforma
      } = req.body;

      const pedido = await prisma.pedido.create({
        data: {
          codigo_multas,
          codigo_regime,
          consignatario_importador,
          codigo_avaliacao_autorizado,
          nome_entidade_angola,
          manifesto_numero,
          numero_total_adicoes,
          despachante,
          entidade_estrangeira,
          descricao_mercadoria,
          pais_origem,
          pais_destino,
          porto_entrada,
          data_chegada: data_chegada ? new Date(data_chegada) : null,
          numero_fatura_proforma
        }
      });

      res.status(201).json({
        success: true,
        message: 'Pedido criado com sucesso',
        data: pedido
      });
    } catch (error) {
      next(error);
    }
  }

  // Atualizar pedido
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      // Converter data_chegada se fornecida
      if (updateData.data_chegada) {
        updateData.data_chegada = new Date(updateData.data_chegada);
      }

      // Converter numero_total_adicoes para número se fornecido
      if (updateData.numero_total_adicoes) {
        updateData.numero_total_adicoes = parseInt(updateData.numero_total_adicoes);
      }

      const pedido = await prisma.pedido.update({
        where: { id_pedido: parseInt(id) },
        data: updateData
      });

      res.json({
        success: true,
        message: 'Pedido atualizado com sucesso',
        data: pedido
      });
    } catch (error) {
      next(error);
    }
  }

  // Deletar pedido
  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      await prisma.pedido.delete({
        where: { id_pedido: parseInt(id) }
      });

      res.json({
        success: true,
        message: 'Pedido deletado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PedidoController();