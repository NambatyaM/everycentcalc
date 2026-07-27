'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function AgentCommissionCalc() {
  const [salePrice, setSalePrice] = useState('400000');
  const [commissionRate, setCommissionRate] = useState('5');
  const [listingSplit, setListingSplit] = useState('50');
  const [buyerSplit, setBuyerSplit] = useState('50');
  const [taxRate, setTaxRate] = useState('25');

  const price = parseFloat(salePrice) || 0;
  const rate = parseFloat(commissionRate) || 0;
  const listing = parseFloat(listingSplit) || 50;
  const buyer = parseFloat(buyerSplit) || 50;
  const tax = parseFloat(taxRate) || 0;

  const totalCommission = price * (rate / 100);
  const listingShare = totalCommission * (listing / 100);
  const buyerShare = totalCommission * (buyer / 100);
  const afterTax = totalCommission * (1 - tax / 100);
  const listingAfterTax = listingShare * (1 - tax / 100);
  const buyerAfterTax = buyerShare * (1 - tax / 100);
  const totalTax = totalCommission - afterTax;

  return (
    <div>
      <SectionHeader title="Real Estate Agent Commission Calculator" subtitle="Calculate commissions and agent splits for property transactions" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Home Sale Price ($)</label>
          <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Commission Rate (%)</label>
            <input type="number" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Tax Rate (%)</label>
            <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Listing Agent Split (%)</label>
            <input type="number" value={listingSplit} onChange={(e) => setListingSplit(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Buyer Agent Split (%)</label>
            <input type="number" value={buyerSplit} onChange={(e) => setBuyerSplit(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💰" label="Total Commission" value={`$${totalCommission.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📋" label="Listing Agent Cut" value={`$${listingShare.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="🤝" label="Buyer Agent Cut" value={`$${buyerShare.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💵" label="After Tax Commission" value={`$${afterTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="🏛️" label="Total Tax" value={`$${totalTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Sale Price" value={`$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Commission Rate" value={`${rate}%`} />
        <ResultRow label="Total Commission" value={`$${totalCommission.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label={`Listing Agent (${listing}%)`} value={`$${listingShare.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label={`Buyer Agent (${buyer}%)`} value={`$${buyerShare.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Listing Agent After Tax" value={`$${listingAfterTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Buyer Agent After Tax" value={`$${buyerAfterTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total After Tax" value={`$${afterTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Commission rates are negotiable and vary by market. The tax rate shown represents the agent's estimated income/self employment tax and does not account for deductions or credits. Consult a tax professional for accurate tax calculations.</p>
      </div>
    </div>
  );
}
