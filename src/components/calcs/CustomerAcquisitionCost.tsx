'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function CustomerAcquisitionCostCalc() {
  const [marketingCost, setMarketingCost] = useState('10000');
  const [salesCost, setSalesCost] = useState('5000');
  const [newCustomers, setNewCustomers] = useState('100');

  const mc = parseFloat(marketingCost) || 0;
  const sc = parseFloat(salesCost) || 0;
  const nc = parseFloat(newCustomers) || 0;

  const totalCost = mc + sc;
  const cac = nc > 0 ? totalCost / nc : 0;

  return (
    <div>
      <SectionHeader title="Customer Acquisition Cost Calculator" subtitle="How much does it really cost to win each customer?" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Total Marketing Cost ($)</label>
            <input type="number" value={marketingCost} onChange={(e) => setMarketingCost(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Ads, content, software, agency fees</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Total Sales Cost ($)</label>
            <input type="number" value={salesCost} onChange={(e) => setSalesCost(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Salaries, commissions, CRM, tools</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>New Customers Acquired</label>
          <input type="number" value={newCustomers} onChange={(e) => setNewCustomers(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      {nc > 0 && cac > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <ResultCard icon="💰" label="Total Cost" value={`$${totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
          <ResultCard icon="🎯" label="Customers Acquired" value={nc.toLocaleString()} highlight />
          <ResultCard icon="📊" label="CAC per Customer" value={`$${cac.toFixed(2)}`} highlight />
        </div>
      )}

      {nc === 0 && (
        <div className="rounded-lg border p-4 mb-6" style={{ background: '#fef2f2', borderColor: '#ef4444' }}>
          <p className="text-sm font-medium" style={{ color: '#dc2626' }}>
            Enter a number of new customers greater than zero to calculate CAC.
          </p>
        </div>
      )}

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Total Marketing Cost" value={`$${mc.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Sales Cost" value={`$${sc.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Acquisition Cost" value={`$${totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="New Customers" value={nc.toLocaleString()} />
        <ResultRow label="CAC per Customer" value={nc > 0 ? `$${cac.toFixed(2)}` : '—'} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          Each new customer costs <strong>${cac.toFixed(2)}</strong> to acquire. Aim for a 3:1 LTV-to-CAC ratio — meaning each customer should be worth at least <strong>${(cac * 3).toFixed(2)}</strong> over their lifetime.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>This is a simple blended CAC calculation. For channel-specific CAC, calculate each marketing channel separately. Include all costs directly tied to acquisition: ad spend, salaries, software, creative production, and agency fees.</p>
      </div>
    </div>
  );
}
