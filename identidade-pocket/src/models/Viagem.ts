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
        public hospedagens: Hospedagem[] | null,
        public transporte: Transporte | null,
        public motivacaoInteresse: MotivacaoInteresse | null,
        public atrativosVisitados: Atrativo[] | null,
        public avaliacoes: Avaliacao[] | null
    ) {}

    static fromJSON(json: string): Viagem {
        const obj = JSON.parse(json);
        return new Viagem(obj.id, obj.planejamento, obj.organizacao, new Date(obj.dataInicio), new Date(obj.dataFim), obj.hospedagens, obj.transporte, obj.motivacaoInteresse, obj.atrativosVisitados, obj.avaliacoes);
    }

    toJSONstr(): string {
        return JSON.stringify({
            planejamento: this.planejamento,
            organizacao: this.organizacao,
            dataInicio: this,
            dataFim: this.dataFim,
            hospedagem: this.hospedagens,
            transporte: this.transporte,
            motivacaoInteresse: this.motivacaoInteresse,
            atrativosVisitados: this.atrativosVisitados,
            avaliacoes: this.avaliacoes
        });
    }
}