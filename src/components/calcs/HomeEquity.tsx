'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function HomeEquityCalc() {
  const [homeValue, setHomeValue] = useState('400000');
  const [originalPrice, setOriginalPrice] = useState('300000');
  const [mortgageBalance, setMortgageBalance] = useState('220000');
  const [improvements, setImprovements] = useState('20000');

  const value = parseFloat(homeValue) || 0;
  const original = parseFloat(originalPrice) || 0;
  const balance = parseFloat(mortgageBalance) || 0;
  const improve = parseFloat(improvements) || 0;

  const equity = value - balance;
  const equityPct = value > 0 ? (equity / value) * 100 : 0;
  const cltv = value > 0 ? (balance / value) * 100 : 0;
  const helocPotential = Math.max(0, value * 0.8 - balance);
  const totalGain = value - original - improve;

  return (
    <div>
      <SectionHeader title="Home Equity Calculator" subtitle="Calculate your current equity position and borrowing potential" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Current Home Value ($)</label>
          <input type="number" value={homeValue} onChange={(e) => setHomeValue(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Original Purchase Price ($)</label>
            <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Current Mortgage Balance ($)</label>
            <input type="number" value={mortgageBalance} onChange={(e) => setMortgageBalance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Home Improvement Costs ($)</label>
          <input type="number" value={improvements} onChange={(e) => setImprovements(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🏠" label="Total Equity" value={`$${equity.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📊" label="Equity %" value={`${equityPct.toFixed(1)}%`} highlight />
        <ResultCard icon="🏦" label="CLTV Ratio" value={`${cltv.toFixed(1)}%`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💳" label="HELOC Potential (80% LTV)" value={`$${helocPotential.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📈" label="Total Gain from Purchase" value={`$${totalGain.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Home Value" value={`$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Original Purchase Price" value={`$${original.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Mortgage Balance" value={`$${balance.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Improvement Costs" value={`$${improve.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Equity" value={`$${equity.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Equity Percentage" value={`${equityPct.toFixed(1)}%`} bold />
        <ResultRow label="CLTV (Loan to Value)" value={`${cltv.toFixed(1)}%`} />
        <ResultRow label="HELOC Available (80%)" value={`$${helocPotential.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>CLTV (Combined Loan to Value) ratio represents your mortgage balance relative to home value. Lower CLTV = more equity. HELOC potential assumes 80% maximum LTV. Does not account for closing costs, PMI, or other liens. Consult a lender for actual HELOC qualification.</p>
      </div>
    </div>
  );
}
