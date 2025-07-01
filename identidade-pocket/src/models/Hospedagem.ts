export class Hospedagem{
    constructor(
        public id: number,
        public viagemId: number,
        public tipo: string,
        public formaDeReserva: string,
        public municipioHospedagemId: number,
        public dataInicio: Date,
        public dataFim: Date,
    ){};
}