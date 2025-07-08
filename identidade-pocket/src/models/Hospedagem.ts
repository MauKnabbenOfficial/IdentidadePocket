export class Hospedagem{
    constructor(
        public id: number,
        public viagemId: number,
        public tipo: string | null,
        public formaDeReserva: string | null,
        public municipioHospedagemId: number | null,
        public dataInicio: Date | null,
        public dataFim: Date | null,
        public nomeMunicipio: string | null,
    ){};
}