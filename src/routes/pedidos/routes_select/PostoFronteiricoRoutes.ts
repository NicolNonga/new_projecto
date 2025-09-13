import { PostoFronteirico } from '../../../core/types';
import { BaseRoutes } from './BaseRoutes';
import { PostoFronteiricoController } from '../../../controllers/pedidos/controllers_selects/PostoFronteiricoController';

export class PostoFronteiricoRoutes extends BaseRoutes<PostoFronteirico> {
  constructor() {
    super(new PostoFronteiricoController());
  }
}