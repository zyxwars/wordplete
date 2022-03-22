<script lang="ts">
  export let percentage: number = 30;
</script>

<div class="timer">
  <div class="timer-percentage" style="--width: {percentage}%" />
</div>

<style>
  .timer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 2rem;

    background: rgb(214, 214, 214);
  }

  .timer-percentage {
    width: var(--width);

    background: rgb(67, 255, 155);
    background: linear-gradient(
      -90deg,
      rgba(67, 255, 155, 1) 0%,
      rgba(1, 231, 201, 1) 35%,
      rgba(149, 237, 255, 1) 100%
    );
  }
</style>
