<script lang="ts">
  export let className;
  export let width;
</script>

<div class="gradient {className}" style="--width: {width}" />

<style>
  .gradient {
    width: var(--width);

    background: rgb(67, 255, 155);
    background: linear-gradient(
      -90deg,
      rgba(67, 255, 155, 1) 0%,
      rgba(1, 231, 201, 1) 35%,
      rgba(149, 237, 255, 1) 100%
    );
    box-shadow: 0 0rem 0.2rem 0.4rem rgb(12, 12, 12);
  }
</style>
