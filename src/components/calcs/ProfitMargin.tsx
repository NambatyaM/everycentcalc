'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency, formatPercent } from '@/lib/tax';

export default function ProfitMarginCalc() {
  const [totalRevenue, setTotalRevenue] = useState('200000');
  const [cogs, setCogs] = useState('80000');
  const [operatingExpenses, setOperatingExpenses] = useState('40000');
  const [interestCost, setInterestCost] = useState('8000');
  const [taxAmount, setTaxAmount] = useState('15000');

  const revenue = parseFloat(totalRevenue) || 0;
  const cogsVal = parseFloat(cogs) || 0;
  const opExpenses = parseFloat(operatingExpenses) || 0;
  const interest = parseFloat(interestCost) || 0;
  const taxes = parseFloat(taxAmount) || 0;

  const grossProfit = revenue - cogsVal;
  const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
  const operatingProfit = grossProfit - opExpenses;
  const operatingMargin = revenue > 0 ? (operatingProfit / revenue) * 100 : 0;
  const preTaxProfit = operatingProfit - interest;
  const netProfit = preTaxProfit - taxes;
  const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  const totalCosts = revenue - netProfit;

  return (
    <div>
      <SectionHeader title="Business Profit Margin Calculator" subtitle="See your gross, operating, and net margins so you know exactly where your money goes" />

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
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Interest Expense ($)</label>
            <input type="number" value={interestCost} onChange={(e) => setInterestCost(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Taxes ($)</label>
            <input type="number" value={taxAmount} onChange={(e) => setTaxAmount(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📊" label="Gross Margin" value={formatPercent(grossMargin)} highlight subtitle={formatCurrency(grossProfit)} />
        <ResultCard icon="📈" label="Operating Margin" value={formatPercent(operatingMargin)} highlight subtitle={formatCurrency(operatingProfit)} />
        <ResultCard icon="💎" label="Net Margin" value={formatPercent(netMargin)} highlight subtitle={formatCurrency(netProfit)} />
        <ResultCard icon="🏷️" label="Gross Profit" value={formatCurrency(grossProfit)} subtitle={`${formatPercent(grossMargin)} of revenue`} />
        <ResultCard icon="⚙️" label="Operating Profit" value={formatCurrency(operatingProfit)} subtitle={`${formatPercent(operatingMargin)} of revenue`} />
        <ResultCard icon="💵" label="Net Profit" value={formatCurrency(netProfit)} subtitle={`${formatPercent(netMargin)} of revenue`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Margin Stack Breakdown</div>
        <ResultRow label="Total Revenue" value={formatCurrency(revenue)} />
        <ResultRow label="Cost of Goods Sold" value={`-${formatCurrency(cogsVal)}`} />
        <ResultRow label="Gross Profit" value={formatCurrency(grossProfit)} bold />
        <ResultRow label="Operating Expenses" value={`-${formatCurrency(opExpenses)}`} />
        <ResultRow label="Operating Profit" value={formatCurrency(operatingProfit)} bold />
        <ResultRow label="Interest Expense" value={`-${formatCurrency(interest)}`} />
        <ResultRow label="Pre Tax Profit" value={formatCurrency(preTaxProfit)} />
        <ResultRow label="Taxes" value={`-${formatCurrency(taxes)}`} />
        <ResultRow label="Net Profit" value={formatCurrency(netProfit)} bold />
        <ResultRow label="Total Costs" value={formatCurrency(totalCosts)} />
      </div>

      {netMargin < 0 && (
        <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
          <p className="text-sm" style={{ color: 'var(--brand)' }}>
            ⚠️ Your net margin is {formatPercent(netMargin)}, which means the business is losing money after all expenses. Review COGS, operating expenses, and pricing before growing further.
          </p>
        </div>
      )}

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> Gross margin = (Revenue − COGS) ÷ Revenue. Operating margin = (Revenue − COGS − Operating expenses) ÷ Revenue. Net margin = Net profit ÷ Revenue. Margins vary wildly by industry: service businesses often run 15–30% net, retail 2–10%, and SaaS 20–40%. Benchmark your margin against your own industry before drawing conclusions.</p>
      </div>
    </div>
  );
}