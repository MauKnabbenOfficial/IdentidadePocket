<template>
  <div class="container">
    <form class="form-visitante">
      <!-- VISITANTE -->
      <fieldset>
        <legend>Visitante</legend>

        <label>Gênero</label>
        <div>
          <label
            ><input type="radio" v-model="form.genero" value="M" />
            Masculino</label
          >
          <label
            ><input type="radio" v-model="form.genero" value="F" />
            Feminino</label
          >
        </div>

        <label>Idade: {{ form.idade }}</label>
        <input type="range" v-model="form.idade" min="0" max="100" />

        <label>Renda Mensal (milhares R$): {{ form.renda }}</label>
        <input type="range" v-model="form.renda" min="0" max="20" step="0.5" />

        <label>Profissão</label>
        <select v-model="form.profissao">
          <option value="">Selecione</option>
          <option v-for="p in profissoes" :key="p" :value="p">{{ p }}</option>
        </select>

        <label>Formação</label>
        <select v-model="form.formacao">
          <option value="">Selecione</option>
          <option v-for="f in formacoes" :key="f" :value="f">{{ f }}</option>
        </select>
      </fieldset>

      <!-- RESIDÊNCIA -->
      <fieldset>
        <legend>Residência</legend>

        <label>País</label>
        <select v-model="form.pais">
          <option value="Brasil">Brasil</option>
        </select>

        <label>CEP</label>
        <input v-model="form.cep" maxlength="8" />

        <label>UF</label>
        <select v-model="form.uf">
          <option value="">Selecione</option>
          <option v-for="uf in ufs" :key="uf" :value="uf">{{ uf }}</option>
        </select>

        <label>Município</label>
        <select v-model="form.municipio">
          <option value="">Selecione</option>
          <option v-for="m in municipios" :key="m" :value="m">{{ m }}</option>
        </select>
      </fieldset>

      <ion-button expand="block" @click="submit">Enviar</ion-button>
    </form>
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
import { Turista } from "@/models/Turista";
import { ref } from "vue";
import { Usuario } from "@/models/Usuario";
import { Profissao } from "@/enums/Profissao";
import { Genero } from "@/enums/Genero";
import { Endereco } from "@/models/Endereco";
import { Formacao } from "@/enums/Formacao";
import router from "@/router";

const profissoes = ["Engenheiro", "Professor", "Médico", "Outros"];
const formacoes = ["Fundamental", "Médio", "Superior", "Pós-graduação"];
const ufs = ["SP", "RJ", "MG", "RS", "BA", "PR"];
const municipios = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Porto Alegre",
];

turista: Turista;

const form = ref({
  genero: "",
  idade: "",
  renda: -1,
  profissao: "",
  formacao: "",
  pais: "",
  cep: "",
  uf: "",
  municipio: "",
});

async function submit() {
  debugger;
  var _usuario = new Usuario("User", "User@teste.com", "comum");
  var _genero = form.value.genero as Genero;
  var _renda = form.value.renda < 0 ? null : form.value.renda;
  var _idade = parseInt(form.value.idade);
  var _profissao = form.value.profissao as Profissao;
  var _formacao = form.value.formacao as Formacao;
  var _endereco = new Endereco(
    1,
    1,
    form.value.pais,
    form.value.cep,
    form.value.uf,
    form.value.municipio
  );

  var _turista = new Turista(
    _usuario,
    _genero,
    _idade,
    _renda,
    _profissao,
    _formacao,
    _endereco
  );

  sessionStorage.setItem("userInfo", _turista.toJSONstr());
  router.push("/coletaPage");
}
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

.for-visitante {
  align-items: center;
}
</style>
