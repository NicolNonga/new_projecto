import { LocalEmbarque } from '../../../core/types';
import { BaseRoutes } from './BaseRoutes';
import { LocalEmbarqueController } from '../../../controllers/pedidos/controllers_selects/LocalEmbarqueController';

export class LocalEmbarqueRoutes extends BaseRoutes<LocalEmbarque> {
  constructor() {
    super(new LocalEmbarqueController());
  }
}