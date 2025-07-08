export class Planejamento{
    constructor(
        public id: number | null,
        public viagemId: number | null,
        public conhecimentoPrevio: boolean | null,
        public fontesDeInformacao: string | null,
    ){};
}