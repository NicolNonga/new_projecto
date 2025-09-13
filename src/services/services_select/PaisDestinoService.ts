import { PaisDestino } from '../../core/types';
import { BaseService } from './BaseService';
import { PaisDestinoRepository } from '../../core/repository/pedido/repositories_selects/PaisDestinoRepository';

export class PaisDestinoService extends BaseService<PaisDestino> {
  constructor() {
    super(new PaisDestinoRepository());
  }
}