export interface EstadoPedidoLicenciamento {
  id: string;
  nome: string;
  descricao?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CodigoMulta {
  id?: string;
  codigo: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CodigoRegime {
  id?: string;
  codigo: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NacionalidadeMeioTransporte {
  id?: string;
  codigo: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaisOrigem {
  id?: string;
  codigo: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaisDestino {
  id?: string;
  codigo: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PortoEntradaSaida {
  id?: string;
  codigo: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MeioTransporte {
  id?: string;
  codigo: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EstanciaAduaneira {
  id?: string;
  codigo: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostoFronteirico {
  id?: string;
  codigo: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LocalEmbarque {
  id?: string;
  codigo: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaisProcedencia {
  id?: string;
  codigo: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateRequest {
  codigo: string;
  descricao: string;
}

export interface UpdateRequest {
  codigo?: string;
  descricao?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}