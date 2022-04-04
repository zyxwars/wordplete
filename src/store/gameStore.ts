import { writable } from "svelte/store";

const defaultState = {
  currentNgram: null,
  currentWord: "",
  usedLetters: new Set(),
  usedWords: [],
  score: 0,
  gradientPercentage: 100,
  wordMeanings: null,
};

const gameStore = writable(defaultState);

export const resetGameStore = () => {
  gameStore.set(defaultState);
};

export default gameStore;
