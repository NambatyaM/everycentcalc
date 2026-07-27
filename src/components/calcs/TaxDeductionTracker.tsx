'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

const HOME_OFFICE_RATE = 5;
const HOME_OFFICE_MAX_SQFT = 300;
const DEFAULT_MARGINAL_RATE = 0.22;

export default function TaxDeductionTrackerCalc() {
  const [sqft, setSqft] = useState('150');
  const [equipment, setEquipment] = useState('2000');
  const [software, setSoftware] = useState('600');
  const [internet, setInternet] = useState('80');
  const [phone, setPhone] = useState('50');
  const [healthInsurance, setHealthInsurance] = useState('400');
  const [profDev, setProfDev] = useState('500');
  const [otherExpenses, setOtherExpenses] = useState('0');

  const sq = Math.min(parseFloat(sqft) || 0, HOME_OFFICE_MAX_SQFT);
  const eq = parseFloat(equipment) || 0;
  const sw = parseFloat(software) || 0;
  const inMo = (parseFloat(internet) || 0) * 12;
  const phMo = (parseFloat(phone) || 0) * 12;
  const hiMo = (parseFloat(healthInsurance) || 0) * 12;
  const pd = parseFloat(profDev) || 0;
  const ot = parseFloat(otherExpenses) || 0;

  const homeOffice = sq * HOME_OFFICE_RATE;
  const totalDeductions = homeOffice + eq + sw + inMo + phMo + hiMo + pd + ot;
  const taxSavings = totalDeductions * DEFAULT_MARGINAL_RATE;

  const categories = [
    { label: 'Home Office (Simplified)', value: homeOffice, detail: `${sq} sq ft × $5/sq ft` },
    { label: 'Computer / Equipment', value: eq, detail: 'One time purchase' },
    { label: 'Software Subscriptions', value: sw, detail: 'Annual total' },
    { label: 'Internet (12 months)', value: inMo, detail: `$${(parseFloat(internet) || 0).toFixed(0)}/mo` },
    { label: 'Phone (12 months)', value: phMo, detail: `$${(parseFloat(phone) || 0).toFixed(0)}/mo` },
    { label: 'Health Insurance (12 months)', value: hiMo, detail: `$${(parseFloat(healthInsurance) || 0).toFixed(0)}/mo` },
    { label: 'Professional Development', value: pd, detail: 'Courses, books, conferences' },
    { label: 'Other Business Expenses', value: ot, detail: 'Miscellaneous' },
  ];

  return (
    <div>
      <SectionHeader title="Freelance Tax Deduction Estimator" subtitle="Track your business deductions and estimate your tax savings" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Home Office (sq ft)
          </label>
          <input
            type="number"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="150"
          />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Simplified method: $5/sq ft (max 300 sq ft = $1,500)</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Computer / Equipment ($)
          </label>
          <input
            type="number"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="2000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Software Subscriptions (annual $)
          </label>
          <input
            type="number"
            value={software}
            onChange={(e) => setSoftware(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="600"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Internet (monthly $)
            </label>
            <input
              type="number"
              value={internet}
              onChange={(e) => setInternet(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              placeholder="80"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Phone (monthly $)
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              placeholder="50"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Health Insurance (monthly $)
          </label>
          <input
            type="number"
            value={healthInsurance}
            onChange={(e) => setHealthInsurance(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            placeholder="400"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Professional Development ($)
            </label>
            <input
              type="number"
              value={profDev}
              onChange={(e) => setProfDev(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              placeholder="500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Other Business Expenses ($)
            </label>
            <input
              type="number"
              value={otherExpenses}
              onChange={(e) => setOtherExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="📑" label="Total Deductions" value={formatCurrency(totalDeductions)} highlight />
        <ResultCard icon="💰" label="Est. Tax Savings" value={formatCurrency(taxSavings)} highlight subtitle={`${(DEFAULT_MARGINAL_RATE * 100).toFixed(0)}% marginal rate`} />
        <ResultCard icon="🏠" label="Home Office Deduction" value={formatCurrency(homeOffice)} subtitle={`${sq} sq ft × $5`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        {categories.map((cat) => (
          <ResultRow key={cat.label} label={cat.label} value={formatCurrency(cat.value)} />
        ))}
        <ResultRow label="Total Deductions" value={formatCurrency(totalDeductions)} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          Your estimated deductions of <strong>{formatCurrency(totalDeductions)}</strong> could save you approximately <strong>{formatCurrency(taxSavings)}</strong> in federal taxes (at the 22% bracket). Keep receipts for all business expenses.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Note:</strong> Uses the simplified home office method ($5/sq ft, max 300 sq ft). Monthly expenses (internet, phone, health insurance) are annualized. Tax savings estimate uses a flat 22% marginal rate — your actual savings depend on your income bracket and filing status. Self employed health insurance is deductible on Schedule 1. Consult a tax professional for your specific situation.</p>
      </div>
    </div>
  );
}
