'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function FreelancerRateCalc() {
  const [desiredIncome, setDesiredIncome] = useState('100000');
  const [expenses, setExpenses] = useState('10');
  const [vacationWeeks, setVacationWeeks] = useState('4');
  const [billableHours, setBillableHours] = useState('6');

  const di = parseFloat(desiredIncome) || 0;
  const exp = parseFloat(expenses) || 0;
  const vw = parseFloat(vacationWeeks) || 0;
  const bh = parseFloat(billableHours) || 0;

  const taxMultiplier = 1.40;
  const incomeWithTax = di * taxMultiplier;
  const totalExpenses = di * (exp / 100);
  const totalNeeded = incomeWithTax + totalExpenses;
  const workingWeeks = 52 - vw;
  const totalBillableHours = workingWeeks * 5 * bh;
  const hourlyRate = totalBillableHours > 0 ? totalNeeded / totalBillableHours : 0;
  const dailyRate = hourlyRate * 8;
  const monthlyRetainer = hourlyRate * bh * 5 * 4;

  return (
    <div>
      <SectionHeader title="Freelancer Hourly Rate Calculator" subtitle="Find the rate you need to hit your income goals" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Desired Annual Take-Home Pay ($)
          </label>
          <input type="number" value={desiredIncome} onChange={(e) => setDesiredIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Business Expenses (% of income)
          </label>
          <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Vacation Weeks/Year
            </label>
            <input type="number" value={vacationWeeks} onChange={(e) => setVacationWeeks(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Billable Hours/Day
            </label>
            <input type="number" value={billableHours} onChange={(e) => setBillableHours(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <ResultCard icon="⏱️" label="Hourly Rate" value={`$${hourlyRate.toFixed(0)}`} highlight />
        <ResultCard icon="📋" label="Daily Rate" value={`$${dailyRate.toFixed(0)}`} highlight />
        <ResultCard icon="📆" label="Monthly Retainer" value={`$${monthlyRetainer.toFixed(0)}`} highlight />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Desired Take-Home" value={`$${di.toLocaleString()}`} />
        <ResultRow label="+ Taxes (~40%)" value={`$${(incomeWithTax - di).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="+ Business Expenses" value={`$${totalExpenses.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="= Total Revenue Needed" value={`$${totalNeeded.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Billable Hours/Year" value={totalBillableHours.toLocaleString()} />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>The 40% tax multiplier covers self-employment tax (15.3%) and federal income tax (~22% bracket). Your actual rate may be lower or higher. Adjust expenses for your specific situation (software, equipment, insurance, marketing).</p>
      </div>
    </div>
  );
}
