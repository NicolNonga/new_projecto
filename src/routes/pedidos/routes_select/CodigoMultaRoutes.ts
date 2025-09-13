import { CodigoMulta } from '../../../core/types';
import { BaseRoutes } from './BaseRoutes';
import { CodigoMultaController } from '../../../controllers/pedidos/controllers_selects/CodigoMultaController';

export class CodigoMultaRoutes extends BaseRoutes<CodigoMulta> {
  constructor() {
    super(new CodigoMultaController());
  }
}