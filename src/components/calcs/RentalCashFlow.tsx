'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function RentalCashFlowCalc() {
  const [monthlyRent, setMonthlyRent] = useState('2200');
  const [purchasePrice, setPurchasePrice] = useState('300000');
  const [downPayment, setDownPayment] = useState('60000');
  const [mortgageRate, setMortgageRate] = useState('7');
  const [mortgageTerm, setMortgageTerm] = useState('30');
  const [propertyTax, setPropertyTax] = useState('3600');
  const [insurance, setInsurance] = useState('1200');
  const [hoaFees, setHoaFees] = useState('0');
  const [managementPct, setManagementPct] = useState('8');
  const [vacancyPct, setVacancyPct] = useState('5');
  const [maintenancePct, setMaintenancePct] = useState('10');

  const rent = parseFloat(monthlyRent) || 0;
  const pp = parseFloat(purchasePrice) || 0;
  const dp = parseFloat(downPayment) || 0;
  const rate = parseFloat(mortgageRate) || 0;
  const termInput = parseInt(mortgageTerm);
  const term = Math.max(1, isNaN(termInput) ? 30 : termInput);
  const pt = parseFloat(propertyTax) || 0;
  const ins = parseFloat(insurance) || 0;
  const hoa = parseFloat(hoaFees) || 0;
  const mgmtPct = parseFloat(managementPct) || 0;
  const vacPct = parseFloat(vacancyPct) || 0;
  const maintPct = parseFloat(maintenancePct) || 0;

  const loanAmount = Math.max(0, pp - dp);
  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;
  const monthlyMortgage = monthlyRate > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : loanAmount / numPayments;

  const annualRent = rent * 12;
  const annualManagement = (mgmtPct / 100) * annualRent;
  const annualVacancy = (vacPct / 100) * annualRent;
  const annualMaintenance = (maintPct / 100) * annualRent;
  const annualMortgage = monthlyMortgage * 12;
  const annualExpenses = pt + ins + hoa + annualManagement + annualVacancy + annualMaintenance;
  const annualCashFlow = annualRent - annualMortgage - annualExpenses;
  const monthlyCashFlow = annualCashFlow / 12;
  const noi = annualRent - annualExpenses;
  const capRate = pp > 0 ? (noi / pp) * 100 : 0;
  const cashOnCash = dp > 0 ? (annualCashFlow / dp) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Rental Cash Flow Calculator" subtitle="See your monthly and annual cash flow after mortgage, taxes, insurance, management, vacancy, and maintenance" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-rent">Monthly Rent ($)</label>
            <input id="calc-monthly-rent"  type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-purchase-price">Purchase Price ($)</label>
            <input id="calc-purchase-price"  type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-down-payment">Down Payment ($)</label>
            <input id="calc-down-payment"  type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-mortgage-rate-yr">Mortgage Rate (%/yr)</label>
            <input id="calc-mortgage-rate-yr"  type="number" value={mortgageRate} onChange={(e) => setMortgageRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-mortgage-term-yrs">Mortgage Term (yrs)</label>
            <input id="calc-mortgage-term-yrs"  type="number" value={mortgageTerm} onChange={(e) => setMortgageTerm(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-property-tax-annual">Property Tax (annual $)</label>
            <input id="calc-property-tax-annual"  type="number" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-insurance-annual">Insurance (annual $)</label>
            <input id="calc-insurance-annual"  type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-hoa-fees-monthly">HOA Fees (monthly $)</label>
            <input id="calc-hoa-fees-monthly"  type="number" value={hoaFees} onChange={(e) => setHoaFees(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-management-of-rent">Management (% of rent)</label>
            <input id="calc-management-of-rent"  type="number" value={managementPct} onChange={(e) => setManagementPct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-vacancy-of-rent">Vacancy (% of rent)</label>
            <input id="calc-vacancy-of-rent"  type="number" value={vacancyPct} onChange={(e) => setVacancyPct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-maintenance-of-rent">Maintenance (% of rent)</label>
            <input id="calc-maintenance-of-rent"  type="number" value={maintenancePct} onChange={(e) => setMaintenancePct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💵" label="Monthly Cash Flow" value={formatCurrency(monthlyCashFlow)} highlight subtitle={monthlyCashFlow >= 0 ? 'Positive' : 'Negative'} />
        <ResultCard icon="💰" label="Annual Cash Flow" value={formatCurrency(annualCashFlow)} highlight />
        <ResultCard icon="📈" label="Cash on Cash Return" value={`${cashOnCash.toFixed(2)}%`} subtitle={`On ${formatCurrency(dp)} invested`} />
        <ResultCard icon="🏠" label="Cap Rate" value={`${capRate.toFixed(2)}%`} />
        <ResultCard icon="🏦" label="Monthly Mortgage" value={formatCurrency(monthlyMortgage)} />
        <ResultCard icon="📊" label="Net Operating Income" value={formatCurrency(noi)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Cash Flow Breakdown (Annual)</div>
        <ResultRow label="Gross Rental Income" value={formatCurrency(annualRent)} />
        <ResultRow label="Mortgage (P&I)" value={`-${formatCurrency(annualMortgage)}`} />
        <ResultRow label="Property Tax" value={`-${formatCurrency(pt)}`} />
        <ResultRow label="Insurance" value={`-${formatCurrency(ins)}`} />
        <ResultRow label="HOA Fees" value={`-${formatCurrency(hoa)}`} />
        <ResultRow label="Property Management" value={`-${formatCurrency(annualManagement)}`} />
        <ResultRow label="Vacancy Allowance" value={`-${formatCurrency(annualVacancy)}`} />
        <ResultRow label="Maintenance Reserve" value={`-${formatCurrency(annualMaintenance)}`} />
        <ResultRow label="Total Expenses" value={`-${formatCurrency(annualMortgage + annualExpenses)}`} bold />
        <ResultRow label="Annual Cash Flow" value={formatCurrency(annualCashFlow)} bold />
      </div>

      {monthlyCashFlow < 0 && (
        <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
          <p className="text-sm" style={{ color: 'var(--brand)' }}>
            ⚠️ This property produces negative cash flow of {formatCurrency(monthlyCashFlow)}/month. You are subsidizing the tenant. Consider raising rent, lowering your purchase price, or reducing debt service before closing.
          </p>
        </div>
      )}

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> Monthly cash flow = Rent − Mortgage (P&I) − Property taxes − Insurance − HOA − Management − Vacancy allowance − Maintenance reserve. Figures are estimates using your inputs and common reserve percentages. It does not include closing costs, capital expenditures, or income taxes. Consult a real estate professional before making investment decisions.</p>
      </div>
    </div>
  );
}