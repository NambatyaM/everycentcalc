'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { selfEmploymentTax, federalIncomeTax, getStandardDeduction } from '@/lib/tax';

export default function QuarterlyTaxCalc() {
  const [annualIncome, setAnnualIncome] = useState('80000');
  const [otherIncome, setOtherIncome] = useState('0');
  const [w2Withholding, setW2Withholding] = useState('0');
  const [filingStatus, setFilingStatus] = useState('single');

  const ai = parseFloat(annualIncome) || 0;
  const oi = parseFloat(otherIncome) || 0;
  const withheld = parseFloat(w2Withholding) || 0;
  const fs = filingStatus as 'single' | 'married';

  const totalIncome = ai + oi;
  const se = selfEmploymentTax(ai, fs, oi);
  const deduction = getStandardDeduction(fs);
  const seDeduction = se.total / 2;
  const taxableIncome = Math.max(0, totalIncome - deduction - seDeduction);
  const fedTax = federalIncomeTax(taxableIncome, fs);
  const totalTax = se.total + fedTax;
  const remainingTax = Math.max(0, totalTax - withheld);
  const quarterly = remainingTax / 4;

  return (
    <div>
      <SectionHeader title="Quarterly Estimated Tax Calculator" subtitle="Calculate your IRS quarterly payment to avoid underpayment penalties" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Annual Freelance / Self Employment Income ($)
          </label>
          <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Other W-2 Income (reduces SE tax cap) ($)
          </label>
          <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            W-2 Federal Withholding Already Paid ($)
          </label>
          <input type="number" value={w2Withholding} onChange={(e) => setW2Withholding(e.target.value)}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="📅" label="Quarterly Payment" value={`$${quarterly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="🧾" label="Annual Total Tax" value={`$${totalTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="🏦" label="Self Employment Tax" value={`$${se.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📊" label="Federal Income Tax" value={`$${fedTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Q1 (Apr 15)" value={`$${quarterly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Q2 (Jun 15)" value={`$${quarterly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Q3 (Sep 15)" value={`$${quarterly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Q4 (Jan 15)" value={`$${quarterly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm font-medium" style={{ color: 'var(--brand)' }}>
          Safe Harbor Tip: Pay 100% of last year&apos;s total tax (110% if AGI &gt; $150K) divided by 4 to avoid any underpayment penalty.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses 2026 IRS brackets and standard deduction ($16,100 single / $32,200 MFJ). SE tax is only on freelance income. The 50% SE tax deduction has been applied before calculating federal income tax. W-2 federal withholding is subtracted before dividing the remaining tax into quarterly payments. Does not include state taxes or QBI deduction. Consult a tax professional.</p>
      </div>
    </div>
  );
}
