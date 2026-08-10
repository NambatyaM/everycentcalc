'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function StudentLoanCalc() {
  const [balance, setBalance] = useState('35000');
  const [rate, setRate] = useState('6.8');
  const [termYears, setTermYears] = useState('10');
  const [income, setIncome] = useState('60000');

  const bal = parseFloat(balance) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const years = Math.max(1, parseFloat(termYears) || 10);
  const inc = parseFloat(income) || 0;

  const monthlyRate = r / 12;
  const months = years * 12;

  const monthlyPayment = monthlyRate > 0
    ? bal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    : bal / months;
  const totalPaid = monthlyPayment * months;
  const totalInterest = totalPaid - bal;
  const payoffYear = monthlyPayment > 0 ? Math.ceil(bal / monthlyPayment / 12) : 0;
  const incomePct = inc > 0 ? (monthlyPayment / (inc / 12)) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Student Loan Calculator" subtitle="Estimate monthly payments, total interest, and payoff time" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-loan-balance">Loan Balance ($)</label>
            <input id="calc-loan-balance"  type="number" value={balance} onChange={(e) => setBalance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-interest-rate">Interest Rate (%)</label>
            <input id="calc-interest-rate"  type="number" value={rate} onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-loan-term-years">Loan Term (years)</label>
            <input id="calc-loan-term-years"  type="number" value={termYears} onChange={(e) => setTermYears(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-gross-annual-income">Gross Annual Income ($)</label>
            <input id="calc-gross-annual-income"  type="number" value={income} onChange={(e) => setIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <ResultCard icon="💵" label="Monthly Payment" value={formatCurrency(monthlyPayment)} highlight />
        <ResultCard icon="📈" label="Total Interest" value={formatCurrency(totalInterest)} />
        <ResultCard icon="🏦" label="Total Paid" value={formatCurrency(totalPaid)} />
        <ResultCard icon="📊" label="Payment % of Income" value={`${incomePct.toFixed(1)}%`} highlight={incomePct > 10} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Loan Balance" value={formatCurrency(bal)} />
        <ResultRow label="Interest Rate" value={`${(r * 100).toFixed(2)}%`} />
        <ResultRow label="Loan Term" value={`${years} years (${months} months)`} />
        <ResultRow label="Monthly Payment" value={formatCurrency(monthlyPayment)} bold />
        <ResultRow label="Total Paid Over Term" value={formatCurrency(totalPaid)} />
        <ResultRow label="Total Interest" value={formatCurrency(totalInterest)} bold />
        <ResultRow label="Monthly Payment as % of Income" value={`${incomePct.toFixed(1)}%`} />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          {incomePct > 10
            ? `Your student loan payment is ${incomePct.toFixed(1)}% of your gross monthly income — above the 10% affordability guideline. Consider an income-driven repayment plan or refinancing to a lower rate.`
            : `Your student loan payment is ${incomePct.toFixed(1)}% of your gross monthly income, within the 10% affordability guideline.`}
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses the standard amortization formula for federal and private loans. Interest on federal student loans is simple interest but is capitalized when unpaid; this calculator assumes standard monthly payments. Income-driven repayment plans (SAVE, IBR, PAYE) cap payments at 10-20% of discretionary income and forgive the balance after 20-25 years. The average federal undergraduate rate is around 6.5%, and refinancing to a fixed 15-year private loan can reduce your rate by 1-3 points if you have good credit.</p>
      </div>
    </div>
  );
}
