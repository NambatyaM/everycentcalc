'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { selfEmploymentTax, federalIncomeTax, getStandardDeduction, formatCurrency, formatPercent } from '@/lib/tax';

export default function FreelancerEffectiveTaxRate() {
  const [grossIncome, setGrossIncome] = useState('100000');
  const [businessExpenses, setBusinessExpenses] = useState('5000');
  const [filingStatus, setFilingStatus] = useState('single');

  const gross = parseFloat(grossIncome) || 0;
  const expenses = parseFloat(businessExpenses) || 0;
  const fs = filingStatus as 'single' | 'married';

  const netSEIncome = Math.max(0, gross - expenses);
  const se = selfEmploymentTax(netSEIncome, fs);
  const deduction = getStandardDeduction(fs);
  const seDeduction = se.total / 2;
  const taxableIncome = Math.max(0, netSEIncome - deduction - seDeduction);
  const fedTax = federalIncomeTax(taxableIncome, fs);
  const totalTax = se.total + fedTax;
  const effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;
  const takeHome = netSEIncome - totalTax;

  return (
    <div>
      <SectionHeader title="Freelancer Effective Tax Rate Calculator" subtitle="See exactly what percentage of your gross income goes to taxes" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-gross-income">
            Gross Income ($)
          </label>
          <input id="calc-gross-income"  type="number" value={grossIncome} onChange={(e) => setGrossIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-business-expenses">
            Business Expenses ($)
          </label>
          <input id="calc-business-expenses"  type="number" value={businessExpenses} onChange={(e) => setBusinessExpenses(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-filing-status">
            Filing Status
          </label>
          <select id="calc-filing-status"  value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📊" label="Effective Tax Rate" value={formatPercent(effectiveRate)} highlight />
        <ResultCard icon="🧾" label="Total Tax" value={formatCurrency(totalTax)} highlight />
        <ResultCard icon="💰" label="Take Home Pay" value={formatCurrency(takeHome)} highlight />
        <ResultCard icon="🏛️" label="SE Tax" value={formatCurrency(se.total)} />
        <ResultCard icon="📋" label="Federal Income Tax" value={formatCurrency(fedTax)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Gross Income" value={formatCurrency(gross)} />
        <ResultRow label="Business Expenses" value={`-${formatCurrency(expenses)}`} />
        <ResultRow label="Net SE Income" value={formatCurrency(netSEIncome)} />
        <ResultRow label="Taxable SE Income (92.35%)" value={formatCurrency(se.taxable)} />
        <ResultRow label="Standard Deduction" value={`-${formatCurrency(deduction)}`} />
        <ResultRow label="50% SE Tax Deduction" value={`-${formatCurrency(seDeduction)}`} />
        <ResultRow label="Taxable Income" value={formatCurrency(taxableIncome)} />
        <ResultRow label="Self Employment Tax" value={formatCurrency(se.total)} />
        <ResultRow label="Federal Income Tax" value={formatCurrency(fedTax)} />
        <ResultRow label="Total Tax" value={formatCurrency(totalTax)} bold />
        <ResultRow label="Take Home Pay" value={formatCurrency(takeHome)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses 2026 IRS brackets and standard deduction ($16,100 single / $32,200 MFJ). Self employment tax applies to 92.35% of net SE income (12.4% Social Security up to $184,500 + 2.9% Medicare + 0.9% Additional Medicare above threshold). The 50% SE tax deduction is applied before federal income tax. Does not include state taxes or QBI deduction.</p>
      </div>
    </div>
  );
}
