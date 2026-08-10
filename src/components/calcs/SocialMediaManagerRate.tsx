'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function SocialMediaManagerRate() {
  const [numClients, setNumClients] = useState('5');
  const [hoursPerClient, setHoursPerClient] = useState('10');
  const [desiredIncome, setDesiredIncome] = useState('65000');
  const [toolsCost, setToolsCost] = useState('200');
  const [profitMarginPct, setProfitMarginPct] = useState('30');

  const clients = parseFloat(numClients) || 0;
  const hours = parseFloat(hoursPerClient) || 0;
  const income = parseFloat(desiredIncome) || 0;
  const tools = parseFloat(toolsCost) || 0;
  const marginPct = parseFloat(profitMarginPct) || 0;

  const totalHoursMonthly = clients * hours * 4;
  const effectiveMargin = Math.min(marginPct, 99.9);
  const monthlyIncomeTarget = income / 12;
  const revenueNeeded = (monthlyIncomeTarget + tools) / (1 - effectiveMargin / 100);
  const perClient = clients > 0 ? revenueNeeded / clients : 0;
  const hourly = totalHoursMonthly > 0 ? revenueNeeded / totalHoursMonthly : 0;
  const annualRevenue = revenueNeeded * 12;

  return (
    <div>
      <SectionHeader title="Social Media Manager Rate Calculator" subtitle="Set client rates that cover costs and hit your income goals" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-number-of-clients">Number of Clients</label>
            <input id="calc-number-of-clients"  type="number" value={numClients} onChange={(e) => setNumClients(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-hours-per-client-per-week">Hours per Client per Week</label>
            <input id="calc-hours-per-client-per-week"  type="number" value={hoursPerClient} onChange={(e) => setHoursPerClient(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-desired-annual-income">Desired Annual Income ($)</label>
          <input id="calc-desired-annual-income"  type="number" value={desiredIncome} onChange={(e) => setDesiredIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-tools-cost">Monthly Tools Cost ($)</label>
            <input id="calc-monthly-tools-cost"  type="number" value={toolsCost} onChange={(e) => setToolsCost(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-desired-profit-margin">Desired Profit Margin (%)</label>
            <input id="calc-desired-profit-margin"  type="number" value={profitMarginPct} onChange={(e) => setProfitMarginPct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <ResultCard icon="💰" label="Rate per Client/Month" value={formatCurrency(perClient)} highlight />
        <ResultCard icon="⏱️" label="Hourly Rate" value={formatCurrency(hourly)} highlight />
        <ResultCard icon="📊" label="Monthly Revenue Needed" value={formatCurrency(revenueNeeded)} />
        <ResultCard icon="📈" label="Annual Revenue" value={formatCurrency(annualRevenue)} />
      </div>

      {income > 0 && marginPct > 99 && (
        <div className="rounded-lg border p-4 mb-6" style={{ background: '#fef2f2', borderColor: '#ef4444' }}>
          <p className="text-sm font-medium" style={{ color: '#dc2626' }}>
            A {marginPct}% profit margin is not achievable — costs would consume all revenue. Margin capped at 99.9% for calculation. Try lowering your desired profit margin to 30-50%.
          </p>
        </div>
      )}

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Revenue Calculation</p>
        <ResultRow label="Desired Annual Income" value={formatCurrency(income)} />
        <ResultRow label="Monthly Income Target" value={formatCurrency(income / 12)} />
        <ResultRow label="Monthly Tools Cost" value={formatCurrency(tools)} />
        <ResultRow label={`Profit Margin (${effectiveMargin}%)`} value={`${formatCurrency(revenueNeeded * effectiveMargin / 100)}/mo`} />
        <ResultRow label="Total Monthly Revenue Needed" value={formatCurrency(revenueNeeded)} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Workload Summary</p>
        <ResultRow label="Active Clients" value={clients.toString()} />
        <ResultRow label="Hours per Client per Week" value={hours.toString()} />
        <ResultRow label="Total Weekly Hours" value={(clients * hours).toString()} />
        <ResultRow label="Total Monthly Hours" value={totalHoursMonthly.toString()} />
        <ResultRow label="Rate per Client/Month" value={formatCurrency(perClient)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Revenue needed = (monthly income target + monthly tools cost) ÷ (1 − margin%). This ensures your monthly income goal plus tool costs are covered by revenue, with the stated profit margin as a share of revenue. Hourly rate = total monthly revenue ÷ total monthly hours. Adjust clients, hours, or margin to find the right balance.</p>
      </div>
    </div>
  );
}
