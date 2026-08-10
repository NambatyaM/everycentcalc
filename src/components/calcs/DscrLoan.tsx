'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function DscrLoanCalc() {
  const [propertyValue, setPropertyValue] = useState('350000');
  const [loanAmount, setLoanAmount] = useState('280000');
  const [monthlyRent, setMonthlyRent] = useState('2500');
  const [monthlyPiti, setMonthlyPiti] = useState('1800');
  const [otherExpenses, setOtherExpenses] = useState('300');

  const value = parseFloat(propertyValue) || 0;
  const loan = parseFloat(loanAmount) || 0;
  const rent = parseFloat(monthlyRent) || 0;
  const piti = parseFloat(monthlyPiti) || 0;
  const expenses = parseFloat(otherExpenses) || 0;

  const debtService = piti + expenses;
  const dscr = debtService > 0 ? rent / debtService : 0;
  const monthlyCashFlow = rent - debtService;
  const annualCashFlow = monthlyCashFlow * 12;
  const closingCosts = loan * 0.02;
  const reserves = piti * 6;
  const cashNeeded = closingCosts + reserves;
  const ltv = value > 0 ? (loan / value) * 100 : 0;

  return (
    <div>
      <SectionHeader title="DSCR Loan Calculator" subtitle="Evaluate Debt Service Coverage Ratio for investment property loans" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-property-value">Property Value ($)</label>
            <input id="calc-property-value"  type="number" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-loan-amount">Loan Amount ($)</label>
            <input id="calc-loan-amount"  type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-rent">Monthly Rent ($)</label>
            <input id="calc-monthly-rent"  type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-piti">Monthly PITI ($)</label>
            <input id="calc-monthly-piti"  type="number" value={monthlyPiti} onChange={(e) => setMonthlyPiti(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-other-monthly-expenses">Other Monthly Expenses ($)</label>
            <input id="calc-other-monthly-expenses"  type="number" value={otherExpenses} onChange={(e) => setOtherExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📊" label="DSCR Ratio" value={`${dscr.toFixed(2)}x`} highlight={dscr >= 1.25} />
        <ResultCard icon="💵" label="Monthly Cash Flow" value={formatCurrency(monthlyCashFlow)} highlight={monthlyCashFlow > 0} />
        <ResultCard icon="💰" label="Annual Cash Flow" value={formatCurrency(annualCashFlow)} highlight={annualCashFlow > 0} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="🏦" label="Cash Needed to Close" value={`$${cashNeeded.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📈" label="Loan to Value" value={`${ltv.toFixed(1)}%`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Monthly Rent" value={`$${rent.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly PITI" value={`$${piti.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Other Expenses" value={`$${expenses.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Debt Service" value={`$${debtService.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="DSCR" value={`${dscr.toFixed(2)}x`} bold />
        <ResultRow label="Monthly Cash Flow" value={formatCurrency(monthlyCashFlow)} bold />
        <ResultRow label="Estimated Closing Costs (2%)" value={`$${closingCosts.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Recommended Reserves (6 mo PITI)" value={`$${reserves.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Cash Needed" value={`$${cashNeeded.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: dscr >= 1.25 ? 'var(--brand-light)' : 'var(--bg-secondary)', borderColor: dscr >= 1.25 ? 'var(--brand)' : 'var(--border)' }}>
        <p className="text-sm font-medium" style={{ color: dscr >= 1.25 ? 'var(--brand)' : 'var(--text-primary)' }}>
          {dscr >= 1.25
            ? `DSCR of ${dscr.toFixed(2)}x meets the typical 1.25x minimum requirement. This property qualifies for most DSCR loans.`
            : `DSCR of ${dscr.toFixed(2)}x is below the typical 1.25x minimum. Lenders may require additional reserves or a larger down payment.`}
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>DSCR (Debt Service Coverage Ratio) = Monthly Rent / (PITI + Expenses). Most DSCR lenders require a minimum ratio of 1.25x. Does not include vacancy, maintenance, or management fees in the calculation. Consult a lender for actual DSCR loan terms.</p>
      </div>
    </div>
  );
}
