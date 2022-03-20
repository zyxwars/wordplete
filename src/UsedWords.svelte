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
    position: absolute;
    top: 2rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    width: auto;
    height: auto;
  }
</style>
