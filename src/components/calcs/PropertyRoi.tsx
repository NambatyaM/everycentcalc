'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function PropertyRoiCalc() {
  const [purchasePrice, setPurchasePrice] = useState('300000');
  const [downPaymentPct, setDownPaymentPct] = useState('20');
  const [annualRent, setAnnualRent] = useState('24000');
  const [annualExpenses, setAnnualExpenses] = useState('8000');
  const [mortgageRate, setMortgageRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [appreciationRate, setAppreciationRate] = useState('3');
  const [holdingYears, setHoldingYears] = useState('10');

  const price = parseFloat(purchasePrice) || 0;
  const dpPct = parseFloat(downPaymentPct) || 0;
  const rent = parseFloat(annualRent) || 0;
  const expenses = parseFloat(annualExpenses) || 0;
  const rate = parseFloat(mortgageRate) || 0;
  const term = parseInt(loanTerm) || 30;
  const appr = parseFloat(appreciationRate) || 0;
  const years = parseInt(holdingYears) || 10;

  const downPayment = price * (dpPct / 100);
  const loan = price - downPayment;
  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;

  const monthlyMortgage = monthlyRate > 0
    ? loan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : loan / numPayments;

  const annualMortgage = monthlyMortgage * 12;
  const annualProfit = rent - expenses - annualMortgage;
  const cashOnCash = downPayment > 0 ? (annualProfit / downPayment) * 100 : 0;
  const futureValue = price * Math.pow(1 + appr / 100, years);

  let loanBalance = loan;
  for (let m = 0; m < years * 12; m++) {
    const intPayment = loanBalance * monthlyRate;
    const prinPayment = monthlyMortgage - intPayment;
    loanBalance = Math.max(0, loanBalance - prinPayment);
  }

  const totalReturn = (futureValue - loanBalance) - downPayment + (annualProfit * years);
  const totalRoi = downPayment > 0 ? (totalReturn / downPayment) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Property Investment ROI Calculator" subtitle="Evaluate rental property returns including appreciation and cash flow" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Purchase Price ($)</label>
            <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Down Payment (%)</label>
            <input type="number" value={downPaymentPct} onChange={(e) => setDownPaymentPct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Rent ($)</label>
            <input type="number" value={annualRent} onChange={(e) => setAnnualRent(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Expenses ($)</label>
            <input type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Mortgage Rate (%)</label>
            <input type="number" value={mortgageRate} onChange={(e) => setMortgageRate(e.target.value)}
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
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Appreciation (%/yr)</label>
            <input type="number" value={appreciationRate} onChange={(e) => setAppreciationRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Holding Period (years)</label>
          <input type="number" value={holdingYears} onChange={(e) => setHoldingYears(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📈" label="Cash on Cash Return" value={`${cashOnCash.toFixed(2)}%`} highlight />
        <ResultCard icon="💵" label="Annual Cash Flow" value={`$${annualProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="🏆" label="Total ROI" value={`${totalRoi.toFixed(2)}%`} highlight />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="🏠" label="Future Property Value" value={`$${futureValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="💰" label="Total Return" value={`$${totalReturn.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Down Payment" value={`$${downPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Loan Amount" value={`$${loan.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Mortgage" value={`$${monthlyMortgage.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Annual Mortgage" value={`$${annualMortgage.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Annual Cash Flow" value={`$${annualProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Loan Balance at Exit" value={`$${loanBalance.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Equity at Exit" value={`$${(futureValue - loanBalance).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Return" value={`$${totalReturn.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Includes cash flow, loan paydown, and property appreciation. Does not account for taxes, insurance, vacancies, maintenance reserves, or closing costs on purchase/sale. Actual returns will vary based on market conditions. Consult a financial advisor for investment decisions.</p>
      </div>
    </div>
  );
}
