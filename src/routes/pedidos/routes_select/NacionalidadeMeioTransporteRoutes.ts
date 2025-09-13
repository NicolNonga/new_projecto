import { NacionalidadeMeioTransporte } from '../../../core/types';
import { BaseRoutes } from './BaseRoutes';
import { NacionalidadeMeioTransporteController } from '../../../controllers/pedidos/controllers_selects/NacionalidadeMeioTransporteController';

export class NacionalidadeMeioTransporteRoutes extends BaseRoutes<NacionalidadeMeioTransporte> {
  constructor() {
    super(new NacionalidadeMeioTransporteController());
  }
}