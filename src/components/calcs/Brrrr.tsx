'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function BrrrrCalc() {
  const [purchasePrice, setPurchasePrice] = useState('150000');
  const [repairCosts, setRepairCosts] = useState('30000');
  const [arv, setArv] = useState('250000');
  const [refinanceLtv, setRefinanceLtv] = useState('75');
  const [monthlyRent, setMonthlyRent] = useState('2000');
  const [monthlyMortgage, setMonthlyMortgage] = useState('900');
  const [otherMonthlyExpenses, setOtherMonthlyExpenses] = useState('300');

  const pp = parseFloat(purchasePrice) || 0;
  const rc = parseFloat(repairCosts) || 0;
  const arvVal = parseFloat(arv) || 0;
  const ltv = parseFloat(refinanceLtv) || 75;
  const rent = parseFloat(monthlyRent) || 0;
  const mortgage = parseFloat(monthlyMortgage) || 0;
  const other = parseFloat(otherMonthlyExpenses) || 0;

  const allInCost = pp + rc;
  const loanAmount = arvVal * (ltv / 100);
  const cashLeftInDeal = Math.max(0, allInCost - loanAmount);
  const annualCashFlow = (rent - mortgage - other) * 12;
  const monthlyCashFlow = rent - mortgage - other;
  const cashOnCash = cashLeftInDeal > 0 ? (annualCashFlow / cashLeftInDeal) * 100 : 0;
  const equity = arvVal - loanAmount;

  return (
    <div>
      <SectionHeader title="BRRRR Method Calculator" subtitle="Buy, Rehab, Rent, Refinance, Repeat — analyze your deal" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Purchase Price ($)</label>
            <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Repair Costs ($)</label>
            <input type="number" value={repairCosts} onChange={(e) => setRepairCosts(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>After Repair Value (ARV, $)</label>
            <input type="number" value={arv} onChange={(e) => setArv(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Refinance LTV (% of ARV)</label>
            <input type="number" value={refinanceLtv} onChange={(e) => setRefinanceLtv(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Rent ($)</label>
            <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Mortgage ($)</label>
            <input type="number" value={monthlyMortgage} onChange={(e) => setMonthlyMortgage(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Other Monthly Expenses ($)</label>
            <input type="number" value={otherMonthlyExpenses} onChange={(e) => setOtherMonthlyExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="📊" label="Cash on Cash Return" value={`${cashOnCash.toFixed(2)}%`} highlight />
        <ResultCard icon="💵" label="Monthly Cash Flow" value={`$${monthlyCashFlow.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="💰" label="Annual Cash Flow" value={`$${annualCashFlow.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="🏦" label="Cash Left in Deal" value={`$${cashLeftInDeal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} />
        <ResultCard icon="🏠" label="Equity Position" value={`$${equity.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📋" label="Loan Amount" value={`$${loanAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Deal Breakdown</h3>
        <ResultRow label="Purchase Price" value={`$${pp.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Repair Costs" value={`$${rc.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="All in Cost" value={`$${allInCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="After Repair Value (ARV)" value={`$${arvVal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label={`Refinance Loan (${ltv}% of ARV)`} value={`$${loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Cash Left in Deal" value={`$${cashLeftInDeal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Equity (ARV - Loan)" value={`$${equity.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Monthly Cash Flow</h3>
        <ResultRow label="Monthly Rent" value={`$${rent.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Mortgage" value={`-$${mortgage.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Other Monthly Expenses" value={`-$${other.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Net Monthly Cash Flow" value={`$${monthlyCashFlow.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>The BRRRR method (Buy, Rehab, Rent, Refinance, Repeat) aims to recover most or all of your initial investment through a cash out refinance. This simplified calculator assumes you own the property free and clear before refinancing. Actual results depend on lender requirements, holding costs during rehab, and refinance terms. Consult a lender and real estate professional for precise analysis.</p>
      </div>
    </div>
  );
}
