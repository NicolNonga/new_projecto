import PedidoController from "../../controllers/pedidos/pedido_controller";
import { validationMiddleware } from "../../middleware/validacao_middleware";
import { PedidoService } from "../../services/pedido_service";
import { createPedidoSchema } from "../../validations/pedido_validacao";
import express from "express";
 const pedidoService  = new PedidoService()
const pedidoController   = new PedidoController(pedidoService)

const pedidoRouter =  express.Router()

pedidoRouter.get('/', pedidoController.index);
pedidoRouter.post('/', validationMiddleware(createPedidoSchema), pedidoController.criarPedido);
// pedidoRouter.get('/:id', pedidoController.show);

// pedidoRouter.put('/:id', pedidoController.update);
// pedidoRouter.delete('/:id', pedidoController.destroy);

export default pedidoRouter