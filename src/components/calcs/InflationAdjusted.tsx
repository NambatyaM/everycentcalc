'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function InflationAdjustedCalc() {
  const [amount, setAmount] = useState('100000');
  const [inflationRate, setInflationRate] = useState('3');
  const [years, setYears] = useState('20');

  const A = parseFloat(amount) || 0;
  const ir = (parseFloat(inflationRate) || 0) / 100;
  const t = parseFloat(years) || 0;

  const futureValue = A / Math.pow(1 + ir, t);
  const purchasingPowerLoss = A - futureValue;
  const purchasingPowerPct = A > 0 ? (futureValue / A) * 100 : 0;

  const milestones = [5, 10, 15, 20, 25, 30].filter((y) => y <= t && y > 0);
  const milestoneValues = milestones.map((y) => {
    const fv = A / Math.pow(1 + ir, y);
    const loss = A - fv;
    const pct = (fv / A) * 100;
    return { year: y, realValue: fv, loss, pct };
  });

  return (
    <div>
      <SectionHeader title="Inflation Adjusted Calculator" subtitle="See how inflation erodes your purchasing power over time" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Current Amount ($)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Inflation Rate (%)</label>
            <input type="number" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Years to Project</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📉" label="Future Real Value" value={formatCurrency(futureValue)} highlight />
        <ResultCard icon="💰" label="Purchasing Power Loss" value={formatCurrency(purchasingPowerLoss)} />
        <ResultCard icon="📊" label="Purchasing Power Remaining" value={`${purchasingPowerPct.toFixed(1)}%`} />
        <ResultCard icon="🕐" label="Rule of 72 Doubling" value={`${(72 / (ir * 100)).toFixed(1)} years`} subtitle="Years for prices to double" />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Today's Value" value={formatCurrency(A)} />
        <ResultRow label={`Inflation Rate`} value={`${(ir * 100).toFixed(1)}%/yr`} />
        <ResultRow label="Years" value={`${t}`} />
        <ResultRow label="Future Real Value" value={formatCurrency(futureValue)} bold />
        <ResultRow label="Purchasing Power Loss" value={formatCurrency(purchasingPowerLoss)} bold />
        <ResultRow label="Purchasing Power %" value={`${purchasingPowerPct.toFixed(1)}%`} bold />
      </div>

      {milestoneValues.length > 0 && (
        <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
          <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Milestones</h3>
          {milestoneValues.map((m, i) => (
            <ResultRow key={i} label={`Year ${m.year}`} value={`${formatCurrency(m.realValue)} (${m.pct.toFixed(1)}% remaining)`} />
          ))}
        </div>
      )}

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Calculates real purchasing power using the formula: Future Value = Amount / (1 + inflation)^years. The Rule of 72 estimates how long it takes for prices to double. Historical US inflation averages ~3% annually. Actual inflation varies by year and spending category.</p>
      </div>
    </div>
  );
}
