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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 0.2rem;

    background: rgb(67, 255, 155);
    background: linear-gradient(
      -90deg,
      rgba(67, 255, 155, 1) 0%,
      rgba(1, 231, 201, 1) 35%,
      rgba(149, 237, 255, 1) 100%
    );
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
