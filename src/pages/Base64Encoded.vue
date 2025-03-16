<template>
  <div>
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
    <div class="row justify-center gap-xl q-mt-xl">
      <q-input
        v-model="answer"
        label="Odszyfrowana i zdekodowana odpowiedź"
        outlined
        class="col-3"
      />
      <q-btn label="Dalej" :disable="answer !== eh" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ALPHABET } from 'src/constant/alphabet';
import { ref } from 'vue';

const answer = ref('');
const shift = 6;

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
</script>

<style lang="scss"></style>
