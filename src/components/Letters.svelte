<script lang="ts">
  export let usedLetters: Set<string>;

  const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
</script>

<div class="letters">
  {#each alphabet as letter}
    <div class={usedLetters.has(letter) ? "letter used-letter" : "letter"}>
      {letter}
    </div>
  {/each}
</div>

<style>
  .letters {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    height: 2rem;
  }
  .letter {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .used-letter {
    color: rgb(255, 255, 255);
  }
</style>
