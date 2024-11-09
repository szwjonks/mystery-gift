<template>
  <PageWrapper>
    <div>
      <h3>Znajomość państw</h3>
    </div>
    <h4 class="no-margin">
      Teraz celem jest uzupełnienie stolic państw sąsiadujących z Polską:
    </h4>
    <img :src="Countries" class="q-my-md" style="max-width: 90vw" />
    <CrossWord
      :crosswordSquaresData="crosswordSquaresData"
      crosswordKey="hint4"
      @update:mainPassword="($event) => (mainPassword = $event)"
    />
    <h5 class="q-my-md">
      * Pamiętaj, że chodzi o stolice, a nie nazwy tych państw ** Stolice możesz
      znaleźć w atlasie, w internecie, albo podpytać innych
    </h5>
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
import Countries from 'src/assets/images/countries.png';
import CrossWord from 'src/components/CrossWord.vue';
import PageWrapper from 'src/components/PageWrapper.vue';
import { useEncryption } from 'src/composables/useEncryption';
import { computed, ref, watch } from 'vue';

const crosswordSquaresData = ref([
  {
    count: 5,
    mainIndex: 1,
  },
  {
    count: 5,
    mainIndex: 2,
  },
  {
    count: 5,
    mainIndex: 1,
  },
  {
    count: 10,
    mainIndex: 6,
  },
  {
    count: 6,
    mainIndex: 2,
  },
  {
    count: 5,
    mainIndex: 2,
  },
]);
const mainPassword = ref<(string | null)[]>([]);
watch(mainPassword, (value) => {
  const answer = value.join('').toUpperCase();
  userAnswers.value[hintId] = answer;
});

const { userAnswers, getHint, getIsRight } = useEncryption();

const hintId = 4;
const isRight = computed(() => getIsRight(hintId));
const hint = computed(() => getHint(hintId));
</script>
