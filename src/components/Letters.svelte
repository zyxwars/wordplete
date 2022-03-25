<script lang="ts">
  export let usedLetters: Set<string>;

  const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
</script>

{#each alphabet as letter}
  <div class={usedLetters.has(letter) ? "used-letter letter" : "letter"}>
    {letter}
  </div>
{/each}

<style>
  .letter {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  .used-letter {
    color: rgb(255, 255, 255);
  }
</style>
