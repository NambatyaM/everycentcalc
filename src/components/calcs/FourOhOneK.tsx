'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function FourOhOneKCalc() {
  const [currentAge, setCurrentAge] = useState('30');
  const [currentBalance, setCurrentBalance] = useState('10000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [matchPct, setMatchPct] = useState('50');
  const [salary, setSalary] = useState('60000');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [retirementAge, setRetirementAge] = useState('65');

  const ca = parseFloat(currentAge) || 0;
  const cb = parseFloat(currentBalance) || 0;
  const mc = parseFloat(monthlyContribution) || 0;
  const mp = parseFloat(matchPct) || 0;
  const sa = parseFloat(salary) || 0;
  const ar = parseFloat(annualReturn) || 0;
  const ra = parseFloat(retirementAge) || 65;

  const months = Math.max(1, (ra - ca) * 12);
  const monthlyRate = ar / 12 / 100;

  const maxMatchSalaryPct = 6;
  const annualMatchLimit = sa * (maxMatchSalaryPct / 100);
  const annualEmployeeContrib = mc * 12;
  const annualEmployerMatch = Math.min(annualEmployeeContrib, annualMatchLimit) * (mp / 100);
  const totalMonthly = mc + (annualEmployerMatch / 12);

  let futureValue: number;
  if (monthlyRate === 0) {
    futureValue = cb + totalMonthly * months;
  } else {
    futureValue = cb * Math.pow(1 + monthlyRate, months)
      + totalMonthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }

  if (!isFinite(futureValue)) futureValue = 0;

  const totalOwnContributions = mc * months;
  const totalEmployerMatch = (annualEmployerMatch / 12) * months;
  const totalEarnings = futureValue - cb - totalOwnContributions - totalEmployerMatch;

  return (
    <div>
      <SectionHeader title="401(k) Growth Calculator" subtitle="See how your 401(k) grows with contributions, employer match, and compound returns" />

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
            <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Current 401(k) Balance ($)</label>
            <input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Contribution ($)</label>
            <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>2026 max: $23,500/yr ($31,000 if 50+)</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Employer Match (%)</label>
            <input type="number" value={matchPct} onChange={(e) => setMatchPct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Typical: 50-100%</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Salary ($)</label>
            <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Used to calculate match limit (6% assumed)</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Expected Annual Return (%)</label>
            <input type="number" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Historical S&P 500 avg: ~10% (~7% inflation-adjusted)</p>
          </div>
        </div>
      </div>

      {ra > ca && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <ResultCard icon="🏦" label="Balance at Retirement" value={`$${futureValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
          <ResultCard icon="💰" label="Your Contributions" value={`$${totalOwnContributions.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
          <ResultCard icon="🏢" label="Employer Match" value={`$${totalEmployerMatch.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
          <ResultCard icon="📈" label="Investment Earnings" value={`$${Math.max(0, totalEarnings).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        </div>
      )}

      {ra <= ca && (
        <div className="rounded-lg border p-4 mb-6" style={{ background: '#fef2f2', borderColor: '#ef4444' }}>
          <p className="text-sm font-medium" style={{ color: '#dc2626' }}>
            Retirement age must be greater than your current age.
          </p>
        </div>
      )}

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Current Age" value={`${ca.toFixed(0)}`} />
        <ResultRow label="Retirement Age" value={`${ra.toFixed(0)}`} />
        <ResultRow label="Years Until Retirement" value={`${(ra - ca).toFixed(0)}`} />
        <ResultRow label="Current Balance" value={`$${cb.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Your Monthly Contribution" value={`$${mc.toFixed(2)}`} />
        <ResultRow label="Employer Match per Month" value={`$${(annualEmployerMatch / 12).toFixed(2)}`} />
        <ResultRow label="Total Monthly Contribution" value={`$${totalMonthly.toFixed(2)}`} bold />
        <ResultRow label="Your Total Contributions" value={`$${totalOwnContributions.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Employer Match" value={`$${totalEmployerMatch.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Investment Earnings" value={`$${Math.max(0, totalEarnings).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Projected Balance at Retirement" value={`$${futureValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          {ra > ca ? (
            <>Starting at age {ca.toFixed(0)} with ${cb.toLocaleString('en-US', { maximumFractionDigits: 0 })} and contributing ${mc.toFixed(0)}/month, your 401(k) could grow to <strong>${futureValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong> by age {ra.toFixed(0)} — including <strong>${totalEmployerMatch.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong> in free employer match money.</>
          ) : (
            <>Adjust your retirement age to be greater than your current age to see your projected balance.</>
          )}
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Assumes monthly compounding at 1/12 of the annual return rate. Employer match calculated as matchPct% of your contributions up to 6% of your salary (common standard). Actual match structures vary by employer. Does not account for contribution limit phase-ins, inflation, or tax implications. 2026 401(k) limit: $23,500 ($31,000 age 50+).</p>
      </div>
    </div>
  );
}
