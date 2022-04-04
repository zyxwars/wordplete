<script lang="ts">
  import type * as T from "../types";
  import gameModeStore, {
    setGameMode,
    setGameOption,
  } from "../store/gameModeStore";
  import { gameModes } from "../constants/gameModes";
</script>

<div class="top-10 right-5 fixed flex flex-col items-end">
  <div class="flex">
    {#each gameModes as mode, i}
      <div
        class={`mx-1
      hover:text-white
      cursor-pointer
      font-semibold
      text-xl
        ${i === $gameModeStore.mode && "text-violet-500"}
      `}
        on:click={() => setGameMode(i)}
      >
        {mode.displayName}
      </div>
    {/each}
  </div>

  <div class="flex">
    {#each gameModes[$gameModeStore.mode].options as option, i}
      <div
        class={`mx-1
      hover:text-white
      cursor-pointer
      font-semibold
      text-xl
        ${i === $gameModeStore.option && "text-violet-500"}
      `}
        on:click={() => setGameOption(i)}
      >
        {option}
      </div>
    {/each}
  </div>
</div>
