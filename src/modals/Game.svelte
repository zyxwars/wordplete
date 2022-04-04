<script lang="ts">
  import Gradient from "../components/Gradient.svelte";
  import type * as T from "../types";
  import { fly } from "svelte/transition";
  import Letters from "../components/Letters.svelte";
  import { words, bigrams, trigrams } from "../words";
  import { tweened } from "svelte/motion";
  import { Alphabet, AlphabetLeastWords, HighScore } from "../game";
  import GameModes from "../components/GameModes.svelte";
  import gameStore from "../store/gameStore";
  import gameModeStore from "../store/gameModeStore";
  import { gameModes } from "../constants/gameModes";

  export const getGameInstance = (mode: number, option: number) => {
    const gameMode = gameModes[mode];
    const gameOption = gameMode.options[option];
    switch (gameMode.name) {
      case "Alphabet":
        return new Alphabet(gameOption);
      case "HighScore":
        return new HighScore(gameOption);

      default:
        console.log("Game mode doesn't exist");
        return new Alphabet(gameOption);
    }
  };

  let game = null;

  gameModeStore.subscribe((gameMode) => {
    if (game) game.destroy();

    game = getGameInstance(gameMode.mode, gameMode.option);
    game.reset();
  });

  // let tweenedGradient = tweened(100, { duration: 1000 });
  // gameStore.subscribe((ui) => tweenedGradient.set(ui.gradientPercentage));
  // $: tweenedGradient.set($gameStore.gradientPercentage);
</script>

<div class="fixed top-0 left-0 w-full flex px-2 h-8">
  <Gradient
    className="h-full absolute top-0 left-0"
    width={$gameStore.gradientPercentage + "%"}
  />
  <Letters usedLetters={$gameStore.usedLetters} />
</div>
<div class="fixed top-10 left-5 text-white text-lg">
  {#each $gameStore.usedWords as usedWord}
    <div in:fly={{ duration: 1000, y: 200 }}>
      {usedWord}
    </div>
  {/each}
</div>
<GameModes />

<div class="fixed bottom-0 left-0 right-0 bg-violet-500 px-3 py-2 truncate">
  {#if $gameStore.wordMeanings}
    {#each $gameStore.wordMeanings as meaning}
      {meaning?.definitions?.[0]?.definition}
    {/each}
  {/if}
</div>

<div class="min-h-screen flex items-center justify-center bg-zinc-900">
  <main class="grid grid-cols-3 grid-rows-2 tall:grid-rows-5">
    <div
      class="col-start-3 tall:col-start-2 row-start-1 tall:row-start-2 row-span-3 tall:row-span-1  place-self-center text-8xl text-white"
    >
      {$gameStore.score}
    </div>
    <div
      class="row-start-1 tall:row-start-3 col-start-2  place-self-center mb-5 tall:mb-0 text-4xl  text-white"
    >
      {$gameStore.currentNgram}
    </div>
    <input
      class="row-start-2 tall:row-start-4 col-start-2 place-self-center  w-11/12  sm:w-80 h-12  px-4  text-lg  text-white bg-zinc-800 border-1 border-violet-500 outline-none"
      spellcheck="false"
      on:change={() => {
        // This is a pretty ugly hack, but it works for now
        // Reason: skipping word causes blur on input which triggers onchange,
        // reseting the word in the skip function happens after the submit is called so the timeout offsets it
        setTimeout(() => game.submitWord(), 150);
      }}
      bind:value={$gameStore.currentWord}
      on:input={() => {
        game.startRound();
      }}
    />
    <div
      class="row-start-3 col-start-2 tall:row-start-5 flex justify-evenly items-center mt-4 tall:mt-0"
    >
      <span
        class="material-icons cursor-pointer"
        on:click={() => game.skipNgram()}
      >
        arrow_forward_ios
      </span>
      <span class="material-icons cursor-pointer" on:click={() => game.reset()}>
        refresh
      </span>
      <span class="material-icons cursor-pointer"> settings </span>
    </div>
  </main>
</div>
