import { Despachante } from "../../domain/models/Despachante/Despachante";
import { DespachanteRepository } from "../../domain/repositories/despachante/DespachanteRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaDespachanteRepository implements DespachanteRepository {
  getDespachante(despachante: Despachante): Promise<Despachante | null> {
    try {
      // Validação: CEDULA e NIF são obrigatórios e não podem estar vazios
      if (
        !despachante.CEDULA ||
        !despachante.NIF ||
        despachante.CEDULA.trim() === "" ||
        despachante.NIF.trim() === ""
      ) {
        console.warn("CEDULA e NIF são obrigatórios e não podem estar vazios.");
        return Promise.resolve(null);
      }

      const novoDespachante = new Despachante({
        CEDULA: despachante.CEDULA,
        DATA_REG: despachante.DATA_REG ?? null,
        EMAIL: despachante.EMAIL ?? null,
        ESTADO: despachante.ESTADO ?? null,
        OLD_NIF: despachante.OLD_NIF ?? null,
        NOME: despachante.NOME ?? null,
        MORADA: despachante.MORADA ?? null,
        TELEFONE: despachante.TELEFONE ?? null,
        NIF: despachante.NIF,
      });

      return Promise.resolve(novoDespachante);
    } catch (error) {
      console.error("Erro ao criar despachante:", error);
      return Promise.resolve(null);
    }
  }
}