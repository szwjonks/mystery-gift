<template>
  <PageWrapper>
    <div>
      <h3>Znajomość zwierzaków</h3>
    </div>
    <h4 class="no-margin">
      Prezent nie może trafić do kogoś kto nie zna się na zwierzętach. Napisz
      ile jest kaczek u babci i dziadka a ostatnia podpowiedź będzie Twoja
    </h4>
    <h5 class="q-my-md">
      * Przyglądaj się uważnie, żeby nie pomylić kaczki z gęsią
    </h5>
    <q-input
      v-model.number="userAnswers[hintId]"
      square
      outlined
      label="Liczba kaczek"
      class="single-input q-mt-md"
    />
    <h4>Podpowiedź to: {{ hint }}</h4>
    <div class="row q-gutter-x-lg">
      <q-btn size="xl" :to="{ name: (hintId - 1).toString() }"> Wstecz </q-btn>
      <q-btn :disable="!isRight" size="xl" :to="{ name: 'encryption' }">
        Zakończ
      </q-btn>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from 'src/components/PageWrapper.vue';
import { useEncryption } from 'src/composables/useEncryption';
import { computed } from 'vue';

const { userAnswers, getHint, getIsRight } = useEncryption();

const hintId = 5;
const isRight = computed(() => getIsRight(hintId));
const hint = computed(() => getHint(hintId));
</script>
