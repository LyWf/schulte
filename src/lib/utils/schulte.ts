import type { SchulteTestResult, SchulteTableResult } from '../types/schulte';

type Keys = ReadonlyArray<keyof SchulteTableResult>;

const keys: Keys = ['errors', 'timeTotal', 'timeFoundMin', 'timeFoundMax', 'timeFoundAvg'] as const;

export function zipResult(result: SchulteTestResult) {
  return result
    .map(item => keys.map(key => item[key]).join(','))
    .join(';');
}

export function unzipResult(zipResult: string): SchulteTestResult {
  return zipResult
    .split(';')
    .map((zipValues) => {
      const values = zipValues.split(',');
      const result = keys.reduce((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {} as SchulteTableResult);

      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const value = parseInt(values[i], 10);

        if (Number.isFinite(value)) {
          result[key] = value;
        }
      }

      return result;
    });
}
