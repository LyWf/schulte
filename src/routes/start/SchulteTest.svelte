<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  progress {
    width: 100%;
  }

  button {
    min-width: 10vw;
    width: 100%;
    width: fit-content;
    height: 3em;
    font-size: 1.2em;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import SchulteTable from './ShulteTable.svelte';
  import ContinueButton from './ContinueButton.svelte';
  import type { SchulteTableResult, SchulteTestResult } from '$lib/types/schulte';

  const dispatch = createEventDispatcher<{ done: SchulteTestResult }>();

  let inProgress = false;

  let currentRound = 0;
  const totalRounds = 5;
  const results: SchulteTestResult = [];
  $: isFirstRound = currentRound === 0;

  const handleFinishRound = (event: CustomEvent<SchulteTableResult>) => {
    results.push(event.detail);
    inProgress = false;

    if (currentRound === totalRounds) {
      dispatch('done', results);
    }
  }
  const handleStartRound = () => {
    currentRound += 1;
    inProgress = true;
  }
</script>

{#if !isFirstRound}
  <progress max={totalRounds} value={currentRound}>
    {Math.round(currentRound / totalRounds) * 100}%
  </progress>
{/if}
<div class="container">
  {#if inProgress}
    <SchulteTable on:done={handleFinishRound} />
  {:else}
    {#if isFirstRound}
      <button type="button" on:click={handleStartRound}>Начать</button>
    {:else}
      <h3>Отличный результат!</h3>
      <p>Осталось еще немного. Переход к следующей таблице произойдет автоматически через 5 секунд.</p>
      <ContinueButton on:click={handleStartRound} />
    {/if}
  {/if}
</div>
