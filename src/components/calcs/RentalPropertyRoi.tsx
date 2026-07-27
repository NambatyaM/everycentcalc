'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function RentalPropertyRoiCalc() {
  const [purchasePrice, setPurchasePrice] = useState('300000');
  const [downPayment, setDownPayment] = useState('60000');
  const [mortgageRate, setMortgageRate] = useState('7');
  const [mortgageTerm, setMortgageTerm] = useState('30');
  const [monthlyRent, setMonthlyRent] = useState('2200');
  const [propertyTax, setPropertyTax] = useState('3600');
  const [insurance, setInsurance] = useState('1200');
  const [maintenancePct, setMaintenancePct] = useState('10');
  const [vacancyPct, setVacancyPct] = useState('5');
  const [managementPct, setManagementPct] = useState('8');

  const pp = parseFloat(purchasePrice) || 0;
  const dp = parseFloat(downPayment) || 0;
  const rate = parseFloat(mortgageRate) || 0;
  const term = parseInt(mortgageTerm) || 30;
  const rent = parseFloat(monthlyRent) || 0;
  const pt = parseFloat(propertyTax) || 0;
  const ins = parseFloat(insurance) || 0;
  const maintPct = parseFloat(maintenancePct) || 0;
  const vacPct = parseFloat(vacancyPct) || 0;
  const mgmtPct = parseFloat(managementPct) || 0;

  const loanAmount = Math.max(0, pp - dp);
  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;
  const monthlyMortgage = monthlyRate > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : loanAmount / numPayments;

  const annualMortgage = monthlyMortgage * 12;
  const annualIncome = rent * 12;
  const annualMaintenance = (maintPct / 100) * rent * 12;
  const annualVacancy = (vacPct / 100) * rent * 12;
  const annualManagement = (mgmtPct / 100) * rent * 12;
  const annualExpenses = pt + ins + annualMaintenance + annualVacancy + annualManagement;
  const annualCashFlow = annualIncome - annualExpenses - annualMortgage;
  const monthlyCashFlow = annualCashFlow / 12;
  const cashOnCash = dp > 0 ? (annualCashFlow / dp) * 100 : 0;
  const noi = annualIncome - annualExpenses;
  const capRate = pp > 0 ? (noi / pp) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Rental Property ROI Calculator" subtitle="Analyze cash flow, cap rate, and return on investment for rental properties" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Purchase Price ($)</label>
            <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Down Payment ($)</label>
            <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Mortgage Rate (%/yr)</label>
            <input type="number" value={mortgageRate} onChange={(e) => setMortgageRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Mortgage Term (yrs)</label>
            <input type="number" value={mortgageTerm} onChange={(e) => setMortgageTerm(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Rent ($)</label>
            <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Property Tax (annual $)</label>
            <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Insurance (annual $)</label>
            <input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Maintenance (% of rent)</label>
            <input type="number" value={maintenancePct} onChange={(e) => setMaintenancePct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Vacancy (% of rent)</label>
            <input type="number" value={vacancyPct} onChange={(e) => setVacancyPct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Management (% of rent)</label>
            <input type="number" value={managementPct} onChange={(e) => setManagementPct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💵" label="Monthly Cash Flow" value={`$${monthlyCashFlow.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="💰" label="Annual Cash Flow" value={`$${annualCashFlow.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📈" label="Cash on Cash Return" value={`${cashOnCash.toFixed(2)}%`} highlight />
        <ResultCard icon="🏠" label="Cap Rate" value={`${capRate.toFixed(2)}%`} />
        <ResultCard icon="🏦" label="Monthly Mortgage" value={`$${monthlyMortgage.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📊" label="Net Operating Income" value={`$${noi.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Expense Breakdown (Annual)</h3>
        <ResultRow label="Gross Rental Income" value={`$${annualIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Mortgage (P&I)" value={`$${annualMortgage.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Property Tax" value={`$${pt.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Insurance" value={`$${ins.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Maintenance" value={`$${annualMaintenance.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Vacancy Allowance" value={`$${annualVacancy.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Property Management" value={`$${annualManagement.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Expenses" value={`$${(annualExpenses + annualMortgage).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Loan Amount" value={`$${loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Down Payment" value={`$${dp.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>This calculator uses the standard amortization formula for mortgage payments. Expenses are estimated using common industry percentages. It does not include closing costs, HOA fees, capital expenditure reserves, or potential tax benefits. Consult a real estate professional for precise analysis.</p>
      </div>
    </div>
  );
}
