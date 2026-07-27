'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { selfEmploymentTax, federalIncomeTax, getStandardDeduction, formatCurrency, formatPercent } from '@/lib/tax';

export default function IncomeTax1099() {
  const [income1099, setIncome1099] = useState('80000');
  const [w2Income, setW2Income] = useState('0');
  const [preTaxDeductions, setPreTaxDeductions] = useState('0');
  const [filingStatus, setFilingStatus] = useState('single');

  const income = parseFloat(income1099) || 0;
  const w2 = parseFloat(w2Income) || 0;
  const pretax = parseFloat(preTaxDeductions) || 0;
  const fs = filingStatus as 'single' | 'married';

  const totalGross = income + w2;
  const se = selfEmploymentTax(income, fs);
  const deduction = getStandardDeduction(fs);
  const seDeduction = se.total / 2;
  const taxableIncome = Math.max(0, totalGross - deduction - seDeduction - pretax);
  const fedTax = federalIncomeTax(taxableIncome, fs);
  const totalTax = se.total + fedTax;
  const effectiveRate = totalGross > 0 ? (totalTax / totalGross) * 100 : 0;
  const takeHome = totalGross - totalTax;

  return (
    <div>
      <SectionHeader title="1099 Income Tax Calculator" subtitle="Calculate total tax on self-employment and W-2 income combined" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            1099 Self-Employment Income ($)
          </label>
          <input type="number" value={income1099} onChange={(e) => setIncome1099(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Other W-2 Income ($)
          </label>
          <input type="number" value={w2Income} onChange={(e) => setW2Income(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Pre-Tax Deductions ($)
            </label>
            <input type="number" value={preTaxDeductions} onChange={(e) => setPreTaxDeductions(e.target.value)}
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🧾" label="Total Tax" value={formatCurrency(totalTax)} highlight />
        <ResultCard icon="📊" label="Effective Tax Rate" value={formatPercent(effectiveRate)} highlight />
        <ResultCard icon="💰" label="Take-Home Pay" value={formatCurrency(takeHome)} highlight />
        <ResultCard icon="🏛️" label="SE Tax" value={formatCurrency(se.total)} />
        <ResultCard icon="📋" label="Federal Income Tax" value={formatCurrency(fedTax)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="1099 Income" value={formatCurrency(income)} />
        <ResultRow label="W-2 Income" value={formatCurrency(w2)} />
        <ResultRow label="Total Gross Income" value={formatCurrency(totalGross)} />
        <ResultRow label="Taxable SE Income (92.35%)" value={formatCurrency(se.taxable)} />
        <ResultRow label="Standard Deduction" value={`-${formatCurrency(deduction)}`} />
        <ResultRow label="50% SE Tax Deduction" value={`-${formatCurrency(seDeduction)}`} />
        <ResultRow label="Pre-Tax Deductions" value={`-${formatCurrency(pretax)}`} />
        <ResultRow label="Taxable Income" value={formatCurrency(taxableIncome)} />
        <ResultRow label="Self-Employment Tax" value={formatCurrency(se.total)} />
        <ResultRow label="Federal Income Tax" value={formatCurrency(fedTax)} />
        <ResultRow label="Total Tax" value={formatCurrency(totalTax)} bold />
        <ResultRow label="Take-Home Pay" value={formatCurrency(takeHome)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses 2026 IRS brackets and standard deduction ($16,100 single / $32,200 MFJ). SE tax applies only to 1099 income. W-2 income is not subject to SE tax (employer pays half of FICA). The 50% SE tax deduction and pre-tax deductions are applied before calculating federal income tax. Does not include state taxes, QBI deduction, or itemized deductions.</p>
      </div>
    </div>
  );
}
