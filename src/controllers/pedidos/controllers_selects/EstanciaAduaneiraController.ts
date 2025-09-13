import { EstanciaAduaneira } from '../../../core/types';
import { BaseController } from './BaseController';
import { EstanciaAduaneiraService } from '../../../services/services_select/EstanciaAduaneiraService';

export class EstanciaAduaneiraController extends BaseController<EstanciaAduaneira> {
  constructor() {
    super(new EstanciaAduaneiraService());
  }
}