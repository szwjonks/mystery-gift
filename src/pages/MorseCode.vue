<template>
  <PageWrapper>
    <div class="column gap-md q-my-md items-center">
      <h5 class="no-margin">
        A co gdyby ktoś chciał przesłać wiadomość tylko za pomocą jednego
        dźwięku, albo zapalają/gasząc światło?
      </h5>
      <h5 class="no-margin">
        Taki problem można rozwiązać za pomocą
        <a
          href="https://pl.wikipedia.org/wiki/Kod_Morse%E2%80%99a"
          target="_blank"
          >alfabetu Morsa</a
        >
        (radzę zapoznać się z linkiem, żeby np dowiedzieć sie jak odróżnić
        kropkę od kreski).
      </h5>
      <div class="row gap-md q-my-md">
        <h5 class="no-margin">
          Tobie przypadło rozszyfrowanie takiego prostego komunikatu:
        </h5>
      </div>
    </div>
    <div v-if="false">
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
    </div>
    <div v-if="isText2Morse && translated" class="column items-center">
      <div class="row items-center gap-xl q-pa-md">
        <q-btn v-if="!isPlaying" label="Nadawaj" @click="runPlay" />
        <q-btn v-else label="Stop" @click="stopPlaying" />
        <div class="row gap-xl col-6">
          <q-badge>Czas nadawania "kropki" [ms]</q-badge>
          <q-slider v-model="dotTime" :min="100" :max="1000" label-always />
        </div>
      </div>
      <div
        :class="[
          'display-container',
          { 'display-container--active': isDisplayActive },
        ]"
      ></div>
    </div>
    <div v-if="atLeastOne && !isHelpActive" class="row justify-center q-mt-xl">
      <q-btn @click="isHelpVisible = true">Pomocy!!</q-btn>
    </div>
    <HelpDialogLines
      v-model="isHelpVisible"
      @help-activated="isHelpActive = true"
    />
    <div v-if="isHelpActive" class="row justify-center">
      <h5>
        Oto zapis komunikatu:
        <span class="monospace q-pa-sm" style="border: 1px solid black">{{
          translated
        }}</span>
      </h5>
    </div>
    <q-form
      ref="form"
      class="row justify-center gap-xl q-mt-xl"
      @submit="checkAnswer"
    >
      <q-input
        v-model="answer"
        label="Twoja odpowiedź"
        outlined
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
import { CHAR_TO_MORSE, MORSE_TO_CHAR } from 'src/constant/morse';
import { sleep } from 'src/utils';
import { Oscillator, start } from 'tone';
import { computed, ref, useTemplateRef, watch } from 'vue';
import { useRouter } from 'vue-router';
import HelpDialogLines from './HelpDialogLines.vue';

const isHelpActive = ref(false);
const isHelpVisible = ref(false);
const atLeastOne = ref(false);
const isText2Morse = ref(true);
const inputText = ref('base64');
const answer = ref('');
const form = useTemplateRef<QForm>('form');
const router = useRouter();

const rules: ValidationRule[] = [
  (v: string) => v == inputText.value || 'Niepoprawna odpowiedź',
];

const checkAnswer = async () => {
  const isOk = await form.value?.validate(false);
  if (!isOk) {
    return;
  }

  router.push({
    name: 'base64',
  });
};

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
const isPlaying = ref(false);

const play = async () => {
  isPlaying.value = true;
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
      break;
    }
    isDisplayActive.value = morseCharTime.active;
    await sleep(morseCharTime.time);
    isDisplayActive.value = false;
    if (stopPlay) {
      break;
    }
  }
  atLeastOne.value = true;
  isPlaying.value = false;
};

const runPlay = async () => {
  if (playPromise) {
    stopPlay = true;
    await playPromise;
    stopPlay = false;
  }
  playPromise = play();
};

const stopPlaying = async () => {
  stopPlay = true;
};

const osc = new Oscillator(440, 'sine').toDestination();

watch(isDisplayActive, (active) => {
  if (active) {
    osc.start();
  } else {
    osc.stop();
  }
});
</script>

<style lang="scss" scoped>
.monospace {
  font-family: monospace;
}

.input-monospace :deep(input) {
  font-family: monospace;
}

.display-container {
  width: 60vw;
  height: 200px;
  background-color: black;
  border: 10px solid black;

  &--active {
    background-color: white;
  }
}
</style>
