'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency, formatPercent } from '@/lib/tax';

export default function RevenueGrowth() {
  const [currentRevenue, setCurrentRevenue] = useState('10000');
  const [growthRate, setGrowthRate] = useState('10');
  const [projectionMonths, setProjectionMonths] = useState('12');
  const [revenuePerCustomer, setRevenuePerCustomer] = useState('100');

  const monthlyRev = parseFloat(currentRevenue) || 0;
  const rate = (parseFloat(growthRate) || 0) / 100;
  const monthsInput = parseInt(projectionMonths);
  const months = Math.max(0, Math.min(isNaN(monthsInput) ? 12 : monthsInput, 60));
  const rpc = parseFloat(revenuePerCustomer) || 0;

  let totalRevenue = 0;
  let month12Rev = monthlyRev;
  const monthData: { month: number; revenue: number }[] = [];

  for (let i = 1; i <= months; i++) {
    const rev = monthlyRev * Math.pow(1 + rate, i);
    if (i === months) month12Rev = rev;
    totalRevenue += rev;
    monthData.push({ month: i, revenue: rev });
  }

  const growthMultiple = monthlyRev > 0 ? month12Rev / monthlyRev : 0;
  const newCustomersNeeded = rpc > 0 ? Math.ceil((month12Rev - monthlyRev) / rpc) : 0;

  const keyMonths = [3, 6, 9, 12].filter((m) => m <= months);

  return (
    <div>
      <SectionHeader title="Revenue Growth Calculator" subtitle="Project monthly revenue growth and calculate customers needed to hit targets" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Current Monthly Revenue ($)</label>
            <input type="number" value={currentRevenue} onChange={(e) => setCurrentRevenue(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Growth Rate (%)</label>
            <input type="number" value={growthRate} onChange={(e) => setGrowthRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Projection Months</label>
            <input type="number" value={projectionMonths} onChange={(e) => setProjectionMonths(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Revenue Per Customer ($)</label>
            <input type="number" value={revenuePerCustomer} onChange={(e) => setRevenuePerCustomer(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📈" label={`Month ${months} Revenue`} value={formatCurrency(month12Rev)} highlight subtitle={`${formatPercent(rate * 100)}/mo growth`} />
        <ResultCard icon="💰" label="Total Revenue" value={formatCurrency(totalRevenue)} subtitle={`${months}-month total`} />
        <ResultCard icon="🚀" label="Growth Multiple" value={`${growthMultiple.toFixed(2)}x`} highlight subtitle="Revenue multiplier" />
        <ResultCard icon="👥" label="New Customers Needed" value={`${newCustomersNeeded}`} subtitle="For target revenue" />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Key Milestones</div>
        {keyMonths.map((m) => {
          const rev = monthlyRev * Math.pow(1 + rate, m);
          return <ResultRow key={m} label={`Month ${m}`} value={formatCurrency(rev)} />;
        })}
        <ResultRow label={`Month ${months} (Final)`} value={formatCurrency(month12Rev)} bold />
        <ResultRow label="Cumulative Revenue" value={formatCurrency(totalRevenue)} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Monthly Projection</div>
        {monthData.map((d) => (
          <ResultRow key={d.month} label={`Month ${d.month}`} value={formatCurrency(d.revenue)} />
        ))}
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> Assumes constant compound monthly growth rate. Actual revenue growth is rarely linear and may fluctuate seasonally. Customer calculation assumes constant revenue per customer. Use for baseline projections only — consult financial models for complex growth scenarios.</p>
      </div>
    </div>
  );
}
