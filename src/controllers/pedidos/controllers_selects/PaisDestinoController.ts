import { PaisDestino } from '../../../core/types';
import { BaseController } from './BaseController';
import { PaisDestinoService } from '../../../services/services_select/PaisDestinoService';

export class PaisDestinoController extends BaseController<PaisDestino> {
  constructor() {
    super(new PaisDestinoService());
  }
}