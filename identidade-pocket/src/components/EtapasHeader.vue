<template>
  <div class="stepper">
    <div
      v-for="(etapa, index) in etapas"
      :key="index"
      class="step"
      :class="{ active: etapa.route === route.path }"
      @click="navegarPara(etapa.route)"
    >
      <div class="circle">{{ index + 1 }}</div>
      <div class="label">{{ etapa.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const etapas = [
  { label: 'Etapa 1', route: '/tabs/etapa1' },
  { label: 'Etapa 2', route: '/tabs/etapa2' },
  { label: 'Etapa 3', route: '/tabs/etapa3' },
];

function navegarPara(caminho: string) {
  if (route.path !== caminho) {
    router.push(caminho);
  }
}
</script>

<style scoped>
.stepper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #1e1e1e;
  padding: 12px 0;
  border-bottom: 1px solid #333;
}

.step {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #2c3e50;
  color: white;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.step.active .circle {
  background-color: #10b981;
}

.label {
  margin-left: 6px;
  font-size: 12px;
  color: #fff;
}
</style>
