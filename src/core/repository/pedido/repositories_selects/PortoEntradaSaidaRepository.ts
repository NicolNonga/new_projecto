import { PortoEntradaSaida } from '../../../types';
import { BaseRepository } from './BaseRepository';

export class PortoEntradaSaidaRepository extends BaseRepository<PortoEntradaSaida> {
  constructor() {
    super();
    this.model = this.prisma.portoEntradaSaida;
  }
}