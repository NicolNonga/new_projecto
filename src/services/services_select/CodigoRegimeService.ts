import { CodigoRegime } from '../../core/types';
import { BaseService } from './BaseService';
import { CodigoRegimeRepository } from '../../core/repository/pedido/repositories_selects/CodigoRegimeRepository';

export class CodigoRegimeService extends BaseService<CodigoRegime> {
  constructor() {
    super(new CodigoRegimeRepository());
  }
}