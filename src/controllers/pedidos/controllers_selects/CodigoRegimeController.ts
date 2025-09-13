import { CodigoRegime } from '../../../core/types';
import { BaseController } from './BaseController';
import { CodigoRegimeService } from '../../../services/services_select/CodigoRegimeService';

export class CodigoRegimeController extends BaseController<CodigoRegime> {
  constructor() {
    super(new CodigoRegimeService());
  }
}