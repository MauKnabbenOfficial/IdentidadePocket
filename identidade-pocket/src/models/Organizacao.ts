export class Organizacao{
    constructor(
        public id: number,
        public viagemId: number,
        public organizacaoPropria: boolean,
        public organizadaPor: string | null,
        public empresaOndeTrabalha: string | null,
        public dataInicio: Date | null,
        public dataFim: Date | null,
    ){};
}