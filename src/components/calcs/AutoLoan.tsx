'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function AutoLoanCalc() {
  const [price, setPrice] = useState('35000');
  const [downPayment, setDownPayment] = useState('5000');
  const [tradeIn, setTradeIn] = useState('3000');
  const [salesTaxRate, setSalesTaxRate] = useState('7');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('60');

  const p = parseFloat(price) || 0;
  const dp = parseFloat(downPayment) || 0;
  const ti = parseFloat(tradeIn) || 0;
  const tax = (parseFloat(salesTaxRate) || 0) / 100;
  const rate = (parseFloat(interestRate) || 0) / 100;
  const termMonths = Math.max(1, parseInt(loanTerm) || 60);

  const salesTaxAmount = Math.max(0, p - ti) * tax;
  const loanAmount = Math.max(0, p + salesTaxAmount - dp - ti);
  const monthlyRate = rate / 12;

  const monthlyPayment = monthlyRate > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1)
    : loanAmount / termMonths;
  const totalInterest = loanAmount > 0 ? monthlyPayment * termMonths - loanAmount : 0;
  const totalCost = dp + ti + totalInterest + loanAmount;

  return (
    <div>
      <SectionHeader title="Auto Loan Calculator" subtitle="Calculate monthly car payments and total loan cost" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-vehicle-price">Vehicle Price ($)</label>
            <input id="calc-vehicle-price"  type="number" value={price} onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-down-payment">Down Payment ($)</label>
            <input id="calc-down-payment"  type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-trade-in-value">Trade-In Value ($)</label>
            <input id="calc-trade-in-value"  type="number" value={tradeIn} onChange={(e) => setTradeIn(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-sales-tax-rate">Sales Tax Rate (%)</label>
            <input id="calc-sales-tax-rate"  type="number" value={salesTaxRate} onChange={(e) => setSalesTaxRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
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
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-loan-term-months">Loan Term (months)</label>
            <input id="calc-loan-term-months"  type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💵" label="Monthly Payment" value={formatCurrency(monthlyPayment)} highlight />
        <ResultCard icon="🏦" label="Loan Amount" value={formatCurrency(loanAmount)} />
        <ResultCard icon="📈" label="Total Interest" value={formatCurrency(totalInterest)} />
        <ResultCard icon="💰" label="Total Cost" value={formatCurrency(totalCost)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Vehicle Price" value={formatCurrency(p)} />
        <ResultRow label="Sales Tax" value={formatCurrency(salesTaxAmount)} />
        <ResultRow label="Down Payment" value={`-${formatCurrency(dp)}`} />
        <ResultRow label="Trade-In" value={`-${formatCurrency(ti)}`} />
        <ResultRow label="Loan Amount" value={formatCurrency(loanAmount)} bold />
        <ResultRow label={`Interest Rate (${(rate * 100).toFixed(1)}% APR)`} value={`${loanTerm} months`} />
        <ResultRow label="Monthly Payment" value={formatCurrency(monthlyPayment)} bold />
        <ResultRow label="Total Interest Paid" value={formatCurrency(totalInterest)} />
        <ResultRow label="Total Cost of Loan" value={formatCurrency(totalCost)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Calculates using the standard auto loan amortization formula: M = P × [r(1+r)^n] / [(1+r)^n − 1]. Assumes sales tax is financed into the loan and a fixed APR over the full term. Does not include dealer fees, registration, or extended warranties. The average new car loan term in the US is around 68 months — longer terms mean lower payments but far more interest.</p>
      </div>
    </div>
  );
}
