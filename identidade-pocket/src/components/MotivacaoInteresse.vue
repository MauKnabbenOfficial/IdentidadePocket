<template>
  <div class="container">
    <form class="form-visitante">
      <fieldset>
        <legend>Motivação e Interesse</legend>

        <label>Motivação Principal</label>
        <select v-model="form.motivacaoPrincipal">
          <option value="">Selecione</option>
          <option v-for="m in motivacoes" :key="m" :value="m">{{ m }}</option>
        </select>

        <label>Interesses</label>
        <select v-model="form.interesses" multiple size="5">
          <option v-for="m in interessesDisponiveis" :key="m" :value="m">{{ m }}</option>
        </select>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';


const modelMotivacaoInteresse = defineModel("modelMotivacaoInteresse");

const motivacoes = [
  'Lazer e descanso',
  'Negócios ou trabalho',
  'Religião ou espiritualidade',
  'Eventos culturais ou esportivos',
  'Saúde ou tratamentos',
  'Visita a parentes/amigos',
  'Estudos ou cursos',
  'Outros'
]

const interessesDisponiveis = [
  'Cultura local',
  'Gastronomia',
  'Natureza e ecoturismo',
  'Praias',
  'Esportes de aventura',
  'Religião e espiritualidade',
  'Eventos e festivais',
  'Compras',
  'Vida noturna',
  'História e patrimônio',
  'Negócios',
  'Saúde e bem-estar'
]

const form = ref({
  motivacaoPrincipal: "",
  interesses: "",
});

watch(
  form,
  (novoValor) => {
    debugger;
    //@ts-ignore
    modelMotivacaoInteresse.value.motivacaoPrincipal =
      novoValor.motivacaoPrincipal == undefined ? null : novoValor.motivacaoPrincipal;

    //@ts-ignore
    modelMotivacaoInteresse.value.interesses =
      novoValor.interesses == undefined
        ? null
        : novoValor.interesses;
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
