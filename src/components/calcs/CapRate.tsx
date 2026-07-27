'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function CapRateCalc() {
  const [annualRentalIncome, setAnnualRentalIncome] = useState('36000');
  const [annualOperatingExpenses, setAnnualOperatingExpenses] = useState('12000');
  const [propertyValue, setPropertyValue] = useState('400000');

  const income = parseFloat(annualRentalIncome) || 0;
  const expenses = parseFloat(annualOperatingExpenses) || 0;
  const value = parseFloat(propertyValue) || 0;

  const noi = income - expenses;
  const capRate = value > 0 ? (noi / value) * 100 : 0;
  const impliedValues = [4, 5, 6, 7, 8, 10].map((rate) => ({
    rate,
    value: noi > 0 ? noi / (rate / 100) : 0,
  }));

  return (
    <div>
      <SectionHeader title="Cap Rate Calculator" subtitle="Calculate capitalization rate and implied property values" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Rental Income ($)</label>
            <input type="number" value={annualRentalIncome} onChange={(e) => setAnnualRentalIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Operating Expenses ($)</label>
            <input type="number" value={annualOperatingExpenses} onChange={(e) => setAnnualOperatingExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Property Value ($)</label>
          <input type="number" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="📊" label="Net Operating Income (NOI)" value={`$${noi.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📈" label="Cap Rate" value={`${capRate.toFixed(2)}%`} highlight />
        <ResultCard icon="🏠" label="Implied Property Value" value={noi > 0 ? `$${(noi / (capRate / 100)).toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '$0'} />
        <ResultCard icon="💵" label="Monthly NOI" value={`$${(noi / 12).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Implied Property Value at Different Cap Rates</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ color: 'var(--text-secondary)' }}>
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                <th className="text-left py-2 font-medium">Cap Rate</th>
                <th className="text-right py-2 font-medium">Implied Value</th>
                <th className="text-right py-2 font-medium">Price per $1 NOI</th>
              </tr>
            </thead>
            <tbody>
              {impliedValues.map((row) => (
                <tr key={row.rate} className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <td className="py-2 font-mono">{row.rate}%</td>
                  <td className="text-right font-mono">${row.value.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                  <td className="text-right font-mono">${row.value > 0 && noi > 0 ? (row.value / noi).toFixed(2) : '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Gross Annual Income" value={`$${income.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Annual Operating Expenses" value={`$${expenses.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Net Operating Income" value={`$${noi.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Property Value" value={`$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Cap rate (capitalization rate) measures a property&apos;s rate of return based on net operating income relative to property value. Higher cap rates typically indicate higher risk or lower property values relative to income. Operating expenses include taxes, insurance, maintenance, utilities, and management — but not mortgage payments or capital expenditures.</p>
      </div>
    </div>
  );
}
