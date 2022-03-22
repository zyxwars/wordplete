<script lang="ts">
  export let usedWords: string[];
</script>

<div class="used-words">
  {#each usedWords as usedWord}
    <div>
      {usedWord}
    </div>
  {/each}
</div>

<style>
  .used-words {
    position: fixed;
    top: 2rem;
    left: 1rem;
    display: flex;
    flex-direction: column;
    width: auto;
    height: auto;
  }
</style>
