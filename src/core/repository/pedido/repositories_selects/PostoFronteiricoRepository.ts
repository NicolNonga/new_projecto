import { PostoFronteirico } from '../../../types';
import { BaseRepository } from './BaseRepository';

export class PostoFronteiricoRepository extends BaseRepository<PostoFronteirico> {
  constructor() {
    super();
    this.model = this.prisma.postoFronteirico;
  }
}