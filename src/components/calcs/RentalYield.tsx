'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function RentalYieldCalc() {
  const [propertyValue, setPropertyValue] = useState('300000');
  const [annualRentalIncome, setAnnualRentalIncome] = useState('24000');
  const [annualExpenses, setAnnualExpenses] = useState('6000');
  const [vacancyRate, setVacancyRate] = useState('5');

  const value = parseFloat(propertyValue) || 0;
  const rent = parseFloat(annualRentalIncome) || 0;
  const expenses = parseFloat(annualExpenses) || 0;
  const vacancy = parseFloat(vacancyRate) || 0;

  const effectiveRent = rent * (1 - vacancy / 100);
  const netYield = value > 0 ? ((effectiveRent - expenses) / value) * 100 : 0;
  const grossYield = value > 0 ? (effectiveRent / value) * 100 : 0;
  const annualNetIncome = effectiveRent - expenses;
  const monthlyNetIncome = annualNetIncome / 12;
  const monthlyGross = effectiveRent / 12;

  return (
    <div>
      <SectionHeader title="Rental Yield Calculator" subtitle="Evaluate the return on investment from rental income" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-property-value">Property Value ($)</label>
          <input id="calc-property-value"  type="number" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-annual-rental-income">Annual Rental Income ($)</label>
            <input id="calc-annual-rental-income"  type="number" value={annualRentalIncome} onChange={(e) => setAnnualRentalIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-annual-expenses">Annual Expenses ($)</label>
            <input id="calc-annual-expenses"  type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-vacancy-rate">Vacancy Rate (%)</label>
          <input id="calc-vacancy-rate"  type="number" value={vacancyRate} onChange={(e) => setVacancyRate(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📊" label="Net Rental Yield" value={`${netYield.toFixed(2)}%`} highlight />
        <ResultCard icon="📈" label="Gross Rental Yield" value={`${grossYield.toFixed(2)}%`} highlight />
        <ResultCard icon="💵" label="Annual Net Income" value={`$${annualNetIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💰" label="Monthly Net Income" value={`$${monthlyNetIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📅" label="Monthly Gross Income" value={`$${monthlyGross.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Property Value" value={`$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Annual Rental Income" value={`$${rent.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Vacancy Adjustment" value={`-${(vacancy).toFixed(1)}%`} />
        <ResultRow label="Effective Rental Income" value={`$${effectiveRent.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Annual Expenses" value={`-$${expenses.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Net Annual Income" value={`$${annualNetIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Net Yield" value={`${netYield.toFixed(2)}%`} bold />
        <ResultRow label="Gross Yield" value={`${grossYield.toFixed(2)}%`} />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Net yield accounts for operating expenses and vacancy. Does not include mortgage payments, taxes, or capital expenditures. A net yield above 4-6% is generally considered good in most markets. Consult a real estate professional for investment analysis.</p>
      </div>
    </div>
  );
}
