import { PaisOrigem } from '../../../core/types';
import { BaseController } from './BaseController';
import { PaisOrigemService } from '../../../services/services_select/PaisOrigemService';

export class PaisOrigemController extends BaseController<PaisOrigem> {
  constructor() {
    super(new PaisOrigemService());
  }
}