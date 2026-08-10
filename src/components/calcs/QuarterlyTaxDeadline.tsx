'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

function nextBusinessDay(date: Date): Date {
  const d = new Date(date);
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

function getQuarters(now: Date) {
  const year = now.getFullYear();
  const jan15ThisYear = new Date(year, 0, 15);
  const earlyJanuary = now < jan15ThisYear;
  const quarters = earlyJanuary
    ? [
        { quarter: 'Q4', label: 'Sep 1 – Dec 31', base: new Date(year, 0, 15), incomePeriod: 'Sep 1 – Dec 31' },
        { quarter: 'Q1', label: 'Jan 1 – Mar 31', base: new Date(year, 3, 15), incomePeriod: 'Jan 1 – Mar 31' },
        { quarter: 'Q2', label: 'Apr 1 – May 31', base: new Date(year, 5, 15), incomePeriod: 'Apr 1 – May 31' },
        { quarter: 'Q3', label: 'Jun 1 – Aug 31', base: new Date(year, 8, 15), incomePeriod: 'Jun 1 – Aug 31' },
      ]
    : [
        { quarter: 'Q1', label: 'Jan 1 – Mar 31', base: new Date(year, 3, 15), incomePeriod: 'Jan 1 – Mar 31' },
        { quarter: 'Q2', label: 'Apr 1 – May 31', base: new Date(year, 5, 15), incomePeriod: 'Apr 1 – May 31' },
        { quarter: 'Q3', label: 'Jun 1 – Aug 31', base: new Date(year, 8, 15), incomePeriod: 'Jun 1 – Aug 31' },
        { quarter: 'Q4', label: 'Sep 1 – Dec 31', base: new Date(year + 1, 0, 15), incomePeriod: 'Sep 1 – Dec 31' },
      ];
  return quarters.map((q) => ({ ...q, due: nextBusinessDay(q.base) }));
}

export default function QuarterlyTaxDeadline() {
  const [lastYearTax, setLastYearTax] = useState('20000');
  const [agi, setAgi] = useState('60000');

  const now = new Date();
  const quarters = getQuarters(now);
  const nextIndex = quarters.findIndex((q) => q.due >= now);
  const safeHarborPct = (parseFloat(agi) || 0) > 150000 ? 1.1 : 1.0;
  const safeHarborAnnual = (parseFloat(lastYearTax) || 0) * safeHarborPct;
  const safeHarborQuarterly = safeHarborAnnual / 4;

  return (
    <div>
      <SectionHeader title="Quarterly Tax Deadline Calculator" subtitle="Track the four IRS estimated tax due dates and plan your payments" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-last-year-apos-s-total-tax">
            Last Year&apos;s Total Tax ($)
          </label>
          <input id="calc-last-year-apos-s-total-tax"  type="number" value={lastYearTax} onChange={(e) => setLastYearTax(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-prior-year-agi-determines-100-vs-110-safe-harbor">
            Prior Year AGI ($) — determines 100% vs 110% safe harbor
          </label>
          <input id="calc-prior-year-agi-determines-100-vs-110-safe-harbor"  type="number" value={agi} onChange={(e) => setAgi(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {quarters.map((q, i) => {
          const passed = q.due < now;
          const isNext = i === nextIndex;
          const days = Math.max(0, Math.ceil((q.due.getTime() - now.getTime()) / 86400000));
          return (
            <ResultCard
              key={q.quarter}
              icon={isNext ? '⏰' : '📅'}
              label={`${q.quarter} Due ${passed ? '(passed)' : ''}`}
              value={q.due.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              subtitle={passed ? 'Income: ' + q.incomePeriod : `${days} days from now`}
              highlight={!passed}
            />
          );
        })}
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Safe Harbor Requirement" value={`${Math.round(safeHarborPct * 100)}% of last year's tax`} />
        <ResultRow label="Safe Harbor Total for the Year" value={`$${safeHarborAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Pay Per Quarter to Stay Safe" value={`$${safeHarborQuarterly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm font-medium" style={{ color: 'var(--brand)' }}>
          Rule: Pay at least 90% of this year&apos;s tax OR 100% of last year&apos;s tax (110% if your AGI exceeded $150,000) through four equal installments to avoid the IRS underpayment penalty. Miss a deadline and the penalty applies even if you overpay later.
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Deadlines assume the standard schedule: Q1 by April 15, Q2 by June 15, Q3 by September 15, Q4 by January 15 of the next year. When a date falls on a weekend, the deadline moves to the next business day (federal holidays are not accounted for). IRS Form 1040-ES and Form 2210 cover estimated payments and penalty calculations. Consult a tax professional for your situation.</p>
      </div>
    </div>
  );
}
