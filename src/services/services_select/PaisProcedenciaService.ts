import { PaisProcedencia } from '../../core/types';
import { BaseService } from './BaseService';
import { PaisProcedenciaRepository } from '../../core/repository/pedido/repositories_selects/PaisProcedenciaRepository';

export class PaisProcedenciaService extends BaseService<PaisProcedencia> {
  constructor() {
    super(new PaisProcedenciaRepository());
  }
}