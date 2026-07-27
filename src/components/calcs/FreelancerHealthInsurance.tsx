'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

const BASE_MONTHLY_COST: Record<string, number> = {
  Bronze: 350,
  Silver: 450,
  Gold: 600,
};

const AGE_MULTIPLIERS: [number, number, number][] = [
  [25, 0, 0.75],
  [35, 25, 0.9],
  [45, 35, 1.0],
  [55, 45, 1.3],
  [65, 55, 1.6],
];

function getAgeMultiplier(age: number): number {
  if (age < 25) return 0.75;
  if (age < 35) return 0.9;
  if (age < 45) return 1.0;
  if (age < 55) return 1.3;
  return 1.6;
}

export default function FreelancerHealthInsuranceCalc() {
  const [age, setAge] = useState('35');
  const [annualIncome, setAnnualIncome] = useState('75000');
  const [filingStatus, setFilingStatus] = useState('single');
  const [planType, setPlanType] = useState('Silver');

  const ageNum = parseFloat(age) || 35;
  const income = parseFloat(annualIncome) || 0;
  const baseMonthly = BASE_MONTHLY_COST[planType] || 450;

  // Age adjustment
  const ageMultiplier = getAgeMultiplier(ageNum);
  const ageAdjustedMonthly = baseMonthly * ageMultiplier;

  // Subsidy calculation (ACA-style simplified)
  const threshold = filingStatus === 'married' ? 117000 : 58320;
  let subsidyPct = 0;
  if (income < threshold) {
    subsidyPct = 0.3 * (1 - income / threshold);
  }
  const subsidyAmount = ageAdjustedMonthly * subsidyPct;
  const subsidizedMonthly = ageAdjustedMonthly - subsidyAmount;

  // Annual and tax deduction
  const annualPremium = subsidizedMonthly * 12;
  const marginalRate = income > 0 ? Math.min(0.37, 0.10 + (income > 50400 ? 0.02 : 0) + (income > 105700 ? 0.10 : 0) + (income > 201775 ? 0.02 : 0) + (income > 256225 ? 0.08 : 0) + (income > 640600 ? 0.03 : 0)) : 0.22;
  const taxSavings = annualPremium * marginalRate;
  const netAnnualCost = annualPremium - taxSavings;

  return (
    <div>
      <SectionHeader title="Freelancer Health Insurance Cost Estimator" subtitle="Estimate ACA marketplace premiums, subsidies, and self-employed tax deduction" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              placeholder="35"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Annual Income ($)
            </label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              placeholder="75000"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Filing Status
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Plan Type
            </label>
            <select
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="🏥" label="Monthly Premium" value={formatCurrency(subsidizedMonthly)} highlight />
        <ResultCard icon="📅" label="Annual Premium" value={formatCurrency(annualPremium)} highlight />
        <ResultCard icon="💵" label="Net Annual Cost" value={formatCurrency(netAnnualCost)} highlight />
        <ResultCard icon="🧾" label="Tax Savings" value={formatCurrency(taxSavings)} />
        <ResultCard icon="📉" label="Subsidy Amount" value={`${formatCurrency(subsidyAmount)}/mo`} />
        <ResultCard icon="📊" label="Age Multiplier" value={`${ageMultiplier.toFixed(2)}x`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label={`${planType} Base Monthly Cost`} value={formatCurrency(baseMonthly)} />
        <ResultRow label={`Age ${ageNum} Multiplier (${ageMultiplier.toFixed(2)}x)`} value={formatCurrency(ageAdjustedMonthly)} />
        <ResultRow label="Premium Subsidy" value={`-${formatCurrency(subsidyAmount)}`} />
        <ResultRow label="Subsidized Monthly Premium" value={formatCurrency(subsidizedMonthly)} bold />
        <ResultRow label="Annual Premium" value={formatCurrency(annualPremium)} />
        <ResultRow label="Self-Employed Deduction (100%)" value={`-${formatCurrency(annualPremium)}`} />
        <ResultRow label="Tax Savings (marginal rate)" value={`-${formatCurrency(taxSavings)}`} />
        <ResultRow label="Net Annual Cost" value={formatCurrency(netAnnualCost)} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          Self-employed individuals can deduct 100% of health insurance premiums from their income. Your estimated tax savings are <strong>{formatCurrency(taxSavings)}</strong> based on your marginal rate.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Note:</strong> Subsidies are simplified estimates based on ACA guidelines (threshold: $58,320 single / $117,000 MFJ). Actual premiums vary by location, insurer, and household size. The self-employed health insurance deduction is taken on Schedule 1, not Schedule C. Consult healthcare.gov or a tax professional for exact figures.</p>
      </div>
    </div>
  );
}
