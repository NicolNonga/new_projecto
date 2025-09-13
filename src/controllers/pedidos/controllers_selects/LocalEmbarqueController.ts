import { LocalEmbarque } from '../../../core/types';
import { BaseController } from './BaseController';
import { LocalEmbarqueService } from '../../../services/services_select/LocalEmbarqueService';

export class LocalEmbarqueController extends BaseController<LocalEmbarque> {
  constructor() {
    super(new LocalEmbarqueService());
  }
}