<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Tajemniczy prezent </q-toolbar-title>

        <q-btn
          v-if="initialized"
          flat
          round
          dense
          icon="description"
          @click="isDialogVisible = true"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="isDialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">Szyfr</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ encrypted }}
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Twoje podpowiedzi</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-for="(hint, index) in hints" :key="index">{{ hint }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { useEncryption } from 'src/composables/useEncryption';
import { MAX_CHANGES_COUNT } from 'src/constant';
import { computed, ref } from 'vue';

defineOptions({
  name: 'MainLayout',
});

const isDialogVisible = ref(false);
const hintsIds = [...Array(MAX_CHANGES_COUNT).keys()].map((value) => value + 1);
const { initialized, getHint, encrypted } = useEncryption();
const hints = computed(() => hintsIds.map((id) => getHint(id)));
</script>
