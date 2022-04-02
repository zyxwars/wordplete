import { time_ranges_to_array } from "svelte/internal";
import { writable } from "svelte/store";
import type * as T from "../types";
import { words, bigrams, trigrams } from "../words";

class GameMode {
  protected filteredBigrams = bigrams.filter((bigram) => bigram[1] > 1000);
  protected filteredTrigrams = trigrams.filter((trigram) => trigram[1] > 1000);
  protected ngrams = [...this.filteredBigrams, ...this.filteredTrigrams];

  public isStopped = true;
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

  protected updateTimeout = null;

  pickNewNgram() {
    return this.ngrams[Math.floor(Math.random() * this.ngrams.length)][0];
  }

  reset() {
    this.ui.set({
      ...this.baseState,
      currentNgram: this.pickNewNgram(),
    });
    this.isStopped = true;
    clearTimeout(this.updateTimeout);
  }

  update() {
    const self = this;
    this.updateTimeout = setTimeout(() => {
      self.update();
    }, 1000);
  }

  startRound() {
    if (!this.isStopped) return;

    this.isStopped = false;
    this.onStart();
    this.update();
  }

  skipNgram() {
    if (this.isStopped) return;

    this.ui.update((ui) => {
      return { ...ui, currentNgram: this.pickNewNgram() };
    });
  }

  onStart() {}

  onSubmit(newState, oldState) {}

  submitWord() {
    let newState = null;
    let oldState = null;

    this.ui.update((ui) => {
      console.log(ui);

      oldState = ui;
      const currentWord = ui.currentWord.toLowerCase();

      if (
        !currentWord.includes(ui.currentNgram) ||
        !words.includes(currentWord) ||
        ui.usedWords.includes(currentWord)
      ) {
        return ui;
      }

      newState = {
        ...ui,
        currentNgram: this.pickNewNgram(),
        currentWord: "",
        usedLetters: new Set([...ui.usedLetters, ...currentWord]),
        usedWords: [currentWord, ...ui.usedWords],
      };

      return newState;
    });

    // The state wasn't updated, validation didn't pass
    if (!newState) return;

    this.onSubmit(newState, oldState);
  }
}
export class Alphabet extends GameMode {
  private roundStartTime = new Date().getTime();

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

  skipNgram() {
    if (this.isStopped) return;

    this.ui.update((ui) => {
      console.log("change currentWord to none");
      this.roundStartTime = this.roundStartTime - 5000;
      return {
        ...ui,
        currentWord: "",
        currentNgram: this.pickNewNgram(),
        score: Math.floor((new Date().getTime() - this.roundStartTime) / 1000),
      };
    });
  }

  onStart(): void {
    this.roundStartTime = new Date().getTime();
  }

  onSubmit(newState, _) {
    console.log(this.checkWinningCondition(newState.usedLetters));
  }
}

export class AlphabetLeastWords extends GameMode {
  onSubmit(newState, _): void {
    this.ui.update((ui) => ({
      ...ui,
      score: ui.score + 1,
    }));
  }
}

export class HighScore extends GameMode {
  protected readonly answerTime = 10;
  protected answerTimer = 0;

  reset() {
    super.reset();

    this.answerTimer = this.answerTime;
  }

  update(): void {
    super.update();

    if (this.answerTimer < 1) return this.reset();

    this.answerTimer -= 2;
    this.ui.update((ui) => ({
      ...ui,
      gradientPercentage: Math.floor(
        (this.answerTimer / this.answerTime) * 100
      ),
    }));
  }

  onSubmit(newState: any, oldState: any): void {
    // TODO: add better score calculation
    const score = oldState.currentWord.length * 2;

    this.answerTimer = Math.min(score + this.answerTimer, this.answerTime);
    this.ui.update((ui) => ({ ...ui, score: ui.score + score }));
  }
}
