'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

type CompoundFreq = 'monthly' | 'quarterly' | 'annually';

const FREQ_MAP: Record<CompoundFreq, number> = { monthly: 12, quarterly: 4, annually: 1 };

export default function InvestmentReturnCalc() {
  const [initial, setInitial] = useState('10000');
  const [monthly, setMonthly] = useState('500');
  const [annualRate, setAnnualRate] = useState('7');
  const [years, setYears] = useState('20');
  const [freq, setFreq] = useState<CompoundFreq>('monthly');

  const P = parseFloat(initial) || 0;
  const PMT = parseFloat(monthly) || 0;
  const r = (parseFloat(annualRate) || 0) / 100;
  const t = parseFloat(years) || 0;
  const n = FREQ_MAP[freq];
  const periodPMT = PMT * 12 / n;

  const fv = r > 0
    ? P * Math.pow(1 + r / n, n * t) + periodPMT * ((Math.pow(1 + r / n, n * t) - 1) / (r / n))
    : P + periodPMT * n * t;
  const totalContributed = P + PMT * t * 12;
  const totalInterest = fv - totalContributed;
  const effectiveReturn = P > 0 && t > 0 && PMT === 0 ? ((fv / P) ** (1 / t) - 1) * 100 : 0;

  const milestones = [5, 10, 15, 20, 25, 30].filter((y) => y <= t && y > 0);
  const milestoneValues = milestones.map((y) => {
    const val = r > 0
      ? P * Math.pow(1 + r / n, n * y) + periodPMT * ((Math.pow(1 + r / n, n * y) - 1) / (r / n))
      : P + periodPMT * n * y;
    const contributed = P + PMT * y * 12;
    return { year: y, value: val, contributed, interest: val - contributed };
  });

  return (
    <div>
      <SectionHeader title="Investment Return Calculator" subtitle="Project compound growth with regular contributions" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Initial Investment ($)</label>
            <input type="number" value={initial} onChange={(e) => setInitial(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Contribution ($)</label>
            <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Return Rate (%)</label>
            <input type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Investment Period (years)</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Compound Frequency</label>
          <select value={freq} onChange={(e) => setFreq(e.target.value as CompoundFreq)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💰" label="Final Value" value={formatCurrency(fv)} highlight />
        <ResultCard icon="🏦" label="Total Contributed" value={formatCurrency(totalContributed)} />
        <ResultCard icon="📈" label="Total Interest Earned" value={formatCurrency(totalInterest)} />
        <ResultCard icon="📊" label="Effective Annual Return" value={`${effectiveReturn.toFixed(2)}%`} />
      </div>

      {milestoneValues.length > 0 && (
        <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
          {milestoneValues.map((m, i) => (
            <ResultRow key={i} label={`Year ${m.year}`} value={`${formatCurrency(m.value)} (${formatCurrency(m.interest)} interest)`} />
          ))}
        </div>
      )}

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses future value formula: FV = P(1+r/n)^(nt) + PMT×[((1+r/n)^(nt)-1)/(r/n)]. Contributions are assumed at the end of each period. Returns are not guaranteed and do not account for taxes or fees.</p>
      </div>
    </div>
  );
}
