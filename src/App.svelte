<script lang="ts">
  import axios from "axios";
  import Letters from "./Letters.svelte";
  import UsedWords from "./UsedWords.svelte";
  import { words, bigrams, trigrams } from "./words";

  const filteredBigrams = bigrams.filter((bigram) => bigram[1] > 1000);
  const filteredTrigrams = trigrams.filter((trigram) => trigram[1] > 1000);
  const ngrams = [...filteredBigrams, ...filteredTrigrams];
  let usedLetters: Set<string> = new Set();
  let usedWords = [];
  let score = 0;

  let currentNgram = null;
  let currentWord = "";

  const pickNew = () => {
    currentNgram = ngrams[Math.floor(Math.random() * ngrams.length)];
    currentWord = "";
  };

  pickNew();

  const getWordDefinition = async () => {
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const calculateScore = (word: string) => {
    const uniqueLetters = new Set([...word]);

    return Math.floor(word.length * 0.5) + uniqueLetters.size;
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
    score += calculateScore(currentWord);
    getWordDefinition();
    pickNew();
  };
</script>

<Letters {usedLetters} />
<UsedWords {usedWords} />
<main>
  <div class="score">{score}</div>
  <div class="ngram">{currentNgram[0]}</div>
  <input
    bind:value={currentWord}
    on:change={() => submitWord()}
    class="input"
    spellcheck="false"
  />
</main>

<style>
  main {
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background-color: rgb(243, 243, 243);
  }

  .score {
    font-size: 6rem;
    margin-bottom: 3rem;
  }
  .ngram {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .input {
    width: 20rem;
    height: 3rem;
    font-size: 1.5rem;
    margin-bottom: 10rem;
    z-index: 1000;
  }
</style>
