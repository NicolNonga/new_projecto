export class Despachante {
  public CEDULA?: string | null;
  public DATA_REG?: Date | null; 
  public EMAIL?: string | null;
  public ESTADO?: number | null;
  public OLD_NIF?: string | null;
  public NOME?: string | null;
  public MORADA?: string | null;
  public TELEFONE?: string | null;
  public NIF?: string | null;

  constructor(props: Partial<Despachante>) {
    Object.assign(this, props);
  }

  toJSON() {
    return {
      CEDULA: this.CEDULA,
      DATA_REG: this.DATA_REG,
      EMAIL: this.EMAIL,
      ESTADO: this.ESTADO,
      OLD_NIF: this.OLD_NIF,
      NOME: this.NOME,
      MORADA: this.MORADA,
      TELEFONE: this.TELEFONE,
      NIF: this.NIF,
    };
  }
}