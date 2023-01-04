<style>
  .table {
    display: flex;
    flex-wrap: wrap;
    border-top: dotted 1px lightgrey;
    border-left: dotted 1px lightgrey;
  }

  .cell {
    box-sizing: border-box;
    width: 20%;
    height: 15vh;
    border-right: dotted 1px lightgrey;
    border-bottom: dotted 1px lightgrey;
  }

  label {
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.7rem;
  }

  label:hover {
    background-color: #e8f0fe;
  }

  input:checked + label {
    background-color: rgb(241, 249, 236);
  }

  input {
    display: none;
  }

  .invalid {
    animation: invalid-animation 150ms;
  }

  @keyframes invalid-animation {
    to {
      background-color: lightpink;
    }
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { range, shuffle } from '$lib/utils/array';
  import type { SchulteTableResult } from '$lib/types/schulte';

  const dispatch = createEventDispatcher<{ done: SchulteTableResult }>();
  const getCid = cell => `cell-${cell}`;

  const lastNumber = 26;
  const numbers = shuffle(range(1, lastNumber));
  const startTime = Date.now();

  let counter = 1;
  let lastFoundTime = Date.now();
  let lastInvalidFound = 0;

  const result: SchulteTableResult = {
    errors: 0,
    timeTotal: 0,
    timeFoundMin: 0,
    timeFoundMax: 0,
    timeFoundAvg: 0,
  };

  const handleSelect = (num: number) => (event: Event) => {
    lastInvalidFound = 0;

    if (counter === num) {
      counter += 1;
      updateTime();
    } else {
      event.preventDefault();
      lastInvalidFound = num;
      result.errors += 1;
    }

    if (counter >= lastNumber) {
      dispatch('done', result);
    }
  }

  const updateTime = () => {
    const currentTime = Date.now();
    const diff = Math.round((currentTime - lastFoundTime) / 1000);

    lastFoundTime = currentTime;
    result.timeFoundMin = Math.min(diff, result.timeFoundMin);
    result.timeFoundMax = Math.max(diff, result.timeFoundMax);
    result.timeFoundAvg = result.timeFoundAvg === 0 ? diff : Math.round((result.timeFoundAvg + diff) / 2);
    result.timeTotal = Math.round((currentTime - startTime) / 1000);
  }
</script>

<div class="table">
  {#each numbers as num (num)}
    <div class="cell">
      <input type="radio" name="schulte" id={getCid(num)} />
      <label
        for={getCid(num)}
        on:click={handleSelect(num)}
        on:keypress={handleSelect(num)}
        class:invalid={lastInvalidFound === num}
      >
        {num}
      </label>
    </div>
  {/each}
</div>
