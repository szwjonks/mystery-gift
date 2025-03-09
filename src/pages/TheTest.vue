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
      <div>
        <q-btn label="Nadawaj" @click="runPlay" />
        <q-slider v-model="dotTime" :min="100" :max="1000" label-always />
      </div>
      <div
        :class="[
          'display-container',
          { 'display-container--active': isDisplayActive },
        ]"
      ></div>
    </div>
    <TestPiano class="q-mt-xl" />
  </div>
</template>

<script setup lang="ts">
import { CHAR_TO_MORSE, MORSE_TO_CHAR } from 'src/constant/morse';
import { sleep } from 'src/utils';
import { Oscillator, start } from 'tone';
import { computed, ref, watch } from 'vue';
import TestPiano from './TestPiano.vue';

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

const dotTime = ref(300);
// const DOT_TIME = 300;
// const DASH_TIME = 3 * DOT_TIME;
const dashTime = computed(() => 3 * dotTime.value);
const isDisplayActive = ref(false);

const morseCharToTimes = (morseChar: string) => {
  return morseChar
    .split('')
    .flatMap((symbol) => {
      const symbolTime = symbol === '.' ? dotTime.value : dashTime.value;
      return [
        { time: dotTime.value, active: false },
        { time: symbolTime, active: true },
      ];
    })
    .slice(1);
};

let playPromise: Promise<void> | null = null;
let stopPlay = false;

const play = async () => {
  await start();
  const morseChars = translated.value.split(' ');
  const morseTimes = morseChars
    .flatMap((morseChar) => [
      { time: dashTime.value, active: false },
      ...morseCharToTimes(morseChar),
    ])
    .slice(1);

  for (const morseCharTime of morseTimes) {
    if (stopPlay) {
      return;
    }
    isDisplayActive.value = morseCharTime.active;
    // beep(morseCharTime.time / 1000);
    await sleep(morseCharTime.time);
    isDisplayActive.value = false;
    if (stopPlay) {
      return;
    }
  }
};

const runPlay = async () => {
  if (playPromise) {
    stopPlay = true;
    await playPromise;
    stopPlay = false;
  }
  playPromise = play();
};

const osc = new Oscillator(440, 'sine').toDestination();

watch(isDisplayActive, (active) => {
  if (active) {
    osc.start();
  } else {
    osc.stop();
  }
});

const beep = async (timeInSeconds: number) => {
  console.log('start');
  osc.start();
  await sleep(timeInSeconds * 1000);
  osc.stop();
  console.log('stop');
  // synth.triggerAttackRelease('C6', timeInSeconds);
};

window.beep = beep;
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
