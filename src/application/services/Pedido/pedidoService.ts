import { da } from "zod/v4/locales";
import { PedidoRepository } from "../../../domain/repositories/pedido/pedido_repository";
import { CreatePedidoRequest } from "../../../validations/pedido_validacao";

export class PedidoService {
  private readonly pedidoRepository: PedidoRepository;
  constructor() {
    this.pedidoRepository = new PedidoRepository();
  }

  async criarPedido(data: CreatePedidoRequest) {
    console.log("data", data);

    const pedidoCriado = await this.pedidoRepository.create(data);
    return {
      sucesso: true,
      data: {},
      message: "Pedido criado com sucesso",
    };
  }
}