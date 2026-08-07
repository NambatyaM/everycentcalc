'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function RetirementGapCalc() {
  const [currentAge, setCurrentAge] = useState('35');
  const [retireAge, setRetireAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('100000');
  const [monthlyContrib, setMonthlyContrib] = useState('1000');
  const [expectedReturn, setExpectedReturn] = useState('7');
  const [desiredIncome, setDesiredIncome] = useState('60000');
  const [lifeExpectancy, setLifeExpectancy] = useState('90');

  const ca = parseFloat(currentAge) || 0;
  const ra = parseFloat(retireAge) || 0;
  const cs = parseFloat(currentSavings) || 0;
  const mc = parseFloat(monthlyContrib) || 0;
  const r = (parseFloat(expectedReturn) || 0) / 100;
  const di = parseFloat(desiredIncome) || 0;
  const le = parseFloat(lifeExpectancy) || 0;

  const yearsToRetire = Math.max(0, ra - ca);
  const retirementYears = Math.max(0, le - ra);
  const monthlyRate = r / 12;
  const totalMonths = yearsToRetire * 12;
  const retirementMonths = retirementYears * 12;

  const projectedSavings = monthlyRate > 0
    ? cs * Math.pow(1 + monthlyRate, totalMonths) + mc * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
    : cs + mc * totalMonths;

  const retirementIncome = (() => {
    if (retirementMonths <= 0) return 0;
    if (monthlyRate === 0) return (projectedSavings / retirementMonths) * 12;
    return projectedSavings * monthlyRate * 12 / (1 - Math.pow(1 + monthlyRate, -retirementMonths));
  })();
  const annualGap = Math.max(0, di - retirementIncome);

  const extraMonthlyNeeded = (() => {
    if (annualGap <= 0 || yearsToRetire <= 0) return 0;
    if (retirementMonths <= 0) return 0;
    const monthlyGap = annualGap / 12;
    if (monthlyRate === 0) {
      const futureValueNeeded = monthlyGap * retirementMonths;
      return futureValueNeeded / totalMonths;
    }
    const futureValueNeeded = monthlyGap * (1 - Math.pow(1 + monthlyRate, -retirementMonths)) / monthlyRate;
    return futureValueNeeded * monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  })();

  const retiredWithGap = yearsToRetire <= 0 && annualGap > 0;

  return (
    <div>
      <SectionHeader title="Retirement Savings Gap Calculator" subtitle="Find out if you're on track for retirement" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Current Age</label>
            <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Retirement Age</label>
            <input type="number" value={retireAge} onChange={(e) => setRetireAge(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Current Savings ($)</label>
            <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Contribution ($)</label>
            <input type="number" value={monthlyContrib} onChange={(e) => setMonthlyContrib(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Expected Return (%)</label>
            <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Desired Retirement Income ($/year)</label>
            <input type="number" value={desiredIncome} onChange={(e) => setDesiredIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Life Expectancy</label>
          <input type="number" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💰" label="Projected Savings" value={formatCurrency(projectedSavings)} highlight />
        <ResultCard icon="🏦" label="Retirement Income from Savings" value={`${formatCurrency(retirementIncome)}/yr`} />
        <ResultCard icon="📉" label="Annual Gap" value={annualGap > 0 ? `${formatCurrency(annualGap)}/yr` : 'No Gap'} />
        <ResultCard icon="⚡" label="Extra Monthly Needed" value={retiredWithGap ? 'N/A' : extraMonthlyNeeded > 0 ? formatCurrency(extraMonthlyNeeded) : '$0'} subtitle={retiredWithGap ? 'Already at retirement age — no saving period remains' : ''} highlight={extraMonthlyNeeded > 0} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Years to Retirement" value={`${yearsToRetire}`} />
        <ResultRow label="Years in Retirement" value={`${retirementYears}`} />
        <ResultRow label="Projected Savings at Retirement" value={formatCurrency(projectedSavings)} />
        <ResultRow label="Annual Income from Savings" value={`${formatCurrency(retirementIncome)}/yr`} />
        <ResultRow label="Desired Income" value={`${formatCurrency(di)}/yr`} />
        <ResultRow label="Annual Shortfall" value={annualGap > 0 ? `${formatCurrency(annualGap)}/yr` : 'On Track'} bold />
        <ResultRow label="Extra Monthly Savings Needed" value={retiredWithGap ? 'N/A (already at retirement age)' : extraMonthlyNeeded > 0 ? formatCurrency(extraMonthlyNeeded) : '$0'} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Projected savings include monthly compounding on current savings and regular monthly contributions. Annual retirement income is calculated by amortizing savings over the expected retirement years, so savings are designed to last until your life expectancy. Actual retirement needs vary based on lifestyle, healthcare costs, and inflation. Consider consulting a financial advisor for personalized planning.</p>
      </div>
    </div>
  );
}
