'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function InvestmentDiversificationCalc() {
  const [total, setTotal] = useState('200000');
  const [stockPct, setStockPct] = useState('60');
  const [bondPct, setBondPct] = useState('25');
  const [rePct, setRePct] = useState('10');
  const [cashPct, setCashPct] = useState('5');
  const [stockReturn, setStockReturn] = useState('10');
  const [bondReturn, setBondReturn] = useState('4');
  const [reReturn, setReReturn] = useState('7');
  const [cashReturn, setCashReturn] = useState('2');

  const T = parseFloat(total) || 0;
  const sPct = parseFloat(stockPct) || 0;
  const bPct = parseFloat(bondPct) || 0;
  const rPct = parseFloat(rePct) || 0;
  const cPct = parseFloat(cashPct) || 0;
  const sR = (parseFloat(stockReturn) || 0) / 100;
  const bR = (parseFloat(bondReturn) || 0) / 100;
  const rR = (parseFloat(reReturn) || 0) / 100;
  const cR = (parseFloat(cashReturn) || 0) / 100;

  const allocPctTotal = sPct + bPct + rPct + cPct;
  const normalizedStock = allocPctTotal > 0 ? sPct / allocPctTotal : 0;
  const normalizedBond = allocPctTotal > 0 ? bPct / allocPctTotal : 0;
  const normalizedRE = allocPctTotal > 0 ? rPct / allocPctTotal : 0;
  const normalizedCash = allocPctTotal > 0 ? cPct / allocPctTotal : 0;

  const weightedReturn = normalizedStock * sR + normalizedBond * bR + normalizedRE * rR + normalizedCash * cR;

  const value1yr = T * (1 + weightedReturn);
  const value5yr = T * Math.pow(1 + weightedReturn, 5);
  const value10yr = T * Math.pow(1 + weightedReturn, 10);

  const stockDollars = T * normalizedStock;
  const bondDollars = T * normalizedBond;
  const reDollars = T * normalizedRE;
  const cashDollars = T * normalizedCash;

  const annualIncome = stockDollars * sR + bondDollars * bR + reDollars * rR + cashDollars * cR;

  const maxAlloc = Math.max(normalizedStock, normalizedBond, normalizedRE, normalizedCash);
  const concentration = maxAlloc;
  let divScore: string;
  if (concentration > 0.7) divScore = 'Low';
  else if (concentration > 0.5) divScore = 'Moderate';
  else if (concentration > 0.35) divScore = 'Good';
  else divScore = 'Excellent';

  return (
    <div>
      <SectionHeader title="Portfolio Diversification Calculator" subtitle="Analyze your asset allocation and expected returns" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Total Portfolio Value ($)</label>
          <input type="number" value={total} onChange={(e) => setTotal(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <h3 className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Asset Allocation (%)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Stocks</label>
            <input type="number" value={stockPct} onChange={(e) => setStockPct(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Bonds</label>
            <input type="number" value={bondPct} onChange={(e) => setBondPct(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Real Estate</label>
            <input type="number" value={rePct} onChange={(e) => setRePct(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Cash</label>
            <input type="number" value={cashPct} onChange={(e) => setCashPct(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        {allocPctTotal !== 100 && allocPctTotal > 0 && (
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Total allocation: {allocPctTotal}% (will be normalized to 100%)</p>
        )}
        <h3 className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Expected Returns (%)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Stocks</label>
            <input type="number" value={stockReturn} onChange={(e) => setStockReturn(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Bonds</label>
            <input type="number" value={bondReturn} onChange={(e) => setBondReturn(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Real Estate</label>
            <input type="number" value={reReturn} onChange={(e) => setReReturn(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Cash</label>
            <input type="number" value={cashReturn} onChange={(e) => setCashReturn(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📊" label="Weighted Annual Return" value={`${(weightedReturn * 100).toFixed(2)}%`} highlight />
        <ResultCard icon="💰" label="Portfolio Value (5yr)" value={formatCurrency(value5yr)} highlight />
        <ResultCard icon="🎯" label="Diversification Score" value={divScore} subtitle={`Largest holding: ${(maxAlloc * 100).toFixed(0)}%`} />
        <ResultCard icon="💸" label="Annual Income" value={formatCurrency(annualIncome)} subtitle="From returns" />
        <ResultCard icon="📈" label="Portfolio Value (1yr)" value={formatCurrency(value1yr)} />
        <ResultCard icon="🚀" label="Portfolio Value (10yr)" value={formatCurrency(value10yr)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label={`Stocks (${(normalizedStock * 100).toFixed(1)}%)`} value={`${formatCurrency(stockDollars)} → ${formatCurrency(stockDollars * (1 + sR))}/yr`} />
        <ResultRow label={`Bonds (${(normalizedBond * 100).toFixed(1)}%)`} value={`${formatCurrency(bondDollars)} → ${formatCurrency(bondDollars * (1 + bR))}/yr`} />
        <ResultRow label={`Real Estate (${(normalizedRE * 100).toFixed(1)}%)`} value={`${formatCurrency(reDollars)} → ${formatCurrency(reDollars * (1 + rR))}/yr`} />
        <ResultRow label={`Cash (${(normalizedCash * 100).toFixed(1)}%)`} value={`${formatCurrency(cashDollars)} → ${formatCurrency(cashDollars * (1 + cR))}/yr`} />
        <ResultRow label="Total Portfolio" value={formatCurrency(T)} bold />
        <ResultRow label="Weighted Return" value={`${(weightedReturn * 100).toFixed(2)}%`} bold />
        <ResultRow label="Annual Growth" value={formatCurrency(T * weightedReturn)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Weighted return is calculated as the sum of each allocation percentage times its expected return. Diversification score is based on concentration in the largest holding. Past returns do not guarantee future results. Consider rebalancing annually and consulting a financial advisor for personalized allocation advice.</p>
      </div>
    </div>
  );
}
