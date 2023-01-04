import type { SchulteTestResult } from '$lib/types/schulte';

export function calcConcentration(result: SchulteTestResult) {
  const isNormal = result.every((item) => item.timeTotal <= 40);
  const isBelowNormal = (
    result.every((item) => item.timeTotal <= 60) &&
    result.some((item) => item.timeTotal > 40)
  );
  const isLow = result.some((item) => item.timeTotal > 60);

  switch (true) {
    case isNormal:
      return 'нормальная';

    case isBelowNormal:
      return 'ниже нормы';

    case isLow:
      return 'значительно ниже нормы';

    // no default
  }
}

export function calcStability(result: SchulteTestResult) {
  const diff = result.reduce((acc, item, index) => {
    const nextIndex = index + 1;

    if (nextIndex >= result.length) {
      return acc;
    }

    const nextItem = result[nextIndex];

    return [...acc, item.timeTotal - nextItem.timeTotal];
  }, [] as number[]);
  const diffGtThanFour = diff.filter(value => Math.abs(value) > 3).length;
  const diffPositive = diff.filter(value => value >= 0).length;

  switch (true) {
    case diffGtThanFour > 1 && diffPositive > 0 && diffPositive < 4:
      return 'низкая';

    default:
      return 'в норме';
  }
}

export function calcExhausting(result: SchulteTestResult) {
  const diff = result.reduce((acc, item, index) => {
    const nextIndex = index + 1;

    if (nextIndex >= result.length) {
      return acc;
    }

    const nextItem = result[nextIndex];

    return [...acc, item.timeTotal - nextItem.timeTotal];
  }, [] as number[]);
  const diffGtThanFour = diff.filter(value => Math.abs(value) > 3).length;
  const diffPositive = diff.filter(value => value >= 0).length;

  switch (true) {
    case diffGtThanFour === 4 && diffPositive === 4:
    case result[result.length - 1].timeTotal - result[0].timeTotal > 9:
      return 'присутствует';

    default:
      return 'отсутствует';
  }
}
