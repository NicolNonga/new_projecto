import { NacionalidadeMeioTransporte } from '../../../types';
import { BaseRepository } from './BaseRepository';

export class NacionalidadeMeioTransporteRepository extends BaseRepository<NacionalidadeMeioTransporte> {
  constructor() {
    super();
    this.model = this.prisma.nacionalidadeMeioTransporte;
  }
}