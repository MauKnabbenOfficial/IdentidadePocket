<template>
  <div class="container">
    <form class="form-visitante">
      <fieldset>
        <legend>Avaliação de Atrativos</legend>

        <div
          v-for="(municipio, index) in modelMunicipios"
          :key="index"
          class="municipio-avaliacao"
        >
          <h3>{{ municipio }}</h3>

          <div
            v-for="(atrativo, i) in atrativosPorMunicipio[municipio] || []"
            :key="i"
            class="atrativo-item"
          >
            <p>
              {{ atrativo.nome }} - Nota: {{ atrativo.nota }}
              <button type="button" @click="removerAtrativo(municipio, i)">Remover</button>
            </p>
          </div>

          <div class="add-atrativo">
            <input
              v-model="novoAtrativo.nome[municipio]"
              placeholder="Nome do atrativo"
            />
            <input
              type="number"
              min="0"
              max="10"
              v-model.number="novoAtrativo.nota[municipio]"
              placeholder="Nota (0 a 10)"
            />
            <button type="button" @click="adicionarAtrativo(municipio)">Adicionar Atrativo</button>
          </div>

          <hr />
        </div>
      </fieldset>
    </form>
  </div>
</template>



<script setup lang="ts">
import { Avaliacao } from '@/models/Avaliacao';
import { ref, watch } from 'vue'

const modelMunicipios = defineModel<string[]>('modelMunicipios')
const modelAvaliacoes = defineModel('modelAvaliacoes')

// Armazena os atrativos por município
const atrativosPorMunicipio = ref<Record<string, { nome: string; nota: number }[]>>({})

// Campos temporários para novo atrativo por município
const novoAtrativo = ref({
  nome: {} as Record<string, string>,
  nota: {} as Record<string, number>
})

function adicionarAtrativo(municipio: string) {
  const nome = novoAtrativo.value.nome[municipio]
  const nota = novoAtrativo.value.nota[municipio]

  if (!nome || nota === undefined || nota < 0 || nota > 10) {
    alert('Preencha o nome do atrativo e uma nota válida (0 a 10)')
    return
  }

  if (!atrativosPorMunicipio.value[municipio]) {
    atrativosPorMunicipio.value[municipio] = []
  }

  atrativosPorMunicipio.value[municipio].push({ nome, nota })

  // Limpa campos temporários
  novoAtrativo.value.nome[municipio] = ''
  //@ts-ignore
  novoAtrativo.value.nota[municipio] = undefined
}

function removerAtrativo(municipio: string, index: number) {
  atrativosPorMunicipio.value[municipio].splice(index, 1)
}

watch(
  atrativosPorMunicipio,
  (novoValor) => {
    const novaLista: Avaliacao[] = []

    for (const municipioId in novoValor) {
      const atrativos = novoValor[municipioId]

      atrativos.forEach((atrativo) => {
        novaLista.push(
          new Avaliacao(
            0,                // id (novo)
            1,                // viagemId (ajuste conforme seu caso real)
            true,             // isAtrativo
            atrativo.nota,
            undefined,        // atrativoId (caso tenha, substitua aqui)
            Number(municipioId) // Convertendo a chave para number
          )
        )
      })
    }
    modelAvaliacoes.value = novaLista
  },
  { deep: true }
)

</script>


<style scoped>
.container {
  background-color: #f7f9fc;
  padding: 1rem;
  color: black;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.municipio-avaliacao {
  margin-bottom: 1.5rem;
}

.atrativo-item {
  background-color: #eef;
  padding: 0.5rem;
  margin: 0.3rem 0;
  border-radius: 6px;
  font-size: 0.95rem;
}

.add-atrativo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

input {
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #007aff;
  color: white;
  width: 100%;
  cursor: pointer;
}

button:hover {
  background-color: #005fcc;
}

hr {
  margin-top: 1rem;
}
</style>

