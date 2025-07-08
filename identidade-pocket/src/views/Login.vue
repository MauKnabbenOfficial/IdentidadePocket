<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h2>Login </h2>

      <ion-item>
        <ion-input v-model="usuario" label="Usuário" />
      </ion-item>

      <ion-item>
        <ion-input v-model="senha" label="Senha" type="password" />
      </ion-item>

      <ion-button expand="block" @click="fazerLogin">Entrar</ion-button>
      <ion-text color="danger" v-if="erro">{{ erro }}</ion-text>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonInput, IonItem, IonButton, IonText } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/utils/auth';

const usuario = ref('');
const senha = ref('');
const erro = ref('');
const router = useRouter();

async function fazerLogin() {
  if (await login(usuario.value, senha.value)) {
    // router.push('/primeiroAcesso');
    router.push('/primeiroAcesso');

  } else {
    erro.value = 'Usuário ou senha inválidos';
  }
}
</script>
