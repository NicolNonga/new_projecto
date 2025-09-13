import { LocalEmbarque } from '../../../types';
import { BaseRepository } from './BaseRepository';

export class LocalEmbarqueRepository extends BaseRepository<LocalEmbarque> {
  constructor() {
    super();
    this.model = this.prisma.localEmbarque;
  }
}