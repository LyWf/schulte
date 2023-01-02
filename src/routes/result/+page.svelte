<script lang="ts">
  import type { PageData } from './$types';
  import { calcConcentration, calcExhausting, calcStability } from './utils';

  export let data: PageData;
</script>

<h3>Результаты тестирования</h3>
<ol>
  {#each data.result as item}
    <li>Решение заняло {item.time} секунд. Допущено {item.errors} ошибок.</li>
  {/each}
</ol>

<ul>
  <li>Концентрация {calcConcentration(data.result)}</li>
  <li>Стабильность {calcStability(data.result)}</li>
  <li>Истощаемость {calcExhausting(data.result)}</li>
</ul>
