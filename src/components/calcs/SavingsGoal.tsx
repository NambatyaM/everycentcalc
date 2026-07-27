'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function SavingsGoalCalc() {
  const [savingsGoal, setSavingsGoal] = useState('50000');
  const [timeFrame, setTimeFrame] = useState('24');
  const [currentSavings, setCurrentSavings] = useState('5000');
  const [expectedAPY, setExpectedAPY] = useState('5');

  const goal = parseFloat(savingsGoal) || 0;
  const months = parseFloat(timeFrame) || 1;
  const current = parseFloat(currentSavings) || 0;
  const apy = parseFloat(expectedAPY) || 0;

  const remaining = Math.max(0, goal - current);
  const monthlyRate = apy / 12 / 100;

  let monthlyContribution: number;
  if (monthlyRate === 0) {
    monthlyContribution = remaining / months;
  } else {
    monthlyContribution = (remaining * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
  }

  if (!isFinite(monthlyContribution) || monthlyContribution < 0) monthlyContribution = 0;

  const totalContributions = monthlyContribution * months;
  const finalBalance = current + totalContributions;
  const interestEarned = goal - current - totalContributions;

  const progressPct = goal > 0 ? Math.min(100, (current / goal) * 100) : 0;

  return (
    <div>
      <SectionHeader title="Savings Goal Calculator" subtitle="Plan how much to save each month to hit your target" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Savings Goal ($)</label>
          <input type="number" value={savingsGoal} onChange={(e) => setSavingsGoal(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Time Frame (months)</label>
            <input type="number" value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Current Savings ($)</label>
            <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Expected APY %</label>
          <input type="number" value={expectedAPY} onChange={(e) => setExpectedAPY(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>High-yield savings accounts currently offer 4-5% APY</p>
        </div>
      </div>

      <div className="rounded-lg border p-4 mb-6" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: 'var(--brand)' }}>Progress to Goal</span>
          <span className="text-sm font-mono font-bold" style={{ color: 'var(--brand)' }}>{progressPct.toFixed(0)}%</span>
        </div>
        <div className="w-full rounded-full h-2" style={{ background: 'var(--border)' }}>
          <div className="rounded-full h-2 transition-all" style={{ width: `${progressPct}%`, background: 'var(--brand)' }} />
        </div>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          ${current.toLocaleString('en-US', { maximumFractionDigits: 0 })} of ${goal.toLocaleString('en-US', { maximumFractionDigits: 0 })} saved
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💰" label="Monthly Contribution" value={`$${monthlyContribution.toFixed(2)}`} highlight />
        <ResultCard icon="🏦" label="Final Balance" value={`$${goal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="💵" label="Total Contributions" value={`$${totalContributions.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📈" label="Interest Earned" value={interestEarned > 0 ? `$${interestEarned.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '$0'} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Goal" value={`$${goal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Current Savings" value={`$${current.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Remaining to Save" value={`$${remaining.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Contribution" value={`$${monthlyContribution.toFixed(2)}`} bold />
        <ResultRow label="Total You'll Contribute" value={`$${totalContributions.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Interest Earned" value={interestEarned > 0 ? `$${interestEarned.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '$0'} />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses future value of annuity formula for monthly compounding. With 0% APY, simply divides the remaining amount by months. APY is assumed to compound monthly at 1/12 of the annual rate.</p>
      </div>
    </div>
  );
}
