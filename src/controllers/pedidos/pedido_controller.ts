
import { Request, Response } from "express";
import { PedidoService } from "../../services/pedido_service";
import { CreatePedidoRequest, createPedidoSchema } from "../../validations/pedido_validacao";
import { database } from "../../config/database";
import { PedidoFiltrosInterface } from "../../core/interfaces/pedidoInterface";
export default class PedidoController{

  constructor(private pedidoService: PedidoService){
  }
 criarPedido = async(request: Request, response: Response):Promise<Response> =>{
  



   const file  = request.file;
   console.log(file)
   const caminho_arquivo = `/uploads/${file?.originalname}`;
    const transporte = request.body.transporte ? JSON.parse(request.body.transporte) : undefined;
    const mercadorias = request.body.mercadorias ? JSON.parse(request.body.mercadorias) : undefined;
    const pagamento = request.body.pagamento ? JSON.parse(request.body.pagamento) : undefined;
    const documento = request.body.documento ? JSON.parse(request.body.documento) : undefined;

        // Campos simples e numéricos
    // const numero_total_adicoes = req.body.numero_total_adicoes ? Number(req.body.numero_total_adicoes) : undefined;
    // const data_chegada = req.body.data_chegada ? new Date(req.body.data_chegada) : undefined;

    // Montar payload final
    const payload = {
      transporte,
      mercadorias,
      pagamento,
      documento,

    };

    const result = await this.pedidoService.criarPedido({payload, caminho_arquivo: caminho_arquivo})

    
    return response.status(201).send(result)

      
  }

    index = async (request:Request, response:Response)  => {
       const page = Number(request.query.page) || 1;
        const limit = Number(request.query.limit) || 10;
        const {...filtros } = request.query 
        console.log(filtros)
       const  pedido = await this.pedidoService.listar(page, limit, filtros )

       return response.status(200).send(pedido)
    // try {
    //  const page = Number(request.query.page) || 1;
    // const limit = Number(request.query.limit) || 10;
    // const {...filtros} = request.query
    // const skip = (page - 1) * limit;


    //   const [pedidos, total] = await Promise.all([
    //     database.pedido.findMany({
    //       skip,
    //       take: limit,
          
    //       include: {
    //       transportes: true,
    //       mercadorias: true,
    //       pagamentos: true,
    //       documentos: true,
    //         _count: {
    //           select: {
    //             mercadorias: true,
    //           }
    //         }
    //       },
    //       orderBy: { createdAt: 'desc' }
    //     }),
    //     database.pedido.count()
    //   ]);

    //   response.json({
    //     data: pedidos,
    //     pagination: {
    //       current_page: limit,
    //       total_pages: Math.ceil(total / limit),
    //       total_items: total
    //     }
    //   });
    // } catch (error) {
    
    // }
  }



}