'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function MortgageCalc() {
  const [loanAmount, setLoanAmount] = useState('320000');
  const [interestRate, setInterestRate] = useState('7');
  const [loanTerm, setLoanTerm] = useState('30');
  const [propertyTax, setPropertyTax] = useState('400');
  const [insurance, setInsurance] = useState('150');

  const la = parseFloat(loanAmount) || 0;
  const ir = parseFloat(interestRate) || 0;
  const lt = parseInt(loanTerm) || 30;
  const pt = parseFloat(propertyTax) || 0;
  const ins = parseFloat(insurance) || 0;

  const monthlyRate = ir / 100 / 12;
  const numPayments = lt * 12;
  const monthlyPI = monthlyRate > 0
    ? la * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : la / numPayments;

  const totalMonthly = monthlyPI + pt + ins;
  const totalPaid = monthlyPI * numPayments;
  const totalInterest = totalPaid - la;

  const amortization: { year: number; principal: number; interest: number; balance: number }[] = [];
  let balance = la;
  let yearPrincipal = 0;
  let yearInterest = 0;

  for (let m = 1; m <= numPayments; m++) {
    const intPayment = balance * monthlyRate;
    const prinPayment = monthlyPI - intPayment;
    balance = Math.max(0, balance - prinPayment);
    yearPrincipal += prinPayment;
    yearInterest += intPayment;

    if (m % 12 === 0) {
      amortization.push({
        year: m / 12,
        principal: yearPrincipal,
        interest: yearInterest,
        balance,
      });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  return (
    <div>
      <SectionHeader title="Mortgage Payment Calculator" subtitle="Calculate your monthly payment and total interest" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Loan Amount ($)</label>
          <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Interest Rate (%)</label>
            <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Loan Term (years)</label>
            <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="30">30 years</option>
              <option value="20">20 years</option>
              <option value="15">15 years</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Property Tax ($)</label>
            <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Insurance ($)</label>
            <input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="🏦" label="Monthly Payment (PITI)" value={`$${totalMonthly.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="💸" label="Total Interest Paid" value={`$${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📋" label="Principal & Interest" value={`$${monthlyPI.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📊" label="Total Amount Paid" value={`$${(totalPaid + (pt + ins) * numPayments).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Amortization Schedule (First 10 Years)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ color: 'var(--text-secondary)' }}>
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                <th className="text-left py-2 font-medium">Year</th>
                <th className="text-right py-2 font-medium">Principal</th>
                <th className="text-right py-2 font-medium">Interest</th>
                <th className="text-right py-2 font-medium">Balance</th>
              </tr>
            </thead>
            <tbody>
              {amortization.slice(0, 10).map((row) => (
                <tr key={row.year} className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <td className="py-2">{row.year}</td>
                  <td className="text-right font-mono">${row.principal.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                  <td className="text-right font-mono">${row.interest.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                  <td className="text-right font-mono">${row.balance.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>This calculator uses the standard amortization formula. It does not include PMI (typically required if down payment is less than 20%), HOA fees, or potential tax deductions. Consult a mortgage professional for exact figures.</p>
      </div>
    </div>
  );
}
