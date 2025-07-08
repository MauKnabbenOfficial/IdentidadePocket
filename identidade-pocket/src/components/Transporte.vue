<template>
  <div class="container">
    <form class="form-visitante">
      <fieldset>
        <legend>Transporte</legend>

        <label>Acesso ao Destino</label>
        <select v-model="form.acessoDestino" multiple size="5">
          <option v-for="m in opcoesAcessoAoDestino" :key="m" :value="m">{{ m }}</option>
        </select>

        <label>Utilizados no Destino</label>
        <select v-model="form.utilizadosDestino" multiple size="5">
          <option v-for="m in opcoesUtilizadosNoDestino" :key="m" :value="m">{{ m }}</option>
        </select>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const opcoesAcessoAoDestino = [
  "Avião comercial",
  "Carro próprio",
  "Ônibus rodoviário",
  "Transfer contratado",
  "Motorhome",
  "Trem interestadual",
  "Navio / Cruzeiro",
  "Carona / aplicativo",
];

const opcoesUtilizadosNoDestino = [
  "Carro alugado",
  "Transporte público (ônibus, metrô)",
  "Aplicativo (Uber, 99)",
  "Táxi",
  "Bicicleta / patinete",
  "A pé",
  "Moto alugada",
  "Transfer local",
];

const modelTransporte = defineModel("modelTransporte");

const form = ref({
  acessoDestino: "",
  utilizadosDestino: "",
});

watch(
  form,
  (novoValor) => {
    debugger;
    //@ts-ignore
    modelTransporte.value.acessoDestino =
      novoValor.acessoDestino == undefined ? null : novoValor.acessoDestino;

    //@ts-ignore
    modelTransporte.value.utilizadosDestino =
      novoValor.utilizadosDestino == undefined
        ? null
        : novoValor.utilizadosDestino;
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
