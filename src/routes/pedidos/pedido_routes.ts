import PedidoController from "../../controllers/pedidos/pedido_controller";
import { validationMiddleware } from "../../middleware/validacao_middleware";
import { PedidoService } from "../../services/pedido_service";
import { createPedidoSchema } from "../../validations/pedido_validacao";
import { uploadMiddleware } from "../../middleware/file/upload.middleware";
import express from "express";
 const pedidoService  = new PedidoService()
const pedidoController   = new PedidoController(pedidoService)

const pedidoRouter =  express.Router()

pedidoRouter.get('/', pedidoController.index);
pedidoRouter.post('/', uploadMiddleware, pedidoController.criarPedido);
pedidoRouter.post('/read_file', uploadMiddleware, pedidoController.lerFicheiroText)
// pedidoRouter.get('/:id', pedidoController.show);

// pedidoRouter.put('/:id', pedidoController.update);
// pedidoRouter.delete('/:id', pedidoController.destroy);

export default pedidoRouter