'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function RetirementWithdrawalCalc() {
  const [savings, setSavings] = useState('1000000');
  const [annualReturn, setAnnualReturn] = useState('6');
  const [withdrawalRate, setWithdrawalRate] = useState('4');
  const [retirementYears, setRetirementYears] = useState('30');
  const [inflationRate, setInflationRate] = useState('3');

  const S = parseFloat(savings) || 0;
  const r = (parseFloat(annualReturn) || 0) / 100;
  const wr = (parseFloat(withdrawalRate) || 0) / 100;
  const years = Math.max(1, parseFloat(retirementYears) || 30);
  const inf = (parseFloat(inflationRate) || 0) / 100;

  const firstYearWithdrawal = S * wr;
  const monthlyWithdrawal = firstYearWithdrawal / 12;
  const annualWithdrawalInflationAdjusted = firstYearWithdrawal * Math.pow(1 + inf, years - 1);

  const monthlyRate = r / 12;
  const months = years * 12;

  let endingBalance: number;
  if (monthlyRate === 0) {
    endingBalance = S - (firstYearWithdrawal / 12) * months;
  } else {
    const pmt = monthlyWithdrawal;
    endingBalance = S * Math.pow(1 + monthlyRate, months)
      - pmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }

  const sustainable = endingBalance >= 0;
  const yearsMoneyLasts = endingBalance >= 0
    ? years
    : (() => {
        let bal = S;
        let m = 0;
        while (bal > 0 && m < 1200) {
          bal = bal * (1 + monthlyRate) - monthlyWithdrawal;
          m++;
        }
        return m / 12;
      })();

  return (
    <div>
      <SectionHeader title="Retirement Withdrawal Calculator" subtitle="Use the 4% rule and see how long your savings will last" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-retirement-savings">Retirement Savings ($)</label>
            <input id="calc-retirement-savings"  type="number" value={savings} onChange={(e) => setSavings(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-annual-return">Annual Return (%)</label>
            <input id="calc-annual-return"  type="number" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-withdrawal-rate">Withdrawal Rate (%)</label>
            <input id="calc-withdrawal-rate"  type="number" value={withdrawalRate} onChange={(e) => setWithdrawalRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-years-in-retirement">Years in Retirement</label>
            <input id="calc-years-in-retirement"  type="number" value={retirementYears} onChange={(e) => setRetirementYears(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-inflation-rate">Inflation Rate (%)</label>
          <input id="calc-inflation-rate"  type="number" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💵" label="First-Year Withdrawal" value={formatCurrency(firstYearWithdrawal)} highlight subtitle={`${formatCurrency(monthlyWithdrawal)}/month`} />
        <ResultCard icon="⏱️" label="How Long Savings Last" value={endingBalance >= 0 ? `${years} years+` : `${yearsMoneyLasts.toFixed(1)} years`} highlight={sustainable} />
        <ResultCard icon="📉" label="Ending Balance (after inflation)" value={formatCurrency(endingBalance)} highlight={sustainable} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Retirement Savings" value={formatCurrency(S)} />
        <ResultRow label="Withdrawal Rate" value={`${(wr * 100).toFixed(1)}%`} />
        <ResultRow label="First-Year Annual Withdrawal" value={formatCurrency(firstYearWithdrawal)} />
        <ResultRow label="First-Year Monthly Withdrawal" value={formatCurrency(monthlyWithdrawal)} />
        <ResultRow label="Inflation-Adjusted Withdrawal in Final Year" value={formatCurrency(annualWithdrawalInflationAdjusted)} />
        <ResultRow label="Ending Balance After Years" value={formatCurrency(endingBalance)} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: sustainable ? 'var(--brand-light)' : '#fef2f2', borderColor: sustainable ? 'var(--brand)' : '#ef4444' }}>
        <p className="text-sm font-medium" style={{ color: sustainable ? 'var(--brand)' : '#dc2626' }}>
          {sustainable
            ? `At a ${(wr * 100).toFixed(0)}% withdrawal rate, your savings of ${formatCurrency(S)} should last at least ${years} years, ending with ${formatCurrency(endingBalance)}.`
            : `Your savings run out after about ${yearsMoneyLasts.toFixed(1)} years. Lower your withdrawal rate below ${(wr * 100).toFixed(0)}%, reduce expenses, or increase savings.`}
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>The 4% rule says you can withdraw 4% of your nest egg in year one, increasing with inflation each year, with a high probability of lasting 30 years. This calculator uses a fixed monthly withdrawal (no annual inflation step-up) and compounds at 1/12 of the annual return. Real-world outcomes vary with market returns, sequence-of-returns risk, and taxes.</p>
      </div>
    </div>
  );
}
