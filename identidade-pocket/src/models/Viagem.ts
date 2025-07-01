import { Atrativo } from "./Atrativos";
import { Avaliacao } from "./Avaliacao";
import { Hospedagem } from "./Hospedagem";
import { MotivacaoInteresse } from "./MotivacaoInteresse";
import { Organizacao } from "./Organizacao";
import { Planejamento } from "./Planejamento";
import { Transporte } from "./Transporte";

export class Viagem {
    constructor(
        public id: number,
        public planejamento: Planejamento,
        public organizacao: Organizacao,
        public dataInicio: Date,
        public dataFim: Date,
        public hospedagem: Hospedagem,
        public transporte: Transporte,
        public motivacaoInteresse: MotivacaoInteresse,
        public atrativosVisitados: Atrativo[],
        public avaliacoes: Avaliacao[]
    ) {}

    static fromJSON(json: string): Viagem {
        const obj = JSON.parse(json);
        return new Viagem(obj.id, obj.planejamento, obj.organizacao, new Date(obj.dataInicio), new Date(obj.dataFim), obj.hospedagem, obj.transporte, obj.motivacaoInteresse, obj.atrativosVisitados, obj.avaliacoes);
    }

    toJSONstr(): string {
        return JSON.stringify({
            planejamento: this.planejamento,
            organizacao: this.organizacao,
            dataInicio: this,
            dataFim: this.dataFim,
            hospedagem: this.hospedagem,
            transporte: this.transporte,
            motivacaoInteresse: this.motivacaoInteresse,
            atrativosVisitados: this.atrativosVisitados,
            avaliacoes: this.avaliacoes
        });
    }
}