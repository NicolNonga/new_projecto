import { BaseRepository } from './BaseRepository';
import { CodigoMulta } from '../../../types';

export class CodigoMultaRepository extends BaseRepository<CodigoMulta> {
  constructor() {
    super();
    this.model = this.prisma.codigoMulta;
  }
}