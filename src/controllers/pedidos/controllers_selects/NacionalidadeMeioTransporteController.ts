import { NacionalidadeMeioTransporte } from '../../../core/types';
import { BaseController } from './BaseController';
import { NacionalidadeMeioTransporteService } from '../../../services/services_select/NacionalidadeMeioTransporteService';

export class NacionalidadeMeioTransporteController extends BaseController<NacionalidadeMeioTransporte> {
  constructor() {
    super(new NacionalidadeMeioTransporteService());
  }
}