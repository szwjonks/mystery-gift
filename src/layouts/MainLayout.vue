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
        <EncryptionAndHints />
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import EncryptionAndHints from 'src/components/EncryptionAndHints.vue';
import { useEncryption } from 'src/composables/useEncryption';
import { ref } from 'vue';

defineOptions({
  name: 'MainLayout',
});

const isDialogVisible = ref(false);
const { initialized } = useEncryption();
</script>
