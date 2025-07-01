export class Organizacao{
    constructor(
        public id: number,
        public viagemId: number,
        public organizacaoPropria: boolean,
        public organizadaPor?: string,
        public empresaOndeTrabalha?: string,
    ){};
}