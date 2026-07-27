'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency, formatPercent } from '@/lib/tax';

export default function BusinessLoanInterest() {
  const [loanAmount, setLoanAmount] = useState('100000');
  const [interestRate, setInterestRate] = useState('8');
  const [loanTerm, setLoanTerm] = useState('5');
  const [originationFee, setOriginationFee] = useState('2');

  const principal = parseFloat(loanAmount) || 0;
  const annualRate = (parseFloat(interestRate) || 0) / 100;
  const years = parseInt(loanTerm) || 1;
  const feeRate = (parseFloat(originationFee) || 0) / 100;

  const monthlyRate = annualRate / 12;
  const totalMonths = years * 12;
  const monthlyPayment = monthlyRate > 0
    ? principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : principal / totalMonths;

  const totalPaid = monthlyPayment * totalMonths;
  const totalInterest = totalPaid - principal;
  const originationFeeAmount = principal * feeRate;
  const totalCost = totalInterest + originationFeeAmount;
  const apr = principal > 0 ? ((totalCost / principal) / years) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Business Loan Interest Calculator" subtitle="Calculate monthly payments, total interest, and true cost of your business loan" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Loan Amount ($)</label>
            <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Interest Rate (%)</label>
            <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Loan Term (Years)</label>
            <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Origination Fee (%)</label>
            <input type="number" value={originationFee} onChange={(e) => setOriginationFee(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📅" label="Monthly Payment" value={formatCurrency(monthlyPayment)} highlight />
        <ResultCard icon="🏦" label="Total Interest" value={formatCurrency(totalInterest)} />
        <ResultCard icon="📝" label="Origination Fee" value={formatCurrency(originationFeeAmount)} />
        <ResultCard icon="💰" label="Total Cost of Loan" value={formatCurrency(totalCost)} highlight />
        <ResultCard icon="📊" label="Effective APR" value={formatPercent(apr)} subtitle="Includes fees" />
        <ResultCard icon="🔢" label="Total Payments" value={formatCurrency(totalPaid)} subtitle={`${totalMonths} months`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Loan Cost Breakdown</div>
        <ResultRow label="Loan Amount" value={formatCurrency(principal)} />
        <ResultRow label="Interest Rate" value={formatPercent(annualRate * 100)} />
        <ResultRow label={`Monthly Payment (${totalMonths} months)`} value={formatCurrency(monthlyPayment)} />
        <ResultRow label="Total Interest Paid" value={formatCurrency(totalInterest)} />
        <ResultRow label="Origination Fee" value={formatCurrency(originationFeeAmount)} />
        <ResultRow label="Total Cost" value={formatCurrency(totalCost)} bold />
        <ResultRow label="Effective APR" value={formatPercent(apr)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> Uses standard amortization formula (PMT). Monthly payment assumes fixed-rate loan with equal payments. APR is simplified: total cost / principal / years. Actual APR may differ due to compounding frequency, closing costs, and fees. Does not include potential prepayment penalties or variable rate adjustments.</p>
      </div>
    </div>
  );
}
