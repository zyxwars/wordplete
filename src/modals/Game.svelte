<script lang="ts">
  import Gradient from "../components/Gradient.svelte";
  import { fly } from "svelte/transition";
  import Letters from "../components/Letters.svelte";
  import { words, bigrams, trigrams } from "../words";
  import { tweened } from "svelte/motion";

  const filteredBigrams = bigrams.filter((bigram) => bigram[1] > 1000);
  const filteredTrigrams = trigrams.filter((trigram) => trigram[1] > 1000);
  const ngrams = [...filteredBigrams, ...filteredTrigrams];

  let isPaused = true;
  let currentNgram = null;
  let currentWord = "";
  let usedLetters: Set<string> = new Set();
  let usedWords = [];
  let roundStartTime = new Date().getTime();
  let roundTime = 0;
  let speed = 4;
  let maxAnswerTime = 100;
  let answerTimer = tweened(maxAnswerTime, { duration: 1000 });

  const pickNewNgram = () => {
    currentNgram = ngrams[Math.floor(Math.random() * ngrams.length)][0];
    currentWord = "";
  };

  const calculateScore = (word: string) => {
    const uniqueLetters = new Set([...word]);

    return Math.floor(word.length * 0.5) + uniqueLetters.size * 2;
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
    const addedScore = calculateScore(currentWord);
    console.log(addedScore);
    // score += addedScore;
    $answerTimer = Math.min(maxAnswerTime, $answerTimer + addedScore * 3);

    // getWordDefinition();
    pickNewNgram();
  };

  setInterval(() => {
    if ($answerTimer <= 0) return console.log("round ended");

    roundTime = Math.floor((new Date().getTime() - roundStartTime) / 1000);
    $answerTimer = $answerTimer - speed;
  }, 1000);

  const initRound = () => {
    isPaused = false;
    usedLetters = new Set();
    usedWords = [];
    roundStartTime = new Date().getTime();
    $answerTimer = maxAnswerTime;

    pickNewNgram();
  };

  initRound();
</script>

<div class="fixed top-0 left-0 w-full flex px-2 h-8">
  <Gradient
    className="h-full absolute top-0 left-0"
    width={($answerTimer / maxAnswerTime) * 100 + "%"}
  />
  <Letters {usedLetters} />
</div>
<div class="fixed top-10 left-5 text-white text-lg">
  {#each usedWords as usedWord}
    <div in:fly={{ duration: 1000, y: 200 }}>
      {usedWord}
    </div>
  {/each}
</div>

<div class="min-h-screen flex items-center justify-center bg-zinc-900">
  <main class="grid grid-cols-3 grid-rows-2 tall:grid-rows-3">
    <div
      class="text-8xl col-start-3 row-start-1 row-span-2 tall:row-span-1 tall:col-start-2  place-self-center text-white"
    >
      {roundTime}
    </div>
    <div
      class="text-4xl  row-start-1 col-start-2 tall:row-start-2 place-self-center text-white"
    >
      {currentNgram}
    </div>
    <input
      class="w-11/12  sm:w-80 h-12  px-4  text-lg  text-white bg-zinc-800 border-1 border-violet-500 outline-none row-start-2 col-start-2 place-self-center tall:row-start-3"
      spellcheck="false"
      on:change={submitWord}
      bind:value={currentWord}
    />
  </main>
</div>
