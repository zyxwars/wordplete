<script lang="ts">
  import Gradient from "../components/Gradient.svelte";
  import Letters from "../components/Letters.svelte";
  import { words, bigrams, trigrams } from "../words";

  const filteredBigrams = bigrams.filter((bigram) => bigram[1] > 1000);
  const filteredTrigrams = trigrams.filter((trigram) => trigram[1] > 1000);
  const ngrams = [...filteredBigrams, ...filteredTrigrams];

  let currentNgram = null;
  let currentWord = "";
  let usedLetters: Set<string> = new Set();
  let usedWords = [];

  const pickNewNgram = () => {
    currentNgram = ngrams[Math.floor(Math.random() * ngrams.length)][0];
    currentWord = "";
  };

  const submitWord = () => {
    currentWord = currentWord.toLowerCase();

    if (
      !currentWord.includes(currentNgram[0]) ||
      !words.includes(currentWord) ||
      usedWords.includes(currentWord)
    ) {
      return;
    }

    usedLetters = new Set([...usedLetters, ...currentWord]);
    usedWords = [currentWord, ...usedWords];
    // const addedScore = calculateScore(currentWord);
    // score += addedScore;
    // $answerTimer = Math.max(100, $answerTimer + addedScore);

    // getWordDefinition();
    pickNewNgram();
  };

  const initRound = () => {
    usedLetters = new Set();
    usedWords = [];

    pickNewNgram();
  };

  initRound();
</script>

<div class="fixed top-0 left-0 right-0 flex px-2 h-8">
  <Gradient className="w-full h-full absolute top-0 left-0" />
  <Letters {usedLetters} />
</div>

<main
  class="w-full h-full flex justify-center items-center flex-col bg-violet-50"
>
  <div class="text-4xl mb-6">{currentNgram}</div>
  <input
    class="w-1/2 sm:w-80 h-12 mb-8 px-4 text-lg bg-white border-violet-300 outline-violet-300"
    spellcheck="false"
    on:change={submitWord}
    bind:value={currentWord}
  />
</main>

<style>
</style>
