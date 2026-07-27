'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

interface Debt {
  name: string;
  balance: string;
  rate: string;
  minPayment: string;
}

interface PayoffResult {
  totalInterest: number;
  totalMonths: number;
  order: string[];
}

function simulatePayoff(debts: Debt[], extraPayment: number, strategy: 'avalanche' | 'snowball'): PayoffResult {
  const items = debts
    .map((d) => ({
      name: d.name,
      balance: parseFloat(d.balance) || 0,
      rate: (parseFloat(d.rate) || 0) / 100,
      minPayment: parseFloat(d.minPayment) || 0,
    }))
    .filter((d) => d.balance > 0);

  if (items.length === 0) return { totalInterest: 0, totalMonths: 0, order: [] };

  const orderList: string[] = [];
  let totalInterest = 0;
  let months = 0;
  let remaining = extraPayment;
  const paid: string[] = [];

  while (items.some((d) => d.balance > 0) && months < 600) {
    months++;
    let available = remaining;

    items.forEach((d) => {
      if (d.balance <= 0) return;
      const interest = d.balance * (d.rate / 12);
      totalInterest += interest;
      d.balance += interest;
      const payment = Math.min(d.minPayment, d.balance);
      d.balance -= payment;
      available += Math.max(0, d.minPayment - payment);
    });

    const active = items.filter((d) => d.balance > 0);
    if (active.length > 0 && available > 0) {
      if (strategy === 'avalanche') {
        active.sort((a, b) => b.rate - a.rate);
      } else {
        active.sort((a, b) => a.balance - b.balance);
      }
      const target = active[0];
      const extra = Math.min(available, target.balance);
      target.balance -= extra;
    }

    items.forEach((d) => {
      if (d.balance <= 0 && !paid.includes(d.name)) {
        paid.push(d.name);
        if (!orderList.includes(d.name)) orderList.push(d.name);
      }
    });
  }

  return { totalInterest, totalMonths: months, order: orderList };
}

const DEFAULT_DEBTS: Debt[] = [
  { name: 'Credit Card', balance: '5000', rate: '22', minPayment: '100' },
  { name: 'Car Loan', balance: '12000', rate: '6', minPayment: '350' },
  { name: 'Student Loan', balance: '25000', rate: '5', minPayment: '300' },
];

export default function DebtAvalancheVsSnowballCalc() {
  const [debts, setDebts] = useState<Debt[]>(DEFAULT_DEBTS);
  const [extraPayment, setExtraPayment] = useState('200');

  const extra = parseFloat(extraPayment) || 0;
  const avalanche = simulatePayoff(debts, extra, 'avalanche');
  const snowball = simulatePayoff(debts, extra, 'snowball');

  const interestSaved = snowball.totalInterest - avalanche.totalInterest;
  const monthsSaved = snowball.totalMonths - avalanche.totalMonths;
  const betterStrategy = interestSaved > 0 ? 'Avalanche' : interestSaved < 0 ? 'Snowball' : 'Equal';

  const updateDebt = (index: number, field: keyof Debt, value: string) => {
    setDebts((prev) => prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)));
  };

  return (
    <div>
      <SectionHeader title="Debt Avalanche vs Snowball Calculator" subtitle="Compare payoff strategies and find which saves you more" />

      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Your Debts</h3>
        {debts.map((debt, i) => (
          <div key={i} className="rounded-lg border p-3" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Name</label>
                <input type="text" value={debt.name} onChange={(e) => updateDebt(i, 'name', e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Balance ($)</label>
                <input type="number" value={debt.balance} onChange={(e) => updateDebt(i, 'balance', e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Rate (%)</label>
                <input type="number" value={debt.rate} onChange={(e) => updateDebt(i, 'rate', e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Min Payment ($)</label>
                <input type="number" value={debt.minPayment} onChange={(e) => updateDebt(i, 'minPayment', e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
            </div>
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Extra Monthly Payment ($)</label>
          <input type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🏔️" label="Avalanche Total Interest" value={formatCurrency(avalanche.totalInterest)} />
        <ResultCard icon="❄️" label="Snowball Total Interest" value={formatCurrency(snowball.totalInterest)} />
        <ResultCard icon="💰" label="Interest Saved" value={`${formatCurrency(Math.abs(interestSaved))}`} subtitle={`${betterStrategy} wins`} highlight />
        <ResultCard icon="📅" label="Avalanche Months" value={`${avalanche.totalMonths}`} />
        <ResultCard icon="📅" label="Snowball Months" value={`${snowball.totalMonths}`} />
        <ResultCard icon="⏱️" label="Months Saved" value={`${Math.abs(monthsSaved)}`} subtitle={`${betterStrategy} is faster`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Payoff Order Comparison</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Avalanche (highest interest first)</p>
            {avalanche.order.map((name, i) => (
              <ResultRow key={i} label={`${i + 1}. ${name}`} value={`${i + 1 === avalanche.order.length ? formatCurrency(debts.find((d) => d.name === name) ? parseFloat(debts.find((d) => d.name === name)!.balance) : 0) : ''}`} />
            ))}
          </div>
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Snowball (smallest balance first)</p>
            {snowball.order.map((name, i) => (
              <ResultRow key={i} label={`${i + 1}. ${name}`} value={`${i + 1 === snowball.order.length ? formatCurrency(debts.find((d) => d.name === name) ? parseFloat(debts.find((d) => d.name === name)!.balance) : 0) : ''}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Avalanche pays highest interest debt first to minimize total interest. Snowball pays smallest balances first for quick psychological wins. Both methods apply minimum payments to all debts while directing extra payments to the target debt. Actual savings depend on your specific debts and payment amounts.</p>
      </div>
    </div>
  );
}
