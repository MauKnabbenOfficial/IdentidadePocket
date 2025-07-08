<template>
  <div class="container">
    <div>
      <Planejamento
        v-model:modelPlanejamento="planejamento"
        v-model:modelOrganizacao="organizacao"
        v-model:modelHospedagens="hospedagens"
      />
    </div>
    <div><Transporte v-model:modelTransporte="transporte" />></div>
    <div>
      <MotivacaoInteresse
        v-model:modelMotivacaoInteresse="motivacaoInteresse"
      />>
    </div>
    <div>
      <AvaliacaoAtrativosVisitados
        v-model:modelMunicipios="municipiosVisitados"
        v-model:modelAvaliacoes="avaliacoes"
      />>
    </div>
    <div>ATRATIVOS VISITADOS / AVALIACAO</div>
    <ion-button expand="block" @click="submit">Enviar</ion-button>
  </div>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonButton,
  IonText,
} from "@ionic/vue";
import Planejamento from "./Planejamento.vue";
import Transporte from "./Transporte.vue";
import MotivacaoInteresse from "./MotivacaoInteresse.vue";
import { onMounted, ref, watch } from "vue";
import { Planejamento as pl } from "@/models/Planejamento";
import { Organizacao } from "@/models/Organizacao";
import { Hospedagem } from "@/models/Hospedagem";
import { Transporte as tr } from "@/models/Transporte";
import { MotivacaoInteresse as mi } from "@/models/MotivacaoInteresse";
import AvaliacaoAtrativosVisitados from "./AvaliacaoAtrativosVisitados.vue";
import { Avaliacao } from "@/models/Avaliacao";
import { Coleta } from "@/models/Coleta";
import { Viagem } from "@/models/Viagem";
import router from "@/router";

const municipiosVisitados = ref<string[]>([]);
const planejamento = ref<pl>();
const organizacao = ref<Organizacao>();
const hospedagens = ref<Hospedagem[]>([]);
const transporte = ref<tr>();
const motivacaoInteresse = ref<mi>();
const avaliacoes = ref<Avaliacao[]>([]);

onMounted(() => {
  planejamento.value = {
    id: 1,
    viagemId: 1,
    conhecimentoPrevio: null,
    fontesDeInformacao: null,
  };

  organizacao.value = {
    id: 1,
    viagemId: 1,
    organizacaoPropria: false,
    organizadaPor: null,
    empresaOndeTrabalha: null,
    dataInicio: null,
    dataFim: null,
  };

  transporte.value = {
    id: 1,
    viagemId: 1,
    acessoDestino: null,
    utilizadosDestino: null,
  };

  motivacaoInteresse.value = {
    id: 1,
    viagemId: 1,
    interesses: null,
    motivacaoPrincipal: null,
  };
});

async function submit() {

  console.log(planejamento);
  console.log(organizacao);
  console.log(hospedagens);
  console.log(transporte);
  console.log(motivacaoInteresse);
  console.log(avaliacoes);
  
  router.push('/primeiroAcesso');

}

watch(
  hospedagens,
  (novoValor) => {
    if (novoValor == undefined || novoValor == null || novoValor.length <= 0)
      municipiosVisitados.value = [];
    else
      municipiosVisitados.value = novoValor
        .map((x) => x.nomeMunicipio)
        .filter((nome): nome is string => nome !== null);
  },
  { deep: true }
);
</script>

<style scoped>
.container {
  background-color: #f7f9fc;
  padding: 10px;
}
</style>
