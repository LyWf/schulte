export interface SchulteTableResult {
  errors: number;
  timeTotal: number;
  timeFoundMin: number;
  timeFoundMax: number;
  timeFoundAvg: number;
}

export type SchulteTestResult = SchulteTableResult[];
