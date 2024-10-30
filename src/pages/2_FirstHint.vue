<template>
  <PageWrapper>
    <div>
      <h3>Hola hola</h3>
      <h3>Nie ma nic za darmo!</h3>
    </div>
    <h4 class="no-margin">Rozwiąż krzyżówkę a dostaniesz podpowiedź.</h4>
    <h4 class="no-margin q-pb-xl">
      Zaraz sprawdzimy, jak dobrze znasz własną rodzinę:
    </h4>
    <CrossWord
      :crosswordSquaresData="crosswordSquaresData"
      crosswordKey="hint2"
      @update:mainPassword="($event) => (mainPassword = $event)"
    />
    <h4>Podpowiedź to: {{ hint }}</h4>
    <div class="row q-gutter-x-lg">
      <q-btn size="xl" :to="{ name: '1' }"> Wstecz </q-btn>
      <q-btn :disable="!isRight" size="xl" :to="{ name: '3' }"> Dalej </q-btn>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import CrossWord from 'src/components/CrossWord.vue';
import PageWrapper from 'src/components/PageWrapper.vue';
import { computed, ref } from 'vue';

const crosswordSquaresData = ref([
  {
    count: 6,
    mainIndex: 1,
    description: 'Najstarszy wnuk babci Danusi',
  },
  {
    count: 5,
    mainIndex: 3,
    description: 'Córka najstarszej córki dziadka Jurka',
  },
  {
    count: 7,
    mainIndex: 2,
    description: 'Pełne imię siostry Leona',
  },
  {
    count: 6,
    mainIndex: 1,
    description: 'Wujek który urodził się 30 lat temu',
  },
  {
    count: 8,
    mainIndex: 4,
    description: 'Parafia do której chodzą babcia Danusia i dziadek Jurek',
  },
  {
    count: 5,
    mainIndex: 1,
    description: 'Imię ojca chrzestnego Leona',
  },
]);

const mainPassword = ref<(string | null)[]>([]);
const isRight = computed(() => {
  return 'klusek'.toUpperCase() === mainPassword.value.join('').toUpperCase();
});
const hint = computed(() => (isRight.value ? 'x -> y' : ''));
</script>
