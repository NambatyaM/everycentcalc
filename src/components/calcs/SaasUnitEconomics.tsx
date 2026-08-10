'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function SaasUnitEconomicsCalc() {
  const [monthlyMarketingSpend, setMonthlyMarketingSpend] = useState('10000');
  const [newCustomersPerMonth, setNewCustomersPerMonth] = useState('50');
  const [avgMonthlyRevenue, setAvgMonthlyRevenue] = useState('50');
  const [grossMargin, setGrossMargin] = useState('80');
  const [churnRate, setChurnRate] = useState('5');

  const marketingSpend = parseFloat(monthlyMarketingSpend) || 0;
  const newCustomers = parseFloat(newCustomersPerMonth) || 0;
  const avgRevenue = parseFloat(avgMonthlyRevenue) || 0;
  const margin = parseFloat(grossMargin) || 0;
  const churn = parseFloat(churnRate) || 0;

  const cac = newCustomers > 0 ? marketingSpend / newCustomers : NaN;
  const ltv = churn > 0 ? (avgRevenue * (margin / 100)) / (churn / 100) : Infinity;
  const noCustomers = Number.isNaN(cac);
  const infiniteRatio = ltv === Infinity;
  const ltvCacRatio = noCustomers ? NaN : infiniteRatio ? Infinity : cac > 0 ? ltv / cac : 0;
  const paybackPeriod = avgRevenue * (margin / 100) > 0 ? cac / (avgRevenue * (margin / 100)) : Infinity;
  const newMRR = newCustomers * avgRevenue;

  let ltvCacHealth: string;
  let ltvCacColor: string;
  let ltvCacBg: string;
  if (noCustomers) {
    ltvCacHealth = 'No Customer Data';
    ltvCacColor = '#64748b';
    ltvCacBg = 'var(--bg-tertiary)';
  } else if (infiniteRatio) {
    ltvCacHealth = 'Healthy';
    ltvCacColor = '#16a34a';
    ltvCacBg = '#f0fdf4';
  } else if (ltvCacRatio > 3) {
    ltvCacHealth = 'Healthy';
    ltvCacColor = '#16a34a';
    ltvCacBg = '#f0fdf4';
  } else if (ltvCacRatio >= 1) {
    ltvCacHealth = 'Needs Work';
    ltvCacColor = '#d97706';
    ltvCacBg = '#fffbeb';
  } else {
    ltvCacHealth = 'Unsustainable';
    ltvCacColor = '#dc2626';
    ltvCacBg = '#fef2f2';
  }
  const ratioDisplay = noCustomers ? 'N/A' : infiniteRatio ? '∞:1' : ltvCacRatio > 0 ? `${ltvCacRatio.toFixed(1)}:1` : 'N/A';
  const cacDisplay = noCustomers ? 'N/A' : `$${cac.toFixed(2)}`;

  return (
    <div>
      <SectionHeader title="SaaS Unit Economics Calculator (CAC/LTV)" subtitle="Measure the health of your customer acquisition and retention" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-marketing-spend">Monthly Marketing Spend ($)</label>
            <input id="calc-monthly-marketing-spend"  type="number" value={monthlyMarketingSpend} onChange={(e) => setMonthlyMarketingSpend(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-new-customers-per-month">New Customers per Month</label>
            <input id="calc-new-customers-per-month"  type="number" value={newCustomersPerMonth} onChange={(e) => setNewCustomersPerMonth(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-avg-monthly-revenue-per-customer">Avg Monthly Revenue per Customer ($)</label>
          <input id="calc-avg-monthly-revenue-per-customer"  type="number" value={avgMonthlyRevenue} onChange={(e) => setAvgMonthlyRevenue(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-gross-margin">Gross Margin %</label>
            <input id="calc-gross-margin"  type="number" value={grossMargin} onChange={(e) => setGrossMargin(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-churn-rate">Monthly Churn Rate %</label>
            <input id="calc-monthly-churn-rate"  type="number" value={churnRate} onChange={(e) => setChurnRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="rounded-lg border-2 p-4 mb-6 break-words overflow-hidden" style={{ background: ltvCacBg, borderColor: ltvCacColor }}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: ltvCacColor }}>LTV:CAC Health</span>
          <span className="text-lg font-bold font-mono" style={{ color: ltvCacColor }}>{ltvCacHealth} ({ratioDisplay})</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="🎯" label="CAC" value={cacDisplay} highlight />
        <ResultCard icon="💎" label="LTV" value={ltv !== Infinity ? `$${ltv.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '∞'} highlight />
        <ResultCard icon="📊" label="LTV:CAC Ratio" value={ratioDisplay} highlight />
        <ResultCard icon="⏱️" label="Payback Period" value={isFinite(paybackPeriod) ? `${paybackPeriod.toFixed(1)} mo` : 'N/A'} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Cost per Acquisition (CAC)" value={cacDisplay} />
        <ResultRow label="Customer Lifetime Value (LTV)" value={ltv !== Infinity ? `$${ltv.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '∞ (no churn)'} />
        <ResultRow label="LTV:CAC Ratio" value={ratioDisplay} bold />
        <ResultRow label="Monthly MRR from New Customers" value={`$${newMRR.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Payback Period" value={isFinite(paybackPeriod) ? `${paybackPeriod.toFixed(1)} months` : 'N/A'} />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>CAC = Marketing Spend / New Customers. LTV = (Avg Revenue × Gross Margin) / Churn Rate. A healthy LTV:CAC ratio is 3:1 or higher. Payback under 12 months is ideal for SaaS businesses.</p>
      </div>
    </div>
  );
}
