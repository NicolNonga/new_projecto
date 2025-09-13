import { PaisOrigem } from '../../../types';
import { BaseRepository } from './BaseRepository';

export class PaisOrigemRepository extends BaseRepository<PaisOrigem> {
  constructor() {
    super();
    this.model = this.prisma.paisOrigem;
  }
}