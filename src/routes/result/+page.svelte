<script lang="ts">
  import type { PageData } from './$types';
  import { calcConcentration, calcExhausting, calcStability } from './utils';

  export let data: PageData;
</script>

<h3>Результаты тестирования:</h3>
<ol>
  {#each data.result as item}
    <li>
      Общее время:  {item.timeTotal}<br/>
      Всего ошибок: {item.errors}<br/>
      Время на ответ (мин/макс/сред): {item.timeFoundMin}/{item.timeFoundMax}/{item.timeFoundAvg}<br/>
    </li>
  {/each}
</ol>

<h3>Предварительный анализ:</h3>
<p>Это автоматический анализ, он может быть не точным. Полный анализ может предоставить специалист психологического профиля.</p>
<ul>
  <li>Концентрация {calcConcentration(data.result)}</li>
  <li>Устойчивость {calcStability(data.result)}</li>
  <li>Истощаемость {calcExhausting(data.result)}</li>
</ul>
