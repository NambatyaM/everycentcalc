'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

type IncomeType = 'w2' | 'freelance' | 'hybrid';
type RiskLevel = 'conservative' | 'moderate' | 'aggressive';

const MONTHS_MAP: Record<RiskLevel, number> = { conservative: 9, moderate: 6, aggressive: 3 };
const INCOME_EXTRA: Record<IncomeType, number> = { w2: 0, freelance: 3, hybrid: 1 };

export default function EmergencyFundCalc() {
  const [expenses, setExpenses] = useState('3000');
  const [currentSavings, setCurrentSavings] = useState('5000');
  const [incomeType, setIncomeType] = useState<IncomeType>('freelance');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('moderate');
  const [monthlySavingsInput, setMonthlySavingsInput] = useState('500');

  const exp = parseFloat(expenses) || 0;
  const current = parseFloat(currentSavings) || 0;
  const monthlySavings = parseFloat(monthlySavingsInput) || 0;

  const baseMonths = MONTHS_MAP[riskLevel];
  const extraMonths = INCOME_EXTRA[incomeType];
  const targetMonths = baseMonths + extraMonths;
  const target = exp * targetMonths;
  const gap = Math.max(0, target - current);
  const progressPct = target > 0 ? Math.min(100, (current / target) * 100) : 0;
  const monthsToGoal = monthlySavings > 0 ? Math.ceil(gap / monthlySavings) : Infinity;

  return (
    <div>
      <SectionHeader title="Emergency Fund Calculator" subtitle="Determine how much you need and how to get there" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Essential Expenses ($)</label>
            <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Current Emergency Savings ($)</label>
            <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Income Type</label>
            <select value={incomeType} onChange={(e) => setIncomeType(e.target.value as IncomeType)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="w2">W-2 Employee</option>
              <option value="freelance">Freelance / Self Employed</option>
              <option value="hybrid">Hybrid (W-2 + Side Hustle)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Risk Tolerance</label>
            <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="conservative">Conservative (9 months)</option>
              <option value="moderate">Moderate (6 months)</option>
              <option value="aggressive">Aggressive (3 months)</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Savings Toward Fund ($)</label>
          <input type="number" value={monthlySavingsInput} onChange={(e) => setMonthlySavingsInput(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="rounded-lg border p-4 mb-6" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: 'var(--brand)' }}>Progress to Emergency Fund</span>
          <span className="text-sm font-mono font-bold" style={{ color: 'var(--brand)' }}>{progressPct.toFixed(0)}%</span>
        </div>
        <div className="w-full rounded-full h-2" style={{ background: 'var(--border)' }}>
          <div className="rounded-full h-2 transition-all" style={{ width: `${progressPct}%`, background: 'var(--brand)' }} />
        </div>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          {formatCurrency(current)} of {formatCurrency(target)} saved ({targetMonths} months of expenses)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🎯" label="Emergency Fund Target" value={formatCurrency(target)} highlight subtitle={`${targetMonths} months`} />
        <ResultCard icon="🏦" label="Current Savings" value={formatCurrency(current)} />
        <ResultCard icon="📉" label="Gap to Fill" value={gap > 0 ? formatCurrency(gap) : 'Fully Funded'} />
        <ResultCard icon="📅" label="Your Monthly Savings" value={monthlySavings > 0 ? formatCurrency(monthlySavings) : '$0'} />
        <ResultCard icon="⏳" label="Months to Goal" value={monthsToGoal === Infinity ? 'N/A' : `${monthsToGoal}`} subtitle={monthsToGoal <= 12 ? 'Less than a year' : `${(monthsToGoal / 12).toFixed(1)} years`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Monthly Expenses" value={formatCurrency(exp)} />
        <ResultRow label="Base Target" value={`${MONTHS_MAP[riskLevel]} months`} />
        <ResultRow label="Income Adjustment" value={incomeType === 'freelance' ? '+3 months (freelancer)' : incomeType === 'hybrid' ? '+1 month (hybrid)' : 'None (W-2)'} />
        <ResultRow label="Total Target Months" value={`${targetMonths} months`} />
        <ResultRow label="Target Amount" value={formatCurrency(target)} />
        <ResultRow label="Current Savings" value={formatCurrency(current)} />
        <ResultRow label="Remaining Gap" value={gap > 0 ? formatCurrency(gap) : '$0'} bold />
        <ResultRow label="Time to Fully Fund" value={monthsToGoal === Infinity ? 'N/A' : `${monthsToGoal} months`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Emergency funds cover essential expenses during income disruption. Freelancers need larger funds due to income variability. Target 3-9 months based on job security and risk tolerance. Keep emergency funds in a high yield savings account for easy access.</p>
      </div>
    </div>
  );
}
