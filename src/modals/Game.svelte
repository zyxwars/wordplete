<script lang="ts">
  import { words, bigrams, trigrams } from "../words";

  const filteredBigrams = bigrams.filter((bigram) => bigram[1] > 1000);
  const filteredTrigrams = trigrams.filter((trigram) => trigram[1] > 1000);
  const ngrams = [...filteredBigrams, ...filteredTrigrams];
</script>

<main>
  <div class="score" />
  <div class="ngram" />
  <input class="input" spellcheck="false" />
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
    margin-bottom: 2rem;
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4rem;
  }

  .controls span {
    cursor: pointer;
    font-size: 2rem;
  }
</style>
