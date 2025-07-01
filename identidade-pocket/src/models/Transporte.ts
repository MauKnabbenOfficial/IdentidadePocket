export class Transporte {
    constructor(
        public id: number,
        public viagemId: number,
        public acessoDestino: string,
        public utilizadosDestino: string,
    ){};
}