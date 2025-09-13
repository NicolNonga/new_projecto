import { da } from "zod/v4/locales";
import { PedidoRepository } from "../core/repository/pedido/pedido_repository";
import { CreatePedidoRequest } from "../validations/pedido_validacao";
import { PedidoFiltrosInterface } from "../core/interfaces/pedidoInterface";

export class PedidoService {
    private readonly pedidoRepository : PedidoRepository
    constructor(){
        this.pedidoRepository = new PedidoRepository

    }

    async criarPedido(data:CreatePedidoRequest){


          const pedidoCriado = await this.pedidoRepository.create(data)
             return {
                sucesso: true,
                data: pedidoCriado,
                message: 'Pedido criado com sucesso'
             }

    }

    async listar(page:number,limit: number, filtros: any){
        return  this.pedidoRepository.findMany(page, limit, filtros)

    }
}