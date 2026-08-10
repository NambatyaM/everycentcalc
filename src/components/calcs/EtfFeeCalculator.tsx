'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function EtfFeeCalculatorCalc() {
  const [investment, setInvestment] = useState('100000');
  const [expenseRatio, setExpenseRatio] = useState('0.03');
  const [tradesPerMonth, setTradesPerMonth] = useState('0');
  const [commission, setCommission] = useState('0');
  const [holdingYears, setHoldingYears] = useState('20');
  const [expectedReturn, setExpectedReturn] = useState('8');

  const I = parseFloat(investment) || 0;
  const er = (parseFloat(expenseRatio) || 0) / 100;
  const tpm = parseFloat(tradesPerMonth) || 0;
  const comm = parseFloat(commission) || 0;
  const years = parseFloat(holdingYears) || 0;
  const r = (parseFloat(expectedReturn) || 0) / 100;

  let balanceNoFee = I;
  let balanceWithFee = I;
  let totalFees = 0;

  for (let y = 0; y < years; y++) {
    const annualFee = balanceWithFee * er;
    const tradingFees = tpm * 12 * comm;
    totalFees += annualFee + tradingFees;
    balanceNoFee = balanceNoFee * (1 + r);
    balanceWithFee = balanceWithFee * (1 + r) - annualFee - tradingFees;
  }

  const growthNoFee = balanceNoFee - I;
  const growthWithFee = balanceWithFee - I;
  const feeImpact = growthNoFee > 0 ? (totalFees / growthNoFee) * 100 : 0;
  const netReturn = I > 0 && years > 0 && balanceWithFee > 0 ? ((balanceWithFee / I) ** (1 / years) - 1) * 100 : 0;

  return (
    <div>
      <SectionHeader title="ETF Fee Calculator" subtitle="See how fees erode your investment returns over time" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-investment-amount">Investment Amount ($)</label>
            <input id="calc-investment-amount"  type="number" value={investment} onChange={(e) => setInvestment(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-expense-ratio">Expense Ratio (%)</label>
            <input id="calc-expense-ratio"  type="number" step="0.01" value={expenseRatio} onChange={(e) => setExpenseRatio(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-trading-frequency-trades-month">Trading Frequency (trades/month)</label>
            <input id="calc-trading-frequency-trades-month"  type="number" value={tradesPerMonth} onChange={(e) => setTradesPerMonth(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-commission-per-trade">Commission per Trade ($)</label>
            <input id="calc-commission-per-trade"  type="number" value={commission} onChange={(e) => setCommission(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-holding-period-years">Holding Period (years)</label>
            <input id="calc-holding-period-years"  type="number" value={holdingYears} onChange={(e) => setHoldingYears(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-expected-return">Expected Return (%)</label>
            <input id="calc-expected-return"  type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💸" label="Total Fees Paid" value={formatCurrency(totalFees)} highlight />
        <ResultCard icon="📊" label="Fees as % of Returns" value={`${feeImpact.toFixed(2)}%`} />
        <ResultCard icon="📈" label="Net Return After Fees" value={`${netReturn.toFixed(2)}%`} />
        <ResultCard icon="⚖️" label="Fee Impact on Growth" value={formatCurrency(growthNoFee - growthWithFee)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Investment Without Fees" value={formatCurrency(balanceNoFee)} />
        <ResultRow label="Investment With Fees" value={formatCurrency(balanceWithFee)} />
        <ResultRow label="Growth Without Fees" value={formatCurrency(growthNoFee)} />
        <ResultRow label="Growth With Fees" value={formatCurrency(growthWithFee)} />
        <ResultRow label="Total Fees Paid" value={formatCurrency(totalFees)} bold />
        <ResultRow label="Growth Lost to Fees" value={formatCurrency(growthNoFee - growthWithFee)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Expense ratios are deducted daily from the fund&apos;s NAV. Trading commissions are per trade fees from your broker. Many brokers now offer commission free ETF trading. A 0.03% expense ratio on a $100k portfolio costs ~$30/year.</p>
      </div>
    </div>
  );
}
