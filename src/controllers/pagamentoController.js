const { prisma } = require('../config/database');

class PagamentoController {
  // Listar pagamentos
  async index(req, res, next) {
    try {
      const { page = 1, limit = 10, pedido_id } = req.query;
      const skip = (page - 1) * parseInt(limit);

      const where = {};
      if (pedido_id) where.pedido_id = parseInt(pedido_id);

      const [pagamentos, total] = await Promise.all([
        prisma.pagamento.findMany({
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
        prisma.pagamento.count({ where })
      ]);

      res.json({
        success: true,
        data: pagamentos,
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

  // Buscar pagamento por ID
  async show(req, res, next) {
    try {
      const { id } = req.params;
      
      const pagamento = await prisma.pagamento.findUnique({
        where: { id_pagamento: parseInt(id) },
        include: {
          pedido: true
        }
      });

      if (!pagamento) {
        return res.status(404).json({
          success: false,
          message: 'Pagamento não encontrado'
        });
      }

      res.json({
        success: true,
        data: pagamento
      });
    } catch (error) {
      next(error);
    }
  }

  // Criar novo pagamento
  async store(req, res, next) {
    try {
      const { pedido_id, ...pagamentoData } = req.body;

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

      const pagamento = await prisma.pagamento.create({
        data: {
          pedido_id: parseInt(pedido_id),
          ...pagamentoData,
          qtd_volume: pagamentoData.qtd_volume ? parseInt(pagamentoData.qtd_volume) : null
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
        message: 'Pagamento criado com sucesso',
        data: pagamento
      });
    } catch (error) {
      next(error);
    }
  }

  // Atualizar pagamento
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      // Converter qtd_volume se fornecido
      if (updateData.qtd_volume) {
        updateData.qtd_volume = parseInt(updateData.qtd_volume);
      }

      const pagamento = await prisma.pagamento.update({
        where: { id_pagamento: parseInt(id) },
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
        message: 'Pagamento atualizado com sucesso',
        data: pagamento
      });
    } catch (error) {
      next(error);
    }
  }

  // Deletar pagamento
  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      await prisma.pagamento.delete({
        where: { id_pagamento: parseInt(id) }
      });

      res.json({
        success: true,
        message: 'Pagamento deletado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PagamentoController();