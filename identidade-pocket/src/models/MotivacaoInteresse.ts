export class MotivacaoInteresse {
    constructor(
        public id: number,
        public viagemId: number,
        public motivacaoPrincipal: string,
        public interesses: string[],
    ){};
}