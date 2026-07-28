'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function DoorDashProfit() {
  const [weeklyGross, setWeeklyGross] = useState('800');
  const [milesDriven, setMilesDriven] = useState('300');
  const [hoursWorked, setHoursWorked] = useState('30');
  const [gasPrice, setGasPrice] = useState('3.50');
  const [mpg, setMpg] = useState('25');
  const [otherExpenses, setOtherExpenses] = useState('20');

  const gross = parseFloat(weeklyGross) || 0;
  const miles = parseFloat(milesDriven) || 0;
  const hours = parseFloat(hoursWorked) || 0;
  const gas = parseFloat(gasPrice) || 0;
  const mpgVal = parseFloat(mpg) || 1;
  const other = parseFloat(otherExpenses) || 0;

  const gasCost = (miles / mpgVal) * gas;
  const vehicleCost = miles * 0.70;
  const netWeekly = gross - gasCost - other;
  const hourlyRate = hours > 0 ? netWeekly / hours : 0;
  const annualProfit = netWeekly * 52;

  return (
    <div>
      <SectionHeader title="DoorDash Driver Profit Calculator" subtitle="Calculate your real hourly rate and net profit after expenses" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Weekly Gross Earnings ($)</label>
            <input type="number" value={weeklyGross} onChange={(e) => setWeeklyGross(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Hours Worked per Week</label>
            <input type="number" value={hoursWorked} onChange={(e) => setHoursWorked(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Miles Driven per Week</label>
            <input type="number" value={milesDriven} onChange={(e) => setMilesDriven(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Other Expenses per Week ($)</label>
            <input type="number" value={otherExpenses} onChange={(e) => setOtherExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Gas Price per Gallon ($)</label>
            <input type="number" value={gasPrice} onChange={(e) => setGasPrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Vehicle MPG</label>
            <input type="number" value={mpg} onChange={(e) => setMpg(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <ResultCard icon="💰" label="Net Weekly Profit" value={formatCurrency(netWeekly)} highlight />
        <ResultCard icon="⏱️" label="Effective Hourly Rate" value={formatCurrency(hourlyRate)} highlight />
        <ResultCard icon="📈" label="Annual Profit" value={formatCurrency(annualProfit)} />
        <ResultCard icon="⛽" label="Gas Cost/Week" value={formatCurrency(gasCost)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Weekly Expense Breakdown</p>
        <ResultRow label="Gross Earnings" value={formatCurrency(gross)} />
        <ResultRow label="Gas Cost" value={`-${formatCurrency(gasCost)}`} />
        <ResultRow label="Other Expenses" value={`-${formatCurrency(other)}`} />
        <ResultRow label="IRS Vehicle Deduction (miles × $0.70)" value={formatCurrency(vehicleCost)} />
        <ResultRow label="Net Weekly Profit" value={formatCurrency(netWeekly)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Gas cost is calculated using your miles and MPG. The IRS standard mileage rate of $0.70/mile is shown for reference — actual tax deduction depends on your filing status. Net profit = gross earnings − gas cost − other expenses. Hourly rate = net profit ÷ hours worked.</p>
      </div>
    </div>
  );
}
