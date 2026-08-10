'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function FreelancerSavingsRate() {
  const [monthlyIncome, setMonthlyIncome] = useState('8000');
  const [monthlyExpenses, setMonthlyExpenses] = useState('4000');
  const [taxRate, setTaxRate] = useState('30');
  const [emergencyGoal, setEmergencyGoal] = useState('24000');
  const [currentSavings, setCurrentSavings] = useState('5000');

  const income = parseFloat(monthlyIncome) || 0;
  const expenses = parseFloat(monthlyExpenses) || 0;
  const tax = parseFloat(taxRate) || 0;
  const goal = parseFloat(emergencyGoal) || 0;
  const current = parseFloat(currentSavings) || 0;

  const afterTaxIncome = income * (1 - tax / 100);
  const surplus = afterTaxIncome - expenses;
  const savingsRate = afterTaxIncome > 0 ? (surplus / afterTaxIncome) * 100 : 0;
  const monthsToGoal = surplus > 0 ? Math.max(0, Math.ceil((goal - current) / surplus)) : 0;
  const annualSurplus = surplus * 12;

  return (
    <div>
      <SectionHeader title="Freelancer Savings Rate Calculator" subtitle="Track your savings rate and emergency fund timeline" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-income">
              Monthly Income ($)
            </label>
            <input id="calc-monthly-income"  type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-expenses">
              Monthly Expenses ($)
            </label>
            <input id="calc-monthly-expenses"  type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-estimated-tax-rate">
            Estimated Tax Rate (%)
          </label>
          <input id="calc-estimated-tax-rate"  type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-emergency-fund-goal">
              Emergency Fund Goal ($)
            </label>
            <input id="calc-emergency-fund-goal"  type="number" value={emergencyGoal} onChange={(e) => setEmergencyGoal(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-current-savings">
              Current Savings ($)
            </label>
            <input id="calc-current-savings"  type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📊" label="Savings Rate" value={`${savingsRate.toLocaleString('en-US', { maximumFractionDigits: 1 })}%`} highlight />
        <ResultCard icon="💵" label="After Tax Income" value={`$${afterTaxIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="💰" label="Monthly Surplus" value={`$${surplus.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="🏦" label="Months to Emergency Goal" value={surplus > 0 ? `${monthsToGoal} months` : 'N/A'} highlight />
        <ResultCard icon="📅" label="Annual Surplus" value={`$${annualSurplus.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Monthly Income" value={`$${income.toLocaleString()}`} />
        <ResultRow label="Estimated Tax Rate" value={`${tax}%`} />
        <ResultRow label="Taxes" value={`-$${(income * tax / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="After Tax Income" value={`$${afterTaxIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Expenses" value={`-$${expenses.toLocaleString()}`} />
        <ResultRow label="Monthly Surplus" value={`$${surplus.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Savings Rate" value={`${savingsRate.toLocaleString('en-US', { maximumFractionDigits: 1 })}%`} bold />
        <ResultRow label="Emergency Fund Goal" value={`$${goal.toLocaleString()}`} />
        <ResultRow label="Current Savings" value={`$${current.toLocaleString()}`} />
        <ResultRow label="Remaining to Goal" value={`$${Math.max(0, goal - current).toLocaleString()}`} />
        <ResultRow label="Months to Reach Goal" value={surplus > 0 ? `${monthsToGoal} months` : 'Cannot reach goal at current rate'} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Aim for a savings rate of at least 20% (including retirement). Freelancers should target 3–6 months of expenses in an emergency fund, or more for variable income. The tax rate should include federal, state, and self employment taxes. Adjust expenses to include both business and personal costs. Does not account for investment growth on savings.</p>
      </div>
    </div>
  );
}
