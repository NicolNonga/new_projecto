import { Router } from 'express';
import { BaseController } from '../../../controllers/pedidos/controllers_selects/BaseController';
import { BaseEntity } from '../../../services/services_select/BaseService';

export abstract class BaseRoutes<T extends BaseEntity> {
  public router: Router;
  protected controller: BaseController<T>;

  constructor(controller: BaseController<T>) {
    this.router = Router();
    this.controller = controller;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.controller.create);
    this.router.get('/', this.controller.findAll);
    this.router.get('/:id', this.controller.findById);
    this.router.get('/codigo/:codigo', this.controller.findByCodigo);
    this.router.put('/:id', this.controller.update);
    this.router.delete('/:id', this.controller.delete);
  }
}