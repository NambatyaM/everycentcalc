'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function HouseAffordabilityCalc() {
  const [annualIncome, setAnnualIncome] = useState('100000');
  const [monthlyDebts, setMonthlyDebts] = useState('500');
  const [downPayment, setDownPayment] = useState('50000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [propertyTaxRate, setPropertyTaxRate] = useState('1.2');
  const [annualInsurance, setAnnualInsurance] = useState('1500');

  const income = parseFloat(annualIncome) || 0;
  const debts = parseFloat(monthlyDebts) || 0;
  const dp = parseFloat(downPayment) || 0;
  const rate = parseFloat(interestRate) || 0;
  const term = parseInt(loanTerm) || 30;
  const taxRate = parseFloat(propertyTaxRate) || 0;
  const insurance = parseFloat(annualInsurance) || 0;

  const monthlyIncome = income / 12;
  const frontEndLimit = monthlyIncome * 0.28;
  const backEndLimit = monthlyIncome * 0.36;
  const availableForPIT = Math.max(0, Math.min(frontEndLimit, backEndLimit - debts));

  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;

  let maxHomePrice = 0;
  if (monthlyRate > 0) {
    const pmtFactor = (1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate;
    let low = 0;
    let high = 5000000;
    for (let i = 0; i < 100; i++) {
      const mid = (low + high) / 2;
      const propTaxMonthly = mid * (taxRate / 100) / 12;
      const insMonthly = insurance / 12;
      const pmt = mid > dp ? (mid - dp) / pmtFactor : 0;
      if (pmt + propTaxMonthly + insMonthly <= availableForPIT) {
        low = mid;
      } else {
        high = mid;
      }
    }
    maxHomePrice = Math.floor((low + high) / 2 / 100) * 100;
  } else {
    maxHomePrice = Math.max(0, (availableForPIT - insurance / 12 + dp / numPayments) / (1 / numPayments + taxRate / 1200));
  }

  const loanAmount = Math.max(0, maxHomePrice - dp);
  const monthlyPI = monthlyRate > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : loanAmount / numPayments;
  const propTaxMonthly = maxHomePrice * (taxRate / 100) / 12;
  const insMonthly = insurance / 12;
  const totalMonthly = monthlyPI + propTaxMonthly + insMonthly;
  const totalPaid = totalMonthly * numPayments;
  const totalInterest = (monthlyPI * numPayments) - loanAmount;
  const downPaymentImpact = dp > 0 && maxHomePrice > 0 ? (dp / maxHomePrice) * 100 : 0;

  return (
    <div>
      <SectionHeader title="House Affordability Calculator" subtitle="Determine the maximum home price based on your income and debts" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-annual-gross-income">Annual Gross Income ($)</label>
            <input id="calc-annual-gross-income"  type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-debt-payments">Monthly Debt Payments ($)</label>
            <input id="calc-monthly-debt-payments"  type="number" value={monthlyDebts} onChange={(e) => setMonthlyDebts(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-down-payment">Down Payment ($)</label>
            <input id="calc-down-payment"  type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-interest-rate">Interest Rate (%)</label>
            <input id="calc-interest-rate"  type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-loan-term">Loan Term</label>
            <select id="calc-loan-term"  value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="30">30 years</option>
              <option value="20">20 years</option>
              <option value="15">15 years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-property-tax-rate-yr">Property Tax Rate (%/yr)</label>
            <input id="calc-property-tax-rate-yr"  type="number" value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-annual-insurance">Annual Insurance ($)</label>
            <input id="calc-annual-insurance"  type="number" value={annualInsurance} onChange={(e) => setAnnualInsurance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🏠" label="Max Home Price" value={`$${maxHomePrice.toLocaleString()}`} highlight />
        <ResultCard icon="💳" label="Monthly Payment" value={`$${totalMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📊" label="Down Payment Impact" value={`${downPaymentImpact.toFixed(1)}% of price`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📈" label="Total Interest Paid" value={`$${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📅" label="Total Loan Payments" value={`$${totalPaid.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="🏦" label="Loan Amount" value={`$${loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Front End Limit (28%)" value={`$${frontEndLimit.toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo`} />
        <ResultRow label="Back End Limit (36%)" value={`$${backEndLimit.toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo`} />
        <ResultRow label="Available After Debts" value={`$${availableForPIT.toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo`} />
        <ResultRow label="Monthly P&I" value={`$${monthlyPI.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Property Tax" value={`$${propTaxMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Insurance" value={`$${insMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Monthly" value={`$${totalMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses the 28/36 rule: front end DTI ratio of 28% (housing costs only) and back end DTI ratio of 36% (total debts). Does not account for PMI (required if down payment is less than 20%), HOA fees, or other housing costs. Consult a mortgage professional for exact figures.</p>
      </div>
    </div>
  );
}
