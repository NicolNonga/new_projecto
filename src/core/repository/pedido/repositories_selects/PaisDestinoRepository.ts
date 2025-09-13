import { PaisDestino } from '../../../types';
import { BaseRepository } from './BaseRepository';

export class PaisDestinoRepository extends BaseRepository<PaisDestino> {
  constructor() {
    super();
    this.model = this.prisma.paisDestino;
  }
}