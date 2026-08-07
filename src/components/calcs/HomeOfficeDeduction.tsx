'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function HomeOfficeDeduction() {
  const [totalSqFt, setTotalSqFt] = useState('1000');
  const [officeSqFt, setOfficeSqFt] = useState('150');
  const [annualExpenses, setAnnualExpenses] = useState('24000');
  const [method, setMethod] = useState('simplified');
  const [marginalRate, setMarginalRate] = useState('22');

  const parseWithDefault = (v: string, d: number) => {
    const n = parseFloat(v);
    return isNaN(n) ? d : n;
  };

  const total = Math.max(0, parseWithDefault(totalSqFt, 1000));
  const office = Math.max(0, parseWithDefault(officeSqFt, 150));
  const expenses = Math.max(0, parseWithDefault(annualExpenses, 24000));
  const rate = Math.max(0, parseWithDefault(marginalRate, 22));

  const simplified = Math.min(office, 300) * 5;
  const regular = total > 0 ? Math.min(1, office / total) * expenses : 0;
  const deduction = method === 'simplified' ? simplified : regular;
  const taxSavings = deduction * (rate / 100);
  const monthlyDeduction = deduction / 12;

  return (
    <div>
      <SectionHeader title="Home Office Deduction Calculator" subtitle="Estimate your deduction using the simplified or regular method" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Total Home Square Footage
            </label>
            <input type="number" value={totalSqFt} onChange={(e) => setTotalSqFt(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Office Square Footage
            </label>
            <input type="number" value={officeSqFt} onChange={(e) => setOfficeSqFt(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Total Annual Home Expenses ($)
          </label>
          <input type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Calculation Method
            </label>
            <select value={method} onChange={(e) => setMethod(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="simplified">Simplified ($5/sq ft, max 300 sq ft)</option>
              <option value="regular">Regular (actual expenses)</option>
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
        <ResultCard icon="🏠" label="Deduction Amount" value={`$${deduction.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="💰" label="Tax Savings" value={`$${taxSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📅" label="Monthly Deduction" value={`$${monthlyDeduction.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Method" value={method === 'simplified' ? 'Simplified' : 'Regular'} />
        {method === 'simplified' ? (
          <>
            <ResultRow label="Office Size" value={`${Math.min(office, 300)} sq ft (max 300)`} />
            <ResultRow label="Rate per Sq Ft" value="$5.00" />
            <ResultRow label="Deduction" value={`$${deduction.toLocaleString()}`} bold />
          </>
        ) : (
          <>
            <ResultRow label="Office / Total" value={`${office} / ${total} = ${total > 0 ? Math.min(100, (office / total) * 100).toFixed(1) : 0}%`} />
            <ResultRow label="Annual Home Expenses" value={`$${expenses.toLocaleString()}`} />
            <ResultRow label="Deduction" value={`$${deduction.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
          </>
        )}
        <ResultRow label="Marginal Tax Rate" value={`${rate}%`} />
        <ResultRow label="Tax Savings" value={`$${taxSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Simplified method: $5/sq ft up to 300 sq ft ($1,500 max). Regular method: actual expenses proportional to office space (rent/mortgage interest, utilities, insurance, repairs). Must use the space regularly and exclusively for business. Keep records of your home office measurements and expenses.</p>
      </div>
    </div>
  );
}
