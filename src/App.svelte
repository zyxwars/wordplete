<script lang="ts">
  import axios from "axios";
  import { tweened } from "svelte/motion";
  import Letters from "./components/Letters.svelte";
  import { words, bigrams, trigrams } from "./words";
  import Game from "./modals/Game.svelte";
  import Modal from "./components/Modal.svelte";
  import Tutorial from "./modals/Tutorial.svelte";

  // const filteredBigrams = bigrams.filter((bigram) => bigram[1] > 1000);
  // const filteredTrigrams = trigrams.filter((trigram) => trigram[1] > 1000);
  // const ngrams = [...filteredBigrams, ...filteredTrigrams];
  // let usedLetters: Set<string> = new Set();
  // let usedWords = [];
  // let score = 0;
  // let isPaused = true;
  // let speed = 4;

  // const answerTime = 100;
  // let answerTimer = tweened(answerTime, { duration: 1000 });
  // setInterval(() => {
  //   if (isPaused) return;

  //   if ($answerTimer < 0) {
  //     $answerTimer = answerTime;
  //     pickNew();
  //     score = 0;
  //     usedWords = [];
  //     usedLetters = new Set();
  //     isPaused = true;
  //     return;
  //   }

  //   $answerTimer -= speed;
  // }, 1000);

  // let currentNgram = null;
  // let currentWord = "";

  // const pickNew = () => {
  //   currentNgram = ngrams[Math.floor(Math.random() * ngrams.length)];
  //   currentWord = "";
  // };

  // pickNew();

  // const getWordDefinition = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`
  //     );
  //     console.log(res.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const calculateScore = (word: string) => {
  //   const uniqueLetters = new Set([...word]);

  //   return Math.floor(word.length * 0.5) + uniqueLetters.size;
  // };
</script>

<Game />
<Tutorial />

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
