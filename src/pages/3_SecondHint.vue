<template>
  <PageWrapper>
    <div>
      <h3>Trochę ruchu nie zaszkodzi!</h3>
    </div>
    <h4 class="no-margin">
      Aby otrzymać kolejną podpowiedź policz ile jest schodów w domu babci i
      dziadka
    </h4>
    <h4 class="no-margin q-pb-xl">
      * Nie musisz sprawdzać strychu - nie jest wliczony
    </h4>
    <q-input
      v-model.number="stairsCount"
      square
      outlined
      label="Liczba schodów"
      class="single-input"
    />
    <h4>Podpowiedź to: {{ hint }}</h4>
    <div class="row q-gutter-x-lg">
      <q-btn size="xl" :to="{ name: '2' }"> Wstecz </q-btn>
      <q-btn :disable="!isRight" size="xl" :to="{ name: '4' }"> Dalej </q-btn>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import PageWrapper from 'src/components/PageWrapper.vue';
import { computed } from 'vue';

const stairsCount = useStorage('stairsCount', null);
const isRight = computed(() => Number(stairsCount.value) === 42);
const hint = computed(() => (isRight.value ? 'z -> c' : ''));
</script>
