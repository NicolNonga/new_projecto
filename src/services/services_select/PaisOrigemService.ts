import { PaisOrigem } from '../../core/types';
import { BaseService } from './BaseService';
import { PaisOrigemRepository } from '../../core/repository/pedido/repositories_selects/PaisOrigemRepository';

export class PaisOrigemService extends BaseService<PaisOrigem> {
  constructor() {
    super(new PaisOrigemRepository());
  }
}