import { PostoFronteirico } from '../../../core/types';
import { BaseController } from './BaseController';
import { PostoFronteiricoService } from '../../../services/services_select/PostoFronteiricoService';

export class PostoFronteiricoController extends BaseController<PostoFronteirico> {
  constructor() {
    super(new PostoFronteiricoService());
  }
}