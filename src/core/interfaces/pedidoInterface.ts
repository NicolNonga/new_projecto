import { CreatePedidoRequest } from "../../validations/pedido_validacao";

export interface PedidoFiltrosInterface {


      codigo: string | undefined,
      paisOrigem: string | undefined,
      nifEntidade: string  | undefined,
      codigoRegime: string | undefined,
      estado: string | undefined,
      formaPagamento : string | undefined,
      meioTransporte: string | undefined,
      portoOrigem: string |  undefined,
}

export interface PedidoPlayloadInterface{
    payload : CreatePedidoRequest,
    caminho_arquivo: string
}