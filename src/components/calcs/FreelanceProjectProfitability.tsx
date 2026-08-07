'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency, formatPercent } from '@/lib/tax';

export default function FreelanceProjectProfitabilityCalc() {
  const [revenue, setRevenue] = useState('5000');
  const [hours, setHours] = useState('40');
  const [hourlyRate, setHourlyRate] = useState('75');
  const [expenses, setExpenses] = useState('500');
  const [taxRate, setTaxRate] = useState('30');

  const rev = parseFloat(revenue) || 0;
  const hrs = parseFloat(hours) || 0;
  const targetRate = parseFloat(hourlyRate) || 0;
  const exp = parseFloat(expenses) || 0;
  const taxPct = parseFloat(taxRate) || 0;

  const grossProfit = rev - exp;
  const effectiveHourlyRate = hrs > 0 ? grossProfit / hrs : 0;
  const taxAmount = grossProfit * (taxPct / 100);
  const netProfit = grossProfit - taxAmount;
  const profitMargin = rev > 0 ? (netProfit / rev) * 100 : 0;
  const netHourlyRate = hrs > 0 ? netProfit / hrs : 0;
  const rateDiff = netHourlyRate - targetRate;
  const isProfitable = netHourlyRate >= targetRate;

  return (
    <div>
      <SectionHeader title="Freelance Project Profitability Calculator" subtitle="Determine if a project is worth your time after expenses and taxes" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Project Revenue ($)
            </label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              placeholder="5000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Estimated Hours
            </label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              placeholder="40"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Hourly Rate (Target) ($)
            </label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              placeholder="75"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Project Expenses ($)
            </label>
            <input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              placeholder="500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Tax Rate (% to set aside)
          </label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="30"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💰" label="Net Profit" value={formatCurrency(netProfit)} highlight />
        <ResultCard icon="⏱️" label="Effective Hourly Rate" value={`$${effectiveHourlyRate.toFixed(2)}`} highlight />
        <ResultCard icon="🧾" label="Tax Amount" value={formatCurrency(taxAmount)} />
        <ResultCard icon="📊" label="Profit Margin" value={formatPercent(profitMargin)} />
        <ResultCard icon="🎯" label="Target Hourly Rate" value={`$${targetRate.toFixed(2)}`} />
        <ResultCard icon={isProfitable ? '✅' : '❌'} label="vs Target Rate" value={`${rateDiff >= 0 ? '+' : ''}$${rateDiff.toFixed(2)}/hr`} highlight />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Project Revenue" value={formatCurrency(rev)} />
        <ResultRow label="- Expenses" value={formatCurrency(-exp)} />
        <ResultRow label="= Gross Profit" value={formatCurrency(grossProfit)} />
        <ResultRow label={`- Tax (${taxPct}%)`} value={formatCurrency(-taxAmount)} />
        <ResultRow label="= Net Profit" value={formatCurrency(netProfit)} bold />
        <ResultRow label="Hours Worked" value={`${hrs}`} />
        <ResultRow label="Effective Hourly Rate" value={`$${effectiveHourlyRate.toFixed(2)}`} bold />
        <ResultRow label="Net Hourly Rate (after tax)" value={`$${netHourlyRate.toFixed(2)}`} bold />
        <ResultRow label="Target Hourly Rate" value={`$${targetRate.toFixed(2)}`} />
        <ResultRow label="Difference" value={`${rateDiff >= 0 ? '+' : ''}$${rateDiff.toFixed(2)}/hr`} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4 break-words overflow-hidden" style={{ background: isProfitable ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderColor: isProfitable ? '#22c55e' : '#ef4444' }}>
        <p className="text-sm font-medium" style={{ color: isProfitable ? '#22c55e' : '#ef4444' }}>
          {isProfitable
            ? `This project is profitable! Your net hourly rate of $${netHourlyRate.toFixed(2)}/hr ${netHourlyRate >= targetRate ? 'meets' : 'is close to'} your $${targetRate.toFixed(2)}/hr target.`
            : `This project does not meet your target rate. At $${effectiveHourlyRate.toFixed(2)}/hr (gross) or $${netHourlyRate.toFixed(2)}/hr (after tax), you are $${Math.abs(rateDiff).toFixed(2)}/hr below your $${targetRate.toFixed(2)} target.`}
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Note:</strong> The tax rate is a simplified estimate. Actual taxes include self employment tax (15.3%), federal income tax brackets, and state taxes. Expenses include direct project costs only, not overhead. Adjust the tax rate based on your marginal rate and SE tax obligations.</p>
      </div>
    </div>
  );
}
