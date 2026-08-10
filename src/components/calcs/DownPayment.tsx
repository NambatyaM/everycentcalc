'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function DownPaymentCalc() {
  const [homePrice, setHomePrice] = useState('400000');
  const [downPaymentPct, setDownPaymentPct] = useState('20');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');

  const price = parseFloat(homePrice) || 0;
  const pct = (parseFloat(downPaymentPct) || 0) / 100;
  const rate = (parseFloat(interestRate) || 0) / 100;
  const years = Math.max(1, parseFloat(loanTerm) || 30);

  const downPayment = price * pct;
  const loanAmount = Math.max(0, price - downPayment);
  const monthlyRate = rate / 12;
  const months = years * 12;

  const monthlyPayment = monthlyRate > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    : loanAmount / months;

  const hasPMI = loanAmount > 0 && pct < 0.20;
  const pmiRate = hasPMI ? 0.0055 : 0;
  const annualPMI = loanAmount * pmiRate;
  const monthlyPMI = annualPMI / 12;
  const monthlyWithPMI = monthlyPayment + monthlyPMI;

  return (
    <div>
      <SectionHeader title="Down Payment Calculator" subtitle="Calculate your down payment, loan amount, and PMI" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-home-price">Home Price ($)</label>
            <input id="calc-home-price"  type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-down-payment">Down Payment (%)</label>
            <input id="calc-down-payment"  type="number" value={downPaymentPct} onChange={(e) => setDownPaymentPct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>20% avoids PMI; 3% minimum for FHA</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-interest-rate">Interest Rate (%)</label>
            <input id="calc-interest-rate"  type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-loan-term">Loan Term</label>
            <select id="calc-loan-term"  value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="30">30 years</option>
              <option value="15">15 years</option>
              <option value="20">20 years</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💰" label="Down Payment" value={formatCurrency(downPayment)} highlight />
        <ResultCard icon="🏦" label="Loan Amount" value={formatCurrency(loanAmount)} />
        <ResultCard icon="💵" label="Monthly Payment (P&I)" value={formatCurrency(monthlyPayment)} />
        {hasPMI && (
          <ResultCard icon="🛡️" label="Monthly PMI" value={formatCurrency(monthlyPMI)} subtitle="~0.55% of loan / 12" />
        )}
        {hasPMI && (
          <ResultCard icon="📊" label="Payment with PMI" value={formatCurrency(monthlyWithPMI)} />
        )}
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Home Price" value={formatCurrency(price)} />
        <ResultRow label="Down Payment" value={formatCurrency(downPayment)} bold />
        <ResultRow label="Down Payment %" value={`${(pct * 100).toFixed(1)}%`} />
        <ResultRow label="Loan Amount" value={formatCurrency(loanAmount)} />
        <ResultRow label="Monthly Payment (P&I)" value={formatCurrency(monthlyPayment)} />
        {hasPMI && <ResultRow label="Monthly PMI" value={formatCurrency(monthlyPMI)} />}
        {hasPMI && <ResultRow label="Total Monthly Payment" value={formatCurrency(monthlyWithPMI)} bold />}
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: hasPMI ? 'var(--bg-secondary)' : 'var(--brand-light)', borderColor: hasPMI ? 'var(--border)' : 'var(--brand)' }}>
        <p className="text-sm font-medium" style={{ color: hasPMI ? 'var(--text-primary)' : 'var(--brand)' }}>
          {hasPMI
            ? `With a ${(pct * 100).toFixed(0)}% down payment, you'll pay private mortgage insurance (about ${formatCurrency(monthlyPMI)}/month) until you reach 20% equity. Increasing your down payment to 20% could save you ${formatCurrency(annualPMI)} per year.`
            : pct >= 0.20
              ? `At ${(pct * 100).toFixed(0)}% down, you avoid PMI entirely.`
              : 'Enter your home price and down payment to estimate PMI and monthly payments.'}
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Calculates principal & interest only — property taxes, homeowners insurance, and HOA fees are not included. PMI assumed at 0.55% of the loan amount annually (typical for a 5-15% down payment), which applies only when the down payment is under 20%. FHA loans use MIP (mortgage insurance premium) instead, typically 0.55% for the life of the loan.</p>
      </div>
    </div>
  );
}