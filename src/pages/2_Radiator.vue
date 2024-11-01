<template>
  <PageWrapper>
    <div>
      <h3>Lekka rozgrzewka</h3>
    </div>
    <h4 class="no-margin">
      Aby otrzymać kolejną podpowiedź, policz ile jest żeberek w grzejnikach w
      pokoju z dużym stołem i tym obok (tam gdzie śpi wujek Szymon)
    </h4>
    <h5 class="no-margin">
      * Co to jest żeberko grzejnika możesz dowiedzieć się od dziadka Jurka,
      albo zerknij na
      <a
        href="https://bilder.obi.pl/85b0b1d7-2bf9-4e26-867b-3596fdd03680/prZZH/546452_4600_grzejnik_1.jpg"
        target="_blank"
        >ten obrazek</a
      >.
    </h5>
    <q-input
      v-model.number="userAnswers[hintId]"
      square
      outlined
      label="Liczba żeberek"
      class="single-input q-mt-md"
    />
    <h4>Podpowiedź to: {{ hint }}</h4>
    <div class="row q-gutter-x-lg">
      <q-btn size="xl" :to="{ name: (hintId - 1).toString() }"> Wstecz </q-btn>
      <q-btn
        :disable="!isRight"
        size="xl"
        :to="{ name: (hintId + 1).toString() }"
      >
        Dalej
      </q-btn>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from 'src/components/PageWrapper.vue';
import { useEncryption } from 'src/composables/useEncryption';
import { computed } from 'vue';

const { userAnswers, getHint, getIsRight } = useEncryption();

const hintId = 2;
const isRight = computed(() => getIsRight(hintId));
const hint = computed(() => getHint(hintId));
</script>
