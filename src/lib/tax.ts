export const SS_CAP = 176100;
export const SE_RATE = 0.9235;
export const SS_RATE = 0.124;
export const MEDICARE_RATE = 0.029;
export const STANDARD_DEDUCTION_2026 = 14600;

// 2026 single-filer brackets (annual taxable income)
const BRACKETS: [number, number][] = [
  [11925, 0.10],
  [48475, 0.12],
  [103350, 0.22],
  [197300, 0.24],
  [250525, 0.32],
  [626350, 0.35],
  [Infinity, 0.37],
];

export function federalIncomeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of BRACKETS) {
    const bracketIncome = Math.min(taxableIncome, limit) - prev;
    if (bracketIncome <= 0) break;
    tax += bracketIncome * rate;
    prev = limit;
  }
  return tax;
}

export function selfEmploymentTax(netSEIncome: number): { ss: number; medicare: number; total: number; taxable: number } {
  const taxable = netSEIncome * SE_RATE;
  const ss = Math.min(taxable, SS_CAP) * SS_RATE;
  const medicare = taxable * MEDICARE_RATE;
  return { ss, medicare, total: ss + medicare, taxable };
}

export function formatCurrency(amount: number): string {
  return `$${Math.round(Math.abs(amount)).toLocaleString('en-US')}`;
}

export function formatPercent(rate: number, decimals = 1): string {
  return `${rate.toFixed(decimals)}%`;
}
