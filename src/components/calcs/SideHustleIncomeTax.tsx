'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency, federalIncomeTax, selfEmploymentTax, getStandardDeduction, FilingStatus } from '@/lib/tax';

export default function SideHustleIncomeTaxCalc() {
  const [w2Salary, setW2Salary] = useState('70000');
  const [sideIncome, setSideIncome] = useState('30000');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [w2Withholding, setW2Withholding] = useState('12000');

  const salary = parseFloat(w2Salary) || 0;
  const side = parseFloat(sideIncome) || 0;
  const withheld = parseFloat(w2Withholding) || 0;

  const combined = salary + side;
  const se = selfEmploymentTax(side, filingStatus, salary);
  const seDeduction = se.total / 2;
  const stdDeduction = getStandardDeduction(filingStatus);
  const taxableIncome = Math.max(0, combined - stdDeduction - seDeduction);
  const fedTax = federalIncomeTax(taxableIncome, filingStatus);
  const totalTax = fedTax + se.total;
  const additionalOwed = Math.max(0, totalTax - withheld);
  const quarterlyPayment = additionalOwed / 4;
  const effectiveRate = combined > 0 ? (totalTax / combined) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Side Hustle Income Tax Calculator" subtitle="Estimate additional taxes from self employment income" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-w-2-salary">W-2 Salary ($)</label>
            <input id="calc-w-2-salary"  type="number" value={w2Salary} onChange={(e) => setW2Salary(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-side-hustle-net-income">Side Hustle Net Income ($)</label>
            <input id="calc-side-hustle-net-income"  type="number" value={sideIncome} onChange={(e) => setSideIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-filing-status">Filing Status</label>
            <select id="calc-filing-status"  value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-w-2-withholding-already-done">W-2 Withholding Already Done ($)</label>
            <input id="calc-w-2-withholding-already-done"  type="number" value={w2Withholding} onChange={(e) => setW2Withholding(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🧾" label="Additional Tax Owed" value={formatCurrency(additionalOwed)} highlight />
        <ResultCard icon="💼" label="SE Tax on Side Hustle" value={formatCurrency(se.total)} />
        <ResultCard icon="📅" label="Quarterly Payment Needed" value={formatCurrency(quarterlyPayment)} />
        <ResultCard icon="📊" label="Effective Combined Rate" value={`${effectiveRate.toFixed(1)}%`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="W-2 Salary" value={formatCurrency(salary)} />
        <ResultRow label="Side Hustle Income" value={formatCurrency(side)} />
        <ResultRow label="Combined Income" value={formatCurrency(combined)} />
        <ResultRow label="Self Employment Tax" value={formatCurrency(se.total)} />
        <ResultRow label="50% SE Tax Deduction" value={`-${formatCurrency(seDeduction)}`} />
        <ResultRow label="Standard Deduction" value={`-${formatCurrency(stdDeduction)}`} />
        <ResultRow label="Federal Taxable Income" value={formatCurrency(taxableIncome)} />
        <ResultRow label="Federal Income Tax" value={formatCurrency(fedTax)} />
        <ResultRow label="Total Tax (Fed + SE)" value={formatCurrency(totalTax)} />
        <ResultRow label="W-2 Withholding" value={`-${formatCurrency(withheld)}`} />
        <ResultRow label="Additional Tax Owed" value={formatCurrency(additionalOwed)} bold />
        <ResultRow label="Quarterly Estimated Payment" value={formatCurrency(quarterlyPayment)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>SE tax is 15.3% on 92.35% of net self employment income (12.4% Social Security + 2.9% Medicare). Federal tax uses 2026 brackets after standard deduction and 50% SE tax deduction. Quarterly payments are due April 15, June 15, September 15, and January 15.</p>
      </div>
    </div>
  );
}
