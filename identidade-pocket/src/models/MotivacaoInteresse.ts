export class MotivacaoInteresse {
    constructor(
        public id: number,
        public viagemId: number,
        public motivacaoPrincipal: string | null,
        public interesses: string | null,
    ){};
}