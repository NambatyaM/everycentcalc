'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { selfEmploymentTax, federalIncomeTax, STANDARD_DEDUCTION_2026, formatCurrency } from '@/lib/tax';

export default function QuarterlyTaxCalc() {
  const [annualIncome, setAnnualIncome] = useState('80000');
  const [otherIncome, setOtherIncome] = useState('0');
  const [filingStatus, setFilingStatus] = useState('single');

  const ai = parseFloat(annualIncome) || 0;
  const oi = parseFloat(otherIncome) || 0;

  const totalIncome = ai + oi;
  const se = selfEmploymentTax(ai);
  const deduction = filingStatus === 'married' ? 29200 : STANDARD_DEDUCTION_2026;
  const taxableIncome = Math.max(0, totalIncome - deduction);
  const fedTax = federalIncomeTax(taxableIncome);
  const totalTax = se.total + fedTax;
  const quarterly = totalTax / 4;

  return (
    <div>
      <SectionHeader title="Quarterly Estimated Tax Calculator" subtitle="Calculate your IRS quarterly payment to avoid underpayment penalties" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Annual Freelance / Self-Employment Income ($)
          </label>
          <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Other Income (W-2 salary, interest, etc.) ($)
          </label>
          <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Filing Status
          </label>
          <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="📅" label="Quarterly Payment" value={`$${quarterly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="🧾" label="Annual Total Tax" value={`$${totalTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="🏦" label="Self-Employment Tax" value={`$${se.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📊" label="Federal Income Tax" value={`$${fedTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Q1 (Apr 15)" value={`$${quarterly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Q2 (Jun 16)" value={`$${quarterly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Q3 (Sep 15)" value={`$${quarterly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Q4 (Jan 15)" value={`$${quarterly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm font-medium" style={{ color: 'var(--brand)' }}>
          Safe Harbor Tip: Pay 100% of last year&apos;s total tax (110% if AGI &gt; $150K) divided by 4 to avoid any underpayment penalty.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses 2026 single-filer brackets with standard deduction. SE tax is only on freelance income. Other income is taxed at combined rates. Does not include state taxes or QBI deduction. Consult a tax professional.</p>
      </div>
    </div>
  );
}
