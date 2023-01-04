<style>
  button {
    min-width: 10vw;
    width: 100%;
    width: fit-content;
    height: 3em;
    font-size: 1.2em;
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';

  let autoStartCountdown = 5;
  let btn: HTMLButtonElement;

  onMount(() => {
    const interval = setInterval(() => {
      if (autoStartCountdown <= 0) {
        clearInterval(interval);
        btn?.click();
      }

      autoStartCountdown -= 1;
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<button type="button" bind:this={btn} on:click>Продолжить ({autoStartCountdown})</button>
