import { writable } from "svelte/store";
import type * as T from "../types";
import { words, bigrams, trigrams } from "../words";

class GameMode {
  protected filteredBigrams = bigrams.filter((bigram) => bigram[1] > 1000);
  protected filteredTrigrams = trigrams.filter((trigram) => trigram[1] > 1000);
  protected ngrams = [...this.filteredBigrams, ...this.filteredTrigrams];

  protected isPaused = true;
  protected baseState = {
    currentNgram: null,
    currentWord: "",
    usedLetters: new Set(),
    usedWords: [],
    score: 0,
    gradientPercentage: 100,
  };
  public ui: any = writable(this.baseState);
  // Settings for the specific game mode
  protected settings = {};

  pickNewNgram() {
    return this.ngrams[Math.floor(Math.random() * this.ngrams.length)][0];
  }

  reset() {
    this.ui.set({
      ...this.baseState,
      currentNgram: this.pickNewNgram(),
    });
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

  afterSubmit(ui) {}

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

  checkWinningCondition(usedLetters: Set<string>) {
    if (usedLetters.size == 26) return true;
    return false;
  }

  update(): void {
    super.update();

    this.ui.update((ui) => ({
      ...ui,
      score: Math.floor((new Date().getTime() - this.roundStartTime) / 1000),
    }));
  }

  afterSubmit(ui) {
    console.log(this.checkWinningCondition(ui.usedLetters));
  }
}

class AlphabetLeastWords extends GameMode {}


