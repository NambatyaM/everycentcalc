'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { selfEmploymentTax, formatCurrency, formatPercent, SS_CAP, type FilingStatus } from '@/lib/tax';

const INDUSTRY_MULTIPLIERS: Record<string, number> = {
  tech: 0.55,
  consulting: 0.50,
  creative: 0.45,
  general: 0.50,
};

export default function SCorpSalary() {
  const [netIncome, setNetIncome] = useState('150000');
  const [industry, setIndustry] = useState('tech');
  const [filingStatus, setFilingStatus] = useState('single');
  const [yearsInBusiness, setYearsInBusiness] = useState('3');

  const ni = parseFloat(netIncome) || 0;
  const yib = parseInt(yearsInBusiness) || 1;
  const fs = filingStatus as FilingStatus;

  const multiplier = INDUSTRY_MULTIPLIERS[industry];
  const baseSalary = ni * multiplier;
  const adjustedSalary = yib < 2 ? baseSalary * 0.9 : yib > 5 ? baseSalary * 1.05 : baseSalary;
  const distribution = ni - adjustedSalary;

  const EE_SS_RATE = 0.062;
  const EE_MEDICARE_RATE = 0.0145;
  const ER_SS_RATE = 0.062;
  const ER_MEDICARE_RATE = 0.0145;

  const employeeSS = Math.min(adjustedSalary, SS_CAP) * EE_SS_RATE;
  const employeeMedicare = adjustedSalary * EE_MEDICARE_RATE;
  const employeeFICA = employeeSS + employeeMedicare;
  const employerSS = Math.min(adjustedSalary, SS_CAP) * ER_SS_RATE;
  const employerMedicare = adjustedSalary * ER_MEDICARE_RATE;
  const employerFICA = employerSS + employerMedicare;
  const totalFICA = employeeFICA + employerFICA;

  const se = selfEmploymentTax(ni, fs);
  const taxSavings = se.total - totalFICA;

  const seEffectiveRate = ni > 0 ? (se.total / ni) * 100 : 0;
  const ficaEffectiveRate = ni > 0 ? (totalFICA / ni) * 100 : 0;

  return (
    <div>
      <SectionHeader title="S-Corp Reasonable Salary Calculator" subtitle="Determine the optimal salary/distribution split for your S-Corp to minimize FICA taxes" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Net Business Income ($)</label>
            <input type="number" value={netIncome} onChange={(e) => setNetIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Industry</label>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="tech">Technology (55%)</option>
              <option value="consulting">Consulting (50%)</option>
              <option value="creative">Creative (45%)</option>
              <option value="general">General (50%)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Filing Status</label>
            <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Years in Business</label>
            <input type="number" value={yearsInBusiness} onChange={(e) => setYearsInBusiness(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💼" label="Recommended Salary" value={formatCurrency(adjustedSalary)} highlight subtitle={`${(multiplier * 100).toFixed(0)}% of income`} />
        <ResultCard icon="💰" label="Distribution" value={formatCurrency(distribution)} subtitle="No FICA" />
        <ResultCard icon="🏦" label="Total FICA Tax" value={formatCurrency(totalFICA)} />
        <ResultCard icon="📊" label="SE Tax Comparison" value={formatCurrency(se.total)} subtitle="If sole proprietor" />
        <ResultCard icon="✅" label="Tax Savings" value={formatCurrency(taxSavings)} highlight subtitle={taxSavings > 0 ? 'vs. sole proprietorship' : ''} />
        <ResultCard icon="📈" label="Effective FICA Rate" value={formatPercent(ficaEffectiveRate)} subtitle={`vs ${formatPercent(seEffectiveRate)} SE`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Salary & Distribution Breakdown</div>
        <ResultRow label="Net Business Income" value={formatCurrency(ni)} />
        <ResultRow label={`Reasonable Salary (${(multiplier * 100).toFixed(0)}%)`} value={formatCurrency(adjustedSalary)} />
        <ResultRow label="Distribution (No FICA)" value={formatCurrency(distribution)} />
        <ResultRow label="Employee FICA (7.65%)" value={formatCurrency(employeeFICA)} />
        <ResultRow label="Employer FICA (7.65%)" value={formatCurrency(employerFICA)} />
        <ResultRow label="Total FICA" value={formatCurrency(totalFICA)} />
        <ResultRow label="Self Employment Tax" value={formatCurrency(se.total)} />
        <ResultRow label="Annual Savings" value={formatCurrency(taxSavings)} bold />
      </div>

      {yib < 2 && (
        <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
          <p className="text-sm" style={{ color: 'var(--brand)' }}>
            New business adjustment applied: salary reduced by 10% to {formatCurrency(adjustedSalary)}. IRS may scrutinize low salaries for newer businesses.
          </p>
        </div>
      )}

      {yib > 5 && (
        <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
          <p className="text-sm" style={{ color: 'var(--brand)' }}>
            Established business adjustment: salary increased by 5% to {formatCurrency(adjustedSalary)}. Mature businesses may need higher salaries to satisfy IRS reasonable compensation rules.
          </p>
        </div>
      )}

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> Reasonable salary is based on industry benchmarks. The IRS requires S-Corp owners to pay themselves a reasonable salary before taking distributions. Industry multipliers are estimates — actual reasonable compensation depends on duties, experience, location, and comparable salaries. Consult a tax professional for your specific situation.</p>
      </div>
    </div>
  );
}
