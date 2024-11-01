<template>
  <PageWrapper>
    <EncryptionAndHints />
    <h5>
      * O co chodzi? Jeśli podpowiedź brzmi np "a -> b", to znaczy, że każdą
      literę "a" trzeba zmianienić na literę "b". Zamiana dotyczy także dużych
      liter.<br />
      ** Pewnie przyda Ci się kartka i coś do pisania, bo łatwiej będzie to
      sobie zapisać
    </h5>
    <div class="row q-gutter-x-lg">
      <q-btn size="xl" :to="{ name: '5' }"> Wstecz </q-btn>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import EncryptionAndHints from 'src/components/EncryptionAndHints.vue';
import PageWrapper from 'src/components/PageWrapper.vue';
</script>
