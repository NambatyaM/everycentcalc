'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency, formatPercent } from '@/lib/tax';

export default function RothConversionCalc() {
  const [balance, setBalance] = useState('150000');
  const [currentAge, setCurrentAge] = useState('50');
  const [retireAge, setRetireAge] = useState('65');
  const [currentBracket, setCurrentBracket] = useState('25');
  const [retireBracket, setRetireBracket] = useState('32');
  const [annualReturn, setAnnualReturn] = useState('7');

  const bal = parseFloat(balance) || 0;
  const ca = parseFloat(currentAge) || 0;
  const ra = parseFloat(retireAge) || 0;
  const bracketNow = (parseFloat(currentBracket) || 0) / 100;
  const bracketRetire = (parseFloat(retireBracket) || 0) / 100;
  const r = (parseFloat(annualReturn) || 0) / 100;

  const yearsGrowth = Math.max(0, ra - ca);
  const growthFactor = Math.pow(1 + r, yearsGrowth);

  const taxCostNow = bal * bracketNow;
  const rothValue = (bal - taxCostNow) * growthFactor;

  const tradValue = bal * growthFactor;
  const tradTaxLater = tradValue * bracketRetire;
  const tradAfterTax = tradValue - tradTaxLater;

  const conversionAdvantage = rothValue - tradAfterTax;

  return (
    <div>
      <SectionHeader title="Roth Conversion Calculator" subtitle="Estimate the tax cost of converting a traditional IRA to a Roth, and whether tax free growth makes it worth it" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-amount-to-convert">Amount to Convert ($)</label>
            <input id="calc-amount-to-convert"  type="number" value={balance} onChange={(e) => setBalance(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
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
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-current-marginal-tax-bracket">Current Marginal Tax Bracket (%)</label>
            <input id="calc-current-marginal-tax-bracket"  type="number" value={currentBracket} onChange={(e) => setCurrentBracket(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-expected-retirement-bracket">Expected Retirement Bracket (%)</label>
            <input id="calc-expected-retirement-bracket"  type="number" value={retireBracket} onChange={(e) => setRetireBracket(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-annual-return">Annual Return (%)</label>
            <input id="calc-annual-return"  type="number" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🧾" label="Tax Cost of Conversion" value={formatCurrency(taxCostNow)} highlight subtitle={`${formatPercent(bracketNow * 100)} of amount converted`} />
        <ResultCard icon="🔥" label="Roth Value at 65" value={formatCurrency(rothValue)} subtitle="Tax free" />
        <ResultCard icon="🏦" label="Keep Traditional (after tax)" value={formatCurrency(tradAfterTax)} subtitle={`Pay ${formatPercent(bracketRetire * 100)} on withdrawal`} />
        <ResultCard icon="💯" label="Conversion Advantage" value={formatCurrency(conversionAdvantage)} highlight subtitle={conversionAdvantage > 0 ? 'Convert now' : 'Wait or skip'} />
        <ResultCard icon="⏳" label="Years of Growth" value={`${yearsGrowth}`} subtitle={`${growthFactor.toFixed(2)}x growth`} />
        <ResultCard icon="⚖️" label="Tax Paid Today" value={formatCurrency(taxCostNow)} subtitle="Crowded out if exceeds bracket" />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Conversion Math</div>
        <ResultRow label="Amount Converted" value={formatCurrency(bal)} />
        <ResultRow label="Tax Now" value={`-${formatCurrency(taxCostNow)}`} />
        <ResultRow label="Net Into Roth" value={formatCurrency(bal - taxCostNow)} />
        <ResultRow label="Growth" value={`${growthFactor.toFixed(2)}x over ${yearsGrowth} years`} />
        <ResultRow label="Roth Value (tax free)" value={formatCurrency(rothValue)} bold />
        <ResultRow label="If Left as Traditional" value={formatCurrency(tradValue)} />
        <ResultRow label="Tax on Withdrawals" value={`-${formatCurrency(tradTaxLater)}`} />
        <ResultRow label="Traditional After Tax" value={formatCurrency(tradAfterTax)} bold />
        <ResultRow label="Net Advantage of Converting" value={formatCurrency(conversionAdvantage)} bold />
      </div>

      {conversionAdvantage > 0 ? (
        <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
          <p className="text-sm" style={{ color: 'var(--brand)' }}>
            Converting now puts you ahead by roughly <strong>{formatCurrency(conversionAdvantage)}</strong> by retirement, because you pay today&apos;s lower {formatPercent(bracketNow * 100)} rate instead of the expected {formatPercent(bracketRetire * 100)} rate later.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
          <p className="text-sm" style={{ color: 'var(--brand)' }}>
            Converting now looks unfavorable: you&apos;d pay tax at today&apos;s {formatPercent(bracketNow * 100)} while you could withdraw later at {formatPercent(bracketRetire * 100)}. Consider converting only enough to fill your current bracket, or wait for a low income year.
          </p>
        </div>
      )}

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> The converted amount is added to your taxable income in the conversion year and may push you into a higher bracket. This tool uses a flat marginal rate, ignores state taxes and NIIT, and simplifies the IRA sharing rules. A Roth also avoids RMDs and pair<strong>s</strong> well for heirs. Consult a tax professional before converting.</p>
      </div>
    </div>
  );
}