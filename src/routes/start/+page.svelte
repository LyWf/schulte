<style>
  textarea {
    width: 100%;
  }

  button {
    width: 100%;
    width: fit-content;
    height: 3em;
    font-size: 1.2em;
  }
</style>

<script lang="ts">
  import SchulteTest from './SchulteTest.svelte';
  import type { SchulteTestResult } from '../../lib/types/schulte';
  import { zipResult } from '../../lib/utils/schulte';

  let result;

  const handleDone = (event: CustomEvent<SchulteTestResult>) => {
    result = new URL(`/result?value=${zipResult(event.detail)}`, window.location.origin);
  }
  const handleCopy = () => {
    const copyText = document.querySelector('#result') as HTMLTextAreaElement;

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);
  }
</script>

{#if result}
  <h3>Тест завершен 🎉</h3>
  <p>Осталось только скопировать и отправить результат из поля ниже.</p>
  <label for="result">Результат:</label>
  <textarea name="result" id="result" rows="10" readonly>{result}</textarea>
  <button type="button" on:click={handleCopy}>Скопировать результат</button>
{:else}
  <SchulteTest on:done={handleDone} />
{/if}
