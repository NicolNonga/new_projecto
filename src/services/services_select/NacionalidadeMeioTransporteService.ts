import { NacionalidadeMeioTransporte } from '../../core/types';
import { BaseService } from './BaseService';
import { NacionalidadeMeioTransporteRepository } from '../../core/repository/pedido/repositories_selects/NacionalidadeMeioTransporteRepository';

export class NacionalidadeMeioTransporteService extends BaseService<NacionalidadeMeioTransporte> {
  constructor() {
    super(new NacionalidadeMeioTransporteRepository());
  }
}