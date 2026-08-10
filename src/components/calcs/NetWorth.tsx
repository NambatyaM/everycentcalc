'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function NetWorthCalc() {
  const [cash, setCash] = useState('15000');
  const [investments, setInvestments] = useState('50000');
  const [retirement, setRetirement] = useState('120000');
  const [homeValue, setHomeValue] = useState('350000');
  const [vehicleValue, setVehicleValue] = useState('20000');
  const [otherAssets, setOtherAssets] = useState('5000');
  const [mortgage, setMortgage] = useState('250000');
  const [carLoans, setCarLoans] = useState('8000');
  const [creditCards, setCreditCards] = useState('3000');
  const [studentLoans, setStudentLoans] = useState('20000');
  const [otherLiabilities, setOtherLiabilities] = useState('2000');

  const A = [
    parseFloat(cash) || 0,
    parseFloat(investments) || 0,
    parseFloat(retirement) || 0,
    parseFloat(homeValue) || 0,
    parseFloat(vehicleValue) || 0,
    parseFloat(otherAssets) || 0,
  ];
  const L = [
    parseFloat(mortgage) || 0,
    parseFloat(carLoans) || 0,
    parseFloat(creditCards) || 0,
    parseFloat(studentLoans) || 0,
    parseFloat(otherLiabilities) || 0,
  ];

  const totalAssets = A.reduce((s, x) => s + x, 0);
  const totalLiabilities = L.reduce((s, x) => s + x, 0);
  const netWorth = totalAssets - totalLiabilities;
  const assetToLiability = totalLiabilities > 0 ? totalAssets / totalLiabilities : null;

  return (
    <div>
      <SectionHeader title="Net Worth Calculator" subtitle="Calculate your net worth — all assets minus all liabilities" />

      <div className="space-y-4 mb-8">
        <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-secondary)' }}>Assets</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-cash-bank-accounts">Cash & Bank Accounts ($)</label>
            <input id="calc-cash-bank-accounts"  type="number" value={cash} onChange={(e) => setCash(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-investments-non-retirement">Investments (non-retirement) ($)</label>
            <input id="calc-investments-non-retirement"  type="number" value={investments} onChange={(e) => setInvestments(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-retirement-accounts">Retirement Accounts ($)</label>
            <input id="calc-retirement-accounts"  type="number" value={retirement} onChange={(e) => setRetirement(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-home-value">Home Value ($)</label>
            <input id="calc-home-value"  type="number" value={homeValue} onChange={(e) => setHomeValue(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-vehicle-value">Vehicle Value ($)</label>
            <input id="calc-vehicle-value"  type="number" value={vehicleValue} onChange={(e) => setVehicleValue(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-other-assets">Other Assets ($)</label>
            <input id="calc-other-assets"  type="number" value={otherAssets} onChange={(e) => setOtherAssets(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>

        <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-secondary)' }}>Liabilities</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-mortgage-balance">Mortgage Balance ($)</label>
            <input id="calc-mortgage-balance"  type="number" value={mortgage} onChange={(e) => setMortgage(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-car-loans">Car Loans ($)</label>
            <input id="calc-car-loans"  type="number" value={carLoans} onChange={(e) => setCarLoans(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-credit-card-debt">Credit Card Debt ($)</label>
            <input id="calc-credit-card-debt"  type="number" value={creditCards} onChange={(e) => setCreditCards(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-student-loans">Student Loans ($)</label>
            <input id="calc-student-loans"  type="number" value={studentLoans} onChange={(e) => setStudentLoans(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-other-debts">Other Debts ($)</label>
            <input id="calc-other-debts"  type="number" value={otherLiabilities} onChange={(e) => setOtherLiabilities(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💎" label="Net Worth" value={formatCurrency(netWorth)} highlight />
        <ResultCard icon="📈" label="Total Assets" value={formatCurrency(totalAssets)} />
        <ResultCard icon="📉" label="Total Liabilities" value={formatCurrency(totalLiabilities)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Assets Breakdown</p>
        <ResultRow label="Cash & Bank" value={formatCurrency(A[0])} />
        <ResultRow label="Investments" value={formatCurrency(A[1])} />
        <ResultRow label="Retirement" value={formatCurrency(A[2])} />
        <ResultRow label="Home" value={formatCurrency(A[3])} />
        <ResultRow label="Vehicles" value={formatCurrency(A[4])} />
        <ResultRow label="Other Assets" value={formatCurrency(A[5])} />
        <ResultRow label="Total Assets" value={formatCurrency(totalAssets)} bold />

        <p className="text-sm font-medium mt-4 mb-3" style={{ color: 'var(--text-secondary)' }}>Liabilities Breakdown</p>
        <ResultRow label="Mortgage" value={formatCurrency(L[0])} />
        <ResultRow label="Car Loans" value={formatCurrency(L[1])} />
        <ResultRow label="Credit Cards" value={formatCurrency(L[2])} />
        <ResultRow label="Student Loans" value={formatCurrency(L[3])} />
        <ResultRow label="Other Debts" value={formatCurrency(L[4])} />
        <ResultRow label="Total Liabilities" value={formatCurrency(totalLiabilities)} bold />

        <ResultRow label="Net Worth" value={formatCurrency(netWorth)} bold />
        {assetToLiability !== null && (
          <ResultRow label="Assets-to-Debt Ratio" value={`${assetToLiability.toFixed(2)}x`} />
        )}
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Net worth = total assets − total liabilities. It's a snapshot of your financial position at a point in time. Tracking it quarterly helps you see real long-term progress even when day-to-day earnings fluctuate. A common guideline is a net worth of ~1x your annual income by 30, 3x by 40, 6x by 50, and 8x by 60, though this varies by income and priorities.</p>
      </div>
    </div>
  );
}