'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function BreakEvenCalc() {
  const [fixedCosts, setFixedCosts] = useState('5000');
  const [pricePerUnit, setPricePerUnit] = useState('50');
  const [variableCost, setVariableCost] = useState('20');
  const [monthlyGoal, setMonthlyGoal] = useState('10000');

  const fc = parseFloat(fixedCosts) || 0;
  const pp = parseFloat(pricePerUnit) || 0;
  const vc = parseFloat(variableCost) || 0;
  const mg = parseFloat(monthlyGoal) || 0;

  const contributionMargin = pp - vc;
  const contributionMarginPct = pp > 0 ? (contributionMargin / pp) * 100 : 0;
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fc / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * pp;
  const unitsForGoal = contributionMargin > 0 ? Math.ceil((fc + mg) / contributionMargin) : 0;
  const revenueForGoal = unitsForGoal * pp;

  return (
    <div>
      <SectionHeader title="Break-Even Point Calculator" subtitle="Find out when your business becomes profitable" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Monthly Fixed Costs ($)
          </label>
          <input type="number" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Rent, salaries, software, insurance — costs that don&apos;t change with sales</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Price per Unit ($)</label>
            <input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Variable Cost per Unit ($)</label>
            <input type="number" value={variableCost} onChange={(e) => setVariableCost(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Monthly Profit Goal ($)
          </label>
          <input type="number" value={monthlyGoal} onChange={(e) => setMonthlyGoal(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🎯" label="Break-Even Units" value={breakEvenUnits.toLocaleString()} highlight />
        <ResultCard icon="💰" label="Break-Even Revenue" value={`$${breakEvenRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📊" label="Contribution Margin" value={`${contributionMarginPct.toFixed(0)}%`} highlight />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Contribution Margin per Unit" value={`$${contributionMargin.toFixed(2)}`} />
        <ResultRow label={`Units to Hit $${mg.toLocaleString()} Profit`} value={unitsForGoal.toLocaleString()} bold />
        <ResultRow label={`Revenue to Hit Goal`} value={`$${revenueForGoal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Profit at Break-Even" value="$0" />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          You need to sell <strong>{breakEvenUnits.toLocaleString()} units</strong> at ${pp} each (or generate <strong>${breakEvenRevenue.toLocaleString()}</strong> in revenue) per month just to cover your costs.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>This break-even analysis assumes a single product/service at a constant price. For multi-product businesses, calculate weighted average contribution margin. Fixed costs should include all recurring expenses but not one-time costs.</p>
      </div>
    </div>
  );
}
