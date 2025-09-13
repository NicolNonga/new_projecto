import { EstanciaAduaneira } from '../../../types';
import { BaseRepository } from './BaseRepository';

export class EstanciaAduaneiraRepository extends BaseRepository<EstanciaAduaneira> {
  constructor() {
    super();
    this.model = this.prisma.estanciaAduaneira;
  }
}