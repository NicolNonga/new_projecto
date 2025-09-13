import { Request, Response } from 'express';
import { DespachanteControllers } from '../../presentation/controllers/despachante/DespachanteControllers';
import { GetDespachanteService } from '../../application/services/despachante/GetDespachanteService';
import { Despachante } from '../../domain/models/Despachante/Despachante';

describe('DespachanteControllers', () => {
  it('deve retornar dados fake de um despachante com base na CEDULA e NIF', async () => {
    // Arrange: Dados fake
    const mockDespachante = new Despachante({
      CEDULA: '123456789',
      NIF: '987654321',
      EMAIL: 'teste@email.com',
      ESTADO: 1,
      NOME: 'Carlos Mockado',
      DATA_REG: new Date(),
      MORADA: 'Rua Teste',
      TELEFONE: '900000000',
      OLD_NIF: null,
    });

    // Mock do service
    const getDespachanteServiceMock = {
      execute: jest.fn().mockResolvedValue(mockDespachante),
    } as unknown as GetDespachanteService;

    const controller = new DespachanteControllers(getDespachanteServiceMock);

    // Mock do request e response
    const req = {
      params: {
        CEDULA: '123456789',
        NIF: '987654321',
      },
    } as unknown as Request;

    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    const res = {
      status: statusMock,
    } as unknown as Response;

    // Act
    await controller.getDespachante(req, res);

    // Assert
    expect(getDespachanteServiceMock.execute).toHaveBeenCalledWith(expect.any(Despachante));
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(mockDespachante.toJSON());
  });
});