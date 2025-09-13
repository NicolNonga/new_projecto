import { MeioTransporte } from '../../../types';
import { BaseRepository } from './BaseRepository';

export class MeioTransporteRepository extends BaseRepository<MeioTransporte> {
  constructor() {
    super();
    this.model = this.prisma.meioTransporte;
  }
}