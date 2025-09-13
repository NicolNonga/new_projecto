import { PortoEntradaSaida } from '../../../core/types';
import { BaseController } from './BaseController';
import { PortoEntradaSaidaService } from '../../../services/services_select/PortoEntradaSaidaService';

export class PortoEntradaSaidaController extends BaseController<PortoEntradaSaida> {
  constructor() {
    super(new PortoEntradaSaidaService());
  }
}