import { PaisOrigem } from '../../../core/types';
import { BaseRoutes } from './BaseRoutes';
import { PaisOrigemController } from '../../../controllers/pedidos/controllers_selects/PaisOrigemController';

export class PaisOrigemRoutes extends BaseRoutes<PaisOrigem> {
  constructor() {
    super(new PaisOrigemController());
  }
}