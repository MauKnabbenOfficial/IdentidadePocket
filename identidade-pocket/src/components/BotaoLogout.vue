<template>
  <ion-button fill="outline" color="danger" @click="fazerLogout">
    Sair
  </ion-button>
</template>

<script setup lang="ts">
import { logout } from '@/utils/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

function fazerLogout() {
  logout();
  router.push('/login');
}
</script>
