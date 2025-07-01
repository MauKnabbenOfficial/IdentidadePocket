import { Hospedagem } from "./Hospedagem";
import { Municipio } from "./Municipio";

export class MunicipioHospedagem {
    constructor(
        public id: number,
        public municipio: Municipio,
        public hospedagem: Hospedagem,
    ){};
}