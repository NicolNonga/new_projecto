const { prisma } = require('../config/database');

class MercadoriaController {
  // Listar mercadorias
  async index(req, res, next) {
    try {
      const { page = 1, limit = 10, pedido_id } = req.query;
      const skip = (page - 1) * parseInt(limit);

      const where = {};
      if (pedido_id) where.pedido_id = parseInt(pedido_id);

      const [mercadorias, total] = await Promise.all([
        prisma.mercadoria.findMany({
          where,
          skip,
          take: parseInt(limit),
          include: {
            pedido: {
              select: {
                id_pedido: true,
                codigo_multas: true,
                descricao_mercadoria: true
              }
            }
          }
        }),
        prisma.mercadoria.count({ where })
      ]);

      res.json({
        success: true,
        data: mercadorias,
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

  // Buscar mercadoria por ID
  async show(req, res, next) {
    try {
      const { id } = req.params;
      
      const mercadoria = await prisma.mercadoria.findUnique({
        where: { id_mercadoria: parseInt(id) },
        include: {
          pedido: true
        }
      });

      if (!mercadoria) {
        return res.status(404).json({
          success: false,
          message: 'Mercadoria não encontrada'
        });
      }

      res.json({
        success: true,
        data: mercadoria
      });
    } catch (error) {
      next(error);
    }
  }

  // Criar nova mercadoria
  async store(req, res, next) {
    try {
      const { pedido_id, ...mercadoriaData } = req.body;

      if (!pedido_id) {
        return res.status(400).json({
          success: false,
          message: 'pedido_id é obrigatório'
        });
      }

      // Verificar se o pedido existe
      const pedidoExists = await prisma.pedido.findUnique({
        where: { id_pedido: parseInt(pedido_id) }
      });

      if (!pedidoExists) {
        return res.status(400).json({
          success: false,
          message: 'Pedido não encontrado'
        });
      }

      // Converter valores numéricos
      const processedData = {
        ...mercadoriaData,
        linha: mercadoriaData.linha ? parseInt(mercadoriaData.linha) : null,
        quantidade: mercadoriaData.quantidade ? parseInt(mercadoriaData.quantidade) : null,
        peso: mercadoriaData.peso ? parseFloat(mercadoriaData.peso) : null,
        valor_fob: mercadoriaData.valor_fob ? parseFloat(mercadoriaData.valor_fob) : null,
        valor_frete: mercadoriaData.valor_frete ? parseFloat(mercadoriaData.valor_frete) : null,
        valor_cif: mercadoriaData.valor_cif ? parseFloat(mercadoriaData.valor_cif) : null
      };

      const mercadoria = await prisma.mercadoria.create({
        data: {
          pedido_id: parseInt(pedido_id),
          ...processedData
        },
        include: {
          pedido: {
            select: {
              id_pedido: true,
              codigo_multas: true,
              descricao_mercadoria: true
            }
          }
        }
      });

      res.status(201).json({
        success: true,
        message: 'Mercadoria criada com sucesso',
        data: mercadoria
      });
    } catch (error) {
      next(error);
    }
  }

  // Atualizar mercadoria
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      // Converter valores numéricos
      if (updateData.linha) updateData.linha = parseInt(updateData.linha);
      if (updateData.quantidade) updateData.quantidade = parseInt(updateData.quantidade);
      if (updateData.peso) updateData.peso = parseFloat(updateData.peso);
      if (updateData.valor_fob) updateData.valor_fob = parseFloat(updateData.valor_fob);
      if (updateData.valor_frete) updateData.valor_frete = parseFloat(updateData.valor_frete);
      if (updateData.valor_cif) updateData.valor_cif = parseFloat(updateData.valor_cif);

      const mercadoria = await prisma.mercadoria.update({
        where: { id_mercadoria: parseInt(id) },
        data: updateData,
        include: {
          pedido: {
            select: {
              id_pedido: true,
              codigo_multas: true,
              descricao_mercadoria: true
            }
          }
        }
      });

      res.json({
        success: true,
        message: 'Mercadoria atualizada com sucesso',
        data: mercadoria
      });
    } catch (error) {
      next(error);
    }
  }

  // Deletar mercadoria
  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      await prisma.mercadoria.delete({
        where: { id_mercadoria: parseInt(id) }
      });

      res.json({
        success: true,
        message: 'Mercadoria deletada com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MercadoriaController();