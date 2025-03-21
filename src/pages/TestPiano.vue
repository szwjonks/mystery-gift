<template>
  <PageWrapper>
    <div class="column gap-md q-my-md items-center">
      <h5 class="no-margin">
        Zaraz sprawdzimy, jak idzie Ci gra na instrumentach.
      </h5>
      <h5 class="no-margin">Spróbuj zagrać piosenkę i odgadnąć jej tytuł.</h5>
    </div>
    <div class="column justify-center gap-xl">
      <img :src="NotesImg" class="notes-image" />

      <div class="column items-center">
        <div>
          <span class="text-red-8">Czerwony tekst</span>
          - jaka to nuta
        </div>
        <div>
          <span class="text-blue-8">Niebieski tekst</span>
          - jaki klawisz na klawiaturze odpowiada nucie
        </div>
        <div>
          Na telefonie - można klikać w klawisze i zalecam obrócić ekran
        </div>
      </div>
      <div class="row justify-center">
        <div
          v-for="(note, keyboardKey) in notesMap"
          :key="note"
          :class="[
            'text-bold',
            note.length > 2 ? 'black-key' : 'white-key',
            { 'active-key': activeNotes.includes(note) },
          ]"
          @click="play(note)"
        >
          <div class="text-red-8">{{ note }}</div>
          <div class="text-blue-8">{{ keyboardKey }}</div>
        </div>
      </div>
    </div>

    <div v-if="!isHelpActive" class="row justify-center q-mt-xl">
      <q-btn @click="isHelpVisible = true">Pomocy!!</q-btn>
    </div>
    <HelpDialogCount
      v-model="isHelpVisible"
      @help-activated="isHelpActive = true"
    />

    <div v-if="isHelpActive" class="q-mt-xl">
      <q-btn v-if="!isPlaying" @click="autoplay">Graj</q-btn>
      <q-btn v-else @click="stopPlaying">Stop</q-btn>
    </div>

    <q-form
      ref="form"
      class="row justify-center gap-xl q-mt-xl"
      @submit="checkAnswer"
    >
      <q-input
        v-model="answer"
        label="Tytuł piosenki"
        outlined
        :rules="rules"
        lazy-rules
        @keydown="inputKeyDown"
      />
      <q-btn label="Dalej" class="self-start" @click="checkAnswer" />
    </q-form>
  </PageWrapper>
</template>

<script setup lang="ts">
import { onKeyDown } from '@vueuse/core';
import { QForm, ValidationRule } from 'quasar';
import NotesImg from 'src/assets/images/notes.png';
import PageWrapper from 'src/components/PageWrapper.vue';
import { NOTES } from 'src/constant/melody';
import { sleep } from 'src/utils';
import { Synth, start } from 'tone';
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import HelpDialogCount from './HelpDialogCount.vue';

const isHelpActive = ref(false);
const isHelpVisible = ref(false);

const notesMap = {
  A: 'C4',
  W: 'Db4',
  S: 'D4',
  E: 'Eb4',
  D: 'E4',
  F: 'F4',
  T: 'Gb4',
  G: 'G4',
  Y: 'Ab4',
  H: 'A4',
  U: 'Bb4',
  J: 'B4',
  K: 'C5',
};

const synth = new Synth().toDestination();
const activeNotes = ref<string[]>([]);

const play = (note: string, time = 0.3, silent = false) => {
  if (!silent) {
    synth.triggerAttackRelease(note, time);
  }

  activeNotes.value.push(note);
  setTimeout(() => {
    activeNotes.value.splice(activeNotes.value.indexOf(note), 1);
  }, time * 1000);
};

Object.entries(notesMap).forEach(([key, note]) => {
  onKeyDown([key, key.toLowerCase()], (e) => {
    console.log(e);
    play(note);
  });
});

const isPlaying = ref(false);
let stopPlay = false;

const stopPlaying = async () => {
  stopPlay = true;
};

// prettier-ignore
const autoplay = async () => {
  stopPlay = false;
  isPlaying.value = true;
  await start();
  

  for (const note of NOTES) {
    if (stopPlay) {
      break;
    }
    play(note.note, note.time, false);
    await sleep(note.sleep ?? 500);
    if (stopPlay) {
      break;
    }
  }
  isPlaying.value = false;
};

const answer = ref('');
const form = useTemplateRef<QForm>('form');
const router = useRouter();

const rules: ValidationRule[] = [
  (v: string) =>
    v.trim().toLowerCase() == 'wlazł kotek na płotek' ||
    'Niepoprawna odpowiedź',
];

const checkAnswer = async () => {
  const isOk = await form.value?.validate(false);
  if (!isOk) {
    return;
  }

  router.push({
    name: 'the-end',
  });
};

const inputKeyDown = (e: KeyboardEvent) => {
  if (e.key !== 'Enter') {
    e.stopPropagation();
  }
};
</script>

<style lang="scss" scoped>
.white-key {
  border: 1px solid #000000;
  width: 100px;
  height: 400px;
  background-color: white;
  text-align: center;
}
.black-key {
  background-color: black;
  width: 60px;
  height: 250px;
  margin-left: -30px;
  margin-right: -30px;
  z-index: 1;
  text-align: center;
}

.active-key {
  background-color: #ee82ee70;
}

.notes-image {
  object-fit: contain;
  height: 200px;
}
</style>
