'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { selfEmploymentTax, federalIncomeTax, getStandardDeduction, formatCurrency, formatPercent } from '@/lib/tax';

export default function SelfEmploymentTaxCalc() {
  const [netIncome, setNetIncome] = useState('50000');
  const [filingStatus, setFilingStatus] = useState('single');

  const ni = parseFloat(netIncome) || 0;
  const fs = filingStatus as 'single' | 'married';

  const se = selfEmploymentTax(ni, fs);
  const grossIncome = ni;
  const deduction = getStandardDeduction(fs);
  const seDeduction = se.total / 2;
  const taxableIncome = Math.max(0, grossIncome - deduction - seDeduction);
  const fedTax = federalIncomeTax(taxableIncome, fs);
  const totalTax = se.total + fedTax;
  const effectiveRate = ni > 0 ? (totalTax / ni) * 100 : 0;
  const takeHome = ni - totalTax;

  return (
    <div>
      <SectionHeader title="Self Employment Tax Calculator" subtitle="Calculate your 1099 self employment tax and estimated federal income tax" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Net Self Employment Income ($)
          </label>
          <input
            type="number"
            value={netIncome}
            onChange={(e) => setNetIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="50000"
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
        <ResultCard icon="🧾" label="Total SE Tax" value={formatCurrency(se.total)} highlight />
        <ResultCard icon="📊" label="Effective Tax Rate" value={formatPercent(effectiveRate)} highlight />
        <ResultCard icon="🏦" label="Social Security (12.4%)" value={formatCurrency(se.ss)} />
        <ResultCard icon="🏥" label="Medicare (2.9%)" value={formatCurrency(se.medicare)} />
        {se.additionalMedicare > 0 && (
          <ResultCard icon="🏥" label="Addl Medicare (0.9%)" value={formatCurrency(se.additionalMedicare)} />
        )}
        <ResultCard icon="💵" label="Federal Income Tax" value={formatCurrency(fedTax)} />
        <ResultCard icon="💰" label="Estimated Take Home" value={formatCurrency(takeHome)} highlight />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Gross Income" value={formatCurrency(grossIncome)} />
        <ResultRow label="Taxable SE Income (92.35%)" value={formatCurrency(se.taxable)} />
        <ResultRow label="Standard Deduction" value={`-${formatCurrency(deduction)}`} />
        <ResultRow label="50% SE Tax Deduction" value={`-${formatCurrency(seDeduction)}`} />
        <ResultRow label="Taxable Income" value={formatCurrency(taxableIncome)} />
        <ResultRow label="Self Employment Tax" value={formatCurrency(se.total)} />
        <ResultRow label="Federal Income Tax" value={formatCurrency(fedTax)} />
        <ResultRow label="Total Tax" value={formatCurrency(totalTax)} bold />
        <ResultRow label="Estimated Take Home" value={formatCurrency(takeHome)} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          You can deduct <strong>{formatCurrency(seDeduction)}</strong> (50% of SE tax) from your taxable income on Form 1040 Schedule 1. This has been applied above.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Note:</strong> Uses 2026 IRS brackets and standard deduction ($16,100 single / $32,200 MFJ). Social Security cap: $184,500. Includes 0.9% Additional Medicare Tax on SE income above $200K (single) / $250K (MFJ). Does not include QBI deduction, itemized deductions, or state taxes.</p>
      </div>
    </div>
  );
}