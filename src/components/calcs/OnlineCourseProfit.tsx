'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function OnlineCourseProfit() {
  const [coursePrice, setCoursePrice] = useState('197');
  const [monthlySales, setMonthlySales] = useState('30');
  const [platformFeePct, setPlatformFeePct] = useState('10');
  const [adSpend, setAdSpend] = useState('500');
  const [productionCost, setProductionCost] = useState('2000');
  const [otherMonthly, setOtherMonthly] = useState('200');

  const price = parseFloat(coursePrice) || 0;
  const sales = parseFloat(monthlySales) || 0;
  const feePct = parseFloat(platformFeePct) || 0;
  const ads = parseFloat(adSpend) || 0;
  const production = parseFloat(productionCost) || 0;
  const other = parseFloat(otherMonthly) || 0;

  const gross = price * sales;
  const platformFee = gross * (feePct / 100);
  const monthlyProfit = gross - platformFee - ads - other;
  const annualProfit = monthlyProfit * 12;
  const margin = gross > 0 ? (monthlyProfit / gross) * 100 : 0;
  const roi = ads > 0 ? (monthlyProfit / ads) * 100 : 0;
  const annualWithProduction = annualProfit - production;

  return (
    <div>
      <SectionHeader title="Online Course Profit Calculator" subtitle="Estimate your profit from selling online courses" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Course Price ($)</label>
            <input type="number" value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Sales</label>
            <input type="number" value={monthlySales} onChange={(e) => setMonthlySales(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Platform Fee (%)</label>
            <input type="number" value={platformFeePct} onChange={(e) => setPlatformFeePct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Ad Spend per Month ($)</label>
            <input type="number" value={adSpend} onChange={(e) => setAdSpend(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Course Production Cost ($)</label>
            <input type="number" value={productionCost} onChange={(e) => setProductionCost(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Other Monthly Costs ($)</label>
            <input type="number" value={otherMonthly} onChange={(e) => setOtherMonthly(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <ResultCard icon="💰" label="Monthly Profit" value={formatCurrency(monthlyProfit)} highlight />
        <ResultCard icon="📈" label="Annual Profit" value={formatCurrency(annualProfit)} highlight />
        <ResultCard icon="📊" label="Profit Margin" value={`${margin.toFixed(1)}%`} />
        <ResultCard icon="🚀" label="Monthly Profit ÷ Ad Spend" value={`${roi.toFixed(1)}%`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Monthly P&L</p>
        <ResultRow label="Gross Revenue" value={formatCurrency(gross)} />
        <ResultRow label={`Platform Fee (${feePct}%)`} value={`-${formatCurrency(platformFee)}`} />
        <ResultRow label="Ad Spend" value={`-${formatCurrency(ads)}`} />
        <ResultRow label="Other Monthly Costs" value={`-${formatCurrency(other)}`} />
        <ResultRow label="Monthly Profit" value={formatCurrency(monthlyProfit)} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Year One Summary</p>
        <ResultRow label="Annual Revenue" value={formatCurrency(gross * 12)} />
        <ResultRow label="Annual Costs (fees + ads + other)" value={formatCurrency((platformFee + ads + other) * 12)} />
        <ResultRow label="Course Production (one time)" value={`-${formatCurrency(production)}`} />
        <ResultRow label="Year One Net Profit" value={formatCurrency(annualWithProduction)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Platform fee depends on your hosting platform (e.g., Teachable 10%, Udemy 37–97%, Gumroad 10%). Course production cost is a one time upfront investment. ROI = monthly profit ÷ ad spend × 100. Year One Net Profit accounts for the initial production cost.</p>
      </div>
    </div>
  );
}
