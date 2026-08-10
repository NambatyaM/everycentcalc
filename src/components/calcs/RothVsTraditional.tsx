'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function RothVsTraditionalCalc() {
  const [contribution, setContribution] = useState('6500');
  const [currentBracket, setCurrentBracket] = useState('24');
  const [retireBracket, setRetireBracket] = useState('12');
  const [currentAge, setCurrentAge] = useState('30');
  const [retireAge, setRetireAge] = useState('65');
  const [annualReturn, setAnnualReturn] = useState('7');

  const C = parseFloat(contribution) || 0;
  const bracketNow = (parseFloat(currentBracket) || 0) / 100;
  const bracketRetire = (parseFloat(retireBracket) || 0) / 100;
  const ca = parseFloat(currentAge) || 0;
  const ra = parseFloat(retireAge) || 0;
  const r = (parseFloat(annualReturn) || 0) / 100;

  const years = Math.max(0, ra - ca);
  const growthFactor = Math.pow(1 + r, years);

  const tradPreTaxValue = C * growthFactor;
  const tradTaxOnWithdrawal = tradPreTaxValue * bracketRetire;
  const tradAfterTaxValue = tradPreTaxValue - tradTaxOnWithdrawal;

  const rothInitialTax = C * bracketNow;
  const rothNetContribution = C - rothInitialTax;
  const rothAfterTaxValue = rothNetContribution * growthFactor;

  const taxSavingsNow = C * bracketNow;
  const rothAdvantage = rothAfterTaxValue - tradAfterTaxValue;

  return (
    <div>
      <SectionHeader title="Roth vs Traditional IRA Calculator" subtitle="Compare after tax retirement account values" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-annual-contribution">Annual Contribution ($)</label>
          <input id="calc-annual-contribution"  type="number" value={contribution} onChange={(e) => setContribution(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-current-tax-bracket">Current Tax Bracket (%)</label>
            <input id="calc-current-tax-bracket"  type="number" value={currentBracket} onChange={(e) => setCurrentBracket(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-expected-retirement-bracket">Expected Retirement Bracket (%)</label>
            <input id="calc-expected-retirement-bracket"  type="number" value={retireBracket} onChange={(e) => setRetireBracket(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-current-age">Current Age</label>
            <input id="calc-current-age"  type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-retirement-age">Retirement Age</label>
            <input id="calc-retirement-age"  type="number" value={retireAge} onChange={(e) => setRetireAge(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-annual-return">Annual Return (%)</label>
          <input id="calc-annual-return"  type="number" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🏦" label="Traditional Value (after tax)" value={formatCurrency(tradAfterTaxValue)} highlight subtitle="Tax deductible now, taxed at withdrawal" />
        <ResultCard icon="💚" label="Roth Value (after tax)" value={formatCurrency(rothAfterTaxValue)} highlight subtitle="No deduction now, tax free withdrawal" />
        <ResultCard icon="💰" label="Tax Savings Now (Traditional)" value={formatCurrency(taxSavingsNow)} subtitle="Annual tax deduction" />
        <ResultCard icon="🎯" label="Better Option" value={rothAdvantage > 0 ? 'Roth' : 'Traditional'} subtitle={`${formatCurrency(Math.abs(rothAdvantage))} advantage`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Traditional IRA Path</h3>
        <ResultRow label="Annual Contribution" value={formatCurrency(C)} />
        <ResultRow label="Tax Deduction Now" value={`${formatCurrency(taxSavingsNow)} saved`} />
        <ResultRow label="Growth Factor" value={`${growthFactor.toFixed(2)}x over ${years} years`} />
        <ResultRow label="Value at Retirement" value={formatCurrency(tradPreTaxValue)} />
        <ResultRow label={`Tax at ${(bracketRetire * 100).toFixed(0)}% Bracket`} value={`-${formatCurrency(tradTaxOnWithdrawal)}`} />
        <ResultRow label="After Tax Value" value={formatCurrency(tradAfterTaxValue)} bold />

        <h3 className="text-sm font-medium mb-2 mt-4" style={{ color: 'var(--text-secondary)' }}>Roth IRA Path</h3>
        <ResultRow label="Annual Contribution" value={formatCurrency(C)} />
        <ResultRow label={`Tax Now at ${(bracketNow * 100).toFixed(0)}%`} value={`-${formatCurrency(rothInitialTax)}`} />
        <ResultRow label="Net Contribution" value={formatCurrency(rothNetContribution)} />
        <ResultRow label="Growth Factor" value={`${growthFactor.toFixed(2)}x over ${years} years`} />
        <ResultRow label="After Tax Value" value={formatCurrency(rothAfterTaxValue)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Traditional: contribute pre tax dollars, pay income tax on withdrawals. Roth: contribute after tax dollars, withdrawals are tax free. If your tax bracket drops in retirement, Traditional wins. If it stays the same or rises, Roth wins. Consider also Roth 401(k) and backdoor Roth options for higher earners.</p>
      </div>
    </div>
  );
}
