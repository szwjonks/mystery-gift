<template>
  <q-dialog v-model="isVisible">
    <q-card class="q-pa-md column justify-center">
      <h5 class="q-mt-none">
        Nie ma problemu, wystarczy, że policzysz, ile jest samogłosek w
        poniższym tekście:
      </h5>
      <p class="text">
        {{ text }}
      </p>
      <q-form
        ref="form"
        class="row justify-center gap-xl q-mt-xl"
        @submit="check"
      >
        <q-input
          v-model="answer"
          outlined
          :rules="rules"
          label="Liczba samogłosek:"
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

const text = `Litwo! Ojczyzno moja! ty jesteś jak zdrowie.
Ile cię trzeba cenić, ten tylko się dowie,
Kto cię stracił. Dziś piękność twą w całej ozdobie
Widzę i opisuję, bo tęsknię po tobie.
Panno Święta, co Jasnej bronisz Częstochowy
I w Ostrej świecisz Bramie! Ty, co gród zamkowy
Nowogródzki ochraniasz z jego wiernym ludem!
Jak mnie dziecko do zdrowia powróciłaś cudem
(Gdy od płaczącej matki pod Twoję opiekę
Ofiarowany, martwą podniosłem powiekę
I zaraz mogłem pieszo do Twych świątyń progu
Iść za wrócone życie podziękować Bogu),
Tak nas powrócisz cudem na Ojczyzny łono.
Tymczasem przenoś moję duszę utęsknioną
Do tych pagórków leśnych, do tych łąk zielonych,
Szeroko nad błękitnym Niemnem rozciągnionych;
Do tych pól malowanych zbożem rozmaitem,
Wyzłacanych pszenicą, posrebrzanych żytem;
Gdzie bursztynowy świerzop, gryka jak śnieg biała,
Gdzie panieńskim rumieńcem dzięcielina pała,
A wszystko przepasane, jakby wstęgą, miedzą
Zieloną, na niej z rzadka ciche grusze siedzą.`;

const vowels = 'aąeęiouóy';
const properAnswer = text
  .toLowerCase()
  .split('')
  .filter((char) => vowels.includes(char)).length;

const answer = ref('');
const form = useTemplateRef<QForm>('form');
const rules: ValidationRule[] = [
  (v: string) => {
    const num = Number(v);
    if (isNaN(num)) {
      return 'To nie jest liczba';
    }

    if (num !== properAnswer) {
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

<style lang="scss">
.text {
  white-space: pre;
  overflow: auto;
  max-height: 50vh;
}
</style>
