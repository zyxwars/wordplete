import { writable } from "svelte/store";

// Settings
export const gameMode = writable();
export const gameModeOptions = writable();

// Ui
export const showTutorial = writable(false);
export const showSettings = writable(false);
export const showFinish = writable(false);
