import { Genero } from "@/enums/Genero";
import { Usuario } from "./Usuario";
import { Profissao } from "@/enums/Profissao";
import { Formacao } from "@/enums/Formacao";
import { Endereco } from "./Endereco";

export class Turista {
  constructor(
    public usuario: Usuario,
    public genero: Genero,
    public idade: number,
    public rendaMensal: number | null,
    public profissao: Profissao,
    public formacao: Formacao | null,
    public endereco: Endereco
  ) {}

  static fromJSON(json: string): Turista {
    const obj = JSON.parse(json);
    return new Turista(
      obj.usuario,
      obj.genero,
      obj.idade,
      obj.rendaMensal,
      obj.profissao,
      obj.formacao,
      obj.endereco
    );
  }

  toJSONstr(): string {
    return JSON.stringify({
      usuario: this.usuario,
      genero: this.genero,
      idade: this.idade,
      rendaMensal: this.rendaMensal,
      profissao: this.profissao,
      formacao: this.formacao,
      endereco: this.endereco,
    });
  }
}
