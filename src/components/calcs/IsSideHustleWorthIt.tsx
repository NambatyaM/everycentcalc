'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function IsSideHustleWorthItCalc() {
  const [revenue, setRevenue] = useState('3000');
  const [hours, setHours] = useState('40');
  const [expenses, setExpenses] = useState('200');
  const [taxRate, setTaxRate] = useState('30');

  const rev = parseFloat(revenue) || 0;
  const hrs = parseFloat(hours) || 0;
  const exp = parseFloat(expenses) || 0;
  const tax = parseFloat(taxRate) || 0;

  const grossHourlyRate = hrs > 0 ? rev / hrs : 0;
  const taxes = rev * (tax / 100);
  const netProfit = rev - exp - taxes;
  const netHourlyRate = hrs > 0 ? netProfit / hrs : 0;
  const monthlyTakeHome = netProfit;
  const profitMargin = rev > 0 ? (netProfit / rev) * 100 : 0;
  const annualProjection = netProfit * 12;

  let verdict: string;
  let verdictColor: string;
  if (netHourlyRate >= 15) {
    verdict = 'Worth it';
    verdictColor = 'var(--brand)';
  } else if (netHourlyRate >= 10) {
    verdict = 'Marginal';
    verdictColor = 'var(--warning, #f59e0b)';
  } else {
    verdict = 'Not worth it';
    verdictColor = 'var(--danger, #ef4444)';
  }

  return (
    <div>
      <SectionHeader title="Is My Side Hustle Worth It Calculator" subtitle="Determine if your side hustle is actually worth your time" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Side Hustle Revenue ($)</label>
          <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Hours Worked</label>
          <input type="number" value={hours} onChange={(e) => setHours(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Expenses ($)</label>
            <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Tax Rate (% to set aside)</label>
            <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="⏱️" label="Net Hourly Rate" value={`$${netHourlyRate.toFixed(2)}`} highlight />
        <ResultCard icon="💰" label="Monthly Take-Home" value={`$${monthlyTakeHome.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📊" label="Profit Margin" value={`${profitMargin.toFixed(1)}%`} />
        <ResultCard icon="🏦" label="Annual Projection" value={`$${annualProjection.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Gross Revenue" value={`$${rev.toLocaleString()}`} />
        <ResultRow label="Monthly Hours" value={hrs.toString()} />
        <ResultRow label="Gross Hourly Rate" value={`$${grossHourlyRate.toFixed(2)}`} />
        <ResultRow label="− Expenses" value={`$${exp.toLocaleString()}`} />
        <ResultRow label="− Taxes Set Aside" value={`$${taxes.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="= Net Profit" value={`$${netProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Net Hourly Rate" value={`$${netHourlyRate.toFixed(2)}`} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: verdictColor }}>
        <p className="text-sm font-medium" style={{ color: verdictColor }}>
          Verdict: <strong>{verdict}</strong> — Your side hustle earns <strong>${netHourlyRate.toFixed(2)}/hour</strong> after taxes and expenses.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>The standard tax rate is 30% to cover self-employment tax (15.3%) and federal income tax. The $15/hr benchmark is roughly equivalent to a minimum wage job. Consider whether the flexibility and growth potential of your side hustle justifies a lower effective rate.</p>
      </div>
    </div>
  );
}
