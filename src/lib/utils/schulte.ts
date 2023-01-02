import type { SchulteTestResult } from '../types/schulte';

export function zipResult(result: SchulteTestResult) {
  return result
    .map(item => `${item.time}:${item.errors}`)
    .join(';');
}

export function unzipResult(zipResult: string): SchulteTestResult {
  return zipResult
    .split(';')
    .map((zipValues) => {
      const values = zipValues.split(':');

      return {
        time: parseInt(values[0], 10),
        errors: parseInt(values[1], 10),
      };
    });
}
