import { PaisProcedencia } from '../../../core/types';
import { BaseController } from './BaseController';
import { PaisProcedenciaService } from '../../../services/services_select/PaisProcedenciaService';

export class PaisProcedenciaController extends BaseController<PaisProcedencia> {
  constructor() {
    super(new PaisProcedenciaService());
  }
}