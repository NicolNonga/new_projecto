import { PaisProcedencia } from '../../../types';
import { BaseRepository } from './BaseRepository';

export class PaisProcedenciaRepository extends BaseRepository<PaisProcedencia> {
  constructor() {
    super();
    this.model = this.prisma.paisProcedencia;
  }
}