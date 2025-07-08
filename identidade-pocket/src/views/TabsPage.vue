<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <EtapasHeader />
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-router-outlet />
    </ion-content>
    <BotaoLogout />
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonRouterOutlet,
} from "@ionic/vue";
import EtapasHeader from "@/components/EtapasHeader.vue";
import BotaoLogout from "@/components/BotaoLogout.vue";
</script>
