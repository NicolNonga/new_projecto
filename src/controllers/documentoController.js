const { prisma } = require('../config/database');

class DocumentoController {
  // Listar documentos
  async index(req, res, next) {
    try {
      const { page = 1, limit = 10, pedido_id } = req.query;
      const skip = (page - 1) * parseInt(limit);

      const where = {};
      if (pedido_id) where.pedido_id = parseInt(pedido_id);

      const [documentos, total] = await Promise.all([
        prisma.documento.findMany({
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
        prisma.documento.count({ where })
      ]);

      res.json({
        success: true,
        data: documentos,
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

  // Buscar documento por ID
  async show(req, res, next) {
    try {
      const { id } = req.params;
      
      const documento = await prisma.documento.findUnique({
        where: { id_documento: parseInt(id) },
        include: {
          pedido: true
        }
      });

      if (!documento) {
        return res.status(404).json({
          success: false,
          message: 'Documento não encontrado'
        });
      }

      res.json({
        success: true,
        data: documento
      });
    } catch (error) {
      next(error);
    }
  }

  // Criar novo documento
  async store(req, res, next) {
    try {
      const { pedido_id, tipo_documento, caminho_arquivo, codigo_pre_licenciamento } = req.body;

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

      const documento = await prisma.documento.create({
        data: {
          pedido_id: parseInt(pedido_id),
          tipo_documento,
          caminho_arquivo,
          codigo_pre_licenciamento
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
        message: 'Documento criado com sucesso',
        data: documento
      });
    } catch (error) {
      next(error);
    }
  }

  // Atualizar documento
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { tipo_documento, caminho_arquivo, codigo_pre_licenciamento } = req.body;

      const documento = await prisma.documento.update({
        where: { id_documento: parseInt(id) },
        data: {
          ...(tipo_documento && { tipo_documento }),
          ...(caminho_arquivo && { caminho_arquivo }),
          ...(codigo_pre_licenciamento && { codigo_pre_licenciamento })
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

      res.json({
        success: true,
        message: 'Documento atualizado com sucesso',
        data: documento
      });
    } catch (error) {
      next(error);
    }
  }

  // Deletar documento
  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      await prisma.documento.delete({
        where: { id_documento: parseInt(id) }
      });

      res.json({
        success: true,
        message: 'Documento deletado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DocumentoController();