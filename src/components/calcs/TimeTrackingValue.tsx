'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function TimeTrackingValueCalc() {
  const [desiredIncome, setDesiredIncome] = useState('100000');
  const [billableHours, setBillableHours] = useState('1500');
  const [nonBillableHours, setNonBillableHours] = useState('15');
  const [outsourceRate, setOutsourceRate] = useState('25');

  const di = parseFloat(desiredIncome) || 0;
  const bh = parseFloat(billableHours);
  const bhValid = !isNaN(bh) && bh > 0;
  const nbh = parseFloat(nonBillableHours) || 0;
  const or = parseFloat(outsourceRate) || 0;

  const hourlyValue = bhValid ? di / bh : NaN;
  const annualOutsourceCost = nbh * or * 50;
  const annualLostRevenue = nbh * hourlyValue * 50;
  const annualSavings = annualLostRevenue - annualOutsourceCost;
  const effectiveRate = bhValid ? di / (bh + nbh * 50) : NaN;
  const rateDisplay = (v: number) => (bhValid ? `$${v.toFixed(2)}/hr` : 'N/A');
  const bhDisplay = bhValid ? bh.toLocaleString() : 'N/A';

  return (
    <div>
      <SectionHeader title="Time Tracking Value Calculator" subtitle="Find out what your time is really worth — and what to outsource" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-desired-annual-income">Desired Annual Income ($)</label>
          <input id="calc-desired-annual-income"  type="number" value={desiredIncome} onChange={(e) => setDesiredIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-billable-hours-per-year">Billable Hours per Year</label>
            <input id="calc-billable-hours-per-year"  type="number" value={billableHours} onChange={(e) => setBillableHours(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Typical freelancers bill 1,200-1,500 hours per year</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-non-billable-hours-per-week">Non-Billable Hours per Week</label>
            <input id="calc-non-billable-hours-per-week"  type="number" value={nonBillableHours} onChange={(e) => setNonBillableHours(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Admin, marketing, emails, prospecting</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-outsource-hourly-rate">Outsource Hourly Rate ($)</label>
          <input id="calc-outsource-hourly-rate"  type="number" value={outsourceRate} onChange={(e) => setOutsourceRate(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>What a VA or specialist charges per hour</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="⏱️" label="Your Hourly Value" value={rateDisplay(hourlyValue)} highlight />
        <ResultCard icon="📉" label="Annual Lost to Admin" value={`$${annualLostRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="💵" label="Outsource Cost" value={`$${annualOutsourceCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="💰" label="Potential Annual Savings" value={formatCurrency(annualSavings)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Desired Annual Income" value={`$${di.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Billable Hours per Year" value={bhDisplay} />
        <ResultRow label="Your Hourly Value" value={rateDisplay(hourlyValue)} bold />
        <ResultRow label="Effective Hourly Rate (with admin)" value={rateDisplay(effectiveRate)} />
        <ResultRow label="Weekly Non-Billable Hours" value={nbh.toLocaleString()} />
        <ResultRow label="Annual Non-Billable Hours" value={(nbh * 50).toLocaleString()} />
        <ResultRow label="Annual Lost Revenue (doing it yourself)" value={`$${annualLostRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Annual Outsource Cost" value={`$${annualOutsourceCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Annual Savings (if outsourced)" value={formatCurrency(annualSavings)} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          {annualSavings > 0 ? (
            <>Outsourcing your non-billable work could save you <strong>${annualSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })} per year</strong>. That&apos;s time you could spend on billable work or actually taking time off.</>
          ) : (
            <>Your hourly value (${hourlyValue.toFixed(2)}/hr) is close to or below the outsource rate. Focus on raising your rates before considering outsourcing.</>
          )}
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Assumes 50 working weeks per year. Your true hourly value may vary based on overhead, taxes, and business expenses. Non-billable time includes admin, marketing, prospecting, invoicing, and client communication.</p>
      </div>
    </div>
  );
}
