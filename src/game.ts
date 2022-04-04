import axios from "axios";
import { writable } from "svelte/store";
import type * as T from "./types";
import { words, bigrams, trigrams } from "./words";
import gameStore, { resetGameStore } from "./store/gameStore";

class GameMode {
  protected filteredBigrams = bigrams.filter((bigram) => bigram[1] > 1000);
  protected filteredTrigrams = trigrams.filter((trigram) => trigram[1] > 1000);
  protected ngrams = [...this.filteredBigrams, ...this.filteredTrigrams];

  public isStopped = true;
  // Settings for the specific game mode
  protected settings = {};

  protected updateTimeout = null;
  protected definitionTimeout = null;

  pickNewNgram() {
    return this.ngrams[Math.floor(Math.random() * this.ngrams.length)][0];
  }

  destroy() {
    clearTimeout(this.updateTimeout);
    clearTimeout(this.definitionTimeout);
  }

  reset() {
    resetGameStore();
    gameStore.update((ui) => ({
      ...ui,
      currentNgram: this.pickNewNgram(),
    }));
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

    gameStore.update((ui) => {
      return { ...ui, currentNgram: this.pickNewNgram() };
    });
  }

  onStart() {}

  onSubmit(newState, oldState) {}

  getMeanings(word) {
    axios
      .get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
      .then((res) => {
        gameStore.update((ui) => ({
          ...ui,
          wordMeanings: res.data[0].meanings,
        }));
      });
  }

  submitWord() {
    let newState = null;
    let oldState = null;

    gameStore.update((ui) => {
      oldState = ui;
      const currentWord = ui.currentWord.toLowerCase();

      if (
        !currentWord.includes(ui.currentNgram) ||
        !words.includes(currentWord) ||
        ui.usedWords.includes(currentWord)
      ) {
        return ui;
      }

      this.getMeanings(ui.currentWord);

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

    gameStore.update((ui) => ({
      ...ui,
      score: Math.floor((new Date().getTime() - this.roundStartTime) / 1000),
    }));
  }

  skipNgram() {
    if (this.isStopped) return;

    gameStore.update((ui) => {
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

  onSubmit(newState, _) {}
}

export class AlphabetLeastWords extends GameMode {
  onSubmit(newState, _): void {
    gameStore.update((ui) => ({
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
    gameStore.update((ui) => ({
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
    gameStore.update((ui) => ({ ...ui, score: ui.score + score }));
  }
}
