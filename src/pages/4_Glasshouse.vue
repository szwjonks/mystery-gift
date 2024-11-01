<template>
  <PageWrapper>
    <div>
      <h3>Znajomość okolicy</h3>
    </div>
    <h4 class="no-margin">
      Teraz celem jest odnalezienie tajnego hasła. Zostało ono zapisane w
      budynku niedaleko domu babci i dziadka. Ten budynek znajduje się na
      obrazku poniżej:
    </h4>
    <img src="src/assets/images/glasshouse.jpg" class="q-my-md" />
    <h4 class="no-margin">
      Po wejściu do budynku przyjrzyj się jak zbudowane są ściany - co jakiś
      czas ściana ma metalowy słup. Hasło jest zapisane <b>6</b> słupie po
      prawej stronie licząc od wejścia.
    </h4>
    <h5 class="q-my-md">
      * W razie wątpliwości - to jest duży budynek w którym uprawiane są
      warzywa<br />
      ** Musisz wyjść na zewnątrz, więc ubierz się ciepło i załóż odpowiednie
      buty
    </h5>
    <q-input
      :modelValue="userAnswers[hintId]"
      square
      outlined
      label="Poszukiwane hasło"
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

const hintId = 4;
const isRight = computed(() => getIsRight(hintId));
const hint = computed(() => getHint(hintId));
</script>
