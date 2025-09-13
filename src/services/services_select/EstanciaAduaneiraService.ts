import { EstanciaAduaneira } from '../../core/types';
import { BaseService } from './BaseService';
import { EstanciaAduaneiraRepository } from '../../core/repository/pedido/repositories_selects/EstanciaAduaneiraRepository';

export class EstanciaAduaneiraService extends BaseService<EstanciaAduaneira> {
  constructor() {
    super(new EstanciaAduaneiraRepository());
  }
}