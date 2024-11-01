<template>
  <div>
    <q-card-section>
      <div class="text-h4">Szyfr</div>
    </q-card-section>

    <q-card-section class="q-pt-none text-h6">
      {{ encrypted }}
    </q-card-section>
    <q-card-section>
      <div class="text-h4">Twoje podpowiedzi</div>
    </q-card-section>

    <q-card-section class="q-pt-none text-h5">
      <div v-for="(hint, index) in hints" :key="index">{{ hint }}</div>
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { useEncryption } from 'src/composables/useEncryption';
import { MAX_CHANGES_COUNT } from 'src/constant';
import { computed } from 'vue';

const hintsIds = [...Array(MAX_CHANGES_COUNT).keys()].map((value) => value + 1);
const { getHint, encrypted } = useEncryption();
const hints = computed(() => hintsIds.map((id) => getHint(id)));
</script>
