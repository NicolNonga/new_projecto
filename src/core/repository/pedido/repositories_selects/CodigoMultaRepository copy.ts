import { CodigoMulta } from '../../../types';
import { BaseRepository } from './BaseRepository';

export class CodigoMultaRepository extends BaseRepository<CodigoMulta> {
  constructor() {
    super();
    this.model = this.prisma.codigoMulta;
  }
}