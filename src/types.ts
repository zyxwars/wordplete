export interface Ui {
  currentNgram: null;
  currentWord: string;
  usedLetters: Set<string>;
  usedWords: string[];
  // The value on which the performance is evaluated, time to complete, number of words, etc.
  score: number;
  // Can be static or used for timer by changing the value
  gradientPercentage: number;
  wordMeanings: any;
}
