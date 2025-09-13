import { CodigoRegime } from '../../../types';
import { BaseRepository } from './BaseRepository';

export class CodigoRegimeRepository extends BaseRepository<CodigoRegime> {
  constructor() {
    super();
    this.model = this.prisma.codigoRegime;
  }
}