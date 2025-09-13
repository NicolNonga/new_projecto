import { PaisProcedencia } from '../../../core/types';
import { BaseRoutes } from './BaseRoutes';
import { PaisProcedenciaController } from '../../../controllers/pedidos/controllers_selects/PaisProcedenciaController';

export class PaisProcedenciaRoutes extends BaseRoutes<PaisProcedencia> {
  constructor() {
    super(new PaisProcedenciaController());
  }
}