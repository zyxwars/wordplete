import { writable } from "svelte/store";
import { gameModes } from "../constants/gameModes";

const gameModeStore = writable({ mode: 0, option: 0 });

export const setGameMode = (mode: number) => {
  gameModeStore.set({ mode, option: gameModes[mode].defaultOption });
};

export const setGameOption = (option: number) => {
  gameModeStore.update((store) => ({ ...store, option }));
};

export default gameModeStore;
