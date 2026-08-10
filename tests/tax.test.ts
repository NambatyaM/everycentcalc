import { describe, it, expect } from 'vitest';
import {
  federalIncomeTax,
  selfEmploymentTax,
  getStandardDeduction,
  formatCurrency,
  formatPercent,
  SS_CAP,
  STANDARD_DEDUCTION_SINGLE,
  STANDARD_DEDUCTION_MFJ,
} from '@/lib/tax';

describe('federalIncomeTax (2026 brackets, IRS Rev. Proc. 2025-32)', () => {
  it('computes $0 for zero and negative income', () => {
    expect(federalIncomeTax(0, 'single')).toBe(0);
    expect(federalIncomeTax(-5000, 'single')).toBe(0);
    expect(federalIncomeTax(-1, 'married')).toBe(0);
  });

  it('applies the 10% bracket only at the boundary', () => {
    expect(federalIncomeTax(12400, 'single')).toBeCloseTo(1240, 5);
    expect(federalIncomeTax(12401, 'single')).toBeCloseTo(1240.12, 5);
  });

  it('computes the IRS published worked example: $70,000 single = $10,112', () => {
    // 10%: 12,400 x 0.10 = 1,240
    // 12%: 38,000 x 0.12 = 4,560
    // 22%: 19,600 x 0.22 = 4,312
    expect(federalIncomeTax(70000, 'single')).toBeCloseTo(10112, 5);
  });

  it('computes $200,000 single = $40,598', () => {
    // 10%: 1,240; 12%: 4,560; 22%: 12,166; 24%: (200,000-105,700)=94,300 x 0.24 = 22,632
    expect(federalIncomeTax(200000, 'single')).toBeCloseTo(40598, 5);
  });

  it('computes $1,000,000 single correctly across all brackets', () => {
    // 10%: 1,240; 12%: 4,560; 22%: 12,166; 24%: (201,775-105,700)x0.24=23,058
    // 32%: (256,225-201,775)x0.32=17,424; 35%: (640,600-256,225)x0.35=134,531.25
    // 37%: (1,000,000-640,600)x0.37=132,978
    expect(federalIncomeTax(1000000, 'single')).toBeCloseTo(325957.25, 4);
  });

  it('computes married filing jointly brackets', () => {
    // 10%: 24,800 x 0.10 = 2,480; 12%: 45,200 x 0.12 = 5,424
    expect(federalIncomeTax(70000, 'married')).toBeCloseTo(7904, 5);
    // Top of 12% MFJ bracket: 24,800x0.10 + (100,800-24,800)x0.12 = 2,480 + 9,120
    expect(federalIncomeTax(100800, 'married')).toBeCloseTo(11600, 5);
  });

  it('handles very large incomes without overflow', () => {
    const result = federalIncomeTax(Number.MAX_SAFE_INTEGER / 1000, 'single');
    expect(result).toBeGreaterThan(0);
    expect(Number.isFinite(result)).toBe(true);
  });
});

describe('selfEmploymentTax (2026: 92.35% adjustment, $184,500 SS cap, 15.3%)', () => {
  it('computes SE tax on $100,000 net income', () => {
    const r = selfEmploymentTax(100000, 'single');
    expect(r.taxable).toBeCloseTo(92350, 5);
    expect(r.ss).toBeCloseTo(11451.4, 5); // 92,350 x 12.4%
    expect(r.medicare).toBeCloseTo(2678.15, 5); // 92,350 x 2.9%
    expect(r.additionalMedicare).toBe(0);
    expect(r.total).toBeCloseTo(14129.55, 5); // 15.3% on 92,350
  });

  it('caps Social Security at the $184,500 wage base', () => {
    const r = selfEmploymentTax(200000, 'single');
    expect(r.ss).toBeCloseTo(184500 * 0.124, 5);
    expect(r.medicare).toBeCloseTo(184700 * 0.029, 5); // 200,000 x 0.9235 = 184,700
  });

  it('applies 0.9% Additional Medicare above $200k single', () => {
    const r = selfEmploymentTax(300000, 'single');
    const taxable = 300000 * 0.9235; // 277,050
    expect(r.additionalMedicare).toBeCloseTo((taxable - 200000) * 0.009, 5);
  });

  it('applies 0.9% Additional Medicare above $250k married', () => {
    const r = selfEmploymentTax(300000, 'married');
    const taxable = 300000 * 0.9235; // 277,050
    expect(r.additionalMedicare).toBeCloseTo((taxable - 250000) * 0.009, 5);
  });

  it('reduces the SS cap by W-2 wages already paid', () => {
    const r = selfEmploymentTax(100000, 'single', 150000);
    expect(r.ss).toBeCloseTo(34500 * 0.124, 5); // (184,500 - 150,000) = 34,500
    expect(r.additionalMedicare).toBeCloseTo(42350 * 0.009, 5); // (92,350 - 50,000)
  });

  it('returns zeros for negative net income', () => {
    const r = selfEmploymentTax(-5000, 'single');
    expect(r.taxable).toBe(0);
    expect(r.total).toBe(0);
  });

  it('uses correct 2026 constants', () => {
    expect(SS_CAP).toBe(184500);
    expect(STANDARD_DEDUCTION_SINGLE).toBe(16100);
    expect(STANDARD_DEDUCTION_MFJ).toBe(32200);
  });
});

describe('getStandardDeduction (2026)', () => {
  it('returns $16,100 single / $32,200 married', () => {
    expect(getStandardDeduction('single')).toBe(16100);
    expect(getStandardDeduction('married')).toBe(32200);
  });
});

describe('formatCurrency / formatPercent', () => {
  it('formats currency with thousands separators and 2 decimals', () => {
    expect(formatCurrency(12345.678912)).toBe('$12,345.68');
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats negatives as -$X.XX', () => {
    expect(formatCurrency(-50)).toBe('-$50.00');
  });

  it('never renders NaN/Infinity to users', () => {
    expect(formatCurrency(NaN)).toBe('$—');
    expect(formatCurrency(Infinity)).toBe('$—');
    expect(formatCurrency(-Infinity)).toBe('$—');
    expect(formatPercent(NaN)).toBe('—%');
    expect(formatPercent(Infinity)).toBe('—%');
  });

  it('formats percents to 1 decimal', () => {
    expect(formatPercent(14.13)).toBe('14.1%');
    expect(formatPercent(0)).toBe('0.0%');
  });
});
