'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function FreelanceNetWorthCalc() {
  const [bankAccounts, setBankAccounts] = useState('15000');
  const [investments, setInvestments] = useState('30000');
  const [retirement, setRetirement] = useState('50000');
  const [homeValue, setHomeValue] = useState('0');
  const [businessAssets, setBusinessAssets] = useState('5000');
  const [otherAssets, setOtherAssets] = useState('0');
  const [mortgage, setMortgage] = useState('0');
  const [creditCards, setCreditCards] = useState('3000');
  const [businessDebt, setBusinessDebt] = useState('0');
  const [studentLoans, setStudentLoans] = useState('0');
  const [otherDebt, setOtherDebt] = useState('0');
  const [annualIncome, setAnnualIncome] = useState('80000');

  const ba = parseFloat(bankAccounts) || 0;
  const inv = parseFloat(investments) || 0;
  const ret = parseFloat(retirement) || 0;
  const hv = parseFloat(homeValue) || 0;
  const ba2 = parseFloat(businessAssets) || 0;
  const oa = parseFloat(otherAssets) || 0;
  const mort = parseFloat(mortgage) || 0;
  const cc = parseFloat(creditCards) || 0;
  const bd = parseFloat(businessDebt) || 0;
  const sl = parseFloat(studentLoans) || 0;
  const od = parseFloat(otherDebt) || 0;
  const income = parseFloat(annualIncome) || 0;

  const totalAssets = ba + inv + ret + hv + ba2 + oa;
  const totalDebt = mort + cc + bd + sl + od;
  const netWorth = totalAssets - totalDebt;
  const debtToAsset = totalAssets > 0 ? (totalDebt / totalAssets) * 100 : 0;
  const liquidAssets = ba + inv;
  const monthsOfIncome = income > 0 ? (liquidAssets / (income / 12)) : 0;
  const monthsLabel = 'Months of Income';
  const netWorthToIncome = income > 0 ? ((netWorth / income) * 100) : 0;

  return (
    <div>
      <SectionHeader title="Freelancer Net Worth Calculator" subtitle="Track your total assets vs liabilities to know your true financial position" />

      <div className="space-y-6 mb-8">
        <div>
          <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--brand)' }}>Assets</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Bank Accounts ($)</label>
                <input type="number" value={bankAccounts} onChange={(e) => setBankAccounts(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Investments ($)</label>
                <input type="number" value={investments} onChange={(e) => setInvestments(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Retirement Accounts ($)</label>
                <input type="number" value={retirement} onChange={(e) => setRetirement(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Home Value ($)</label>
                <input type="number" value={homeValue} onChange={(e) => setHomeValue(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Business Assets ($)</label>
                <input type="number" value={businessAssets} onChange={(e) => setBusinessAssets(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Other Assets ($)</label>
                <input type="number" value={otherAssets} onChange={(e) => setOtherAssets(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold mb-3" style={{ color: '#EF4444' }}>Liabilities</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Mortgage ($)</label>
                <input type="number" value={mortgage} onChange={(e) => setMortgage(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Credit Cards ($)</label>
                <input type="number" value={creditCards} onChange={(e) => setCreditCards(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Business Debt ($)</label>
                <input type="number" value={businessDebt} onChange={(e) => setBusinessDebt(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Student Loans ($)</label>
                <input type="number" value={studentLoans} onChange={(e) => setStudentLoans(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
                  style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Other Debt ($)</label>
              <input type="number" value={otherDebt} onChange={(e) => setOtherDebt(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
                style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Freelance Income ($)</label>
          <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💎" label="Net Worth" value={formatCurrency(netWorth)} highlight />
        <ResultCard icon="📊" label="Total Assets" value={formatCurrency(totalAssets)} />
        <ResultCard icon="📋" label="Total Debt" value={formatCurrency(totalDebt)} />
        <ResultCard icon="💧" label="Liquid Assets" value={formatCurrency(liquidAssets)} subtitle="Cash + investments" />
        <ResultCard icon="📅" label={monthsLabel} value={`${monthsOfIncome.toFixed(1)}`} subtitle="of liquid assets" />
        <ResultCard icon="📈" label="Net Worth / Income" value={`${netWorthToIncome.toFixed(0)}%`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Total Assets" value={formatCurrency(totalAssets)} />
        <ResultRow label="Total Liabilities" value={formatCurrency(totalDebt)} />
        <ResultRow label="Net Worth" value={formatCurrency(netWorth)} bold />
        <ResultRow label="Debt to Asset Ratio" value={`${debtToAsset.toFixed(1)}%`} />
        <ResultRow label="Liquid Reserve (months)" value={`${monthsOfIncome.toFixed(1)} months`} />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          {netWorth >= income * 3
            ? <>Strong position! Your net worth is {netWorthToIncome.toFixed(0)}% of annual income. Focus on growing investments and eliminating remaining high interest debt.</>
            : netWorth >= income
            ? <>Good progress. Your net worth is {(netWorthToIncome / 100).toFixed(1)}x annual income. Target 3x by age 35 ({formatCurrency(income * 3)}) by increasing retirement contributions and paying down debt.</>
            : <>Your net worth is below your annual income. Prioritize: (1) Build emergency fund (3-6 months). (2) Pay off high interest debt. (3) Maximize retirement contributions. (4) Grow business revenue.</>
          }
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Guideline benchmarks (age × income ÷ 10): by 30 = 1x income, by 35 = 3x, by 40 = 5x, by 50 = 7x. Freelancers often lag early but catch up with tax advantages and business equity. Track quarterly to see your trajectory.</p>
      </div>
    </div>
  );
}
