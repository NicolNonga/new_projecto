import express, { Request, Response } from 'express';
import request from 'supertest';
import { DespachanteControllers } from '../../presentation/controllers/despachante/DespachanteControllers';
import { GetDespachanteService } from '../../application/services/despachante/GetDespachanteService';
import { Despachante } from '../../../src/domain/models/Despachante/Despachante';

describe('GET /despachante/all/:CEDULA/:NIF', () => {
  it('deve retornar dados fake do despachante ao chamar o endpoint', async () => {
    const dataRegistro = new Date();

    const mockDespachante = new Despachante({
      CEDULA: '123456789',
      NIF: '987654321',
      EMAIL: 'mock@teste.com',
      ESTADO: 1,
      NOME: 'Mockado Silva',
      MORADA: 'Rua Fictícia',
      TELEFONE: '912345678',
      OLD_NIF: null,
      DATA_REG: dataRegistro,
    });

    const repositoryMock = {
      getDespachante: jest.fn().mockResolvedValue(mockDespachante),
    };

    const service = new GetDespachanteService(repositoryMock as any);
    const controller = new DespachanteControllers(service);

    const app = express();
    app.use(express.json());

    app.get('/despachante/all/:CEDULA/:NIF', (req: Request, res: Response) => {
      controller.getDespachante(req, res);
    });

    const response = await request(app).get('/despachante/all/123456789/987654321');

    // Exibe o corpo da resposta no console ao rodar o teste
    console.error('Resposta da API:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      CEDULA: '123456789',
      NIF: '987654321',
      EMAIL: 'mock@teste.com',
      ESTADO: 1,
      NOME: 'Mockado Silva',
      MORADA: 'Rua Fictícia',
      TELEFONE: '912345678',
      OLD_NIF: null,
    });
    expect(response.body.DATA_REG).toBe(dataRegistro.toISOString());
    expect(repositoryMock.getDespachante).toHaveBeenCalledWith({
      CEDULA: '123456789',
      NIF: '987654321',
    });
  });
});