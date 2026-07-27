'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function RealEstateFlipProfitCalc() {
  const [purchasePrice, setPurchasePrice] = useState('200000');
  const [renovationCost, setRenovationCost] = useState('50000');
  const [holdingPeriod, setHoldingPeriod] = useState('6');
  const [monthlyHoldingCosts, setMonthlyHoldingCosts] = useState('2000');
  const [sellingPrice, setSellingPrice] = useState('350000');
  const [agentCommission, setAgentCommission] = useState('5');
  const [closingCostsPct, setClosingCostsPct] = useState('2');

  const purchase = parseFloat(purchasePrice) || 0;
  const renovation = parseFloat(renovationCost) || 0;
  const months = parseInt(holdingPeriod) || 0;
  const holding = parseFloat(monthlyHoldingCosts) || 0;
  const arv = parseFloat(sellingPrice) || 0;
  const commission = parseFloat(agentCommission) || 0;
  const closingPct = parseFloat(closingCostsPct) || 0;

  const totalInvested = purchase + renovation;
  const sellingCosts = arv * ((commission + closingPct) / 100);
  const totalHoldingCosts = holding * months;
  const totalCosts = totalInvested + totalHoldingCosts + sellingCosts;
  const profit = arv - totalCosts;
  const roi = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;
  const commissionAmount = arv * (commission / 100);
  const closingAmount = arv * (closingPct / 100);

  return (
    <div>
      <SectionHeader title="Real Estate Flip Profit Calculator" subtitle="Estimate profit and ROI from a property flip" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Purchase Price ($)</label>
            <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Renovation Cost ($)</label>
            <input type="number" value={renovationCost} onChange={(e) => setRenovationCost(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Holding Period (months)</label>
            <input type="number" value={holdingPeriod} onChange={(e) => setHoldingPeriod(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Holding Costs ($)</label>
            <input type="number" value={monthlyHoldingCosts} onChange={(e) => setMonthlyHoldingCosts(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Selling Price (ARV) ($)</label>
            <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Agent Commission (%)</label>
            <input type="number" value={agentCommission} onChange={(e) => setAgentCommission(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Closing Costs (%)</label>
            <input type="number" value={closingCostsPct} onChange={(e) => setClosingCostsPct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💰" label="Net Profit" value={`$${profit.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight={profit > 0} />
        <ResultCard icon="📈" label="ROI" value={`${roi.toFixed(2)}%`} highlight={roi > 0} />
        <ResultCard icon="🏦" label="Total Investment" value={`$${totalInvested.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💸" label="Selling Costs" value={`$${sellingCosts.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📋" label="Holding Costs" value={`$${totalHoldingCosts.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Purchase Price" value={`$${purchase.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Renovation Cost" value={`$${renovation.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Invested" value={`$${totalInvested.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Holding Costs" value={`$${totalHoldingCosts.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Agent Commission" value={`$${commissionAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Closing Costs" value={`$${closingAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Selling Costs" value={`$${sellingCosts.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Costs" value={`$${totalCosts.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Profit" value={`$${profit.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="ROI" value={`${roi.toFixed(2)}%`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Includes purchase, renovation, holding costs, and selling expenses. Does not account for taxes, insurance, utilities during renovation, or unexpected cost overruns. A typical target is 15-20% ROI for a flip. Consult a real estate professional for detailed analysis.</p>
      </div>
    </div>
  );
}
