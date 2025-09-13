
import { Request, Response } from "express";
import { PedidoService } from "../../services/pedidoService";
import { CreatePedidoRequest, createPedidoSchema } from "../../validations/pedido_validacao";
import { database } from "../../config/database";
export default class PedidoController{

  constructor(private pedidoService: PedidoService){
  }
 criarPedido = async(request: Request, response: Response):Promise<Response> =>{
  
   const data: CreatePedidoRequest =request.body
    const result = await this.pedidoService.criarPedido(data)

    
    return response.status(201).send(result)

      
  }

   async index(request:Request, response:Response) {
    try {
     const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 10;
    const skip = (page - 1) * limit;


      const [pedidos, total] = await Promise.all([
        database.pedido.findMany({
          skip,
          take: limit,
          
          include: {
          transportes: true,
          mercadorias: true,
          pagamentos: true,
          documentos: true,
            _count: {
              select: {
                mercadorias: true,
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }),
        database.pedido.count()
      ]);

      response.json({
        data: pedidos,
        pagination: {
          current_page: limit,
          total_pages: Math.ceil(total / limit),
          total_items: total
        }
      });
    } catch (error) {
    
    }
  }

}