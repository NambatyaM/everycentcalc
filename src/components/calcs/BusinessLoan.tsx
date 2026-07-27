'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function BusinessLoanCalc() {
  const [loanAmount, setLoanAmount] = useState('100000');
  const [interestRate, setInterestRate] = useState('8');
  const [loanTerm, setLoanTerm] = useState('5');
  const [monthlyRevenue, setMonthlyRevenue] = useState('30000');
  const [profitMargin, setProfitMargin] = useState('25');

  const principal = parseFloat(loanAmount) || 0;
  const annualRate = parseFloat(interestRate) || 0;
  const years = parseFloat(loanTerm) || 1;
  const revenue = parseFloat(monthlyRevenue) || 0;
  const margin = parseFloat(profitMargin) || 0;

  const r = annualRate / 12 / 100;
  const n = years * 12;
  const monthlyPayment = r > 0 ? (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : principal / n;
  const totalPaid = monthlyPayment * n;
  const totalInterest = totalPaid - principal;

  const netIncome = revenue * (margin / 100);
  const debtServiceRatio = netIncome > 0 ? (monthlyPayment / netIncome) * 100 : 0;
  const maxAffordable = netIncome * 0.35;
  const canAfford = debtServiceRatio <= 35;

  const firstYearPrincipal = r > 0 ? (() => {
    let balance = principal;
    let totalP = 0;
    for (let i = 0; i < 12 && i < n; i++) {
      const interest = balance * r;
      const pmt = monthlyPayment - interest;
      totalP += pmt;
      balance -= pmt;
    }
    return totalP;
  })() : principal / 12 * 12;

  const firstYearInterest = Math.max(0, (monthlyPayment * 12) - firstYearPrincipal);

  return (
    <div>
      <SectionHeader title="Business Loan Affordability Calculator" subtitle="Can your business handle the loan payments?" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Loan Amount ($)</label>
          <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Interest Rate (% annual)</label>
            <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Loan Term (years)</label>
            <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Revenue ($)</label>
            <input type="number" value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Profit Margin %</label>
            <input type="number" value={profitMargin} onChange={(e) => setProfitMargin(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="rounded-lg border-2 p-4 mb-6" style={{ background: canAfford ? '#f0fdf4' : '#fef2f2', borderColor: canAfford ? '#16a34a' : '#dc2626' }}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: canAfford ? '#16a34a' : '#dc2626' }}>Affordability</span>
          <span className="text-lg font-bold font-mono" style={{ color: canAfford ? '#16a34a' : '#dc2626' }}>
            {canAfford ? 'Can Afford' : 'Too Expensive'}
          </span>
        </div>
        <p className="text-xs mt-1" style={{ color: canAfford ? '#16a34a' : '#dc2626' }}>
          Debt service ratio: {debtServiceRatio.toFixed(1)}% (35% threshold)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="📊" label="Monthly Payment" value={`$${monthlyPayment.toFixed(2)}`} highlight />
        <ResultCard icon="💳" label="Total Interest" value={`$${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="💰" label="Total Cost" value={`$${totalPaid.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📈" label="Debt Service Ratio" value={`${debtServiceRatio.toFixed(1)}%`} highlight={canAfford} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Loan Amount" value={`$${principal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Interest Rate" value={`${annualRate}%`} />
        <ResultRow label="Loan Term" value={`${years} years (${n} months)`} />
        <ResultRow label="Monthly Payment" value={`$${monthlyPayment.toFixed(2)}`} bold />
        <ResultRow label="Total Interest Paid" value={`$${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Total Cost" value={`$${totalPaid.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>First Year Breakdown</div>
        <ResultRow label="First Year Principal" value={`$${firstYearPrincipal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="First Year Interest" value={`$${firstYearInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="First Year Total" value={`$${(monthlyPayment * 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Affordability Analysis</div>
        <ResultRow label="Monthly Net Income" value={`$${netIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Max Affordable Payment (35%)" value={`$${maxAffordable.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Your Payment" value={`$${monthlyPayment.toFixed(2)}`} />
        <ResultRow label="Debt Service Ratio" value={`${debtServiceRatio.toFixed(1)}%`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1]. The 35% rule suggests keeping debt payments below 35% of net income for healthy cash flow. First year payments are weighted toward interest.</p>
      </div>
    </div>
  );
}
