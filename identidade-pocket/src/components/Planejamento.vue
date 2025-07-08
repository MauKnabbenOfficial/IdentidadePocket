<template>
  <div class="container">
    <form class="form-visitante">
      <fieldset>
        <legend>Planejamento da Viagem</legend>

        <label>Conhecimento Prévio do Destino?</label>
        <div>
          <label
            ><input
              type="radio"
              v-model="form.conhecimentoPrevio"
              value="true"
            />
            Sim</label
          >
        </div>

        <label>Fontes de Informação</label>
        <input v-model="form.fontesInformacao" />
      </fieldset>

      <fieldset>
        <legend>Organização da Viagem</legend>

        <label>Data Inicio</label>
        <input v-model="form.dataInicio" type="date" />

        <label>Data Fim</label>
        <input v-model="form.dataFim" type="date" />

        <label>Acompanhantes?</label>
        <input v-model="form.acompanhantes" />

        <label
          >Total de Pessoas Viajando: {{ form.totalPessoasViajando }}</label
        >
        <input
          type="range"
          v-model="form.totalPessoasViajando"
          min="0"
          max="100"
        />

        <label>Organização Própria?</label>
        <div>
          <label
            ><input
              type="radio"
              v-model="form.organizacaoPropria"
              value="true"
            />
            Sim</label
          >
          <label
            ><input
              type="radio"
              v-model="form.organizacaoPropria"
              value="false"
            />
            Não</label
          >
        </div>

        <label>Viagem Organizada por?</label>
        <input v-model="form.viagemOrganizadaPor" />

        <label>Empresa onde trabalha</label>
        <input v-model="form.empresaOndeTrabalha" style="margin-bottom: 15px" />

        <fieldset>
          <legend>Municípios Visitados</legend>

          <button type="button" @click="adicionarMunicipio">
            Adicionar Município
          </button>

          <div
            v-for="(m, index) in municipiosVisitados"
            :key="index"
            class="municipio-item"
          >
            <label>Nome do Município</label>
            <input v-model="m.nome" />

            <label>Teve hospedagem?</label>
            <select v-model="m.hospedagem">
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>

            <div v-if="m.hospedagem === 'sim'">
              <label>Tipo de Hospedagem</label>
              <select v-model="m.tipoHospedagem">
                <option value="">Selecione</option>
                <option>Hotel</option>
                <option>Pousada</option>
                <option>Airbnb</option>
                <option>Casa de amigos</option>
                <option>Outros</option>
              </select>

              <label>Formato da Reserva</label>
              <select v-model="m.formatoReserva">
                <option value="">Selecione</option>
                <option>Direta</option>
                <option>Agência</option>
                <option>Aplicativo</option>
                <option>Outro</option>
              </select>

              <label>Data Inicio</label>
              <input v-model="m.dataInicio" type="date" />

              <label>Data Fim</label>
              <input v-model="m.dataFim" type="date" />
            </div>

            <button type="button" @click="removerMunicipio(index)">
              Remover
            </button>
            <hr />
          </div>
        </fieldset>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Hospedagem } from "@/models/Hospedagem";
import { Organizacao } from "@/models/Organizacao";
import { Planejamento as pl } from "@/models/Planejamento";
import { ref, watch } from "vue";

const modelPlanejamento = defineModel("modelPlanejamento");
const modelOrganizacao = defineModel("modelOrganizacao");
const modelHospedagens = defineModel("modelHospedagens");

const form = ref({
  conhecimentoPrevio: "",
  fontesInformacao: "",
  dataInicio: "",
  dataFim: "",
  acompanhantes: "",
  totalPessoasViajando: "",
  organizacaoPropria: "",
  viagemOrganizadaPor: "",
  empresaOndeTrabalha: "",
  hospedagem: "",
});

const municipiosVisitados = ref<
  {
    nome: string;
    hospedagem: string;
    tipoHospedagem?: string;
    formatoReserva?: string;
    dataInicio?: string;
    dataFim?: string;
  }[]
>([]);

function adicionarMunicipio() {
  municipiosVisitados.value.push({
    nome: "",
    hospedagem: "",
    tipoHospedagem: "",
    formatoReserva: "",
    dataInicio: "",
    dataFim: "",
  });
}

function removerMunicipio(index: number) {
  municipiosVisitados.value.splice(index, 1);
}

watch(
  form,
  (novoValor) => {
    ///@ts-ignore
    modelPlanejamento.value.conhecimentoPrevio =
      novoValor.conhecimentoPrevio == null
        ? false
        : novoValor.conhecimentoPrevio == "true"
        ? true
        : false;

    ///@ts-ignore
    modelPlanejamento.value.fontesDeInformacao = novoValor.fontesInformacao;
    // public viagemId: number,
    // public conhecimentoPrevio: boolean | null,
    // public fontesDeInformacao: string[] | null,

    ///@ts-ignore
    modelOrganizacao.value.organizacaoPropria =
      novoValor.organizacaoPropria == null
        ? false
        : novoValor.organizacaoPropria == "true"
        ? true
        : false;

    ///@ts-ignore
    modelOrganizacao.value.organizadaPor = novoValor.viagemOrganizadaPor;

    ///@ts-ignore
    modelOrganizacao.value.empresaOndeTrabalha = novoValor.empresaOndeTrabalha;

    ///@ts-ignore
    modelOrganizacao.value.dataInicio = novoValor.dataInicio == undefined ? null : new Date(novoValor.dataInicio);

    ///@ts-ignore
    modelOrganizacao.value.dataFim = novoValor.dataFim == undefined ? null : new Date(novoValor.dataFim);
  },
  { deep: true }
);

watch(
  municipiosVisitados,
  (novoValor) => {
    modelHospedagens.value = novoValor.map(
      (x) =>
        new Hospedagem(
          1, // id (ex: 0 se for novo)
          1, // viagemId (ou outro valor real)
          x.tipoHospedagem == undefined ? null : x.tipoHospedagem,
          x.formatoReserva == undefined ? null : x.formatoReserva,
          1,
          x.dataInicio == undefined ? null : new Date(x.dataInicio),
          x.dataFim == undefined ? null : new Date(x.dataFim),
          x.nome
        )
    );
  },
  { deep: true }
);
</script>

<style scoped>
.container {
  background-color: #f7f9fc;
  padding: 10px;
}

form {
  color: black;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

fieldset {
  border: 1px solid #ccc;
  padding: 1rem;
}

label {
  display: block;
  margin-top: 0.5rem;
}

.municipio-item {
  border: 1px dashed #aaa;
  padding: 0.5rem;
  margin-top: 1rem;
  background-color: #fff;
}
</style>
