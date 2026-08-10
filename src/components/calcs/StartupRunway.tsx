'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function StartupRunwayCalc() {
  const [cashBalance, setCashBalance] = useState('100000');
  const [monthlyRevenue, setMonthlyRevenue] = useState('15000');
  const [monthlyExpenses, setMonthlyExpenses] = useState('40000');

  const cash = parseFloat(cashBalance) || 0;
  const revenue = parseFloat(monthlyRevenue) || 0;
  const expenses = parseFloat(monthlyExpenses) || 0;

  const monthlyBurn = expenses - revenue;
  const isProfitable = monthlyBurn <= 0;
  const runwayMonths = monthlyBurn > 0 ? cash / monthlyBurn : Infinity;
  const cashOutDate = monthlyBurn > 0 ? new Date(Date.now() + runwayMonths * 30.44 * 24 * 60 * 60 * 1000) : null;

  let runwayStatus: string;
  let statusColor: string;
  let statusBg: string;
  if (isProfitable) {
    runwayStatus = 'Profitable';
    statusColor = '#16a34a';
    statusBg = '#f0fdf4';
  } else if (runwayMonths < 6) {
    runwayStatus = 'Critical';
    statusColor = '#dc2626';
    statusBg = '#fef2f2';
  } else if (runwayMonths < 12) {
    runwayStatus = 'Warning';
    statusColor = '#d97706';
    statusBg = '#fffbeb';
  } else if (runwayMonths <= 18) {
    runwayStatus = 'Healthy';
    statusColor = '#16a34a';
    statusBg = '#f0fdf4';
  } else {
    runwayStatus = 'Strong';
    statusColor = '#0369a1';
    statusBg = '#f0f9ff';
  }

  const formatMonths = (m: number) => {
    if (!isFinite(m)) return 'Indefinite';
    return m.toFixed(1);
  };

  return (
    <div>
      <SectionHeader title="Startup Runway Calculator" subtitle="How long until your cash runs out?" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-cash-balance">
            Cash Balance ($)
          </label>
          <input id="calc-cash-balance"  type="number" value={cashBalance} onChange={(e) => setCashBalance(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-revenue">Monthly Revenue ($)</label>
            <input id="calc-monthly-revenue"  type="number" value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-expenses">Monthly Expenses ($)</label>
            <input id="calc-monthly-expenses"  type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="rounded-lg border-2 p-4 mb-6" style={{ background: statusBg, borderColor: statusColor }}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: statusColor }}>Runway Status</span>
          <span className="text-lg font-bold font-mono" style={{ color: statusColor }}>{runwayStatus}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="🔥" label="Monthly Burn Rate" value={isProfitable ? '$0' : `$${monthlyBurn.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight={!isProfitable} />
        <ResultCard icon="⏳" label="Runway" value={isProfitable ? 'Indefinite' : `${formatMonths(runwayMonths)} mo`} highlight />
        <ResultCard icon="📅" label="Cash out Date" value={cashOutDate ? cashOutDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'} />
        <ResultCard icon="💳" label="Current Cash" value={`$${cash.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Monthly Revenue" value={`$${revenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Expenses" value={`$${expenses.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Net Burn Rate" value={isProfitable ? '$0 (profitable)' : `$${monthlyBurn.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Runway in Months" value={isProfitable ? 'Indefinite' : `${formatMonths(runwayMonths)} months`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Runway = Cash Balance / Monthly Burn Rate. Burn rate is positive when expenses exceed revenue. A runway of 12-18 months is generally considered healthy for startups seeking funding.</p>
      </div>
    </div>
  );
}
