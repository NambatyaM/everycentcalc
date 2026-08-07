'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function RentVsBuyNewCalc() {
  const [homePrice, setHomePrice] = useState('400000');
  const [monthlyRent, setMonthlyRent] = useState('2000');
  const [downPaymentPct, setDownPaymentPct] = useState('20');
  const [mortgageRate, setMortgageRate] = useState('6.5');
  const [propertyTaxRate, setPropertyTaxRate] = useState('1.2');
  const [annualInsurance, setAnnualInsurance] = useState('1500');
  const [rentIncrease, setRentIncrease] = useState('3');
  const [homeAppreciation, setHomeAppreciation] = useState('3');
  const [years, setYears] = useState('10');

  const hp = parseFloat(homePrice) || 0;
  const mr = parseFloat(monthlyRent) || 0;
  const dpPct = parseFloat(downPaymentPct) || 0;
  const ir = parseFloat(mortgageRate) || 0;
  const ptRate = parseFloat(propertyTaxRate) || 0;
  const ins = parseFloat(annualInsurance) || 0;
  const ri = parseFloat(rentIncrease) || 0;
  const ha = parseFloat(homeAppreciation) || 0;
  const yearsInput = parseInt(years);
  const yrs = Math.max(0, isNaN(yearsInput) ? 10 : yearsInput);

  const dpAmount = hp * (dpPct / 100);
  const loanAmount = hp - dpAmount;
  const monthlyRate = ir / 100 / 12;
  const totalPayments = 30 * 12;

  const monthlyPI = monthlyRate > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
    : loanAmount / totalPayments;

  const monthlyPropTax = hp * (ptRate / 100) / 12;
  const monthlyInsurance = ins / 12;
  const totalMonthlyBuy = monthlyPI + monthlyPropTax + monthlyInsurance;

  const months = Math.min(yrs * 12, totalPayments);

  const remainingBalance = (n: number) => {
    if (monthlyRate <= 0) return Math.max(0, loanAmount - monthlyPI * n);
    return loanAmount * Math.pow(1 + monthlyRate, n) - monthlyPI * (Math.pow(1 + monthlyRate, n) - 1) / monthlyRate;
  };

  const futureHomeValue = hp * Math.pow(1 + ha / 100, yrs);
  const loanBalance = remainingBalance(months);
  const equity = futureHomeValue - loanBalance;

  let totalRentPaid = 0;
  let currentRent = mr;
  for (let y = 0; y < yrs; y++) {
    totalRentPaid += currentRent * 12;
    currentRent *= (1 + ri / 100);
  }

  const totalMortgagePaid = monthlyPI * months;
  const totalPropTaxPaid = monthlyPropTax * months;
  const totalInsurancePaid = monthlyInsurance * months;
  const maintenanceCost = hp * 0.01 * yrs;
  const totalBuyCost = dpAmount + totalMortgagePaid + totalPropTaxPaid + totalInsurancePaid + maintenanceCost;

  const netBuyCost = totalBuyCost - equity;
  const netAdvantage = totalRentPaid - netBuyCost;
  const monthlyDiff = Math.abs(totalMonthlyBuy - mr);

  return (
    <div>
      <SectionHeader title="Rent vs. Buy Calculator (Updated)" subtitle="Compare the true cost of renting vs. buying over time" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Home Price ($)</label>
            <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)}
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
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Down Payment (%)</label>
            <input type="number" value={downPaymentPct} onChange={(e) => setDownPaymentPct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Mortgage Rate (%)</label>
            <input type="number" value={mortgageRate} onChange={(e) => setMortgageRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Years</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Property Tax (%/yr)</label>
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
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Home Appreciation (%/yr)</label>
            <input type="number" value={homeAppreciation} onChange={(e) => setHomeAppreciation(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Rent Increase (%/yr)</label>
          <input type="number" value={rentIncrease} onChange={(e) => setRentIncrease(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🏠" label="Buy Total Cost" value={`$${totalBuyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="🔑" label="Rent Total Cost" value={`$${totalRentPaid.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="💰" label="Net Advantage" value={`${netAdvantage >= 0 ? 'Buying' : 'Renting'} by $${Math.abs(netAdvantage).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight={netAdvantage > 0} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💳" label="Current Monthly Difference" value={`$${monthlyDiff.toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo`} />
        <ResultCard icon="📈" label="Equity Built" value={`$${equity.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Down Payment" value={`$${dpAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Mortgage (P&I)" value={`$${monthlyPI.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Tax" value={`$${monthlyPropTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Insurance" value={`$${monthlyInsurance.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Monthly Buy Cost" value={`$${totalMonthlyBuy.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label={`Home Value in ${yrs} yrs`} value={`$${futureHomeValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Remaining Loan Balance" value={`$${Math.max(0, loanBalance).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Equity" value={`$${equity.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Maintenance (1%/yr)" value={`$${maintenanceCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Net Buy Cost (after equity)" value={`$${netBuyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: netAdvantage > 0 ? 'var(--brand-light)' : 'var(--bg-secondary)', borderColor: netAdvantage > 0 ? 'var(--brand)' : 'var(--border)' }}>
        <p className="text-sm font-medium" style={{ color: netAdvantage > 0 ? 'var(--brand)' : 'var(--text-primary)' }}>
          {netAdvantage > 0
            ? `Buying is ~$${Math.abs(netAdvantage).toLocaleString('en-US', { maximumFractionDigits: 0 })} cheaper over ${yrs} years (net of equity).`
            : `Renting is ~$${Math.abs(netAdvantage).toLocaleString('en-US', { maximumFractionDigits: 0 })} cheaper over ${yrs} years.`}
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Includes mortgage payments, property taxes, insurance, maintenance, and equity from appreciation and paydown. Rent increases annually. Does not include: mortgage interest deduction, closing costs, PMI, HOA, or opportunity cost of down payment investment. Results are estimates for educational purposes.</p>
      </div>
    </div>
  );
}
