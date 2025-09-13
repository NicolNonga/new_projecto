import { PaisDestino } from '../../../core/types';
import { BaseRoutes } from './BaseRoutes';
import { PaisDestinoController } from '../../../controllers/pedidos/controllers_selects/PaisDestinoController';

export class PaisDestinoRoutes extends BaseRoutes<PaisDestino> {
  constructor() {
    super(new PaisDestinoController());
  }
}