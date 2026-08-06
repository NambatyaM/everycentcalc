'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function SalaryToHourlyCalc() {
  const [mode, setMode] = useState<'salary' | 'hourly'>('salary');
  const [salary, setSalary] = useState('65000');
  const [hourly, setHourly] = useState('25');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [weeksPerYear, setWeeksPerYear] = useState('52');

  const hours = parseFloat(hoursPerWeek) || 0;
  const weeks = parseFloat(weeksPerYear) || 0;

  const annualSalary = mode === 'salary' ? (parseFloat(salary) || 0) : (parseFloat(hourly) || 0) * hours * weeks;
  const hourlyRate = mode === 'salary' ? annualSalary / (hours * weeks) : (parseFloat(hourly) || 0);

  const monthly = annualSalary / 12;
  const biweekly = annualSalary / 26;
  const weekly = annualSalary / weeks;

  return (
    <div>
      <SectionHeader title="Salary to Hourly Converter" subtitle="Convert between annual salary and hourly wage (2026)" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>What do you know?</label>
          <select value={mode} onChange={(e) => setMode(e.target.value as 'salary' | 'hourly')}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <option value="salary">My annual salary</option>
            <option value="hourly">My hourly rate</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              {mode === 'salary' ? 'Annual Salary ($)' : 'Hourly Rate ($/hr)'}
            </label>
            <input type="number" value={mode === 'salary' ? salary : hourly} onChange={(e) => mode === 'salary' ? setSalary(e.target.value) : setHourly(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Hours Per Week</label>
            <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Paid Weeks Per Year</label>
          <input type="number" value={weeksPerYear} onChange={(e) => setWeeksPerYear(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Use 52 with no unpaid leave, or 50 to account for 2 weeks off. These are gross pre-tax amounts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <ResultCard icon="⏱️" label={mode === 'salary' ? 'Hourly Rate' : 'Annual Salary'} value={formatCurrency(mode === 'salary' ? hourlyRate : annualSalary)} highlight />
        <ResultCard icon="📆" label="Per Month" value={formatCurrency(monthly)} />
        <ResultCard icon="📅" label="Per Biweekly" value={formatCurrency(biweekly)} />
        <ResultCard icon="🗓️" label="Per Week" value={formatCurrency(weekly)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Annual Salary" value={formatCurrency(annualSalary)} />
        <ResultRow label="Hourly Rate" value={formatCurrency(hourlyRate)} />
        <ResultRow label="Hours Per Week" value={`${hours} hrs`} />
        <ResultRow label="Weeks Per Year" value={`${weeks} wks`} />
        <ResultRow label="Per Month (×12)" value={formatCurrency(monthly)} />
        <ResultRow label="Per Biweekly Paycheck (×26)" value={formatCurrency(biweekly)} />
        <ResultRow label="Per Week" value={formatCurrency(weekly)} bold />
        <ResultRow label="Per Day (8-hour day)" value={formatCurrency(hourlyRate * 8)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Converts gross pay only — no tax is deducted. For after-tax numbers, use the Take-Home Pay Calculator. Freelancers should note that an equivalent hourly rate needs to be higher than a salaried rate to cover self-employment tax (15.3%), no paid time off, and health insurance. A good rule: take your target salary, divide by 1000, then double it — a $50k target salary ≈ $100/hour freelance.</p>
      </div>
    </div>
  );
}
