'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function MortgageInterestCalc() {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');

  const loan = parseFloat(loanAmount) || 0;
  const rate = parseFloat(interestRate) || 0;
  const term = parseInt(loanTerm) || 30;

  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;

  const monthlyPayment = monthlyRate > 0
    ? loan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : loan / numPayments;

  const totalPaid = monthlyPayment * numPayments;
  const totalInterest = totalPaid - loan;

  const firstMonthInterest = loan * monthlyRate;
  const firstMonthPrincipal = monthlyPayment - firstMonthInterest;
  const totalCostRatio = loan > 0 ? (totalInterest / loan) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Mortgage Interest Calculator" subtitle="See how much interest you'll pay over the life of your mortgage" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Loan Amount ($)</label>
          <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Interest Rate (%)</label>
            <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Loan Term</label>
            <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="30">30 years</option>
              <option value="20">20 years</option>
              <option value="15">15 years</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💳" label="Monthly Payment" value={`$${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📈" label="Total Interest Paid" value={`$${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📊" label="Interest-to-Loan Ratio" value={`${totalCostRatio.toFixed(1)}%`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💰" label="Total Cost" value={`$${totalPaid.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📋" label="First Month Interest" value={`$${firstMonthInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Loan Amount" value={`$${loan.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Payment" value={`$${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Payments" value={`${numPayments}`} />
        <ResultRow label="Total Paid" value={`$${totalPaid.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Interest" value={`$${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>First Month Breakdown</h3>
        <ResultRow label="Principal Payment" value={`$${firstMonthPrincipal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Interest Payment" value={`$${firstMonthInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Payment" value={`$${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Principal of Payment" value={`${((firstMonthPrincipal / monthlyPayment) * 100).toFixed(1)}%`} />
        <ResultRow label="Interest of Payment" value={`${((firstMonthInterest / monthlyPayment) * 100).toFixed(1)}%`} />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses the standard amortization formula. Early in the loan, a larger portion goes toward interest. Does not include taxes, insurance, PMI, or HOA fees. Consult a mortgage professional for exact figures.</p>
      </div>
    </div>
  );
}
