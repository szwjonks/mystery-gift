<template>
  <div>
    <div class="row justify-center">
      <div
        v-for="(note, keyboardKey) in notesMap"
        :key="note"
        :class="[
          note.length > 2 ? 'black-key' : 'white-key',
          { 'active-key': activeNotes.includes(note) },
        ]"
        @click="play(note)"
      >
        <div>{{ keyboardKey }}</div>
        <div>{{ note }}</div>
      </div>
    </div>

    <q-btn @click="autoplay">auto</q-btn>
  </div>
</template>

<script setup lang="ts">
import { onKeyDown } from '@vueuse/core';
import { sleep } from 'src/utils';
import { Synth, start } from 'tone';
import { ref } from 'vue';

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

// const play = (note: string, time = '8n') => {
const play = (note: string, time = 0.3) => {
  synth.triggerAttackRelease(note, time);
  activeNotes.value.push(note);
  setTimeout(() => {
    activeNotes.value.splice(activeNotes.value.indexOf(note), 1);
  }, time * 1000);
};

Object.entries(notesMap).forEach(([key, note]) => {
  onKeyDown([key, key.toLowerCase()], () => play(note));
});
// prettier-ignore
const autoplay = async () => {
  await start();
  const notes = [
  {
    'note': 'G4',
    'time': 0.3
  },
  {
    'note': 'E4',
    'time': 0.3
  },
  {
    'note': 'E4',
    'time': 0.3
  },
  {
    'note': 'F4',
    'time': 0.3
  },
  {
    'note': 'D4',
    'time': 0.3
  },
  {
    'note': 'D4',
    'time': 0.3
  },
  {
    'note': 'C4',
    'time': 0.3,
    sleep: 300
  },
  {
    'note': 'E4',
    'time': 0.3,
    sleep: 300
  },
  {
    'note': 'G4',
    'time': 0.5,
    sleep: 800
  },
///
  {
    'note': 'G4',
    'time': 0.3
  },
  {
    'note': 'E4',
    'time': 0.3
  },
  {
    'note': 'E4',
    'time': 0.3
  },
  {
    'note': 'F4',
    'time': 0.3
  },
  {
    'note': 'D4',
    'time': 0.3
  },
  {
    'note': 'D4',
    'time': 0.3
  },
  {
    'note': 'C4',
    'time': 0.3,
    sleep: 300
  },
  {
    'note': 'E4',
    'time': 0.3,
    sleep: 300
  },
  {
    'note': 'C4',
    'time': 0.5,
  }
];

  for (const note of notes) {
    console.log(`play note:${note}`);
    play(note.note, note.time);
    await sleep(note.sleep ?? 500);
  }
};
</script>

<style lang="scss" scoped>
.white-key {
  border: 1px solid #000000;
  width: 100px;
  height: 400px;
  background-color: white;
  color: red;
  text-align: center;
}
.black-key {
  background-color: black;
  width: 60px;
  height: 250px;
  margin-left: -30px;
  margin-right: -30px;
  z-index: 1;
  color: red;
  text-align: center;
}

.active-key {
  background-color: #ee82ee70;
}
</style>
