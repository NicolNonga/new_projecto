import { CodigoMulta } from '../../core/types';
import { BaseService } from './BaseService';
import { CodigoMultaRepository } from '../../core/repository/pedido/repositories_selects/CodigoMultaRepository copy';

export class CodigoMultaService extends BaseService<CodigoMulta> {
  constructor() {
    super(new CodigoMultaRepository());
  }
}

