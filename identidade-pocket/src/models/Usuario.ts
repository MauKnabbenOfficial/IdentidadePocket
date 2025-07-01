export class Usuario {
  constructor(
    public nome: string,
    public email: string,
    public perfil: "admin" | "comum"
  ) {}

  isAdmin() {
    return this.perfil === "admin";
  }

  static fromJSON(json: string): Usuario {
    const obj = JSON.parse(json);
    return new Usuario(obj.nome, obj.email, obj.perfil);
  }

  toJSONstr(): string {
    return JSON.stringify({
      nome: this.nome,
      email: this.email,
      perfil: this.perfil,
    });
  }
}
