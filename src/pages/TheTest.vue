<template>
  <div>
    <q-btn
      :label="isText2Morse ? 'Tekst -> Morse' : 'Morse -> Tekst'"
      @click="toggle"
    />
    <q-input
      :label="isText2Morse ? 'Podaj tekst' : 'Podaj morse'"
      v-model="inputText"
      :class="{ 'input-monospace': !isText2Morse }"
    />
    <div v-text="translated" :class="{ monospace: isText2Morse }" />
    <div v-if="isText2Morse && translated">
      <q-btn label="Nadawaj" @click="play" />
      <div
        :class="[
          'display-container',
          { 'display-container--active': isDisplayActive },
        ]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CHAR_TO_MORSE, MORSE_TO_CHAR } from 'src/constant/morse';
import { computed, ref } from 'vue';

const isText2Morse = ref(true);
const inputText = ref('');
const toggle = () => {
  inputText.value = translated.value;
  isText2Morse.value = !isText2Morse.value;
};

const translated = computed(() => {
  return isText2Morse.value
    ? text2Morse(inputText.value)
    : morse2Text(inputText.value);
});

const text2Morse = (text: string) => {
  const chars = text.split('');
  return chars
    .map((char) => {
      if (!(char in CHAR_TO_MORSE)) {
        alert('nieznany znak: ' + char);
      }

      return CHAR_TO_MORSE[char as keyof typeof CHAR_TO_MORSE];
    })
    .join(' ');
};

const morse2Text = (morseText: string) => {
  //TODO: obsługa spacji
  const morseChars = morseText.split(' ');
  return morseChars
    .filter((char) => char)
    .map((char) => {
      if (!(char in MORSE_TO_CHAR)) {
        alert('nieznany znak: ' + char);
      }

      return MORSE_TO_CHAR[char as keyof typeof MORSE_TO_CHAR];
    })
    .join('');
};

const DOT_TIME = 300;
const DASH_TIME = 3 * DOT_TIME;
const isDisplayActive = ref(false);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const morseCharToTimes = (morseChar: string) => {
  return morseChar
    .split('')
    .flatMap((symbol) => {
      const symbolTime = symbol === '.' ? DOT_TIME : DASH_TIME;
      return [
        { time: DOT_TIME, active: false },
        { time: symbolTime, active: true },
      ];
    })
    .slice(1);
};

const play = async () => {
  const morseChars = translated.value.split(' ');
  const morseTimes = morseChars
    .flatMap((morseChar) => [
      { time: DASH_TIME, active: false },
      ...morseCharToTimes(morseChar),
    ])
    .slice(1);

  for (const morseCharTime of morseTimes) {
    isDisplayActive.value = morseCharTime.active;
    await sleep(morseCharTime.time);
    isDisplayActive.value = false;
  }
};
</script>

<style lang="scss" scoped>
.monospace {
  font-family: monospace;
}

.input-monospace :deep(input) {
  font-family: monospace;
}

.display-container {
  width: 90vw;
  height: 100px;
  background-color: black;
  border: 10px solid black;

  &--active {
    background-color: white;
  }
}
</style>
