'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

type CompFreq = 'annually' | 'quarterly' | 'monthly';

const FREQ: Record<CompFreq, number> = { annually: 1, quarterly: 4, monthly: 12 };

export default function CdCalculator() {
  const [deposit, setDeposit] = useState('10000');
  const [apy, setApy] = useState('4.5');
  const [termMonths, setTermMonths] = useState('12');
  const [freq, setFreq] = useState<CompFreq>('monthly');

  const P = parseFloat(deposit) || 0;
  const apyRate = (parseFloat(apy) || 0) / 100;
  const months = Math.max(1, parseFloat(termMonths) || 12);
  const n = FREQ[freq];

  const totalYears = months / 12;
  const maturityValue = apyRate > 0
    ? P * Math.pow(1 + apyRate / n, n * totalYears)
    : P;
  const interestEarned = maturityValue - P;

  return (
    <div>
      <SectionHeader title="CD Calculator" subtitle="Estimate certificate of deposit earnings with compound interest" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-deposit-amount">Deposit Amount ($)</label>
            <input id="calc-deposit-amount"  type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-nominal-rate-apr">Nominal Rate / APR (%)</label>
            <input id="calc-nominal-rate-apr"  type="number" value={apy} onChange={(e) => setApy(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.05" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-term-months">Term (months)</label>
            <input id="calc-term-months"  type="number" value={termMonths} onChange={(e) => setTermMonths(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-compounding">Compounding</label>
            <select id="calc-compounding"  value={freq} onChange={(e) => setFreq(e.target.value as CompFreq)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🏦" label="Maturity Value" value={formatCurrency(maturityValue)} highlight />
        <ResultCard icon="📈" label="Interest Earned" value={formatCurrency(interestEarned)} />
        <ResultCard icon="💰" label="Effective APY" value={`${apyRate > 0 ? (((1 + apyRate / n) ** n - 1) * 100).toFixed(2) : '0.00'}%`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Deposit" value={formatCurrency(P)} />
        <ResultRow label="Nominal Rate (APR)" value={`${(apyRate * 100).toFixed(2)}%`} />
        <ResultRow label="Term" value={`${months} months (${totalYears.toFixed(1)} years)`} />
        <ResultRow label="Compounding" value={freq} />
        <ResultRow label="Interest Earned" value={formatCurrency(interestEarned)} bold />
        <ResultRow label="Maturity Value" value={formatCurrency(maturityValue)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses the compound interest formula: A = P × (1 + r/n)^(nt). Enter your CD's nominal interest rate (APR); the effective APY shown reflects that rate with your chosen compounding frequency. CDs that quote APY have already baked in compounding — to model those, enter the nominal rate that produces that APY. CD early-withdrawal penalties typically cost 90 days to 6 months of interest. In 2026, high-yield CD rates range from roughly 3.5% to 5% APY depending on term. Unlike a savings account, a CD locks your money for the full term.</p>
      </div>
    </div>
  );
}
