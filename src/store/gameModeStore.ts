import { writable } from "svelte/store";

const gameModeStore = writable({ mode: 0, option: 0 });

export const setGameMode = (mode: number) => {
  gameModeStore.set({ mode, option: 0 });
};

export const setGameOption = (option: number) => {
  gameModeStore.update((store) => ({ ...store, option }));
};

export default gameModeStore;
