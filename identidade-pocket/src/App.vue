<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<style>
/* Aplica o fundo em todas as telas, assumindo que você usa <ion-content> nas rotas */
ion-content {
  --background: #f7f9fc !important;
}
</style>