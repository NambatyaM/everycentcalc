'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function CreditCardPayoffCalc() {
  const [balance, setBalance] = useState('5000');
  const [apr, setApr] = useState('22');
  const [monthlyPayment, setMonthlyPayment] = useState('250');

  const bal = parseFloat(balance) || 0;
  const aprRate = (parseFloat(apr) || 0) / 100;
  const payment = parseFloat(monthlyPayment) || 0;

  const monthlyRate = aprRate / 12;

  let remaining = bal;
  let months = 0;
  let totalInterest = 0;
  let totalPaid = 0;
  const noProgress = monthlyRate > 0 && payment <= remaining * monthlyRate && remaining > 0;

  if (!noProgress && remaining > 0 && payment > 0) {
    while (remaining > 0 && months < 1200) {
      const interest = remaining * monthlyRate;
      totalInterest += interest;
      const principalPaid = Math.min(payment - interest, remaining);
      remaining = Math.max(0, remaining - principalPaid);
      totalPaid += principalPaid + interest;
      months++;
    }
  }

  const payoffMonths = noProgress ? null : months;
  const payoffYears = payoffMonths !== null ? (payoffMonths / 12).toFixed(1) : null;

  return (
    <div>
      <SectionHeader title="Credit Card Payoff Calculator" subtitle="See how long it takes to pay off your balance and how much interest you'll pay" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-current-balance">Current Balance ($)</label>
            <input id="calc-current-balance"  type="number" value={balance} onChange={(e) => setBalance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-apr">APR (%)</label>
            <input id="calc-apr"  type="number" value={apr} onChange={(e) => setApr(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-payment">Monthly Payment ($)</label>
          <input id="calc-monthly-payment"  type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      {noProgress && (
        <div className="rounded-lg border p-4 mb-6" style={{ background: '#fef2f2', borderColor: '#ef4444' }}>
          <p className="text-sm font-medium" style={{ color: '#dc2626' }}>
            Your monthly payment doesn&apos;t cover the interest accruing each month — the balance will never be paid off. Increase your payment or lower the APR (balance transfer or consolidation).
          </p>
        </div>
      )}

      {!noProgress && payoffMonths !== null && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <ResultCard icon="⏱️" label="Payoff Time" value={`${payoffMonths} months`} highlight subtitle={`${payoffYears} years`} />
          <ResultCard icon="📈" label="Total Interest" value={formatCurrency(totalInterest)} highlight />
          <ResultCard icon="🏦" label="Total Paid" value={formatCurrency(totalPaid)} />
        </div>
      )}

      {!noProgress && payoffMonths !== null && (
        <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
          <ResultRow label="Current Balance" value={formatCurrency(bal)} />
          <ResultRow label="APR" value={`${(aprRate * 100).toFixed(1)}%`} />
          <ResultRow label="Monthly Payment" value={formatCurrency(payment)} />
          <ResultRow label="Months to Pay Off" value={`${payoffMonths}`} bold />
          <ResultRow label="Total Interest" value={formatCurrency(totalInterest)} bold />
          <ResultRow label="Total Paid" value={formatCurrency(totalPaid)} bold />
        </div>
      )}

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          {noProgress
            ? 'Tip: The average credit card APR is over 20%. Paying more than the minimum — or consolidating to a 0% balance transfer — can save you hundreds in interest.'
            : payoffMonths !== null && payoffMonths > 12
              ? `At ${formatCurrency(payment)}/month, you'll pay off this card in ${payoffMonths} months and pay ${formatCurrency(totalInterest)} in interest. Paying just $50 more per month could cut your payoff time dramatically.`
              : 'Great — you can pay this card off in under a year. Consider automating the payment to avoid late fees and APR increases.'}
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Assumes a fixed APR and a fixed monthly payment with no new purchases. Interest is charged on the average daily balance, so making payments earlier in the cycle reduces interest slightly more than shown. The average US credit card APR was above 20% in 2026. Minimum payments typically only cover 1-2% of the balance, which is why carrying a balance is so expensive.</p>
      </div>
    </div>
  );
}
