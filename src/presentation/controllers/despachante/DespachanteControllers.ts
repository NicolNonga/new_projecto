import { Request, Response } from "express";
import { GetDespachanteService } from "../../../application/services/despachante/GetDespachanteService";
import { Despachante } from "../../../domain/models/Despachante/Despachante";

export class DespachanteControllers {
  constructor(
    private getDespachanteService: GetDespachanteService,
  ) {}

  // Buscar Despachante por CEDULA e NIF
  async getDespachante(req: Request, res: Response) {
    try {
      const { CEDULA, NIF } = req.params;

      // Validação básica dos parâmetros
      if (!CEDULA || !NIF || CEDULA.trim() === "" || NIF.trim() === "") {
        return res.status(400).json({ error: "CEDULA e NIF são obrigatórios." });
      }

      // Modelo parcial com os dados recebidos
      const modelo = new Despachante({ CEDULA, NIF });

      // Chamada ao serviço de busca
      const despachante = await this.getDespachanteService.execute(modelo);

      // Se não encontrado, responder com 404
      if (!despachante) {
        return res.status(404).json({ error: "Despachante não encontrado." });
      }

      return res.status(200).json(despachante.toJSON());
    } catch (err: any) {
      console.error("Erro ao buscar despachante:", err);
      return res.status(500).json({ error: err.message || "Erro interno no servidor." });
    }
  }
}