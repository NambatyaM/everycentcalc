'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency, formatPercent } from '@/lib/tax';

export default function ExpenseRatio() {
  const [totalRevenue, setTotalRevenue] = useState('200000');
  const [cogs, setCogs] = useState('80000');
  const [operatingExpenses, setOperatingExpenses] = useState('40000');
  const [ownerCompensation, setOwnerCompensation] = useState('60000');

  const revenue = parseFloat(totalRevenue) || 0;
  const cogsVal = parseFloat(cogs) || 0;
  const opExpenses = parseFloat(operatingExpenses) || 0;
  const ownerComp = parseFloat(ownerCompensation) || 0;

  const grossProfit = revenue - cogsVal;
  const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
  const operatingProfit = grossProfit - opExpenses;
  const operatingMargin = revenue > 0 ? (operatingProfit / revenue) * 100 : 0;
  const netProfit = operatingProfit - ownerComp;
  const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  const totalExpenses = cogsVal + opExpenses + ownerComp;
  const expenseRatio = revenue > 0 ? (totalExpenses / revenue) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Business Expense Ratio Calculator" subtitle="Analyze your profit margins and expense ratios for better financial management" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Total Revenue ($)</label>
            <input type="number" value={totalRevenue} onChange={(e) => setTotalRevenue(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Cost of Goods Sold ($)</label>
            <input type="number" value={cogs} onChange={(e) => setCogs(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Operating Expenses ($)</label>
            <input type="number" value={operatingExpenses} onChange={(e) => setOperatingExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Owner Compensation ($)</label>
            <input type="number" value={ownerCompensation} onChange={(e) => setOwnerCompensation(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📊" label="Gross Margin" value={formatPercent(grossMargin)} highlight subtitle={formatCurrency(grossProfit)} />
        <ResultCard icon="📈" label="Operating Margin" value={formatPercent(operatingMargin)} highlight subtitle={formatCurrency(operatingProfit)} />
        <ResultCard icon="💰" label="Net Margin" value={formatPercent(netMargin)} highlight subtitle={formatCurrency(netProfit)} />
        <ResultCard icon="⚠️" label="Total Cost Ratio" value={formatPercent(expenseRatio)} subtitle={`${formatCurrency(totalExpenses)} total`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Income Statement Breakdown</div>
        <ResultRow label="Total Revenue" value={formatCurrency(revenue)} />
        <ResultRow label="Cost of Goods Sold" value={`-${formatCurrency(cogsVal)}`} />
        <ResultRow label="Gross Profit" value={formatCurrency(grossProfit)} bold />
        <ResultRow label="Operating Expenses" value={`-${formatCurrency(opExpenses)}`} />
        <ResultRow label="Operating Profit" value={formatCurrency(operatingProfit)} bold />
        <ResultRow label="Owner Compensation" value={`-${formatCurrency(ownerComp)}`} />
        <ResultRow label="Net Profit" value={formatCurrency(netProfit)} bold />
        <ResultRow label="Total Expenses" value={formatCurrency(totalExpenses)} />
        <ResultRow label="Total Cost Ratio" value={formatPercent(expenseRatio)} bold />
      </div>

      {netMargin < 0 && (
        <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
          <p className="text-sm" style={{ color: 'var(--brand)' }}>
            ⚠️ Negative net margin of {formatPercent(netMargin)}. Review operating expenses and owner compensation for cost reduction opportunities.
          </p>
        </div>
      )}

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> Gross margin = (Revenue - COGS) / Revenue. Operating margin = Operating Profit / Revenue. Net margin includes owner compensation as an expense. Total cost ratio = Total Expenses / Revenue. Industry benchmarks vary — software typically has 70%+ gross margins while retail averages 25-35%. Compare against your industry for context.</p>
      </div>
    </div>
  );
}
