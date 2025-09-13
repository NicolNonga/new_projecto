import { CodigoRegime } from '../../../core/types';
import { BaseRoutes } from './BaseRoutes';
import { CodigoRegimeController } from '../../../controllers/pedidos/controllers_selects/CodigoRegimeController';

export class CodigoRegimeRoutes extends BaseRoutes<CodigoRegime> {
  constructor() {
    super(new CodigoRegimeController());
  }
}