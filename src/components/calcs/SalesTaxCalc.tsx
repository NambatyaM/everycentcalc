'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

const STATE_RATES: Record<string, number> = {
  Alabama: 9.29,
  Alaska: 1.82,
  Arizona: 8.2,
  Arkansas: 9.48,
  California: 8.85,
  Colorado: 7.76,
  Connecticut: 6.35,
  Delaware: 0,
  Florida: 7.05,
  Georgia: 8.3,
  Hawaii: 4.44,
  Idaho: 6.01,
  Illinois: 8.65,
  Indiana: 7,
  Iowa: 6.82,
  Kansas: 8.67,
  Kentucky: 6,
  Louisiana: 9.55,
  Maine: 5.5,
  Maryland: 6,
  Massachusetts: 6.25,
  Michigan: 6,
  Minnesota: 7.89,
  Mississippi: 7.08,
  Missouri: 8.34,
  Montana: 0,
  Nebraska: 6.89,
  Nevada: 8.37,
  'New Hampshire': 0,
  'New Jersey': 6.6,
  'New Mexico': 7.73,
  'New York': 8.52,
  'North Carolina': 6.95,
  'North Dakota': 6.94,
  Ohio: 7.14,
  Oklahoma: 8.95,
  Oregon: 0,
  Pennsylvania: 6.34,
  'Rhode Island': 7,
  'South Carolina': 7.43,
  'South Dakota': 6.66,
  Tennessee: 9.55,
  Texas: 8.2,
  Utah: 7.18,
  Vermont: 6.24,
  Virginia: 5.72,
  Washington: 9.38,
  'West Virginia': 6.54,
  Wisconsin: 5.49,
  Wyoming: 5.33,
};

export default function SalesTaxCalc() {
  const [state, setState] = useState('California');
  const [customRate, setCustomRate] = useState('');
  const [amount, setAmount] = useState('1000');
  const [mode, setMode] = useState<'add' | 'reverse'>('add');

  const baseAmount = parseFloat(amount) || 0;
  const rate = customRate !== '' ? parseFloat(customRate) || 0 : STATE_RATES[state] || 0;

  const taxAmount = mode === 'add' ? baseAmount * (rate / 100) : 0;
  const total = mode === 'add' ? baseAmount + taxAmount : 0;

  const rateInvalid = Math.abs(1 + rate / 100) < 0.0001;
  const preTax = mode === 'reverse' && !rateInvalid ? baseAmount / (1 + rate / 100) : 0;
  const reverseTax = mode === 'reverse' ? baseAmount - preTax : 0;

  return (
    <div>
      <SectionHeader title="Sales Tax Calculator" subtitle="Add sales tax to a price, or reverse-calculate the pre-tax amount" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-state">State</label>
            <select id="calc-state"  value={state} onChange={(e) => { setState(e.target.value); setCustomRate(''); }}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              {Object.keys(STATE_RATES).sort().map((s) => (
                <option key={s} value={s}>{s} ({STATE_RATES[s].toFixed(2)}%)</option>
              ))}
            </select>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>State + average local rate. Enter a custom rate below to override.</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-custom-tax-rate">Custom Tax Rate (%)</label>
            <input id="calc-custom-tax-rate"  type="number" value={customRate} onChange={(e) => setCustomRate(e.target.value)}
              placeholder="Optional"
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              {mode === 'reverse' ? 'Total Paid (Tax Included) ($)' : 'Price Before Tax ($)'}
            </label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-mode">Mode</label>
            <select id="calc-mode"  value={mode} onChange={(e) => setMode(e.target.value as 'add' | 'reverse')}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="add">Add tax to a price</option>
              <option value="reverse">Find pre-tax price from total</option>
            </select>
          </div>
        </div>
      </div>

      {mode === 'add' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <ResultCard icon="🧾" label="Sales Tax Amount" value={formatCurrency(taxAmount)} highlight />
          <ResultCard icon="💵" label="Total After Tax" value={formatCurrency(total)} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <ResultCard icon="🏷️" label="Price Before Tax" value={formatCurrency(preTax)} highlight />
          <ResultCard icon="🧾" label="Tax Included" value={formatCurrency(reverseTax)} />
        </div>
      )}

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        {mode === 'add' ? (
          <>
            <ResultRow label="Price Before Tax" value={formatCurrency(baseAmount)} />
            <ResultRow label={`Tax Rate (${customRate !== '' ? 'Custom' : state})`} value={`${rate.toFixed(2)}%`} />
            <ResultRow label="Sales Tax Amount" value={formatCurrency(taxAmount)} bold />
            <ResultRow label="Total After Tax" value={formatCurrency(total)} bold />
          </>
        ) : (
          <>
            <ResultRow label="Total Paid (Tax Included)" value={formatCurrency(baseAmount)} />
            <ResultRow label={`Tax Rate (${customRate !== '' ? 'Custom' : state})`} value={`${rate.toFixed(2)}%`} />
            <ResultRow label="Price Before Tax" value={formatCurrency(preTax)} bold />
            <ResultRow label="Tax Included" value={formatCurrency(reverseTax)} bold />
          </>
        )}
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Rates shown are 2025 state averages including typical local sales taxes (state rate plus average county/city rates), based on Tax Foundation data. Five states have no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. For exact rates at checkout, check your city and county on your state revenue department site.</p>
      </div>
    </div>
  );
}
