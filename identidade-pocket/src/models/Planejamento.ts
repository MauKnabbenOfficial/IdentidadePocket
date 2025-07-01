export class Planejamento{
    constructor(
        public id: number,
        public viagemId: number,
        public conhecimentoPrevio: boolean,
        public fontesDeInformacao: string[],
    ){};
}