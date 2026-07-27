'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function RentVsBuyCalc() {
  const [homePrice, setHomePrice] = useState('400000');
  const [monthlyRent, setMonthlyRent] = useState('2000');
  const [downPaymentPct, setDownPaymentPct] = useState('20');
  const [mortgageRate, setMortgageRate] = useState('7');
  const [years, setYears] = useState('7');
  const [propertyTaxRate, setPropertyTaxRate] = useState('1.2');
  const [appreciation, setAppreciation] = useState('3');
  const [rentIncrease, setRentIncrease] = useState('3');

  const hp = parseFloat(homePrice) || 0;
  const mr = parseFloat(monthlyRent) || 0;
  const dpPct = parseFloat(downPaymentPct) || 0;
  const ir = parseFloat(mortgageRate) || 0;
  const yrs = parseInt(years) || 7;
  const ptRate = parseFloat(propertyTaxRate) || 0;
  const appr = parseFloat(appreciation) || 0;
  const ri = parseFloat(rentIncrease) || 0;

  const dpAmount = hp * (dpPct / 100);
  const loanAmount = hp - dpAmount;
  const monthlyRate = ir / 100 / 12;
  const totalPayments = 30 * 12;

  // Monthly P&I using standard amortization formula
  const monthlyPI = monthlyRate > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
    : loanAmount / totalPayments;

  const monthlyPropTax = hp * (ptRate / 100) / 12;
  const monthlyInsurance = hp * 0.003 / 12;
  const totalMonthlyOwn = monthlyPI + monthlyPropTax + monthlyInsurance;

  // Remaining balance after n months of 30-year amortization
  const remainingBalance = (n: number) => {
    if (monthlyRate <= 0) return Math.max(0, loanAmount - monthlyPI * n);
    return loanAmount * Math.pow(1 + monthlyRate, n) - monthlyPI * (Math.pow(1 + monthlyRate, n) - 1) / monthlyRate;
  };

  const months = yrs * 12;
  const futureHomeValue = hp * Math.pow(1 + appr / 100, yrs);
  const loanBalance = remainingBalance(months);
  const equityFromPaydown = loanAmount - Math.max(0, loanBalance);
  const equityFromAppreciation = futureHomeValue - hp;
  const totalEquity = equityFromPaydown + equityFromAppreciation;

  // Total rent paid over period (with annual increases)
  let totalRentPaid = 0;
  let currentRent = mr;
  for (let y = 0; y < yrs; y++) {
    totalRentPaid += currentRent * 12;
    currentRent *= (1 + ri / 100);
  }

  // Total cost of buying over period
  const totalMortgagePaid = monthlyPI * months;
  const totalPropTaxPaid = monthlyPropTax * months;
  const totalInsurancePaid = monthlyInsurance * months;
  const totalOwnCost = dpAmount + totalMortgagePaid + totalPropTaxPaid + totalInsurancePaid;

  // Net cost = total out of pocket - equity gained
  const netBuyCost = totalOwnCost - totalEquity;
  const monthlyOwnership = totalMonthlyOwn;

  return (
    <div>
      <SectionHeader title="Rent vs. Buy Calculator" subtitle="Compare the true cost of renting vs. buying over time" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
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
        <div className="grid grid-cols-3 gap-4">
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
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Property Tax (%/yr)</label>
            <input type="number" value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Home Appreciation (%/yr)</label>
            <input type="number" value={appreciation} onChange={(e) => setAppreciation(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Rent Increase (%/yr)</label>
            <input type="number" value={rentIncrease} onChange={(e) => setRentIncrease(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="🏠" label="Total Buy Cost" value={`$${totalOwnCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="🔑" label="Total Rent Cost" value={`$${totalRentPaid.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📈" label="Equity Built" value={`$${totalEquity.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="💰" label="Net Buy Cost" value={`$${netBuyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Down Payment" value={`$${dpAmount.toLocaleString()}`} />
        <ResultRow label="Monthly P&I" value={`$${monthlyPI.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Tax + Insurance" value={`$${(monthlyPropTax + monthlyInsurance).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Monthly Ownership" value={`$${totalMonthlyOwn.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label={`Home Value in ${yrs} yrs`} value={`$${futureHomeValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Loan Balance Remaining" value={`$${Math.max(0, loanBalance).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Equity from Paydown" value={`$${equityFromPaydown.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Equity from Appreciation" value={`$${equityFromAppreciation.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: netBuyCost < totalRentPaid ? 'var(--brand-light)' : 'var(--bg-secondary)', borderColor: netBuyCost < totalRentPaid ? 'var(--brand)' : 'var(--border)' }}>
        <p className="text-sm font-medium" style={{ color: netBuyCost < totalRentPaid ? 'var(--brand)' : 'var(--text-primary)' }}>
          {netBuyCost < totalRentPaid
            ? `Buying is ~$${(totalRentPaid - netBuyCost).toLocaleString('en-US', { maximumFractionDigits: 0 })} cheaper over ${yrs} years (net of equity).`
            : `Renting is ~$${(netBuyCost - totalRentPaid).toLocaleString('en-US', { maximumFractionDigits: 0 })} cheaper over ${yrs} years.`}
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Does not include: mortgage interest tax deduction, maintenance (1-2% of home value/yr), HOA fees, PMI, closing costs (3-6%), or opportunity cost of investing the down payment. Rent includes projected annual increases. Results are estimates for educational purposes.</p>
      </div>
    </div>
  );
}
