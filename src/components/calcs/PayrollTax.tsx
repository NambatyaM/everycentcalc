'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency, formatPercent, SS_CAP, SS_RATE, MEDICARE_RATE } from '@/lib/tax';

const PAY_PERIODS_PER_YEAR: Record<string, number> = {
  biweekly: 26,
  monthly: 12,
};

export default function PayrollTax() {
  const [salary, setSalary] = useState('60000');
  const [payFrequency, setPayFrequency] = useState('biweekly');
  const [federalAllowance, setFederalAllowance] = useState('1');
  const [stateTaxRate, setStateTaxRate] = useState('5');
  const [k401Percent, setK401Percent] = useState('0');

  const annualSalary = parseFloat(salary) || 0;
  const periods = PAY_PERIODS_PER_YEAR[payFrequency];
  const allowanceInput = parseInt(federalAllowance);
  const allowance = isNaN(allowanceInput) ? 1 : Math.max(0, allowanceInput);
  const stateRate = (parseFloat(stateTaxRate) || 0) / 100;
  const k401Rate = (parseFloat(k401Percent) || 0) / 100;

  const grossPerPeriod = annualSalary / periods;
  const k401PerPeriod = grossPerPeriod * k401Rate;

  const employeeSSAnnual = Math.min(annualSalary, SS_CAP) * (SS_RATE / 2);
  const employeeMedicareAnnual = annualSalary * (MEDICARE_RATE / 2);
  const ssPerPeriod = employeeSSAnnual / periods;
  const medicarePerPeriod = employeeMedicareAnnual / periods;

  const taxableGrossPerPeriod = grossPerPeriod - k401PerPeriod;
  const annualTaxableGross = taxableGrossPerPeriod * periods;
  const federalAnnual = Math.max(0, annualTaxableGross - (allowance * 5000)) * 0.12;
  const federalPerPeriod = federalAnnual / periods;

  const statePerPeriod = taxableGrossPerPeriod * stateRate;

  const totalEmployeeTaxPerPeriod = ssPerPeriod + medicarePerPeriod + federalPerPeriod + statePerPeriod;
  const netPayPerPeriod = taxableGrossPerPeriod - totalEmployeeTaxPerPeriod;

  const employerSSPerPeriod = ssPerPeriod;
  const employerMedicarePerPeriod = medicarePerPeriod;
  const futaWageBase = Math.min(annualSalary, 7000);
  const sutaWageBase = Math.min(annualSalary, 7000);
  const futaPerPeriod = (futaWageBase * 0.006) / periods;
  const sutaPerPeriod = (sutaWageBase * 0.027) / periods;
  const totalEmployerTaxPerPeriod = employerSSPerPeriod + employerMedicarePerPeriod + futaPerPeriod + sutaPerPeriod;
  const totalEmployerCostPerPeriod = grossPerPeriod + totalEmployerTaxPerPeriod;

  const totalEmployerCostAnnual = totalEmployerCostPerPeriod * periods;

  return (
    <div>
      <SectionHeader title="Payroll Tax Calculator" subtitle="Calculate employee take home pay and total employer costs for small business payroll" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Employee Annual Salary ($)</label>
            <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Pay Frequency</label>
            <select value={payFrequency} onChange={(e) => setPayFrequency(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="biweekly">Biweekly (26 periods)</option>
              <option value="monthly">Monthly (12 periods)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Federal Withholding Allowances</label>
            <input type="number" value={federalAllowance} onChange={(e) => setFederalAllowance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>State Tax Rate (%)</label>
            <input type="number" value={stateTaxRate} onChange={(e) => setStateTaxRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>401(k) Contribution (%)</label>
            <input type="number" value={k401Percent} onChange={(e) => setK401Percent(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💵" label="Net Pay (Per Period)" value={formatCurrency(netPayPerPeriod)} highlight subtitle={payFrequency} />
        <ResultCard icon="🏢" label="Total Employer Cost" value={formatCurrency(totalEmployerCostPerPeriod)} subtitle={`Per ${payFrequency === 'biweekly' ? 'paycheck' : 'month'}`} />
        <ResultCard icon="🧾" label="Employee Taxes" value={formatCurrency(totalEmployeeTaxPerPeriod)} subtitle="Per period" />
        <ResultCard icon="📋" label="Employer Taxes" value={formatCurrency(totalEmployerTaxPerPeriod)} subtitle="Per period" />
        <ResultCard icon="📊" label="Annual Net Pay" value={formatCurrency(netPayPerPeriod * periods)} />
        <ResultCard icon="💰" label="Annual Employer Cost" value={formatCurrency(totalEmployerCostAnnual)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Per {payFrequency === 'biweekly' ? 'Paycheck' : 'Month'} Breakdown</div>
        <ResultRow label="Gross Pay" value={formatCurrency(grossPerPeriod)} />
        <ResultRow label="401(k) Deduction" value={`-${formatCurrency(k401PerPeriod)}`} />
        <ResultRow label={`Social Security (${(SS_RATE / 2 * 100).toFixed(1)}%)`} value={`-${formatCurrency(ssPerPeriod)}`} />
        <ResultRow label={`Medicare (${(MEDICARE_RATE / 2 * 100).toFixed(2)}%)`} value={`-${formatCurrency(medicarePerPeriod)}`} />
        <ResultRow label="Federal Income Tax (12% flat est.)" value={`-${formatCurrency(federalPerPeriod)}`} />
        <ResultRow label={`State Tax (${(stateRate * 100).toFixed(1)}%)`} value={`-${formatCurrency(statePerPeriod)}`} />
        <ResultRow label="Net Pay" value={formatCurrency(netPayPerPeriod)} bold />
        <ResultRow label={`Employer SS Match (${(SS_RATE / 2 * 100).toFixed(1)}%)`} value={formatCurrency(employerSSPerPeriod)} />
        <ResultRow label={`Employer Medicare Match (${(MEDICARE_RATE / 2 * 100).toFixed(2)}%)`} value={formatCurrency(employerMedicarePerPeriod)} />
        <ResultRow label="FUTA (0.6% net of SUTA credit)" value={formatCurrency(futaPerPeriod)} />
        <ResultRow label="SUTA (2.7%)" value={formatCurrency(sutaPerPeriod)} />
        <ResultRow label="Total Employer Cost" value={formatCurrency(totalEmployerCostPerPeriod)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> Federal withholding uses simplified flat 12% estimate. Actual withholding depends on W-4 elections and IRS tables. State tax rate is user-entered. SUTA rate estimated at 2.7% (varies by state and employer experience rating, wages capped at $7,000). FUTA here uses the effective 0.6% rate after the 5.4% state unemployment credit on the first $7,000 of wages ($42 max/year); the statutory pre-credit rate is 6.0%. 401(k) deductions are pre-tax for income tax but remain subject to Social Security and Medicare. Consult your payroll provider for exact calculations.</p>
      </div>
    </div>
  );
}
