import { writable } from "svelte/store";

export const GAME_MODES = {
  ALPHABET: 0,
  SCORE: 1,
};

// Game
export const isPaused = writable(true);
export const usedWords = writable([]);
export const usedLetters = writable(new Set());
export const score = writable(0);

// Settings
export const gameMode = writable(GAME_MODES.ALPHABET);
export const speed = writable(4);

// Ui
export const showTutorial = writable(false);
export const showSettings = writable(false);
export const showFinish = writable(false);
