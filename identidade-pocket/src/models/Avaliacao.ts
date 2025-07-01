export class Avaliacao {
    constructor(
        public id: number,
        public viagemId: number,
        public isAtrativo: boolean,
        public nota: number,
        public atrativoId?: number,
        public municipio?: number,
    ){};
}