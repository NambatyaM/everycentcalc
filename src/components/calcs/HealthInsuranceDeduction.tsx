'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function HealthInsuranceDeduction() {
  const [annualPremium, setAnnualPremium] = useState('12000');
  const [monthsCovered, setMonthsCovered] = useState('12');
  const [subsidies, setSubsidies] = useState('0');
  const [marginalRate, setMarginalRate] = useState('22');
  const [netSEIncome, setNetSEIncome] = useState('' as string);

  const premium = Math.max(0, parseFloat(annualPremium) || 0);
  const monthsInput = parseFloat(monthsCovered);
  const months = Math.min(12, Math.max(0, isNaN(monthsInput) ? 12 : monthsInput));
  const sub = Math.max(0, parseFloat(subsidies) || 0);
  const rate = Math.max(0, parseFloat(marginalRate) || 0);
  const seIncomeRaw = netSEIncome.trim();
  const seIncome = seIncomeRaw === '' ? undefined : Math.max(0, parseFloat(netSEIncome) || 0);

  const rawDeductible = Math.max(0, premium * (months / 12) - sub);
  const deductible = seIncome === undefined ? rawDeductible : Math.min(rawDeductible, seIncome);
  const taxSavings = deductible * (rate / 100);
  const monthlyPremium = premium / 12;

  return (
    <div>
      <SectionHeader title="Self Employed Health Insurance Deduction" subtitle="Estimate your tax savings from the self employed health insurance deduction" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-annual-health-insurance-premium">
            Annual Health Insurance Premium ($)
          </label>
          <input id="calc-annual-health-insurance-premium"  type="number" value={annualPremium} onChange={(e) => setAnnualPremium(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-months-covered">
              Months Covered
            </label>
            <input id="calc-months-covered"  type="number" value={monthsCovered} onChange={(e) => setMonthsCovered(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-other-insurance-subsidies">
              Other Insurance Subsidies ($)
            </label>
            <input id="calc-other-insurance-subsidies"  type="number" value={subsidies} onChange={(e) => setSubsidies(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Net Self Employment Income ($) <span style={{ opacity: 0.6 }}>(optional)</span>
            </label>
            <input type="number" value={netSEIncome} onChange={(e) => setNetSEIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-your-marginal-tax-rate">
            Your Marginal Tax Rate (%)
          </label>
          <input id="calc-your-marginal-tax-rate"  type="number" value={marginalRate} onChange={(e) => setMarginalRate(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🏥" label="Deductible Amount" value={`$${deductible.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="💰" label="Estimated Tax Savings" value={`$${taxSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📅" label="Monthly Premium" value={`$${monthlyPremium.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Annual Premium" value={`$${premium.toLocaleString()}`} />
        <ResultRow label="Months Covered" value={`${months} of 12`} />
        <ResultRow label="Prorated Premium" value={`$${(premium * months / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Less: Subsidies" value={`-$${sub.toLocaleString()}`} />
        {seIncome !== undefined && (
          <ResultRow label="Limited to Net SE Income" value={`$${seIncome.toLocaleString()}`} />
        )}
        <ResultRow label="Deductible Amount" value={`$${deductible.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Marginal Tax Rate" value={`${rate}%`} />
        <ResultRow label="Tax Savings" value={`$${taxSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Self employed individuals can deduct health insurance premiums for themselves, spouses, dependents, and children under 27. The deduction cannot exceed net self employment income and cannot be used to create a net loss. This is an above the line deduction (Form 1040, Schedule 1). Does not apply if you&apos;re eligible for an employer-subsidized plan.</p>
      </div>
    </div>
  );
}
