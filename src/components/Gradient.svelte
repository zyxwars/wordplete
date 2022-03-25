<script lang="ts">
  export let className;
</script>

<div class="gradient {className}" />

<style>
  .gradient {
    background: rgb(67, 255, 155);
    background: linear-gradient(
      -90deg,
      rgba(67, 255, 155, 1) 0%,
      rgba(1, 231, 201, 1) 35%,
      rgba(149, 237, 255, 1) 100%
    );
  }
</style>
