'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { selfEmploymentTax, federalIncomeTax, getStandardDeduction, formatCurrency, formatPercent, SS_CAP } from '@/lib/tax';

export default function FreelanceVsEmployeeCalc() {
  const [annualIncome, setAnnualIncome] = useState('100000');
  const [filingStatus, setFilingStatus] = useState('single');

  const income = parseFloat(annualIncome) || 0;
  const fs = filingStatus as 'single' | 'married';
  const deduction = getStandardDeduction(fs);

  // Employee (W-2) side
  const employeeFICA = Math.min(income, SS_CAP) * 0.062 + income * 0.0145;
  const employeeTaxableIncome = Math.max(0, income - deduction);
  const employeeFederalTax = federalIncomeTax(employeeTaxableIncome, fs);
  const employeeTotalTax = employeeFICA + employeeFederalTax;
  const employeeTakeHome = income - employeeTotalTax;

  // Freelancer (1099) side
  const se = selfEmploymentTax(income, fs);
  const seDeduction = se.total / 2;
  const freelancerTaxableIncome = Math.max(0, income - deduction - seDeduction);
  const freelancerFederalTax = federalIncomeTax(freelancerTaxableIncome, fs);
  const freelancerTotalTax = se.total + freelancerFederalTax;
  const freelancerTakeHome = income - freelancerTotalTax;

  // Comparison
  const difference = employeeTakeHome - freelancerTakeHome;
  const employeeEffectiveRate = income > 0 ? (employeeTotalTax / income) * 100 : 0;
  const freelancerEffectiveRate = income > 0 ? (freelancerTotalTax / income) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Freelance vs. Employee Take Home Pay" subtitle="Compare W-2 employee vs. 1099 freelancer taxes on the same gross income" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Annual Gross Income ($)
          </label>
          <input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="100000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Filing Status
          </label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="🏢" label="Employee Take Home" value={formatCurrency(employeeTakeHome)} highlight />
        <ResultCard icon="💻" label="Freelancer Take Home" value={formatCurrency(freelancerTakeHome)} highlight />
        <ResultCard icon="📊" label="Employee Eff. Rate" value={formatPercent(employeeEffectiveRate)} />
        <ResultCard icon="📊" label="Freelancer Eff. Rate" value={formatPercent(freelancerEffectiveRate)} />
        <ResultCard icon="🏢" label="Employee Total Tax" value={formatCurrency(employeeTotalTax)} />
        <ResultCard icon="💻" label="Freelancer Total Tax" value={formatCurrency(freelancerTotalTax)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Gross Income" value={formatCurrency(income)} />
        <ResultRow label="Employee FICA (7.65%)" value={formatCurrency(employeeFICA)} />
        <ResultRow label="Freelancer SE Tax (15.3%)" value={formatCurrency(se.total)} />
        <ResultRow label="Employee Federal Tax" value={formatCurrency(employeeFederalTax)} />
        <ResultRow label="Freelancer Federal Tax" value={formatCurrency(freelancerFederalTax)} />
        <ResultRow label="Employee Total Tax" value={formatCurrency(employeeTotalTax)} />
        <ResultRow label="Freelancer Total Tax" value={formatCurrency(freelancerTotalTax)} />
        <ResultRow label="Employee Take Home" value={formatCurrency(employeeTakeHome)} bold />
        <ResultRow label="Freelancer Take Home" value={formatCurrency(freelancerTakeHome)} bold />
        <ResultRow label="Difference" value={`${difference >= 0 ? '+' : ''}${formatCurrency(difference)}`} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4 break-words overflow-hidden" style={{ background: difference > 0 ? 'var(--brand-light)' : 'rgba(239, 68, 68, 0.1)', borderColor: difference > 0 ? 'var(--brand)' : '#ef4444' }}>
        <p className="text-sm font-medium" style={{ color: difference > 0 ? 'var(--brand)' : '#ef4444' }}>
          {difference > 0
            ? `As an employee, you take home ${formatCurrency(difference)} more per year. Freelancers pay double FICA but get a 50% SE tax deduction on federal income tax.`
            : `As a freelancer, you take home ${formatCurrency(Math.abs(difference))} more per year. The SE tax deduction offsets the higher FICA rate at this income level.`}
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Note:</strong> Uses 2026 IRS brackets and standard deduction ($16,100 single / $32,200 MFJ). Employee side assumes employer pays half of FICA. Freelancer side includes SE tax (15.3% on 92.35% of income) with 50% deduction. Does not include state taxes, QBI deduction, health insurance, retirement contributions, or employer benefits value.</p>
      </div>
    </div>
  );
}
