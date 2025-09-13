import { MeioTransporte } from '../../../core/types';
import { BaseRoutes } from './BaseRoutes';
import { MeioTransporteController } from '../../../controllers/pedidos/controllers_selects/MeioTransporteController';

export class MeioTransporteRoutes extends BaseRoutes<MeioTransporte> {
  constructor() {
    super(new MeioTransporteController());
  }
}