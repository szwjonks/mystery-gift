<template>
  <PageWrapper>
    <h3>Oto opis:</h3>
    <h5 class="q-pa-lg">
      {{ encrypted }}
    </h5>
    <!-- <div>{{ counter }}</div>
    <div>{{ notUsedLetters }}</div>
    <div>{{ changes }}</div>
    <div>
      <div v-for="x in decryption">{{ x[0] }} -> {{ x[1] }} = {{ x[2] }}</div>
    </div> -->
    <div>
      <h4>
        Hmm, nie wiem co Ty sądzisz, ale ja myślę, że to jest szyfr.<br />Trzeba
        więc go rozkodować, zatem przydadzą Ci się pewne podpowiedzi
      </h4>
    </div>
    <q-btn size="xl" :to="{ name: '2' }"> Zobacz podpowiedź </q-btn>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from 'src/components/PageWrapper.vue';
import { useEncryption } from 'src/composables/useEncryption';

const { encrypted, initialized } = useEncryption();
initialized.value = true;
</script>
