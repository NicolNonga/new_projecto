import { PostoFronteirico } from '../../core/types';
import { BaseService } from './BaseService';
import { PostoFronteiricoRepository } from '../../core/repository/pedido/repositories_selects/PostoFronteiricoRepository';

export class PostoFronteiricoService extends BaseService<PostoFronteirico> {
  constructor() {
    super(new PostoFronteiricoRepository());
  }
}