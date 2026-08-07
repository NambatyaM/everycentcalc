export const SS_CAP = 184500;
export const SE_RATE = 0.9235;
export const SS_RATE = 0.124;
export const MEDICARE_RATE = 0.029;
export const ADDITIONAL_MEDICARE_RATE = 0.009;
export const STANDARD_DEDUCTION_SINGLE = 16100;
export const STANDARD_DEDUCTION_MFJ = 32200;

// 2026 single-filer brackets (annual taxable income)
const SINGLE_BRACKETS: [number, number][] = [
  [12400, 0.10],
  [50400, 0.12],
  [105700, 0.22],
  [201775, 0.24],
  [256225, 0.32],
  [640600, 0.35],
  [Infinity, 0.37],
];

// 2026 married filing jointly brackets (annual taxable income)
const MFJ_BRACKETS: [number, number][] = [
  [24800, 0.10],
  [100800, 0.12],
  [211400, 0.22],
  [403550, 0.24],
  [512450, 0.32],
  [768700, 0.35],
  [Infinity, 0.37],
];

export type FilingStatus = 'single' | 'married';

export function federalIncomeTax(taxableIncome: number, filingStatus: FilingStatus = 'single'): number {
  if (taxableIncome <= 0) return 0;
  const brackets = filingStatus === 'married' ? MFJ_BRACKETS : SINGLE_BRACKETS;
  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of brackets) {
    const bracketIncome = Math.min(taxableIncome, limit) - prev;
    if (bracketIncome <= 0) break;
    tax += bracketIncome * rate;
    prev = limit;
  }
  return tax;
}

export function selfEmploymentTax(
  netSEIncome: number,
  filingStatus: FilingStatus = 'single',
  w2Wages: number = 0,
): { ss: number; medicare: number; additionalMedicare: number; total: number; taxable: number } {
  const taxable = Math.max(0, netSEIncome * SE_RATE);
  const ss = Math.min(taxable, Math.max(0, SS_CAP - w2Wages)) * SS_RATE;
  const medicare = taxable * MEDICARE_RATE;
  const seThreshold = filingStatus === 'married' ? 250000 : 200000;
  const adjustedThreshold = Math.max(0, seThreshold - w2Wages);
  const additionalMedicare = Math.max(0, taxable - adjustedThreshold) * ADDITIONAL_MEDICARE_RATE;
  return { ss, medicare, additionalMedicare, total: ss + medicare + additionalMedicare, taxable };
}

export function getStandardDeduction(filingStatus: FilingStatus): number {
  return filingStatus === 'married' ? STANDARD_DEDUCTION_MFJ : STANDARD_DEDUCTION_SINGLE;
}

export function formatCurrency(amount: number): string {
  if (!isFinite(amount)) return '$—';
  return `${amount < 0 ? '-$' : '$'}${Math.round(Math.abs(amount)).toLocaleString('en-US')}`;
}

export function formatPercent(rate: number, decimals = 1): string {
  if (!isFinite(rate)) return '—%';
  return `${rate.toFixed(decimals)}%`;
}
