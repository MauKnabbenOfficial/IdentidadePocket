export class Transporte {
    constructor(
        public id: number,
        public viagemId: number,
        public acessoDestino: string | null,
        public utilizadosDestino: string | null,
    ){};
}