'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { federalIncomeTax, getStandardDeduction, formatCurrency, formatPercent, SS_CAP, SS_RATE, MEDICARE_RATE, type FilingStatus } from '@/lib/tax';

export default function CCorpVsSCorp() {
  const [netIncome, setNetIncome] = useState('200000');
  const [salaryTaken, setSalaryTaken] = useState('100000');
  const [filingStatus, setFilingStatus] = useState('single');
  const [retainedEarnings, setRetainedEarnings] = useState('50000');

  const ni = parseFloat(netIncome) || 0;
  const salary = parseFloat(salaryTaken) || 0;
  const retained = parseFloat(retainedEarnings) || 0;
  const fs = filingStatus as FilingStatus;
  const deduction = getStandardDeduction(fs);

  const sEmployeeSS = Math.min(salary, SS_CAP) * SS_RATE;
  const sEmployeeMedicare = salary * MEDICARE_RATE;
  const sEmployeeFICA = sEmployeeSS + sEmployeeMedicare;
  const sEmployerFICA = sEmployeeFICA;
  const sTotalFICA = sEmployeeFICA + sEmployerFICA;

  const sTaxable = Math.max(0, ni - deduction - sEmployerFICA);
  const sFedTax = federalIncomeTax(sTaxable, fs);
  const sDividendTax = retained > 0 ? federalIncomeTax(retained, fs) : 0;
  const sTotalTax = sTotalFICA + sFedTax;
  const sEffectiveRate = ni > 0 ? (sTotalTax / ni) * 100 : 0;

  const cCorpTaxable = Math.max(0, ni - salary - sEmployerFICA);
  const cCorpTax = cCorpTaxable * 0.21;
  const personalTaxOnSalary = Math.max(0, salary - deduction);
  const personalFedTax = federalIncomeTax(personalTaxOnSalary, fs);
  const personalFICA = sEmployeeFICA;
  const dividends = Math.max(0, retained);
  const dividendTax = dividends * 0.15;
  const personalTaxOnDividends = dividendTax;
  const cTotalTax = cCorpTax + personalFedTax + personalFICA + personalTaxOnDividends;
  const cEffectiveRate = ni > 0 ? (cTotalTax / ni) * 100 : 0;

  const difference = Math.abs(sTotalTax - cTotalTax);
  const cheaper = sTotalTax < cTotalTax ? 'S-Corp' : 'C-Corp';

  return (
    <div>
      <SectionHeader title="C-Corp vs. S-Corp Tax Calculator" subtitle="Compare the total tax impact of C-Corp double taxation vs. S-Corp pass through taxation" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Net Business Income ($)</label>
            <input type="number" value={netIncome} onChange={(e) => setNetIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Salary Taken ($)</label>
            <input type="number" value={salaryTaken} onChange={(e) => setSalaryTaken(e.target.value)}
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
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Retained Earnings ($)</label>
            <input type="number" value={retainedEarnings} onChange={(e) => setRetainedEarnings(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🏢" label="S-Corp Total Tax" value={formatCurrency(sTotalTax)} subtitle={`${formatPercent(sEffectiveRate)} effective`} />
        <ResultCard icon="🏛️" label="C-Corp Total Tax" value={formatCurrency(cTotalTax)} highlight subtitle={`${formatPercent(cEffectiveRate)} effective`} />
        <ResultCard icon="⚖️" label="Difference" value={formatCurrency(difference)} highlight subtitle={`${cheaper} is cheaper`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>S-Corp Breakdown (Pass Through)</div>
        <ResultRow label="Gross Income" value={formatCurrency(ni)} />
        <ResultRow label="FICA on Salary" value={formatCurrency(sTotalFICA)} />
        <ResultRow label="Federal Income Tax" value={formatCurrency(sFedTax)} />
        <ResultRow label="Total Tax" value={formatCurrency(sTotalTax)} bold />
        <ResultRow label="Effective Rate" value={formatPercent(sEffectiveRate)} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>C-Corp Breakdown (Double Taxation)</div>
        <ResultRow label="Corporate Taxable Income" value={formatCurrency(cCorpTaxable)} />
        <ResultRow label="Corporate Tax (21%)" value={formatCurrency(cCorpTax)} />
        <ResultRow label="Personal Tax on Salary" value={formatCurrency(personalFedTax)} />
        <ResultRow label="FICA on Salary (Employee)" value={formatCurrency(personalFICA)} />
        <ResultRow label="Tax on Dividends (15%)" value={formatCurrency(personalTaxOnDividends)} />
        <ResultRow label="Total Tax" value={formatCurrency(cTotalTax)} bold />
        <ResultRow label="Effective Rate" value={formatPercent(cEffectiveRate)} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          {cheaper === 'S-Corp'
            ? <>S-Corp saves <strong>{formatCurrency(difference)}</strong> vs. C-Corp at this income level. Pass through avoids the 21% corporate tax layer.</>
            : <>C-Corp saves <strong>{formatCurrency(difference)}</strong> at this income level, typically when retaining significant earnings and paying low dividends.</>
          }
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> S-Corp is pass through: all income taxed once at personal rates. C-Corp faces double taxation: 21% corporate tax + personal tax on salary and dividends. Dividend tax assumes qualified dividends at 15%. Does not include state taxes, QBI deduction, or additional Medicare taxes. Consult a tax advisor for entity selection.</p>
      </div>
    </div>
  );
}
