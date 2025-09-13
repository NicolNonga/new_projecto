import {Despachante} from "../../models/Despachante/Despachante";

export interface DespachanteRepository {
    getDespachante(despachante: Despachante): Promise<Despachante | null>
}