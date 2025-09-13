import { MeioTransporte } from '../../core/types';
import { BaseService } from './BaseService';
import { MeioTransporteRepository } from '../../core/repository/pedido/repositories_selects/MeioTransporteRepository';

export class MeioTransporteService extends BaseService<MeioTransporte> {
  constructor() {
    super(new MeioTransporteRepository());
  }
}