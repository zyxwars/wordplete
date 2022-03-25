<script lang="ts">
  export let onClose: () => {};
</script>

<div
  class="top-0 left-0 fixed w-full h-full flex flex-col items-center justify-start bg-violet-50"
>
  <span
    class="material-icons my-4 cursor-pointer hover:bg-violet-100"
    style="font-size: 2rem;"
    on:click={onClose}
  >
    close
  </span>
  <slot />
</div>
