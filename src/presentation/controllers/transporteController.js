const { prisma } = require('../config/database');

class TransporteController {
  // Listar transportes
  async index(req, res, next) {
    try {
      const { page = 1, limit = 10, pedido_id } = req.query;
      const skip = (page - 1) * parseInt(limit);

      const where = {};
      if (pedido_id) where.pedido_id = parseInt(pedido_id);

      const [transportes, total] = await Promise.all([
        prisma.transporte.findMany({
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
        prisma.transporte.count({ where })
      ]);

      res.json({
        success: true,
        data: transportes,
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

  // Buscar transporte por ID
  async show(req, res, next) {
    try {
      const { id } = req.params;
      
      const transporte = await prisma.transporte.findUnique({
        where: { id_transporte: parseInt(id) },
        include: {
          pedido: true
        }
      });

      if (!transporte) {
        return res.status(404).json({
          success: false,
          message: 'Transporte não encontrado'
        });
      }

      res.json({
        success: true,
        data: transporte
      });
    } catch (error) {
      next(error);
    }
  }

  // Criar novo transporte
  async store(req, res, next) {
    try {
      const { pedido_id, ...transporteData } = req.body;

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

      const transporte = await prisma.transporte.create({
        data: {
          pedido_id: parseInt(pedido_id),
          ...transporteData,
          peso_bruto: transporteData.peso_bruto ? parseFloat(transporteData.peso_bruto) : null
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
        message: 'Transporte criado com sucesso',
        data: transporte
      });
    } catch (error) {
      next(error);
    }
  }

  // Atualizar transporte
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      // Converter peso_bruto se fornecido
      if (updateData.peso_bruto) {
        updateData.peso_bruto = parseFloat(updateData.peso_bruto);
      }

      const transporte = await prisma.transporte.update({
        where: { id_transporte: parseInt(id) },
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
        message: 'Transporte atualizado com sucesso',
        data: transporte
      });
    } catch (error) {
      next(error);
    }
  }

  // Deletar transporte
  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      await prisma.transporte.delete({
        where: { id_transporte: parseInt(id) }
      });

      res.json({
        success: true,
        message: 'Transporte deletado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TransporteController();