<template>
  <PageWrapper>
    <h3>Twój prezent przepadł!</h3>
    <h4 class="q-pa-md-md">
      Ale nie trać nadziei - na następnym kroku znajdziesz opis, który pomoże Ci
      odnaleźć Twoją zgubę
    </h4>
    <q-btn color="primary" size="xl" :to="{ name: '1' }"> Sprawdź opis </q-btn>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from 'src/components/PageWrapper.vue';

defineOptions({
  name: 'IndexPage',
});
</script>
