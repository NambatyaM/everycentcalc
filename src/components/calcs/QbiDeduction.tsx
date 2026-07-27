'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { federalIncomeTax, getStandardDeduction, selfEmploymentTax, formatCurrency, formatPercent } from '@/lib/tax';

export default function QbiDeduction() {
  const [qualifiedBusinessIncome, setQualifiedBusinessIncome] = useState('100000');
  const [totalTaxableIncome, setTotalTaxableIncome] = useState('80000');
  const [filingStatus, setFilingStatus] = useState('single');
  const [marginalRate, setMarginalRate] = useState('22');

  const qbi = parseFloat(qualifiedBusinessIncome) || 0;
  const taxableBeforeQBI = parseFloat(totalTaxableIncome) || 0;
  const fs = filingStatus as 'single' | 'married';
  const rate = parseFloat(marginalRate) || 22;

  const qbiDeduction = Math.min(qbi * 0.20, taxableBeforeQBI * 0.20);
  const taxableAfterQBI = Math.max(0, taxableBeforeQBI - qbiDeduction);
  const taxBeforeQBI = federalIncomeTax(taxableBeforeQBI, fs);
  const taxAfterQBI = federalIncomeTax(taxableAfterQBI, fs);
  const taxSavings = taxBeforeQBI - taxAfterQBI;

  return (
    <div>
      <SectionHeader title="Qualified Business Income Deduction Calculator" subtitle="Estimate your Section 199A QBI deduction for pass through business income" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Qualified Business Income ($)
          </label>
          <input type="number" value={qualifiedBusinessIncome} onChange={(e) => setQualifiedBusinessIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Total Taxable Income Before QBI Deduction ($)
          </label>
          <input type="number" value={totalTaxableIncome} onChange={(e) => setTotalTaxableIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Marginal Tax Rate (%)
            </label>
            <input type="number" value={marginalRate} onChange={(e) => setMarginalRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📋" label="QBI Deduction" value={formatCurrency(qbiDeduction)} highlight />
        <ResultCard icon="💰" label="Tax Savings" value={formatCurrency(taxSavings)} highlight />
        <ResultCard icon="📊" label="New Taxable Income" value={formatCurrency(taxableAfterQBI)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Qualified Business Income" value={formatCurrency(qbi)} />
        <ResultRow label="QBI × 20%" value={formatCurrency(qbi * 0.20)} />
        <ResultRow label="Taxable Income Cap (20%)" value={formatCurrency(taxableBeforeQBI * 0.20)} />
        <ResultRow label="QBI Deduction Allowed" value={formatCurrency(qbiDeduction)} bold />
        <ResultRow label="Taxable Income Before QBI" value={formatCurrency(taxableBeforeQBI)} />
        <ResultRow label="Tax Before QBI Deduction" value={formatCurrency(taxBeforeQBI)} />
        <ResultRow label="Tax After QBI Deduction" value={formatCurrency(taxAfterQBI)} />
        <ResultRow label="Tax Savings" value={formatCurrency(taxSavings)} bold />
        <ResultRow label="New Taxable Income" value={formatCurrency(taxableAfterQBI)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>The QBI deduction (Section 199A) allows eligible self employed and small business owners to deduct up to 20% of qualified business income. The deduction is limited to 20% of taxable income (before QBI deduction). The deduction is still available for 2026. Income thresholds and W-2 wage limitations may apply for high income earners. Consult a tax professional for your specific situation.</p>
      </div>
    </div>
  );
}
