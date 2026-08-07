'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function MortgageAffordabilityCalc() {
  const [annualIncome, setAnnualIncome] = useState('100000');
  const [monthlyDebts, setMonthlyDebts] = useState('500');
  const [interestRate, setInterestRate] = useState('6.5');
  const [downPaymentPct, setDownPaymentPct] = useState('20');
  const [propertyTaxRate, setPropertyTaxRate] = useState('1.2');
  const [annualInsurance, setAnnualInsurance] = useState('1500');
  const [frontEndDTI, setFrontEndDTI] = useState('28');
  const [backEndDTI, setBackEndDTI] = useState('36');

  const income = parseFloat(annualIncome) || 0;
  const debts = parseFloat(monthlyDebts) || 0;
  const rate = parseFloat(interestRate) || 0;
  const dpPct = parseFloat(downPaymentPct) || 0;
  const taxRate = parseFloat(propertyTaxRate) || 0;
  const insurance = parseFloat(annualInsurance) || 0;
  const frontDTI = parseFloat(frontEndDTI) || 28;
  const backDTI = parseFloat(backEndDTI) || 36;

  const monthlyIncome = income / 12;
  const maxPITI = monthlyIncome * (backDTI / 100);
  const frontEndMax = monthlyIncome * (frontDTI / 100);
  const effectivePITI = Math.min(frontEndMax, Math.max(0, maxPITI - debts));

  const monthlyRate = rate / 100 / 12;
  const numPayments = 30 * 12;
  const pmtFactor = monthlyRate > 0 ? (1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate : numPayments;

  let maxHomePrice = 0;
  {
    let low = 0;
    let high = 5000000;
    for (let i = 0; i < 100; i++) {
      const mid = (low + high) / 2;
      const propTaxMonthly = mid * (taxRate / 100) / 12;
      const insMonthly = insurance / 12;
      const dpAmount = mid * (dpPct / 100);
      const loanAmount = mid - dpAmount;
      const pmt = loanAmount / pmtFactor;
      const totalPITI = pmt + propTaxMonthly + insMonthly;
      if (totalPITI <= effectivePITI) {
        low = mid;
      } else {
        high = mid;
      }
    }
    maxHomePrice = Math.floor((low + high) / 2 / 100) * 100;
  }

  const dpAmount = maxHomePrice * (dpPct / 100);
  const loanAmount = maxHomePrice - dpAmount;
  const monthlyPI = monthlyRate > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : loanAmount / numPayments;
  const propTaxMonthly = maxHomePrice * (taxRate / 100) / 12;
  const insMonthly = insurance / 12;
  const totalMonthly = monthlyPI + propTaxMonthly + insMonthly;

  const actualDTI = monthlyIncome > 0 ? ((totalMonthly + debts) / monthlyIncome) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Mortgage Affordability Calculator" subtitle="How much home can you afford based on your DTI ratio?" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Income ($)</label>
            <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Debts ($)</label>
            <input type="number" value={monthlyDebts} onChange={(e) => setMonthlyDebts(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Interest Rate (%)</label>
            <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Down Payment (%)</label>
            <input type="number" value={downPaymentPct} onChange={(e) => setDownPaymentPct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Property Tax Rate (%/yr)</label>
            <input type="number" value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Insurance ($)</label>
            <input type="number" value={annualInsurance} onChange={(e) => setAnnualInsurance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Loan Term</label>
            <select value="30" disabled
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="30">30 years</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Front End DTI (%)</label>
            <input type="number" value={frontEndDTI} onChange={(e) => setFrontEndDTI(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Back End DTI (%)</label>
            <input type="number" value={backEndDTI} onChange={(e) => setBackEndDTI(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🏦" label="Max Mortgage" value={`$${loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="🏠" label="Max Home Price" value={`$${maxHomePrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="💳" label="Monthly Payment" value={`$${totalMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="📊" label="Debt to Income Ratio" value={`${actualDTI.toFixed(1)}%`} />
        <ResultCard icon="💰" label="Max Monthly PITI" value={`$${maxPITI.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Monthly Income" value={`$${monthlyIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Front End Max" value={`$${frontEndMax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Back End Max" value={`$${maxPITI.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Down Payment Required" value={`$${dpAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Loan Amount" value={`$${loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly P&I" value={`$${monthlyPI.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Tax" value={`$${propTaxMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Insurance" value={`$${insMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Monthly PITI" value={`$${totalMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses configurable DTI (Debt to Income) ratios. Front end ratio covers housing costs only; back end ratio includes all debts. Does not include PMI (if down payment is less than 20%), HOA fees, or other housing costs. Consult a mortgage professional for exact figures.</p>
      </div>
    </div>
  );
}
