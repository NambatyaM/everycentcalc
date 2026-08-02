'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

const irsTableIII: Record<number, number> = {
  73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1,
  80: 20.2, 81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2,
  87: 14.4, 88: 13.7, 89: 12.9, 90: 12.2, 91: 11.5, 92: 10.8, 93: 10.1,
  94: 9.5, 95: 8.9, 96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4,
  101: 6.0, 102: 5.6, 103: 5.2, 104: 4.9, 105: 4.6, 106: 4.3, 107: 4.1,
  108: 3.9, 109: 3.7, 110: 3.5, 111: 3.4, 112: 3.3, 113: 3.1, 114: 3.0,
  115: 2.9,
};

const ages = Array.from({ length: 43 }, (_, i) => i + 73);

export default function RequiredMinimumDistributionCalc() {
  const [balance, setBalance] = useState('500000');
  const [age, setAge] = useState('73');

  const bal = parseFloat(balance) || 0;
  const currentAge = parseInt(age) || 73;
  const divisor = currentAge >= 115 ? 2.9 : irsTableIII[currentAge] || 26.5;
  const rmd = divisor > 0 ? bal / divisor : 0;
  const penalty25 = rmd * 0.25;
  const penalty10 = rmd * 0.10;
  const lifetimeWithdrawal = bal * (bal > 0 ? 0.04 : 0);

  return (
    <div>
      <SectionHeader title="Required Minimum Distribution Calculator" subtitle="Calculate your IRS-required RMD based on age and account balance" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Retirement Account Balance ($)</label>
          <input type="number" value={balance} onChange={(e) => setBalance(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Total in traditional IRAs, 401(k)s, 403(b)s, etc.</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Your Age</label>
          <select value={age} onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            {ages.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          {currentAge < 73 && (
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>RMDs start at age 73 under SECURE 2.0 (born 1951-1959) or 75 (born 1960+).</p>
          )}
        </div>
      </div>

      {bal > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <ResultCard icon="🏦" label="Your RMD" value={`$${rmd.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
          <ResultCard icon="📊" label="Distribution Period" value={`${divisor} years`} highlight />
          <ResultCard icon="📈" label="RMD as % of Balance" value={`${bal > 0 ? ((rmd / bal) * 100).toFixed(2) : 0}%`} highlight />
        </div>
      )}

      {bal === 0 && (
        <div className="rounded-lg border p-4 mb-6" style={{ background: '#fef2f2', borderColor: '#ef4444' }}>
          <p className="text-sm font-medium" style={{ color: '#dc2626' }}>
            Enter your retirement account balance to calculate your RMD.
          </p>
        </div>
      )}

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Account Balance" value={`$${bal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Your Age" value={`${currentAge}`} />
        <ResultRow label="IRS Distribution Period" value={`${divisor} years`} />
        <ResultRow label="Required Minimum Distribution" value={`$${rmd.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Monthly RMD" value={`$${(rmd / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Penalty if Missed (25%)" value={`$${penalty25.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Penalty if Corrected Quickly (10%)" value={`$${penalty10.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          At age {currentAge}, the IRS requires you to withdraw <strong>${rmd.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong> from your retirement accounts this year. Missing this deadline could cost you <strong>${penalty25.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong> in penalties.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Uses IRS Uniform Lifetime Table (Table III) for 2026. If your spouse is more than 10 years younger and the sole beneficiary, use Table II (Joint Life). Does not include RMDs from inherited IRAs (Table I). SECURE 2.0 raised the RMD age to 73 (born 1951-1959) and 75 (born 1960+). Roth IRAs have no RMDs during the owner&apos;s lifetime.</p>
      </div>
    </div>
  );
}
