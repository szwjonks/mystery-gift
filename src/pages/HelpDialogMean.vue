<template>
  <q-dialog v-model="isVisible">
    <q-card class="q-pa-md column justify-center">
      <h5 class="q-mt-none">
        Oto uczniowie i ich wyniki z różnych przedmiotów:
      </h5>
      <p class="text">
        {{ data }}
      </p>
      <h5 class="q-mt-none">
        Jeśli każdy punkt z fizyki ma wagę {{ physicsWeight }}, z matmy
        {{ mathsWeight }} a z angielskiego {{ englishWeight }}, to jak się
        nazywa osoba z czwartym najwyższym sumarycznym wynikiem z tych trzech
        przedmiotów.
      </h5>
      <div>
        Dane zapisane są w formacie
        <a href="https://pl.wikipedia.org/wiki/JSON" target="_blank">JSON</a>.
        Jest on dosyć często używany przez programistów.
      </div>
      <q-form
        ref="form"
        class="row justify-center gap-xl q-mt-xl"
        @submit="check"
      >
        <q-input
          v-model="answer"
          outlined
          :rules="rules"
          label="Ta osoba nazywa się"
          lazy-rules
        />
        <q-btn label="Sprawdź" class="self-start" @click="check" />
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { QForm, ValidationRule } from 'quasar';
import { ref, useTemplateRef } from 'vue';

const isVisible = defineModel({
  type: Boolean,
  required: true,
});

const emit = defineEmits<{
  (e: 'help-activated'): void;
}>();

const physicsWeight = 0.7;
const mathsWeight = 0.6;
const englishWeight = 0.5;

const data = [
  {
    name: 'arun',
    gender: 'Male',
    physics: 88,
    maths: 87,
    english: 78,
  },
  {
    name: 'rajesh',
    gender: 'Male',
    physics: 96,
    maths: 100,
    english: 95,
  },
  {
    name: 'raja',
    gender: 'Male',
    physics: 30,
    maths: 25,
    english: 40,
  },
  {
    name: 'usha',
    gender: 'Female',
    physics: 67,
    maths: 45,
    english: 78,
  },
  {
    name: 'priya',
    gender: 'Female',
    physics: 56,
    maths: 46,
    english: 78,
  },
  {
    name: 'Sundar',
    gender: 'Male',
    physics: 12,
    maths: 67,
    english: 67,
  },
  {
    name: 'Kavitha',
    gender: 'Female',
    physics: 78,
    maths: 71,
    english: 67,
  },
  {
    name: 'Dinesh',
    gender: 'Male',
    physics: 56,
    maths: 45,
    english: 67,
  },
  {
    name: 'Hema',
    gender: 'Female',
    physics: 71,
    maths: 90,
    english: 23,
  },
  {
    name: 'Gowri',
    gender: 'Female',
    physics: 100,
    maths: 100,
    english: 100,
  },
  {
    name: 'Ram',
    gender: 'Male',
    physics: 78,
    maths: 55,
    english: 47,
  },
  {
    name: 'Murugan',
    gender: 'Male',
    physics: 34,
    maths: 89,
    english: 78,
  },
  {
    name: 'moorthy',
    gender: 'Male',
    physics: 89,
    maths: 90,
    english: 70,
  },
  {
    name: 'Jenifer',
    gender: 'Female',
    physics: 67,
    maths: 88,
    english: 90,
  },
];

const answer = ref('');
const form = useTemplateRef<QForm>('form');
const rules: ValidationRule[] = [
  (v: string) => {
    if (v.trim().toLowerCase() !== data.at(-2)?.name) {
      return 'Źle!';
    }

    return true;
  },
];

const check = async () => {
  const isOk = await form.value?.validate(false);
  if (!isOk) {
    return;
  }

  emit('help-activated');
  isVisible.value = false;
};
</script>

<style lang="scss" scoped>
.text {
  overflow: auto;
  max-height: 30vh;
  white-space: pre;
  border: 1px solid black;
  padding: 6px;
}
</style>
