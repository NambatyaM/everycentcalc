'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { federalIncomeTax, getStandardDeduction, selfEmploymentTax, formatCurrency, formatPercent, SS_CAP, ADDITIONAL_MEDICARE_RATE, type FilingStatus } from '@/lib/tax';

export default function EntityComparisonCalc() {
  const [netIncome, setNetIncome] = useState('150000');
  const [salary, setSalary] = useState('80000');
  const [filingStatus, setFilingStatus] = useState('single');
  const [stateRate, setStateRate] = useState('7');
  const [dividends, setDividends] = useState('0');

  const ni = parseFloat(netIncome) || 0;
  const salaryVal = parseFloat(salary) || 0;
  const fs = filingStatus as FilingStatus;
  const statePct = (parseFloat(stateRate) || 0) / 100;
  const divIn = parseFloat(dividends) || 0;
  const deduction = getStandardDeduction(fs);

  // Sole Proprietorship / Single Member LLC (same taxation)
  const soleSE = selfEmploymentTax(ni, fs);
  const soleFed = federalIncomeTax(Math.max(0, ni - deduction), fs);
  const soleState = Math.max(0, ni - deduction) * statePct;
  const soleTotal = soleSE.total + soleFed + soleState;

  // Employee FICA (for S-Corp / C-Corp salary)
  const employeeSS = Math.min(salaryVal, SS_CAP) * 0.062;
  const employeeMedicare = salaryVal * 0.0145;
  const additionalMedicare = Math.max(0, salaryVal - (fs === 'married' ? 250000 : 200000)) * ADDITIONAL_MEDICARE_RATE;
  const employeeFICA = employeeSS + employeeMedicare + additionalMedicare;
  const employerFICA = Math.min(salaryVal, SS_CAP) * 0.062 + salaryVal * 0.0145;
  const totalFICA = employeeFICA + employerFICA;

  // S-Corp
  const sDist = Math.max(0, ni - salaryVal);
  const sFed = federalIncomeTax(Math.max(0, ni - deduction - employerFICA), fs);
  const sState = Math.max(0, ni - deduction) * statePct;
  const sTotal = totalFICA + sFed + sState;

  // C-Corp
  const corpTaxable = Math.max(0, ni - salaryVal - employerFICA);
  const corpTax = corpTaxable * 0.21;
  const afterTaxProfit = corpTaxable - corpTax;
  const divPaid = Math.min(divIn, afterTaxProfit);
  const divTax = divPaid * 0.15;
  const cFed = federalIncomeTax(Math.max(0, salaryVal - deduction), fs);
  const cState = Math.max(0, salaryVal - deduction) * statePct;
  const cFICA = employeeFICA + employerFICA;
  const cTotal = corpTax + divTax + cFed + cState + cFICA;

  const best = Math.min(soleTotal, sTotal, cTotal);
  const bestName = soleTotal === best ? 'Sole Proprietor' : sTotal === best ? 'S-Corp' : 'C-Corp';
  const runnerUp = Math.min(
    ...[soleTotal, sTotal, cTotal].filter((t) => t !== best),
  );

  return (
    <div>
      <SectionHeader title="Business Entity Tax Comparison Calculator" subtitle="Compare sole proprietor, LLC, S-Corp, and C-Corp side by side with your actual numbers" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Net Business Income ($)</label>
            <input type="number" value={netIncome} onChange={(e) => setNetIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Owner Salary (S-Corp / C-Corp) ($)</label>
            <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Filing Status</label>
            <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>State Tax Rate (%)</label>
            <input type="number" value={stateRate} onChange={(e) => setStateRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>C-Corp Dividends Paid ($)</label>
            <input type="number" value={dividends} onChange={(e) => setDividends(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <ResultCard icon="🚶" label="Sole / LLC Total Tax" value={formatCurrency(soleTotal)} subtitle={`${formatPercent(soleTotal / Math.max(1, ni) * 100)} effective`} />
        <ResultCard icon="🏢" label="S-Corp Total Tax" value={formatCurrency(sTotal)} subtitle={`${formatPercent(sTotal / Math.max(1, ni) * 100)} effective`} highlight />
        <ResultCard icon="🏛️" label="C-Corp Total Tax" value={formatCurrency(cTotal)} subtitle={`${formatPercent(cTotal / Math.max(1, ni) * 100)} effective`} />
        <ResultCard icon="🏆" label="Cheapest Entity" value={bestName} subtitle={`Saves ${formatCurrency(runnerUp - best)} vs. next best`} />
      </div>

      <div className="text-xs leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
        <p>Note: A single member LLC is taxed exactly like a sole proprietorship by default (Schedule C). The S-Corp and C-Corp columns assume you take a salary; the IRS requires it to be reasonable.</p>
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Sole Proprietor / LLC (Pay as you go)</div>
        <ResultRow label="Self-Employment Tax" value={formatCurrency(soleSE.total)} />
        <ResultRow label="Federal Income Tax" value={formatCurrency(soleFed)} />
        <ResultRow label="State Tax" value={formatCurrency(soleState)} />
        <ResultRow label="Total" value={formatCurrency(soleTotal)} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>S-Corp</div>
        <ResultRow label="Salary" value={formatCurrency(salaryVal)} />
        <ResultRow label="Employee FICA (7.65%)" value={`${formatCurrency(employeeFICA)}`} />
        <ResultRow label="Employer FICA (7.65%)" value={`${formatCurrency(employerFICA)}`} />
        <ResultRow label="Distribution (no FICA)" value={formatCurrency(sDist)} />
        <ResultRow label="Federal Income Tax" value={formatCurrency(sFed)} />
        <ResultRow label="State Tax" value={formatCurrency(sState)} />
        <ResultRow label="Total" value={formatCurrency(sTotal)} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>C-Corp</div>
        <ResultRow label="Corporate Taxable Income" value={formatCurrency(corpTaxable)} />
        <ResultRow label="Corporate Tax (21%)" value={`-${formatCurrency(corpTax)}`} />
        <ResultRow label="After Tax Profit" value={formatCurrency(afterTaxProfit)} />
        <ResultRow label="Dividends Paid" value={`${formatCurrency(divPaid)} (tax ${formatCurrency(divTax)})`} />
        <ResultRow label="Salary FICA" value={`${formatCurrency(cFICA)}`} />
        <ResultRow label="Federal Income Tax on Salary" value={`${formatCurrency(cFed)}`} />
        <ResultRow label="State Tax on Salary" value={`${formatCurrency(cState)}`} />
        <ResultRow label="Total" value={formatCurrency(cTotal)} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          At these numbers, <strong>{bestName}</strong> leads with the lowest total tax. Re-run the comparison when your income, salary, or state tax rate changes — the winner often flips between $50k and $150k of net income.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> Simplified model only. Ignores QBI deduction, FICA wage cap behavior beyond SS cap, C-Corp retained earnings tax deferral, and entity formation/compliance costs. C-Corp can also defer tax on retained earnings instead of paying dividends. S-Corp requires payroll setup and an extra tax return. Consult a CPA for entity selection.</p>
      </div>
    </div>
  );
}