'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function CashFlow() {
  const [beginningBalance, setBeginningBalance] = useState('10000');
  const [monthlyIncome, setMonthlyIncome] = useState('15000');
  const [monthlyExpenses, setMonthlyExpenses] = useState('12000');
  const [oneTimeExpenses, setOneTimeExpenses] = useState('0');
  const [months, setMonths] = useState('12');

  const startBal = parseFloat(beginningBalance) || 0;
  const income = parseFloat(monthlyIncome) || 0;
  const expenses = parseFloat(monthlyExpenses) || 0;
  const oneTime = parseFloat(oneTimeExpenses) || 0;
  const monthsInput = parseInt(months);
  const numMonths = Math.max(0, Math.min(isNaN(monthsInput) ? 12 : monthsInput, 60));

  const monthlyCashFlow = income - expenses;
  let endBalance = startBal;
  let monthsUntilZero = -1;

  const monthData: { month: number; balance: number }[] = [];
  for (let i = 1; i <= numMonths; i++) {
    const monthExpense = i === 1 ? expenses + oneTime : expenses;
    endBalance = endBalance + income - monthExpense;
    monthData.push({ month: i, balance: endBalance });
    if (endBalance <= 0 && monthsUntilZero === -1) {
      monthsUntilZero = i;
    }
  }

  const cashFlowPositive = monthlyCashFlow > 0;

  return (
    <div>
      <SectionHeader title="Business Cash Flow Calculator" subtitle="Project your monthly cash flow and identify potential shortfalls" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-beginning-cash-balance">Beginning Cash Balance ($)</label>
            <input id="calc-beginning-cash-balance"  type="number" value={beginningBalance} onChange={(e) => setBeginningBalance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-income">Monthly Income ($)</label>
            <input id="calc-monthly-income"  type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-expenses">Monthly Expenses ($)</label>
            <input id="calc-monthly-expenses"  type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-one-time-expenses">One Time Expenses ($)</label>
            <input id="calc-one-time-expenses"  type="number" value={oneTimeExpenses} onChange={(e) => setOneTimeExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-months-to-project">Months to Project</label>
            <input id="calc-months-to-project"  type="number" value={months} onChange={(e) => setMonths(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💵" label="Monthly Cash Flow" value={formatCurrency(monthlyCashFlow)} highlight subtitle={cashFlowPositive ? 'Positive' : 'Negative'} />
        <ResultCard icon="🏦" label="Ending Balance" value={formatCurrency(endBalance)} highlight subtitle={`After ${numMonths} months`} />
        <ResultCard icon="⚠️" label="Months Until Zero" value={monthsUntilZero > 0 ? `${monthsUntilZero}` : 'N/A'} subtitle={monthsUntilZero > 0 ? 'Cash runs out' : cashFlowPositive ? 'Positive' : 'Negative'} />
        <ResultCard icon="📊" label="Cash Flow Status" value={cashFlowPositive ? 'Positive' : 'Negative'} subtitle={cashFlowPositive ? 'Sustainable' : 'Needs attention'} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Month by Month Projection</div>
        {monthData.map((d) => (
          <ResultRow key={d.month} label={`Month ${d.month}`} value={formatCurrency(d.balance)} bold={d.balance <= 0} />
        ))}
      </div>

      {!cashFlowPositive && (
        <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
          <p className="text-sm" style={{ color: 'var(--brand)' }}>
            ⚠️ Negative cash flow of {formatCurrency(Math.abs(monthlyCashFlow))}/month. {monthsUntilZero > 0 ? `Cash runs out in month ${monthsUntilZero}.` : 'Increase revenue or cut expenses to improve.'}
          </p>
        </div>
      )}

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>{numMonths > 0 && monthsInput > 60 && <span style={{ color: '#d97706', fontWeight: 600 }}>Note: Projection capped at 60 months.</span>}</p>
        <p><strong>Disclaimer:</strong> Simple cash flow projection assuming constant monthly income and expenses. One time expenses are applied in Month 1. Does not account for seasonal variations, tax payments, loan payments, or accounts receivable timing. Use for planning purposes only.</p>
      </div>
    </div>
  );
}
