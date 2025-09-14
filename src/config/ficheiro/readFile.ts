import * as fs from "fs";
import * as path from "path";
import { Despachante } from "../../core/interfaces/despachante";
import { Importador } from "../../core/interfaces/importador";
import { Adicao } from "../../core/interfaces/adicao";

export function parseTxtToJson(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error("Ficheiro não encontrado!");
  }

  const content = fs
    .readFileSync(path.join(__dirname, filePath), "utf-8")
    .split("\n")
    .map((line) =>
      line
        .replace(/(\|{25}|\|{19}|\|{5}|\|{3}|\|{2})/g, "|") // substitui ||||... por |
        .split("|")
    );

  const arrayDespachante = content[0]; 
  const arrayRei = content[1];

  const arrayAdicao = [];
  for (let i = 2; i < Number(arrayDespachante[1]) + 2; i++) {
    arrayAdicao.push(content[i]);
  }

  const despachante: Despachante = {
    numero_adicoes: Number(arrayDespachante[1]),
    meio_transporte: arrayDespachante[2],
    nome_entidade_angolana: arrayDespachante[3],
    despachante: `${arrayDespachante[5]} - ${arrayDespachante[4]}`,
  };

  const importador: Importador = {
    codigo_exportador: arrayRei[1],
    nif: arrayRei[2],
    local_embarque: arrayRei[6],
    codigo_regime: arrayRei[7],
    peso_bruto: arrayRei[10],
    forma_pagamento: arrayRei[12],
    numero_volumes: arrayRei[13],
    codigo_volumes: arrayRei[14] || "Outro",
    marcas_numeros: arrayRei[15],
    pais_precedentes: arrayRei[17],
    pais_destino: arrayRei[18],
  };

  const adicoes: Adicao[] = arrayAdicao.map((ad) => ({
    codigo_pauta: ad[2],
    valor_fob: ad[7],
    valor_frete: ad[8],
    valor_cif: ad[9],
    quantidade: ad[3],
    unidade: ad[10],
  }));

  return {
    despachante,
    importador,
    adicoes,
  };
}
