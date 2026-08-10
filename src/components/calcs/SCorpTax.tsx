'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { federalIncomeTax, getStandardDeduction, selfEmploymentTax, formatCurrency, formatPercent, SS_CAP, ADDITIONAL_MEDICARE_RATE, type FilingStatus } from '@/lib/tax';

export default function SCorpTaxCalc() {
  const [netIncome, setNetIncome] = useState('150000');
  const [salary, setSalary] = useState('80000');
  const [filingStatus, setFilingStatus] = useState('single');
  const [stateRate, setStateRate] = useState('7');

  const ni = parseFloat(netIncome) || 0;
  const salaryVal = parseFloat(salary) || 0;
  const fs = filingStatus as FilingStatus;
  const statePct = (parseFloat(stateRate) || 0) / 100;
  const deduction = getStandardDeduction(fs);

  const distribution = Math.max(0, ni - salaryVal);

  const EE_SS_RATE = 0.062;
  const EE_MEDICARE_RATE = 0.0145;

  const employeeSS = Math.min(salaryVal, SS_CAP) * EE_SS_RATE;
  const employeeMedicare = salaryVal * EE_MEDICARE_RATE;
  const additionalMedicare = Math.max(0, salaryVal - (fs === 'married' ? 250000 : 200000)) * ADDITIONAL_MEDICARE_RATE;
  const employeeFICA = employeeSS + employeeMedicare + additionalMedicare;
  const employerFICA = Math.min(salaryVal, SS_CAP) * EE_SS_RATE + salaryVal * EE_MEDICARE_RATE;
  const totalFICA = employeeFICA + employerFICA;

  const se = selfEmploymentTax(ni, fs);
  const seFedTaxable = Math.max(0, ni - deduction);
  const seFedTax = federalIncomeTax(seFedTaxable, fs);
  const seState = Math.max(0, ni - deduction) * statePct;
  const seTotalTax = se.total + seFedTax + seState;

  const sFedTaxable = Math.max(0, ni - deduction - employerFICA);
  const sFedTax = federalIncomeTax(sFedTaxable, fs);
  const sState = Math.max(0, ni - deduction) * statePct;
  const sTotalTax = totalFICA + sFedTax + sState;

  const annualSavings = seTotalTax - sTotalTax;
  const sEffective = ni > 0 ? (sTotalTax / ni) * 100 : 0;
  const seEffective = ni > 0 ? (seTotalTax / ni) * 100 : 0;

  return (
    <div>
      <SectionHeader title="S-Corp Tax Savings Calculator" subtitle="Estimate your total tax bill as a sole proprietorship vs. an S-Corp after FICA, salary, distributions, and state taxes" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-net-business-income">Net Business Income ($)</label>
            <input id="calc-net-business-income"  type="number" value={netIncome} onChange={(e) => setNetIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-reasonable-salary">Reasonable Salary ($)</label>
            <input id="calc-reasonable-salary"  type="number" value={salary} onChange={(e) => setSalary(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-filing-status">Filing Status</label>
            <select id="calc-filing-status"  value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-state-tax-rate">State Tax Rate (%)</label>
            <input id="calc-state-tax-rate"  type="number" value={stateRate} onChange={(e) => setStateRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="✅" label="Annual Tax Savings" value={formatCurrency(annualSavings)} highlight subtitle={annualSavings > 0 ? 'vs. sole prop' : 'S-Corp costs more'} />
        <ResultCard icon="📊" label="S-Corp Effective Rate" value={formatPercent(sEffective)} subtitle={`vs ${formatPercent(seEffective)} sole prop`} />
        <ResultCard icon="💼" label="Reasonable Salary" value={formatCurrency(salaryVal)} subtitle={`Distribution: ${formatCurrency(distribution)}`} />
        <ResultCard icon="🏢" label="S-Corp Total Tax" value={formatCurrency(sTotalTax)} />
        <ResultCard icon="📋" label="Sole Prop Total Tax" value={formatCurrency(seTotalTax)} />
        <ResultCard icon="💰" label="5-Year Savings" value={formatCurrency(annualSavings * 5)} subtitle="ignoring growth" />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>S-Corp Breakdown</div>
        <ResultRow label="Net Business Income" value={formatCurrency(ni)} />
        <ResultRow label="Reasonable Salary" value={formatCurrency(salaryVal)} />
        <ResultRow label="Distribution (no FICA)" value={formatCurrency(distribution)} />
        <ResultRow label="Employee FICA (7.65%)" value={formatCurrency(employeeFICA)} />
        <ResultRow label="Employer FICA (7.65%)" value={formatCurrency(employerFICA)} />
        <ResultRow label="Federal Income Tax" value={formatCurrency(sFedTax)} />
        <ResultRow label="State Tax" value={formatCurrency(sState)} />
        <ResultRow label="Total Tax" value={formatCurrency(sTotalTax)} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Sole Proprietorship Comparison</div>
        <ResultRow label="Self-Employment Tax" value={formatCurrency(se.total)} />
        <ResultRow label="Federal Income Tax" value={formatCurrency(seFedTax)} />
        <ResultRow label="State Tax" value={formatCurrency(seState)} />
        <ResultRow label="Total Tax" value={formatCurrency(seTotalTax)} bold />
      </div>

      {salaryVal > ni && (
        <div className="rounded-lg border p-4 mb-4" style={{ background: '#fef2f2', borderColor: '#ef4444' }}>
          <p className="text-sm" style={{ color: '#dc2626' }}>
            ⚠️ Salary cannot exceed net business income. Lower your salary so that a meaningful portion of income remains as distribution.
          </p>
        </div>
      )}

      {ni > 0 && salaryVal <= ni && annualSavings <= 0 && (
        <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
          <p className="text-sm" style={{ color: 'var(--brand)' }}>
            At this income level, S-Corp taxation does not save enough to beat a sole proprietorship once payroll, filing, and state fees (about $1,000–$3,000/year) are counted.
          </p>
        </div>
      )}

      {ni > 0 && salaryVal <= ni && annualSavings > 0 && (
        <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
          <p className="text-sm" style={{ color: 'var(--brand)' }}>
            {annualSavings > 8000
              ? <>An S-Corp could save about <strong>{formatCurrency(annualSavings)}/year</strong>, well above typical $1,000–$3,000/year compliance costs.</>
              : <>S-Corp savings of <strong>{formatCurrency(annualSavings)}/year</strong> are modest. Add $1,000–$3,000/year for payroll, filing, and state fees before deciding.</>
            }
          </p>
        </div>
      )}

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> Simplified model: employer FICA is deductible, state tax uses your effective rate (some states add S-Corp franchise taxes), federal uses 2026 brackets and ignores QBI, credits, and itemized deductions. The IRS requires a reasonable salary comparable to market wages. Consult a CPA before making an election.</p>
      </div>
    </div>
  );
}