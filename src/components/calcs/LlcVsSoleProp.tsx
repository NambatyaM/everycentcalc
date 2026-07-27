'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { selfEmploymentTax, federalIncomeTax, getStandardDeduction, formatCurrency, SS_CAP, SS_RATE, MEDICARE_RATE } from '@/lib/tax';

export default function LlcVsSolePropCalc() {
  const [netIncome, setNetIncome] = useState('100000');
  const [filingStatus, setFilingStatus] = useState('single');

  const ni = parseFloat(netIncome) || 0;
  const fs = filingStatus as 'single' | 'married';

  const deduction = getStandardDeduction(fs);

  // Sole Proprietorship — SE tax on all net income
  const spSe = selfEmploymentTax(ni, fs);
  const spSeDeduction = spSe.total / 2;
  const spTaxable = Math.max(0, ni - deduction - spSeDeduction);
  const spFedTax = federalIncomeTax(spTaxable, fs);
  const spTotalTax = spSe.total + spFedTax;
  const spTakeHome = ni - spTotalTax;

  // LLC + S-Corp: reasonable salary = min(60% of income, $50K)
  const salary = Math.min(ni * 0.6, 50000);
  const distribution = ni - salary;

  // S-Corp FICA: employee pays 7.65% (6.2% SS + 1.45% Medicare) on salary
  // Employer pays matching 7.65% (deductible business expense)
  // Total FICA = 15.3% on salary (no 92.35% factor — that's SE-specific)
  const ssCap = SS_CAP;
  const employeeSS = Math.min(salary, ssCap) * SS_RATE;
  const employeeMedicare = salary * MEDICARE_RATE;
  const employeeFICA = employeeSS + employeeMedicare;
  const employerFICA = employeeFICA; // matching
  const totalFICA = employeeFICA + employerFICA;

  // Employer FICA is a deductible business expense, reducing taxable income
  const scorpTaxable = Math.max(0, ni - deduction - employerFICA);
  const scorpFedTax = federalIncomeTax(scorpTaxable, fs);
  const scorpTotalTax = totalFICA + scorpFedTax;
  const scorpTakeHome = ni - scorpTotalTax;

  const savings = spTotalTax - scorpTotalTax;

  return (
    <div>
      <SectionHeader title="LLC vs. Sole Proprietorship Tax Comparison" subtitle="Compare tax liability between operating as a sole prop and an LLC with S-Corp election" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Annual Net Income ($)
          </label>
          <input
            type="number"
            value={netIncome}
            onChange={(e) => setNetIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="100000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Filing Status
          </label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="🏢" label="Sole Prop Take Home" value={formatCurrency(spTakeHome)} />
        <ResultCard icon="🏛️" label="S-Corp LLC Take Home" value={formatCurrency(scorpTakeHome)} highlight />
        <ResultCard icon="💡" label="S-Corp Savings" value={formatCurrency(savings)} highlight subtitle={savings > 0 ? 'per year' : ''} />
        <ResultCard icon="📋" label="S-Corp Salary" value={formatCurrency(salary)} subtitle="Subject to FICA" />
      </div>

      <div className="rounded-xl border p-4 mb-6 overflow-x-auto" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Side by Side Comparison</div>
        <table className="w-full text-sm min-w-[320px]">
          <thead>
            <tr className="border-t" style={{ borderColor: 'var(--border)' }}>
              <th className="py-2 text-left font-medium" style={{ color: 'var(--text-secondary)' }}></th>
              <th className="py-2 text-right font-mono text-xs" style={{ color: 'var(--text-muted)' }}>Sole Prop</th>
              <th className="py-2 text-right font-mono text-xs" style={{ color: 'var(--brand)' }}>S-Corp LLC</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Gross Income', sp: formatCurrency(ni), sc: formatCurrency(ni) },
              { label: 'Salary (FICA Basis)', sp: formatCurrency(ni), sc: formatCurrency(salary) },
              { label: 'Distribution (No FICA)', sp: '—', sc: formatCurrency(distribution) },
              { label: 'SE / FICA Tax', sp: formatCurrency(spSe.total), sc: formatCurrency(totalFICA) },
              { label: 'Federal Income Tax', sp: formatCurrency(spFedTax), sc: formatCurrency(scorpFedTax) },
              { label: 'Total Tax', sp: formatCurrency(spTotalTax), sc: formatCurrency(scorpTotalTax) },
              { label: 'Take Home', sp: formatCurrency(spTakeHome), sc: formatCurrency(scorpTakeHome) },
            ].map((row) => (
              <tr key={row.label} className="border-t" style={{ borderColor: 'var(--border)' }}>
                <td className="py-2 pr-4" style={{ color: 'var(--text-secondary)' }}>{row.label}</td>
                <td className="py-2 text-right font-mono" style={{ color: 'var(--text-primary)' }}>{row.sp}</td>
                <td className="py-2 text-right font-mono font-medium" style={{ color: 'var(--brand)' }}>{row.sc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border p-4 mb-4 break-words" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          {savings > 0
            ? <>S-Corp election could save you <strong>{formatCurrency(savings)}</strong>/year. Salary capped at {formatCurrency(salary)}, remaining <strong>{formatCurrency(distribution)}</strong> taken as distribution — no FICA.</>
            : <>At this income level, S-Corp provides no tax advantage. Typically beneficial above ~$50K net income.</>
          }
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Note:</strong> Sole Prop and LLC (disregarded entity) pay SE tax (15.3% on 92.35% of net income). LLC + S-Corp pays FICA (15.3% on salary only). The employer&apos;s FICA share (7.65%) is a deductible business expense. Salary assumed at 60% of income or $50K max. Does not include state taxes or additional S-Corp administrative costs (payroll, filing).</p>
      </div>
    </div>
  );
}
