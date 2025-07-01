export class Endereco {
    constructor(
        public id: number,
        public turistaId: number,
        public nacionalidade: string,
        public cep: string,
        public uf: string,
        public municipio: string,
    ) {}
}