'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import {
  formatCurrency, federalIncomeTax, getStandardDeduction, FilingStatus,
  SS_CAP, SS_RATE, MEDICARE_RATE, ADDITIONAL_MEDICARE_RATE,
} from '@/lib/tax';

const PAY_PERIODS: Record<string, number> = {
  monthly: 12,
  semimonthly: 24,
  biweekly: 26,
  weekly: 52,
};

export default function TakeHomePayCalc() {
  const [salary, setSalary] = useState('75000');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [stateRate, setStateRate] = useState('0');
  const [preTax401k, setPreTax401k] = useState('0');
  const [period, setPeriod] = useState('biweekly');

  const annualSalary = parseFloat(salary) || 0;
  const stateTaxRate = parseFloat(stateRate) || 0;
  const retirementRate = Math.min(100, Math.max(0, parseFloat(preTax401k) || 0));
  const periods = PAY_PERIODS[period] || 26;

  const retirementContribution = annualSalary * (retirementRate / 100);
  const stdDeduction = getStandardDeduction(filingStatus);
  const taxableIncome = Math.max(0, annualSalary - stdDeduction - retirementContribution);
  const fedIncome = federalIncomeTax(taxableIncome, filingStatus);

  const employeeSS = (SS_RATE / 2) * Math.min(annualSalary, SS_CAP);
  const employeeMedicare = (MEDICARE_RATE / 2) * annualSalary;
  const addMedicareThreshold = filingStatus === 'married' ? 250000 : 200000;
  const addMedicare = Math.max(0, annualSalary - addMedicareThreshold) * ADDITIONAL_MEDICARE_RATE;

  const stateTax = Math.max(0, annualSalary - retirementContribution) * (stateTaxRate / 100);
  const totalDeductions = fedIncome + employeeSS + employeeMedicare + addMedicare + stateTax + retirementContribution;
  const takeHomeAnnual = Math.max(0, annualSalary - totalDeductions);
  const deductionRate = annualSalary > 0 ? (totalDeductions / annualSalary) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Take-Home Pay Calculator" subtitle="Estimate your net pay after federal income tax, FICA, and state tax (2026)" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-annual-gross-salary">Annual Gross Salary ($)</label>
            <input id="calc-annual-gross-salary"  type="number" value={salary} onChange={(e) => setSalary(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-filing-status">Filing Status</label>
            <select id="calc-filing-status"  value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-state-income-tax-rate">State Income Tax Rate (%)</label>
            <input id="calc-state-income-tax-rate"  type="number" value={stateRate} onChange={(e) => setStateRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Enter 0 if you live in a no-income-tax state. Estimate only — see note below.</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-pre-tax-401-k-contribution">Pre-Tax 401(k) Contribution (%)</label>
            <input id="calc-pre-tax-401-k-contribution"  type="number" value={preTax401k} onChange={(e) => setPreTax401k(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-pay-frequency">Pay Frequency</label>
          <select id="calc-pay-frequency"  value={period} onChange={(e) => setPeriod(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <option value="monthly">Monthly (12/year)</option>
            <option value="semimonthly">Semimonthly (24/year)</option>
            <option value="biweekly">Biweekly (26/year)</option>
            <option value="weekly">Weekly (52/year)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <ResultCard icon="💵" label={`Take-Home (${period})`} value={formatCurrency(takeHomeAnnual / periods)} highlight />
        <ResultCard icon="📅" label="Annual Take-Home" value={formatCurrency(takeHomeAnnual)} />
        <ResultCard icon="🏛️" label="Federal Tax" value={formatCurrency(fedIncome)} />
        <ResultCard icon="📊" label="Total Deduction Rate" value={`${deductionRate.toFixed(1)}%`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Annual Gross Salary" value={formatCurrency(annualSalary)} />
        <ResultRow label="Pre-Tax 401(k) Contribution" value={`-${formatCurrency(retirementContribution)}`} />
        <ResultRow label="Federal Income Tax (2026)" value={`-${formatCurrency(fedIncome)}`} />
        <ResultRow label="Social Security (6.2%)" value={`-${formatCurrency(employeeSS)}`} />
        <ResultRow label="Medicare (1.45%)" value={`-${formatCurrency(employeeMedicare)}`} />
        {addMedicare > 0 && <ResultRow label="Additional Medicare (0.9%)" value={`-${formatCurrency(addMedicare)}`} />}
        {stateTax > 0 && <ResultRow label="State Income Tax (est.)" value={`-${formatCurrency(stateTax)}`} />}
        <ResultRow label="Total Deductions" value={`-${formatCurrency(totalDeductions)}`} bold />
        <ResultRow label="Annual Take-Home Pay" value={formatCurrency(takeHomeAnnual)} bold />
        <ResultRow label={`Take-Home Per ${period === 'semimonthly' ? 'Pay Period' : period}`} value={formatCurrency(takeHomeAnnual / periods)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Federal tax uses 2026 brackets after the standard deduction ($16,100 single / $32,200 MFJ). FICA uses employee rates (6.2% SS on the first $184,500, 1.45% Medicare, plus 0.9% additional Medicare over $200k single / $250k MFJ). State tax uses your entered rate as a flat estimate — most states use progressive brackets, so for exact numbers use your state's tax withholding tables or pay stub.</p>
      </div>
    </div>
  );
}
