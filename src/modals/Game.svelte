<script lang="ts">
  import Gradient from "../components/Gradient.svelte";
  import type * as T from "../types";
  import { fly } from "svelte/transition";
  import Letters from "../components/Letters.svelte";
  import { words, bigrams, trigrams } from "../words";
  import { tweened } from "svelte/motion";
  import { Alphabet, AlphabetLeastWords, HighScore } from "./game";

  const game = new Alphabet();
  game.reset();

  let tweenedGradient = tweened(100, { duration: 1000 });
  let ui: T.Ui = null;
  game.ui.subscribe((u) => {
    ui = u;
    $tweenedGradient = ui.gradientPercentage;
  });
</script>

<div class="fixed top-0 left-0 w-full flex px-2 h-8">
  <Gradient
    className="h-full absolute top-0 left-0"
    width={$tweenedGradient + "%"}
  />
  <Letters usedLetters={ui.usedLetters} />
</div>
<div class="fixed top-10 left-5 text-white text-lg">
  {#each ui.usedWords as usedWord}
    <div in:fly={{ duration: 1000, y: 200 }}>
      {usedWord}
    </div>
  {/each}
</div>

<div class="min-h-screen flex items-center justify-center bg-zinc-900">
  <main class="grid grid-cols-3 grid-rows-2 tall:grid-rows-5">
    <div
      class="col-start-3 tall:col-start-2 row-start-1 tall:row-start-2 row-span-3 tall:row-span-1  place-self-center text-8xl text-white"
    >
      {ui.score}
    </div>
    <div
      class="row-start-1 tall:row-start-3 col-start-2  place-self-center mb-5 tall:mb-0 text-4xl  text-white"
    >
      {ui.currentNgram}
    </div>
    <input
      class="row-start-2 tall:row-start-4 col-start-2 place-self-center  w-11/12  sm:w-80 h-12  px-4  text-lg  text-white bg-zinc-800 border-1 border-violet-500 outline-none"
      spellcheck="false"
      on:change={() => game.submitWord()}
      bind:value={ui.currentWord}
      on:input={() => {
        game.startRound();
      }}
    />
    <div
      class="row-start-3 col-start-2 tall:row-start-5 flex justify-evenly items-center mt-4 tall:mt-0"
    >
      <span class="material-icons"> arrow_forward_ios </span>
      <span class="material-icons"> refresh </span>
      <span class="material-icons"> settings </span>
    </div>
  </main>
</div>
