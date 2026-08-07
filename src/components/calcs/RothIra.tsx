'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function RothIraCalc() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentBalance, setCurrentBalance] = useState('15000');
  const [annualContribution, setAnnualContribution] = useState('7000');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [taxRateAtRetirement, setTaxRateAtRetirement] = useState('22');

  const ca = parseFloat(currentAge) || 0;
  const ra = parseFloat(retirementAge) || 65;
  const cb = parseFloat(currentBalance) || 0;
  const ac = parseFloat(annualContribution) || 0;
  const ar = (parseFloat(annualReturn) || 0) / 100;
  const taxRetire = (parseFloat(taxRateAtRetirement) || 0) / 100;

  const years = Math.max(0, ra - ca);
  const monthlyRate = ar / 12;
  const months = years * 12;
  const monthlyContrib = ac / 12;

  let futureValue: number;
  if (monthlyRate === 0) {
    futureValue = cb + monthlyContrib * months;
  } else {
    futureValue = cb * Math.pow(1 + monthlyRate, months)
      + monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  }
  if (!isFinite(futureValue)) futureValue = 0;

  const totalContributions = cb + ac * years;
  const totalEarnings = Math.max(0, futureValue - totalContributions);
  const vsTraditionalEquivalent = futureValue / (1 - taxRetire);

  return (
    <div>
      <SectionHeader title="Roth IRA Calculator" subtitle="Project tax-free retirement growth with a Roth IRA" />

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
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Current Balance ($)</label>
            <input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Contribution ($)</label>
            <input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>2026 limit: $7,000 ($8,000 if 50+)</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Expected Annual Return (%)</label>
            <input type="number" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Expected Tax Rate in Retirement (%)</label>
            <input type="number" value={taxRateAtRetirement} onChange={(e) => setTaxRateAtRetirement(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      {ra <= ca && (
        <div className="rounded-lg border p-4 mb-6" style={{ background: '#fef2f2', borderColor: '#ef4444' }}>
          <p className="text-sm font-medium" style={{ color: '#dc2626' }}>
            Retirement age must be greater than your current age.
          </p>
        </div>
      )}

      {ra > ca && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            <ResultCard icon="🏦" label="Roth Value at Retirement" value={formatCurrency(futureValue)} highlight />
            <ResultCard icon="💰" label="Your Contributions" value={formatCurrency(totalContributions)} />
            <ResultCard icon="📈" label="Tax-Free Growth" value={formatCurrency(totalEarnings)} />
            <ResultCard icon="🏛️" label="Traditional Amount Needed for Same After-Tax" value={formatCurrency(vsTraditionalEquivalent)} subtitle={`${(taxRetire * 100).toFixed(0)}% tax on withdrawals`} />
          </div>

          <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
            <ResultRow label="Years Investing" value={`${years} years`} />
            <ResultRow label="Current Balance" value={formatCurrency(cb)} />
            <ResultRow label="Annual Contribution" value={formatCurrency(ac)} />
            <ResultRow label="Total Contributions" value={formatCurrency(totalContributions)} />
            <ResultRow label="Investment Earnings" value={formatCurrency(totalEarnings)} bold />
            <ResultRow label="Roth Value at Retirement" value={formatCurrency(futureValue)} bold />
          </div>

          <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
            <p className="text-sm" style={{ color: 'var(--brand)' }}>
              With <strong>{formatCurrency(ac)}/year</strong> from age {ca.toFixed(0)}, your Roth IRA could grow to <strong>{formatCurrency(futureValue)}</strong> by {ra.toFixed(0)}. Since withdrawals are tax-free, you&apos;d need <strong>{formatCurrency(vsTraditionalEquivalent)}</strong> in a pre-tax account to keep the same amount after {taxRetire * 100}% tax.
            </p>
          </div>
        </>
      )}

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Assumes monthly compounding at 1/12 of the annual return. Roth contributions are made with after-tax dollars, so withdrawals in retirement are tax-free (contributions anytime, earnings after age 59½ with a 5-year holding period). 2026 contribution limit: $7,000 ($8,000 if 50+), subject to MAGI income limits. Roth IRAs have no RMDs at any age.</p>
      </div>
    </div>
  );
}