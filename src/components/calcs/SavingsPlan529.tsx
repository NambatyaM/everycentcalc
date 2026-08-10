'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function SavingsPlan529() {
  const [childAge, setChildAge] = useState('5');
  const [currentBalance, setCurrentBalance] = useState('10000');
  const [monthlyContribution, setMonthlyContribution] = useState('300');
  const [annualReturn, setAnnualReturn] = useState('6');
  const [collegeCostToday, setCollegeCostToday] = useState('35000');
  const [tuitionInflationRate, setTuitionInflationRate] = useState('5');
  const [yearsInSchool, setYearsInSchool] = useState('4');

  const ca = parseFloat(childAge) || 0;
  const cb = parseFloat(currentBalance) || 0;
  const mc = parseFloat(monthlyContribution) || 0;
  const ar = (parseFloat(annualReturn) || 0) / 100;
  const costToday = parseFloat(collegeCostToday) || 0;
  const tui = (parseFloat(tuitionInflationRate) || 0) / 100;
  const schoolYears = Math.max(1, parseFloat(yearsInSchool) || 4);

  const yearsUntilCollege = Math.max(1, 18 - ca);
  const monthlyRate = ar / 12;
  const months = yearsUntilCollege * 12;

  let projectedSavings: number;
  if (monthlyRate === 0) {
    projectedSavings = cb + mc * months;
  } else {
    projectedSavings = cb * Math.pow(1 + monthlyRate, months)
      + mc * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }
  if (!isFinite(projectedSavings)) projectedSavings = 0;

  const projectedAnnualCost = costToday * Math.pow(1 + tui, yearsUntilCollege);
  const projectedTotalCost = projectedAnnualCost * schoolYears;

  const shortfall = Math.max(0, projectedTotalCost - projectedSavings);
  const monthlyNeededToCover = projectedTotalCost > 0 && monthlyRate > 0
    ? Math.max(0, ((projectedTotalCost - cb * Math.pow(1 + monthlyRate, months)) * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1))
    : Math.max(0, (projectedTotalCost - cb) / months);
  const coveragePct = projectedTotalCost > 0 ? (projectedSavings / projectedTotalCost) * 100 : 0;

  return (
    <div>
      <SectionHeader title="529 College Savings Calculator" subtitle="Project your 529 savings and coverage for future college costs" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-child-s-current-age">Child's Current Age</label>
            <input id="calc-child-s-current-age"  type="number" value={childAge} onChange={(e) => setChildAge(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-current-529-balance">Current 529 Balance ($)</label>
            <input id="calc-current-529-balance"  type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-contribution">Monthly Contribution ($)</label>
            <input id="calc-monthly-contribution"  type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-expected-annual-return">Expected Annual Return (%)</label>
            <input id="calc-expected-annual-return"  type="number" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-annual-college-cost-today">Annual College Cost Today ($)</label>
            <input id="calc-annual-college-cost-today"  type="number" value={collegeCostToday} onChange={(e) => setCollegeCostToday(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Tuition + room & board. Avg public in-state: ~$26k</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-college-cost-inflation">College Cost Inflation (%)</label>
            <input id="calc-college-cost-inflation"  type="number" value={tuitionInflationRate} onChange={(e) => setTuitionInflationRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-years-in-school">Years in School</label>
          <input id="calc-years-in-school"  type="number" value={yearsInSchool} onChange={(e) => setYearsInSchool(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🏦" label="Projected 529 Balance" value={formatCurrency(projectedSavings)} highlight />
        <ResultCard icon="🎓" label="Projected Total Cost" value={formatCurrency(projectedTotalCost)} />
        <ResultCard icon="📊" label="Cost Coverage" value={`${coveragePct.toFixed(0)}%`} subtitle={coveragePct >= 100 ? 'Fully covered' : 'Of projected cost'} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Child's Age Now" value={`${ca.toFixed(0)}`} />
        <ResultRow label="Years Until College" value={`${yearsUntilCollege} years`} />
        <ResultRow label="Projected 529 Balance" value={formatCurrency(projectedSavings)} bold />
        <ResultRow label="Projected Annual Cost" value={formatCurrency(projectedAnnualCost)} />
        <ResultRow label="Projected Total Cost (4 years)" value={formatCurrency(projectedTotalCost)} />
        <ResultRow label="Estimated Shortfall / Surplus" value={projectedSavings >= projectedTotalCost ? formatCurrency(projectedSavings - projectedTotalCost) : `-${formatCurrency(shortfall)}`} />
        <ResultRow label="Monthly Savings Needed to Cover" value={formatCurrency(monthlyNeededToCover)} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: coveragePct >= 70 ? 'var(--brand-light)' : 'var(--bg-secondary)', borderColor: coveragePct >= 70 ? 'var(--brand)' : 'var(--border)' }}>
        <p className="text-sm font-medium" style={{ color: coveragePct >= 70 ? 'var(--brand)' : 'var(--text-primary)' }}>
          {coveragePct >= 100
            ? `Your 529 is on track to cover the full projected cost of ${formatCurrency(projectedTotalCost)}.`
            : shortfall > 0
              ? `Your 529 would cover ${coveragePct.toFixed(0)}% of costs, leaving a ${formatCurrency(shortfall)} gap. Saving ${formatCurrency(monthlyNeededToCover)}/month would close it.`
              : 'Enter your details to see projected coveragePct.'}
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Assumes monthly compounding at 1/12 of the annual return and that the full 529 balance is used before college starts. Assumes the child starts at age 18. 529 earnings grow tax-free and are not taxed on qualified withdrawals for tuition, room, board, and books. Many states offer a state income tax deduction for contributions (typically up to $5,000-$10,000/yr).</p>
      </div>
    </div>
  );
}
