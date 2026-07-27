'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function StockPortfolioReturnCalc() {
  const [initial, setInitial] = useState('50000');
  const [annualContrib, setAnnualContrib] = useState('12000');
  const [returnRate, setReturnRate] = useState('10');
  const [divYield, setDivYield] = useState('1.5');
  const [capGainsTax, setCapGainsTax] = useState('15');
  const [years, setYears] = useState('15');

  const P = parseFloat(initial) || 0;
  const A = parseFloat(annualContrib) || 0;
  const r = (parseFloat(returnRate) || 0) / 100;
  const dy = (parseFloat(divYield) || 0) / 100;
  const tax = (parseFloat(capGainsTax) || 0) / 100;
  const t = parseFloat(years) || 0;

  const pretaxReturn = r + dy;
  const taxableGainRate = r;
  const afterTaxReturn = pretaxReturn - taxableGainRate * tax;

  let portfolioPre = P;
  let portfolioPost = P;
  let totalDividends = 0;
  let totalTaxes = 0;

  for (let y = 0; y < t; y++) {
    const gainPre = portfolioPre * pretaxReturn;
    const divPre = portfolioPre * dy;
    totalDividends += divPre;
    portfolioPre = portfolioPre + gainPre + A;

    const gainPost = portfolioPost * (r - taxableGainRate * tax) + portfolioPost * dy;
    const taxesPaid = portfolioPost * taxableGainRate * tax;
    totalTaxes += taxesPaid;
    portfolioPost = portfolioPost + gainPost + A;
  }

  const totalContributed = P + A * t;
  const totalGainPre = portfolioPre - totalContributed - totalDividends;
  const totalGainPost = portfolioPost - totalContributed - totalDividends;

  return (
    <div>
      <SectionHeader title="Stock Portfolio Return Calculator" subtitle="Compare pre-tax and after-tax portfolio growth" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Initial Portfolio Value ($)</label>
            <input type="number" value={initial} onChange={(e) => setInitial(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Contributions ($)</label>
            <input type="number" value={annualContrib} onChange={(e) => setAnnualContrib(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Expected Return (%)</label>
            <input type="number" value={returnRate} onChange={(e) => setReturnRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Dividend Yield (%)</label>
            <input type="number" value={divYield} onChange={(e) => setDivYield(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Capital Gains Tax (%)</label>
            <input type="number" value={capGainsTax} onChange={(e) => setCapGainsTax(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Holding Period (years)</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💰" label="Portfolio Value (after tax)" value={formatCurrency(portfolioPost)} highlight />
        <ResultCard icon="🏦" label="Total Contributions" value={formatCurrency(totalContributed)} />
        <ResultCard icon="📉" label="Tax on Gains" value={formatCurrency(totalTaxes)} />
        <ResultCard icon="💸" label="Dividend Income" value={formatCurrency(totalDividends)} />
        <ResultCard icon="📊" label="Portfolio Value (pre-tax)" value={formatCurrency(portfolioPre)} />
        <ResultCard icon="⚖️" label="Tax Drag" value={formatCurrency(portfolioPre - portfolioPost)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Pre-Tax Portfolio" value={formatCurrency(portfolioPre)} />
        <ResultRow label="After-Tax Portfolio" value={formatCurrency(portfolioPost)} />
        <ResultRow label="Pre-Tax Gain" value={formatCurrency(totalGainPre)} />
        <ResultRow label="After-Tax Gain" value={formatCurrency(totalGainPost)} />
        <ResultRow label="Total Taxes Paid" value={formatCurrency(totalTaxes)} bold />
        <ResultRow label="Tax Drag on Returns" value={`${portfolioPre > 0 ? (((portfolioPre - portfolioPost) / portfolioPre) * 100).toFixed(1) : 0}%`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Assumes taxes are paid annually on capital gains. Dividends are reinvested. Actual tax treatment depends on holding period, income level, and account type (taxable vs. tax-advantaged). Long-term capital gains rates apply for holdings over 1 year.</p>
      </div>
    </div>
  );
}
