<template>
  <PageWrapper>
    <blockquote>
      <h4>
        ...czasami cel podróży nie jest najważniejszy, liczy się sama droga, to
        czego się na niej dowiadujesz, co robisz.
      </h4>
      <footer><h5>- Nora Roberts, Taniec bogów</h5></footer>
    </blockquote>
    <h4>
      Ta.. Po prostu, żeby Cię zmotywować do ruszenia głową i poznania kilku
      ciekawostek, aby otrzymać swój prezent musisz rozwiazać kilka
      zadań/zagadek.
    </h4>

    <q-btn color="primary" size="xl" :to="{ name: 'morse' }">
      Rozpocznij
    </q-btn>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from 'src/components/PageWrapper.vue';

defineOptions({
  name: 'IndexPage',
});
</script>
