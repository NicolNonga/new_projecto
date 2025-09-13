import { PortoEntradaSaida } from '../../core/types';
import { BaseService } from './BaseService';
import { PortoEntradaSaidaRepository } from '../../core/repository/pedido/repositories_selects/PortoEntradaSaidaRepository';

export class PortoEntradaSaidaService extends BaseService<PortoEntradaSaida> {
  constructor() {
    super(new PortoEntradaSaidaRepository());
  }
}