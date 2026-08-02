'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { SS_CAP, SE_RATE, SS_RATE, MEDICARE_RATE, ADDITIONAL_MEDICARE_RATE, formatCurrency, formatPercent } from '@/lib/tax';

export default function SeTaxVsFica() {
  const [netSEIncome, setNetSEIncome] = useState('100000');
  const [w2Salary, setW2Salary] = useState('100000');

  const seIncome = parseFloat(netSEIncome) || 0;
  const salary = parseFloat(w2Salary) || 0;

  const seTaxable = seIncome * SE_RATE;
  const seSS = Math.min(seTaxable, SS_CAP) * SS_RATE;
  const seMedicare = seTaxable * MEDICARE_RATE;
  const seAdditionalMedicare = Math.max(0, seTaxable - 200000) * ADDITIONAL_MEDICARE_RATE;
  const seTotalFICA = seSS + seMedicare + seAdditionalMedicare;

  const w2SS = Math.min(salary, SS_CAP) * (SS_RATE / 2);
  const w2Medicare = salary * (MEDICARE_RATE / 2);
  const w2AdditionalMedicare = Math.max(0, salary - 200000) * ADDITIONAL_MEDICARE_RATE;
  const w2EmployeeFICA = w2SS + w2Medicare + w2AdditionalMedicare;
  const w2EmployerFICA = w2EmployeeFICA;
  const w2TotalFICA = w2EmployeeFICA + w2EmployerFICA;

  const difference = seTotalFICA - w2TotalFICA;
  const youPayExtra = seTotalFICA - w2EmployeeFICA;
  const seRate = seIncome > 0 ? (seTotalFICA / seIncome) * 100 : 0;
  const w2Rate = salary > 0 ? (w2EmployeeFICA / salary) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Self Employment Tax vs. W-2 FICA Comparison" subtitle="See the real difference between self employment and employee payroll taxes" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Net Self Employment Income ($)
            </label>
            <input type="number" value={netSEIncome} onChange={(e) => setNetSEIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Comparable W-2 Salary ($)
            </label>
            <input type="number" value={w2Salary} onChange={(e) => setW2Salary(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🏛️" label="SE Total FICA (15.3%)" value={formatCurrency(seTotalFICA)} highlight />
        <ResultCard icon="💼" label="W-2 Employee FICA (7.65%)" value={formatCurrency(w2EmployeeFICA)} />
        <ResultCard icon="⚠️" label="Difference" value={formatCurrency(difference)} highlight subtitle={difference > 0 ? 'SE total costs more' : difference < 0 ? 'SE total costs less' : ''} />
        <ResultCard icon="💸" label="You Pay Extra" value={formatCurrency(youPayExtra)} highlight />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Self Employment (You pay both halves)</p>
        <ResultRow label="Taxable SE Income (92.35%)" value={formatCurrency(seTaxable)} />
        <ResultRow label="Social Security (12.4%)" value={formatCurrency(seSS)} />
        <ResultRow label="Medicare (2.9%)" value={formatCurrency(seMedicare)} />
        {seAdditionalMedicare > 0 && (
          <ResultRow label="Additional Medicare (0.9%)" value={formatCurrency(seAdditionalMedicare)} />
        )}
        <ResultRow label="Total SE FICA" value={formatCurrency(seTotalFICA)} bold />
        <ResultRow label="Effective SE FICA Rate" value={formatPercent(seRate)} bold />

        <p className="text-sm font-bold mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>W-2 Employee (You pay 7.65%, employer pays 7.65%)</p>
        <ResultRow label="Gross Salary" value={formatCurrency(salary)} />
        <ResultRow label="Social Security (6.2%)" value={formatCurrency(w2SS)} />
        <ResultRow label="Medicare (1.45%)" value={formatCurrency(w2Medicare)} />
        {w2AdditionalMedicare > 0 && (
          <ResultRow label="Additional Medicare (0.9%)" value={formatCurrency(w2AdditionalMedicare)} />
        )}
        <ResultRow label="Employee FICA" value={formatCurrency(w2EmployeeFICA)} bold />
        <ResultRow label="Employer FICA (matched)" value={formatCurrency(w2EmployerFICA)} />
        <ResultRow label="Total W-2 FICA" value={formatCurrency(w2TotalFICA)} bold />
        <ResultRow label="Effective Employee FICA Rate" value={formatPercent(w2Rate)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Self employed individuals pay both the employer and employee portions of FICA taxes (15.3% total on 92.35% of net SE income). W-2 employees only pay 7.65% — the employer pays the other half. Social Security cap: $184,500. Additional Medicare Tax of 0.9% applies above $200,000 for single filers. The employer portion of FICA is not a tax deduction you can take.</p>
      </div>
    </div>
  );
}
