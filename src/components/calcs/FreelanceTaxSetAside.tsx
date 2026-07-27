'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { selfEmploymentTax, federalIncomeTax, getStandardDeduction, formatCurrency, formatPercent } from '@/lib/tax';

const STATE_TAX: Record<string, { label: string; rate: number }> = {
  none: { label: 'No State Tax', rate: 0 },
  low: { label: 'Low-Tax (TX/FL/NV/WA)', rate: 0.04 },
  medium: { label: 'Medium-Tax (CO/AZ/NC)', rate: 0.06 },
  high: { label: 'High-Tax (CA/NY/NJ/MA/OR)', rate: 0.08 },
};

export default function FreelanceTaxSetAsideCalc() {
  const [netIncome, setNetIncome] = useState('80000');
  const [filingStatus, setFilingStatus] = useState('single');
  const [state, setState] = useState('none');

  const ni = parseFloat(netIncome) || 0;
  const fs = filingStatus as 'single' | 'married';

  const se = selfEmploymentTax(ni, fs);
  const deduction = getStandardDeduction(fs);
  const seDeduction = se.total / 2;
  const taxableIncome = Math.max(0, ni - deduction - seDeduction);
  const fedTax = federalIncomeTax(taxableIncome, fs);
  const stateRate = STATE_TAX[state].rate;
  const stateTax = ni * stateRate;
  const totalTax = se.total + fedTax + stateTax;
  const effectiveRate = ni > 0 ? (totalTax / ni) * 100 : 0;
  const perDollar = ni > 0 ? totalTax / ni : 0;

  return (
    <div>
      <SectionHeader title="How Much to Set Aside for Taxes" subtitle="Estimate your total tax set aside as a freelancer" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Annual Net Income ($)
          </label>
          <input
            type="number"
            value={netIncome}
            onChange={(e) => setNetIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="80000"
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
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            State
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            {Object.entries(STATE_TAX).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="🧾" label="Total Set Aside" value={formatCurrency(totalTax)} highlight />
        <ResultCard icon="📊" label="Set Aside Percentage" value={formatPercent(effectiveRate)} highlight />
        <ResultCard icon="🏦" label="Self Employment Tax" value={formatCurrency(se.total)} />
        <ResultCard icon="💼" label="Federal Income Tax" value={formatCurrency(fedTax)} />
        <ResultCard icon="🏛️" label="State Tax" value={formatCurrency(stateTax)} />
        <ResultCard icon="💰" label="Amount Per Dollar" value={`$${perDollar.toFixed(3)}`} subtitle="Set aside per $1 earned" />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Net Income" value={formatCurrency(ni)} />
        <ResultRow label="SE Tax (15.3% on 92.35%)" value={formatCurrency(se.total)} />
        <ResultRow label="Standard Deduction" value={`-${formatCurrency(deduction)}`} />
        <ResultRow label="50% SE Tax Deduction" value={`-${formatCurrency(seDeduction)}`} />
        <ResultRow label="Federal Taxable Income" value={formatCurrency(taxableIncome)} />
        <ResultRow label="Federal Income Tax" value={formatCurrency(fedTax)} />
        <ResultRow label={`State Tax (${STATE_TAX[state].label})`} value={formatCurrency(stateTax)} />
        <ResultRow label="Total Tax" value={formatCurrency(totalTax)} bold />
        <ResultRow label="Estimated Take Home" value={formatCurrency(ni - totalTax)} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          Set aside approximately <strong>{formatPercent(effectiveRate)}</strong> of your income for taxes — that&apos;s <strong>${perDollar.toFixed(3)}</strong> of every dollar earned.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Note:</strong> Uses 2026 IRS brackets. SE tax is 15.3% on 92.35% of net self employment income. Federal tax is calculated after subtracting the standard deduction and 50% of SE tax. State tax estimates are simplified flat rates by tier. Does not include QBI deduction or itemized deductions.</p>
      </div>
    </div>
  );
}
