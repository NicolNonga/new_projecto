import { PortoEntradaSaida } from '../../../core/types';
import { BaseRoutes } from './BaseRoutes';
import { PortoEntradaSaidaController } from '../../../controllers/pedidos/controllers_selects/PortoEntradaSaidaController';

export class PortoEntradaSaidaRoutes extends BaseRoutes<PortoEntradaSaida> {
  constructor() {
    super(new PortoEntradaSaidaController());
  }
}