'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { selfEmploymentTax, federalIncomeTax, getStandardDeduction } from '@/lib/tax';

export default function SideHustleTaxCalc() {
  const [w2Income, setW2Income] = useState('50000');
  const [sideIncome, setSideIncome] = useState('20000');
  const [filingStatus, setFilingStatus] = useState('single');

  const w2 = parseFloat(w2Income) || 0;
  const si = parseFloat(sideIncome) || 0;
  const fs = filingStatus as 'single' | 'married';

  const totalIncome = w2 + si;
  const se = selfEmploymentTax(si, fs);
  const deduction = getStandardDeduction(fs);
  const seDeduction = se.total / 2;
  const taxableIncome = Math.max(0, totalIncome - deduction - seDeduction);
  const fedTax = federalIncomeTax(taxableIncome, fs);
  const totalTax = se.total + fedTax;
  const effectiveRate = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;

  // Marginal tax on side income = total tax with side income - tax on W-2 only
  const taxableW2Only = Math.max(0, w2 - deduction);
  const fedTaxW2Only = federalIncomeTax(taxableW2Only, fs);
  const seTaxOnSide = se.total;
  const additionalFedTax = fedTax - fedTaxW2Only;
  const marginalTaxOnSide = seTaxOnSide + additionalFedTax;
  const marginalRate = si > 0 ? (marginalTaxOnSide / si) * 100 : 0;
  const sideTakeHome = si - marginalTaxOnSide;

  return (
    <div>
      <SectionHeader title="Side Hustle Income Tax Calculator" subtitle="Calculate taxes on your side hustle income on top of your W-2 salary" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>W-2 Salary ($)</label>
          <input type="number" value={w2Income} onChange={(e) => setW2Income(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Side Hustle Net Income ($)</label>
          <input type="number" value={sideIncome} onChange={(e) => setSideIncome(e.target.value)}
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
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💼" label="Side Hustle Take-Home" value={`$${Math.max(0, sideTakeHome).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📊" label="Side Income Marginal Rate" value={`${marginalRate.toFixed(0)}%`} highlight />
        <ResultCard icon="🏦" label="Self-Employment Tax" value={`$${se.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📈" label="Additional Federal Tax" value={`$${additionalFedTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="W-2 Salary" value={`$${w2.toLocaleString()}`} />
        <ResultRow label="Side Hustle Income" value={`$${si.toLocaleString()}`} />
        <ResultRow label="Total Gross Income" value={`$${totalIncome.toLocaleString()}`} bold />
        <ResultRow label="Self-Employment Tax" value={`$${se.total.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Additional Federal Tax (marginal)" value={`$${additionalFedTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Tax on Side Hustle" value={`$${marginalTaxOnSide.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Side Hustle Take-Home" value={`$${Math.max(0, sideTakeHome).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Effective Rate on Total Income" value={`${effectiveRate.toFixed(1)}%`} />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          Your side hustle income is taxed at your <strong>marginal rate</strong> — stacked on top of your salary. Set aside approximately <strong>{marginalRate.toFixed(0)}%</strong> of every side hustle dollar for taxes.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses 2026 IRS brackets and standard deduction ($16,100 single / $32,200 MFJ). SE tax applies only to side income. Federal income tax on side income is calculated as the difference between total tax and tax on W-2 alone. The 50% SE tax deduction has been applied. Does not include state taxes or QBI deduction.</p>
      </div>
    </div>
  );
}
