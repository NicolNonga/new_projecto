import { MeioTransporte } from '../../../core/types';
import { BaseController } from './BaseController';
import { MeioTransporteService } from '../../../services/services_select/MeioTransporteService';

export class MeioTransporteController extends BaseController<MeioTransporte> {
  constructor() {
    super(new MeioTransporteService());
  }
}