import { CodigoMulta } from '../../../core/types';
import { BaseController } from './BaseController';
import { CodigoMultaService } from '../../../services/services_select/CodigoMultaService';

export class CodigoMultaController extends BaseController<CodigoMulta> {
  constructor() {
    super(new CodigoMultaService());
  }
}
