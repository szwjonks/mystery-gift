<template>
  <PageWrapper>
    <div>
      <h3>Gotowanie</h3>
    </div>
    <h4 class="no-margin">
      Babcia Danusia ma pewien zeszyt z przepisami. W tym zeszycie odnajdź
      przepis na ciasto "Łatwy piernik" i z opisu przygotowania odczytaj
      <b>trzecie</b>
      słowo.
    </h4>
    <h5 class="no-margin">
      * Gdzie jest ten zeszyt dowiesz się od babci<br />
      ** Pamiętaj, że chodzi o słowo z opisu przygotowania, pomiń więc sekcję
      składników ciasta
    </h5>
    <q-input
      :modelValue="userAnswers[hintId]"
      square
      outlined
      label="Poszukiwane słowo"
      class="single-input q-mt-md"
      @update:modelValue="
        ($event) =>
          (userAnswers[hintId] = ($event ?? '').toString().toUpperCase())
      "
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

const hintId = 3;
const isRight = computed(() => getIsRight(hintId));
const hint = computed(() => getHint(hintId));
</script>
