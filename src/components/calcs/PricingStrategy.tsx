'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function PricingStrategyCalc() {
  const [costToProduce, setCostToProduce] = useState('10');
  const [desiredMargin, setDesiredMargin] = useState('50');
  const [competitorPrice, setCompetitorPrice] = useState('25');
  const [targetRevenue, setTargetRevenue] = useState('500000');
  const [unitsSold, setUnitsSold] = useState('10000');

  const cost = parseFloat(costToProduce) || 0;
  const margin = parseFloat(desiredMargin) || 0;
  const competitor = parseFloat(competitorPrice) || 0;
  const revenue = parseFloat(targetRevenue) || 0;
  const units = parseFloat(unitsSold) || 0;

  const costPlusPrice = margin < 100 ? cost / (1 - margin / 100) : 0;
  const valueBasedPrice = competitor * 1.1;
  const revenueBasedPrice = units > 0 ? revenue / units : 0;

  const profitCostPlus = (costPlusPrice - cost) * units;
  const profitValueBased = (valueBasedPrice - cost) * units;
  const profitRevenueBased = (revenueBasedPrice - cost) * units;

  const breakEvenCostPlus = costPlusPrice > 0 ? Math.ceil(revenue / costPlusPrice) : 0;
  const breakEvenValueBased = valueBasedPrice > 0 ? Math.ceil(revenue / valueBasedPrice) : 0;
  const breakEvenRevenueBased = revenueBasedPrice > 0 ? Math.ceil(revenue / revenueBasedPrice) : 0;

  const strategies = [
    { name: 'Cost Plus', price: costPlusPrice, profit: profitCostPlus, breakEven: breakEvenCostPlus, color: '#7c3aed' },
    { name: 'Value Based', price: valueBasedPrice, profit: profitValueBased, breakEven: breakEvenValueBased, color: '#0369a1' },
    { name: 'Revenue Based', price: revenueBasedPrice, profit: profitRevenueBased, breakEven: breakEvenRevenueBased, color: '#16a34a' },
  ];

  return (
    <div>
      <SectionHeader title="Pricing Strategy Calculator" subtitle="Compare cost plus, value based, and revenue based pricing" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-cost-to-produce">Cost to Produce ($)</label>
            <input id="calc-cost-to-produce"  type="number" value={costToProduce} onChange={(e) => setCostToProduce(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-desired-margin">Desired Margin %</label>
            <input id="calc-desired-margin"  type="number" value={desiredMargin} onChange={(e) => setDesiredMargin(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-competitor-price">Competitor Price ($)</label>
          <input id="calc-competitor-price"  type="number" value={competitorPrice} onChange={(e) => setCompetitorPrice(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-target-annual-revenue">Target Annual Revenue ($)</label>
            <input id="calc-target-annual-revenue"  type="number" value={targetRevenue} onChange={(e) => setTargetRevenue(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-est-units-sold-year">Est. Units Sold/Year</label>
            <input id="calc-est-units-sold-year"  type="number" value={unitsSold} onChange={(e) => setUnitsSold(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {strategies.map((s) => (
          <div key={s.name} className="rounded-lg border p-4 text-center" style={{ background: 'var(--bg-tertiary)', borderColor: s.color }}>
            <div className="text-xs font-medium mb-1" style={{ color: s.color }}>{s.name}</div>
            <div className="text-xl font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
              ${s.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Profit Comparison (at {units.toLocaleString()} units)</div>
        <ResultRow label="Cost Plus Profit" value={`$${profitCostPlus.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Value Based Profit" value={`$${profitValueBased.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Revenue Based Profit" value={`$${profitRevenueBased.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Break Even Units to Hit Revenue Target</div>
        <ResultRow label="Cost Plus Break Even" value={breakEvenCostPlus.toLocaleString()} />
        <ResultRow label="Value Based Break Even" value={breakEvenValueBased.toLocaleString()} bold />
        <ResultRow label="Revenue Based Break Even" value={breakEvenRevenueBased.toLocaleString()} />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Cost plus = cost / (1 - margin%). Value based = competitor price × 1.10 (10% premium). Revenue based = target revenue / units. Choose the strategy that best fits your market position and goals.</p>
      </div>
    </div>
  );
}
