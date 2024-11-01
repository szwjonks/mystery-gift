import { useStorage } from '@vueuse/core';
import { ANSWERS, MAX_CHANGES_COUNT, ORIGINAL_DESCRIPTION } from 'src/constant';
import { computed } from 'vue';

const initialized = useStorage('initialized', false);
const userAnswers = useStorage<Record<number, string>>('userAnswers', {});

export const useEncryption = () => {
  const description = ORIGINAL_DESCRIPTION;
  const counter = computed(() => {
    const onlyLowerLetters = description.toLowerCase().replaceAll(/\s/g, '');
    const letters = onlyLowerLetters.split('');
    const counter: Record<string, number> = {};
    letters.forEach((letter) => {
      if (letter in counter) {
        counter[letter]++;
      } else {
        counter[letter] = 1;
      }
    });

    return Object.entries(counter).sort((a, b) => b[1] - a[1]);
  });

  const alphabet = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż'.split('');
  const notUsedLetters = computed(() => {
    return alphabet.filter(
      (letter) => !counter.value.some((entry) => entry[0] === letter),
    );
  });

  const changes = computed(() => {
    const notUsedReversed = [...notUsedLetters.value].reverse();
    const notUsedLimited = notUsedReversed.filter(
      (_x, i) => i < MAX_CHANGES_COUNT,
    );
    return notUsedLimited.map((notUsedLetter, index) => {
      const letterToReplace = counter.value[index][0];
      return [notUsedLetter, letterToReplace];
    });
  });

  const encrypted = computed(() => {
    let encryptedDescription = description.toLowerCase();
    changes.value.forEach(([notUsedLetter, letterToReplace]) => {
      encryptedDescription = encryptedDescription.replaceAll(
        letterToReplace,
        notUsedLetter,
      );
    });

    const upperCaseIndexes = description
      .split('')
      .map((letter, index) => (letter === letter.toUpperCase() ? index : null))
      .filter((letterIndex) => letterIndex !== null);

    return encryptedDescription
      .split('')
      .map((letter, index) =>
        upperCaseIndexes.includes(index) ? letter.toUpperCase() : letter,
      )
      .join('');
  });

  const decryption = computed(() => {
    let previousStep = encrypted.value;
    return changes.value.map(([from, to]) => {
      const decrypted = previousStep
        .replaceAll(from, to)
        .replaceAll(from.toUpperCase(), to.toUpperCase());
      previousStep = decrypted;
      return [from, to, decrypted];
    });
  });

  const getIsRight = (hintNumber: number) => {
    const rightAnswer = ANSWERS.find((answer) => answer.id === hintNumber);
    const userAnswer = userAnswers.value[hintNumber];
    if (rightAnswer === undefined || userAnswer === undefined) {
      return false;
    }
    return userAnswers.value[hintNumber] === rightAnswer.answer;
  };

  const getHint = (hintNumber: number) => {
    const isRight = getIsRight(hintNumber);
    return isRight ? changes.value[hintNumber - 1].join(' -> ') : '';
  };

  return {
    encrypted,
    changes,
    decryption,
    getIsRight,
    getHint,
    initialized,
    userAnswers,
  };
};
