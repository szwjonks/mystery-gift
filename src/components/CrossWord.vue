<template>
  <div class="crossword-warpper row">
    <div class="column">
      <div
        v-for="(word, wordIndex) in crosswordSquaresData"
        :key="wordIndex"
        class="row items-center"
      >
        <div
          v-for="fakeLetterIndex in Math.max(maxMainIndex - word.mainIndex, 0)"
          :key="fakeLetterIndex"
          class="crossword-square"
        />
        <div class="crossword-square column justify-center">
          {{ wordIndex + 1 }}
        </div>
        <div
          v-for="letterIndex in word.count"
          :key="letterIndex"
          :class="[
            'crossword-square',
            'crossword-letter',
            { 'crossword-letter--main': letterIndex === word.mainIndex },
          ]"
        >
          <q-input
            :ref="
              (el: QInput) =>
                (letterBoxReferences[`${wordIndex}_${letterIndex}`] = el)
            "
            :modelValue="crosswordInputData[wordIndex][letterIndex]"
            class="crossword-letter__input"
            maxlength="1"
            @focus="(event) => (event.target as HTMLInputElement)?.select()"
            @update:model-value="
              ($event) => onLetterInput(wordIndex, letterIndex, $event)
            "
            @keydown="($event) => onKeydown(wordIndex, letterIndex, $event)"
          />
        </div>
      </div>
    </div>
    <div class="column items-start">
      <h6
        v-for="(word, wordIndex) in crosswordSquaresData"
        :key="wordIndex"
        class="no-margin"
      >
        {{ wordIndex + 1 }}. {{ word.description }}
      </h6>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { QInput } from 'quasar';
import { CrosswordSquaresData } from 'src/interfaces';
import { computed, PropType, ref, toRefs, watch } from 'vue';

const props = defineProps({
  crosswordSquaresData: {
    type: Array as PropType<CrosswordSquaresData[]>,
    required: true,
  },
  crosswordKey: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'update:mainPassword', mainPassword: (string | null)[]): void;
  (e: 'update:inputData', crosswordInputData: (string | null)[][]): void;
}>();

const { crosswordSquaresData, crosswordKey } = toRefs(props);

const crosswordInputData = useStorage(
  crosswordKey.value,
  crosswordSquaresData.value.map<(string | null)[]>(() => []),
);

const maxMainIndex = Math.max(
  ...crosswordSquaresData.value.map((word) => word.mainIndex),
);

const onLetterInput = (
  wordIndex: number,
  letterIndex: number,
  value: string | number | null,
) => {
  const preparedValue = prepareValue(value);
  crosswordInputData.value[wordIndex][letterIndex] = preparedValue;
  emit('update:inputData', crosswordInputData.value);
  if (preparedValue) {
    focusNextIfPossible(wordIndex, letterIndex);
  } else {
    focusPreviousIfPossible(wordIndex, letterIndex);
  }
};

const prepareValue = (value: string | number | null) => {
  if (value === null || value === '') {
    return null;
  }

  return value.toString().toUpperCase();
};

const letterBoxReferences = ref<Record<string, QInput>>({});

const focusNextIfPossible = (wordIndex: number, letterNumber: number) => {
  const currentSquareData = crosswordSquaresData.value[wordIndex];
  if (letterNumber < currentSquareData.count) {
    const nextLetterRef =
      letterBoxReferences.value[`${wordIndex}_${letterNumber + 1}`];
    nextLetterRef.focus();
  } else if (wordIndex < crosswordSquaresData.value.length - 1) {
    const nextLetterRef = letterBoxReferences.value[`${wordIndex + 1}_1`];
    nextLetterRef.focus();
  }
};

const mainPassword = computed(() =>
  crosswordInputData.value.map((letters, index) => {
    return letters.at(crosswordSquaresData.value[index].mainIndex) ?? null;
  }),
);

watch(mainPassword, () => emit('update:mainPassword', mainPassword.value), {
  immediate: true,
});

const onKeydown = (
  wordIndex: number,
  letterIndex: number,
  event: KeyboardEvent,
) => {
  if (event.key === 'Backspace' && !(event.target as HTMLInputElement).value) {
    focusPreviousIfPossible(wordIndex, letterIndex);
  }
};

const focusPreviousIfPossible = (wordIndex: number, letterNumber: number) => {
  if (letterNumber > 1) {
    const previousLetterRef =
      letterBoxReferences.value[`${wordIndex}_${letterNumber - 1}`];
    previousLetterRef.focus();
  } else if (wordIndex > 0) {
    const lastLetterNumber = crosswordSquaresData.value[wordIndex - 1].count;
    const nextLetterRef =
      letterBoxReferences.value[`${wordIndex - 1}_${lastLetterNumber}`];
    nextLetterRef.focus();
  }
};
</script>

<style lang="scss" scoped>
.crossword-warpper {
  gap: 30px;
}

$square-border: 2px;
$square-size: min(7vw, 45px);

.crossword-square {
  width: $square-size;
  height: $square-size;
  margin-left: -$square-border;
  margin-top: -$square-border;
}

.crossword-letter {
  border: $square-border solid $dark;

  &--main {
    box-shadow: inset 0px 0px 0px 1px $dark;
  }

  &__input {
    padding: 0;
    :deep() {
      .q-field__control {
        height: $square-size;

        &::after,
        &::before {
          display: none;
        }

        input {
          text-align: center;
        }
      }
    }
  }
}
</style>
