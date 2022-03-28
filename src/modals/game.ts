import { writable } from "svelte/store";
import type * as T from "../types";
import { words, bigrams, trigrams } from "../words";

class GameMode {
  protected filteredBigrams = bigrams.filter((bigram) => bigram[1] > 1000);
  protected filteredTrigrams = trigrams.filter((trigram) => trigram[1] > 1000);
  protected ngrams = [...this.filteredBigrams, ...this.filteredTrigrams];

  protected isPaused = true;
  public ui: any = writable({
    currentNgram: null,
    currentWord: "",
    usedLetters: new Set(),
    usedWords: [],
    score: 0,
    gradientPercentage: 100,
  });
  // Settings for the specific game mode
  protected settings = {};

  pickNewNgram() {
    return this.ngrams[Math.floor(Math.random() * this.ngrams.length)][0];
  }

  reset() {
    const currentNgram = this.pickNewNgram();
    this.ui.update((ui) => ({
      ...ui,
      currentNgram,
      currentWord: "",
      score: 0,
      usedLetters: new Set(),
      usedWords: [],
      gradientPercentage: 100,
    }));
  }

  update() {
    const self = this;
    setTimeout(() => {
      self.update();
    }, 1000);
  }

  startRound() {
    this.reset();

    this.isPaused = false;
    this.update();
  }

  submitWord() {
    this.ui.update((ui) => {
      const currentWord = ui.currentWord.toLowerCase();

      if (
        !currentWord.includes(ui.currentNgram) ||
        !words.includes(currentWord) ||
        ui.usedWords.includes(currentWord)
      ) {
        return ui;
      }

      return {
        ...ui,
        currentNgram: this.pickNewNgram(),
        currentWord: "",
        usedLetters: new Set([...ui.usedLetters, ...currentWord]),
        usedWords: [currentWord, ...ui.usedWords],
      };
    });
  }
}

export class Alphabet extends GameMode {
  roundStartTime = new Date().getTime();

  update(): void {
    super.update();

    this.ui.update((ui) => ({
      ...ui,
      score: Math.floor((new Date().getTime() - this.roundStartTime) / 1000),
    }));
  }
}

class AlphabetLeastWords extends GameMode {}
