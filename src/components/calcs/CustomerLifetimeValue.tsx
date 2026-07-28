'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function CustomerLifetimeValueCalc() {
  const [avgOrder, setAvgOrder] = useState('100');
  const [frequency, setFrequency] = useState('4');
  const [lifespan, setLifespan] = useState('3');
  const [margin, setMargin] = useState('50');

  const ao = parseFloat(avgOrder) || 0;
  const fq = parseFloat(frequency) || 0;
  const ls = parseFloat(lifespan) || 0;
  const mg = parseFloat(margin) || 0;

  const clvRevenue = ao * fq * ls;
  const clvProfit = clvRevenue * (mg / 100);
  const ltvToCac = clvRevenue > 0 ? clvRevenue / (clvRevenue * 0.33) : 0;

  const totalPurchases = fq * ls;

  return (
    <div>
      <SectionHeader title="Customer Lifetime Value Calculator" subtitle="What is a customer worth over their entire relationship with you?" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Average Order Value ($)</label>
            <input type="number" value={avgOrder} onChange={(e) => setAvgOrder(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Purchases per Year</label>
            <input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Customer Lifespan (years)</label>
            <input type="number" value={lifespan} onChange={(e) => setLifespan(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Profit Margin (%)</label>
            <input type="number" value={margin} onChange={(e) => setMargin(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💎" label="CLV (Revenue)" value={`$${clvRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="💰" label="CLV (Profit)" value={`$${clvProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="🛒" label="Total Purchases" value={totalPurchases.toFixed(0)} />
        <ResultCard icon="📊" label="Revenue per Purchase" value={`$${ao.toFixed(2)}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Average Order Value" value={`$${ao.toFixed(2)}`} />
        <ResultRow label="Purchases per Year" value={fq.toFixed(1)} />
        <ResultRow label="Customer Lifespan" value={`${ls.toFixed(0)} years`} />
        <ResultRow label="Total Purchases Over Lifetime" value={totalPurchases.toFixed(0)} />
        <ResultRow label="Gross Revenue per Customer" value={`$${clvRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Profit Margin" value={`${mg.toFixed(0)}%`} />
        <ResultRow label="Profit per Customer" value={`$${clvProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          Each customer is worth <strong>${clvRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong> in revenue and <strong>${clvProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong> in profit. A healthy business spends no more than one third of CLV on acquisition — meaning your target CAC should be around <strong>$${(clvRevenue / 3).toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>This is a simplified CLV model using average order value, purchase frequency, and customer lifespan. For subscription businesses, use: CLV = ARPU / Churn Rate. For more accuracy, factor in discount rate, retention curves, and varying order values over time.</p>
      </div>
    </div>
  );
}
