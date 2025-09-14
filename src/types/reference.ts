export interface ReferenceItem {
  id: number;
  codigo: string;
  descricao: string;
}

export interface ReferenceData {
  CodigoMultas: ReferenceItem[];
  CodigoRegime: ReferenceItem[];
  NacionalidadeMeioTransporte: ReferenceItem[];
  PaisOrigem: ReferenceItem[];
  PaisDestino: ReferenceItem[];
  PortoEntradaSaida: ReferenceItem[];
  MeiosTransporte: ReferenceItem[];
  EstanciasAduaneira: ReferenceItem[];
  PostoFronteirico: ReferenceItem[];
  LocalEmbarque: ReferenceItem[];
  PaisProcedencia: ReferenceItem[];
}

export type ReferenceType = keyof ReferenceData;

export interface CreateReferenceItemRequest {
  codigo: string;
  descricao: string;
}

export interface UpdateReferenceItemRequest {
  codigo?: string;
  descricao?: string;
}