'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function CashOnCashReturnCalc() {
  const [annualCashFlow, setAnnualCashFlow] = useState('12000');
  const [totalCashInvested, setTotalCashInvested] = useState('100000');

  const acf = parseFloat(annualCashFlow) || 0;
  const tci = parseFloat(totalCashInvested) || 0;

  const cashOnCash = tci > 0 ? (acf / tci) * 100 : 0;
  const monthlyCashFlow = acf / 12;
  const returnPer100K = tci > 0 ? (acf / tci) * 100000 : 0;

  const comparisonAmounts = [50000, 100000, 200000];

  return (
    <div>
      <SectionHeader title="Cash on Cash Return Calculator" subtitle="Measure your annual return on the cash you've invested" />

      <div className="space-y-4 mb-8">
        <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Pre Tax Cash Flow ($)</label>
          <input type="number" value={annualCashFlow} onChange={(e) => setAnnualCashFlow(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Annual income minus all annual expenses (before taxes)</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Total Cash Invested ($)</label>
          <input type="number" value={totalCashInvested} onChange={(e) => setTotalCashInvested(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Down payment, closing costs, and any initial renovations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📈" label="Cash on Cash Return" value={`${cashOnCash.toFixed(2)}%`} highlight />
        <ResultCard icon="💵" label="Monthly Cash Flow" value={`$${monthlyCashFlow.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="💰" label="Annual per $100K" value={`$${returnPer100K.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} highlight />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Return Comparison by Investment Amount</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ color: 'var(--text-secondary)' }}>
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                <th className="text-left py-2 font-medium">Investment</th>
                <th className="text-right py-2 font-medium">Annual Return</th>
                <th className="text-right py-2 font-medium">Monthly Cash Flow</th>
              </tr>
            </thead>
            <tbody>
              {comparisonAmounts.map((amt) => {
                const annualReturn = tci > 0 ? (acf / tci) * amt : 0;
                return (
                  <tr key={amt} className="border-b" style={{ borderColor: 'var(--border)' }}>
                    <td className="py-2 font-mono">${amt.toLocaleString()}</td>
                    <td className="text-right font-mono">${annualReturn.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                    <td className="text-right font-mono">${(annualReturn / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Annual Pre Tax Cash Flow" value={`$${acf.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Cash Invested" value={`$${tci.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Cash Flow" value={`$${monthlyCashFlow.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Cash on Cash Return" value={`${cashOnCash.toFixed(2)}%`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Cash on cash return measures the annual pre tax cash flow as a percentage of the total cash invested. It is commonly used for real estate investments to compare the cash yield across different properties. This metric does not account for appreciation, loan paydown, tax benefits, or the time value of money. A typical target for rental properties is 8-12% cash on cash return.</p>
      </div>
    </div>
  );
}
