'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { selfEmploymentTax, federalIncomeTax, getStandardDeduction, formatCurrency, formatPercent, SS_CAP, SS_RATE, MEDICARE_RATE, ADDITIONAL_MEDICARE_RATE, type FilingStatus } from '@/lib/tax';

export default function LlcTaxSavings() {
  const [netIncome, setNetIncome] = useState('120000');
  const [filingStatus, setFilingStatus] = useState('single');
  const [entityType, setEntityType] = useState('sole_prop');

  const ni = parseFloat(netIncome) || 0;
  const fs = filingStatus as FilingStatus;
  const deduction = getStandardDeduction(fs);

  const se = selfEmploymentTax(ni, fs);
  const seDeduction = se.total / 2;
  const spTaxable = Math.max(0, ni - deduction - seDeduction);
  const spFedTax = federalIncomeTax(spTaxable, fs);
  const spTotalTax = se.total + spFedTax;
  const spEffectiveRate = ni > 0 ? (spTotalTax / ni) * 100 : 0;

  const salary = Math.min(ni * 0.6, 50000);
  const distribution = ni - salary;
  const employeeSS = Math.min(salary, SS_CAP) * (SS_RATE / 2);
  const employeeMedicare = salary * (MEDICARE_RATE / 2);
  const additionalMedicare = Math.max(0, salary - (fs === 'married' ? 250000 : 200000)) * ADDITIONAL_MEDICARE_RATE;
  const employeeFICA = employeeSS + employeeMedicare + additionalMedicare;
  const employerFICA = employeeSS + employeeMedicare;
  const totalFICA = employeeFICA + employerFICA;
  const scorpTaxable = Math.max(0, ni - deduction - employerFICA);
  const scorpFedTax = federalIncomeTax(scorpTaxable, fs);
  const scorpTotalTax = totalFICA + scorpFedTax;
  const scorpEffectiveRate = ni > 0 ? (scorpTotalTax / ni) * 100 : 0;

  const currentTax = entityType === 'llc_scorp' ? scorpTotalTax : spTotalTax;
  const currentEffectiveRate = entityType === 'llc_scorp' ? scorpEffectiveRate : spEffectiveRate;
  const savings = spTotalTax - scorpTotalTax;

  return (
    <div>
      <SectionHeader title="LLC Tax Savings Calculator" subtitle="Compare tax liability across entity types to find your optimal structure" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Net Income ($)</label>
            <input type="number" value={netIncome} onChange={(e) => setNetIncome(e.target.value)}
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
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Current Entity Type</label>
            <select value={entityType} onChange={(e) => setEntityType(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="sole_prop">Sole Proprietorship</option>
              <option value="llc">LLC (Disregarded Entity)</option>
              <option value="llc_scorp">LLC with S-Corp Election</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="📋" label="Current Entity Tax" value={formatCurrency(currentTax)} subtitle={`${formatPercent(currentEffectiveRate)} effective`} />
        <ResultCard icon="🏛️" label="S-Corp LLC Tax" value={formatCurrency(scorpTotalTax)} highlight subtitle={`${formatPercent(scorpEffectiveRate)} effective`} />
        <ResultCard icon="💡" label="Annual Savings" value={formatCurrency(savings)} highlight subtitle={savings > 0 ? 'with S-Corp election' : ''} />
        <ResultCard icon="💰" label="Monthly Savings" value={formatCurrency(savings / 12)} subtitle={savings > 0 ? 'estimated' : ''} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Detailed Comparison</div>
        <ResultRow label="Gross Income" value={formatCurrency(ni)} />
        <ResultRow label="Sole Prop / LLC — SE Tax" value={formatCurrency(se.total)} />
        <ResultRow label="Sole Prop / LLC — Federal Tax" value={formatCurrency(spFedTax)} />
        <ResultRow label="Sole Prop / LLC — Total Tax" value={formatCurrency(spTotalTax)} />
        <ResultRow label="S-Corp — Salary (60%, $50K max)" value={formatCurrency(salary)} />
        <ResultRow label="S-Corp — Distribution (40%)" value={formatCurrency(distribution)} />
        <ResultRow label="S-Corp — Total FICA" value={formatCurrency(totalFICA)} />
        <ResultRow label="S-Corp — Federal Tax" value={formatCurrency(scorpFedTax)} />
        <ResultRow label="S-Corp — Total Tax" value={formatCurrency(scorpTotalTax)} />
        <ResultRow label="Tax Savings" value={formatCurrency(savings)} bold />
      </div>

      {entityType === 'sole_prop' && (
        <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
          <p className="text-sm" style={{ color: 'var(--brand)' }}>
            Switching from Sole Prop to LLC + S-Corp could save <strong>{formatCurrency(savings)}</strong>/year. FICA is only paid on the 60% salary ({formatCurrency(salary)}), not the full {formatCurrency(ni)}.
          </p>
        </div>
      )}

      {entityType === 'llc' && (
        <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
          <p className="text-sm" style={{ color: 'var(--brand)' }}>
            Your LLC as a disregarded entity pays the same tax as a sole prop. Electing S-Corp status could save <strong>{formatCurrency(savings)}</strong>/year.
          </p>
        </div>
      )}

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> Sole proprietorships and single-member LLCs (disregarded entities) pay SE tax on all net income. LLCs with S-Corp election pay FICA only on reasonable salary (assumed 60% here). Does not include additional S-Corp costs: payroll processing ($500–$1,500/yr), state filing fees, or potential state-level taxes. Consult a CPA before changing entity type.</p>
      </div>
    </div>
  );
}
