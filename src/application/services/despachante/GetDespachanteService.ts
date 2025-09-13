import { Despachante } from "../../../domain/models/Despachante/Despachante";
import { DespachanteRepository } from "../../../domain/repositories/despachante/DespachanteRepository";

export class GetDespachanteService {
  constructor(private despachanteRepo: DespachanteRepository) {}

  async execute(despachante: Despachante): Promise<Despachante> {
    const getDespachante = await this.despachanteRepo.getDespachante(
      despachante
    );

    if (!getDespachante) {
      throw new Error("Sem Despachante Disponiveis");
    }

    return getDespachante;
  }
}