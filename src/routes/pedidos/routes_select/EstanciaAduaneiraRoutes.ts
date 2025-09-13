import { EstanciaAduaneira } from '../../../core/types';
import { BaseRoutes } from './BaseRoutes';
import { EstanciaAduaneiraController } from '../../../controllers/pedidos/controllers_selects/EstanciaAduaneiraController';

export class EstanciaAduaneiraRoutes extends BaseRoutes<EstanciaAduaneira> {
  constructor() {
    super(new EstanciaAduaneiraController());
  }
}