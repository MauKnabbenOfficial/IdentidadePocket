import { Viagem } from "./Viagem";

export class Coleta {
  constructor(
    public id: number,
    public turistaId: number,
    public viagem: Viagem | null
  ) {}
}
