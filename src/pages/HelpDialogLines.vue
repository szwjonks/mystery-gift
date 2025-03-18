<template>
  <q-dialog v-model="isVisible">
    <q-card class="q-pa-md column justify-center">
      <h5 class="q-mt-none">
        Nie ma problemu, wystarczy, że napiszesz "{{ REQUIRED_TEXT }}" (ale bez
        cudzysłowiów) {{ LINES_COUNT }} razy (każdy w nowej linii):
      </h5>
      <q-form ref="form" class="q-mb-md">
        <q-input type="textarea" v-model="text" outlined :rules="rules" />
      </q-form>
      <q-btn label="Sprawdź" @click="check" />
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

const REQUIRED_TEXT = 'Proszę pomóż!';
const LINES_COUNT = 1234;
const text = ref('');
const form = useTemplateRef<QForm>('form');
const rules: ValidationRule[] = [
  (v: string) => {
    const lines = v.split('\n');
    const allOk = lines.every((line) => line === REQUIRED_TEXT);
    if (!allOk) {
      return 'Któraś wartość jest niepoprawna';
    }

    if (lines.length < LINES_COUNT) {
      return 'Za mało';
    }

    if (lines.length > LINES_COUNT) {
      return 'Za dużo';
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
