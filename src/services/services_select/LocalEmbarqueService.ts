import { LocalEmbarque } from '../../core/types';
import { BaseService } from './BaseService';
import { LocalEmbarqueRepository } from '../../core/repository/pedido/repositories_selects/LocalEmbarqueRepository';

export class LocalEmbarqueService extends BaseService<LocalEmbarque> {
  constructor() {
    super(new LocalEmbarqueRepository());
  }
}