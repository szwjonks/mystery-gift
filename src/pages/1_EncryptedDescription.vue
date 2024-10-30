<template>
  <PageWrapper>
    <h3>Oto opis:</h3>
    <h5 class="q-pa-lg">
      xx x x x x asd as asd sadd asd a xx x x x x asd as asd sadd asd a xx x x x
      x asd as asd sadd asd a
    </h5>
    <div>
      <h4>Hmm, nie wiem co Ty sądzisz, ale ja myślę, że to jest szyfr.</h4>
      <h4>
        Trzeba więc go rozkodować, zatem przydadzą Ci się pewne podpowiedzi
      </h4>
    </div>
    <q-btn size="xl" :to="{ name: '2' }"> Zobacz podpowiedź </q-btn>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from 'src/components/PageWrapper.vue';
</script>
