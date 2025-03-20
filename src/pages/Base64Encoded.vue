<template>
  <PageWrapper>
    <div class="column gap-md q-my-md items-center">
      <h5 class="no-margin">
        Co to w ogóle jest base64, możesz dowiedzieć się np tutaj:
        <a href="https://pl.wikipedia.org/wiki/Base64" target="_blank"
          >wikipedia</a
        >.
      </h5>
      <h5 class="q-my-none q-mx-lg">
        Twoim zadaniem jest odszyfrować poniższy kod - narzędzi do tego jest
        wiele, więc zostawiam Ci wolną rękę i zrób to jak uważasz. Musisz jednak
        wiedzieć, że zaszyfrowana wartość została poddana jeszcze obróce
        <a href="https://pl.wikipedia.org/wiki/Szyfr_Cezara" target="_blank"
          >szyfrem Cezara</a
        >. Do rozszyfrowania przyda Ci się wiedza, że "mamałyga" to po
        zaszyfrowaniu "{{ cipher('mamałyga') }}". Ważne - użyłem alfabetu z tej
        strony:
        <a href="https://pl.wikipedia.org/wiki/Alfabet_polski" target="_blank"
          >link</a
        >
        (wszystkie 35 liter)
      </h5>
      <div class="column gap-md q-my-md">
        <h5 class="no-margin">Oto base64 zaszyfrowany szyfrem Cezara:</h5>
        <h5>{{ code }}</h5>
      </div>
    </div>

    <div v-if="!isHelpActive" class="row justify-center q-mt-xl">
      <q-btn @click="isHelpVisible = true">Pomocy!!</q-btn>
    </div>
    <HelpDialogMean
      v-model="isHelpVisible"
      @help-activated="isHelpActive = true"
    />
    <div v-if="isHelpActive">
      <div>
        Ta strona powinna pomóc przy szyfrze Cezara:
        <a href="https://cryptii.com/pipes/caesar-cipher" target="_blank"
          >link</a
        >
      </div>
      <div>
        A ta, przy base64:
        <a href="https://www.base64decode.org/" target="_blank">link</a>
      </div>
    </div>
    <q-form
      ref="form"
      class="row justify-center gap-xl q-mt-xl"
      @submit="checkAnswer"
    >
      <q-input
        v-model="answer"
        label="Odszyfrowana i zdekodowana odpowiedź"
        outlined
        class="answer-input"
        :rules="rules"
        lazy-rules
      />
      <q-btn label="Dalej" class="self-start" @click="checkAnswer" />
    </q-form>
  </PageWrapper>
</template>

<script setup lang="ts">
import { QForm, ValidationRule } from 'quasar';
import PageWrapper from 'src/components/PageWrapper.vue';
import { ALPHABET } from 'src/constant/alphabet';
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import HelpDialogMean from './HelpDialogMean.vue';

const answer = ref('');
const shift = 6;
const isHelpActive = ref(false);
const isHelpVisible = ref(false);

const cipher = (s: string) => {
  return s
    .split('')
    .map((char) => {
      const isUpper = char === char.toUpperCase();
      const index = ALPHABET.indexOf(char.toLowerCase());
      if (index < 0) {
        return char;
      }

      const newIndex = (index + shift) % ALPHABET.length;
      const newChar = ALPHABET[newIndex];
      return isUpper ? newChar.toUpperCase() : newChar;
    })
    .join('');
};

const decipher = (s: string) => {
  return s
    .split('')
    .map((char) => {
      const isUpper = char === char.toUpperCase();
      const index = ALPHABET.indexOf(char.toLowerCase());
      if (index < 0) {
        return char;
      }

      const newIndex = (index + -shift + ALPHABET.length) % ALPHABET.length;
      const newChar = ALPHABET[newIndex];
      return isUpper ? newChar.toUpperCase() : newChar;
    })
    .join('');
};

const eh = 'pianino';
const code = cipher(btoa(eh));
const form = useTemplateRef<QForm>('form');
const router = useRouter();

const rules: ValidationRule[] = [
  (v: string) => v == eh || 'Niepoprawna odpowiedź',
];

const checkAnswer = async () => {
  const isOk = await form.value?.validate(false);
  if (!isOk) {
    return;
  }

  router.push({
    name: 'piano',
  });
};
</script>

<style lang="scss">
.answer-input {
  min-width: 280px;
}
</style>
