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

  let counter = 1;
  let errors = 0;
  const startTime = Date.now();

  let invalidChecked = 0;

  const handleSelect = (num: number) => (event: Event) => {
    if (counter === num) {
      counter += 1;
    } else {
      event.preventDefault();
      invalidChecked = num;
      errors += 1;
    }

    if (counter >= lastNumber) {
      dispatch('done', {
        errors,
        time: Math.round((Date.now() - startTime) / 1000),
      });
    }
  }

  const resetInvalidChecked = () => {
    invalidChecked = 0;
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
        class:invalid={invalidChecked === num}
        on:animationend={resetInvalidChecked}
      >
        {num}
      </label>
    </div>
  {/each}
</div>
