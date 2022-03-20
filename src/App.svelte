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

  let currentNgram = null;
  let currentWord = "";

  const pickNew = () => {
    currentNgram = ngrams[Math.floor(Math.random() * ngrams.length)];
    currentWord = "";
  };

  pickNew();

  const getWordDefinition = async () => {
    const res = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`
    );
    console.log(res.data);
  };

  const submitWord = () => {
    if (
      !currentWord.includes(currentNgram[0]) ||
      !words.includes(currentWord) ||
      usedWords.includes(currentWord)
    ) {
      return;
    }
    usedLetters = new Set([...usedLetters, ...currentWord]);
    usedWords = [...usedWords, currentWord];
    getWordDefinition();
    pickNew();
  };
</script>

<Letters {usedLetters} />
<UsedWords {usedWords} />
<main>
  <div>{currentNgram[0]}</div>
  <input
    bind:value={currentWord}
    on:change={() => submitWord()}
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
</style>
