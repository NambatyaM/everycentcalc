'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function ClientBilling() {
  const [retainerHours, setRetainerHours] = useState('40');
  const [hourlyRate, setHourlyRate] = useState('125');
  const [overtimeHours, setOvertimeHours] = useState('5');
  const [overtimeMultiplier, setOvertimeMultiplier] = useState('1.5');
  const [annualDiscount, setAnnualDiscount] = useState('10');

  const retainer = parseFloat(retainerHours) || 0;
  const rate = parseFloat(hourlyRate) || 0;
  const otHours = parseFloat(overtimeHours) || 0;
  const otMult = parseFloat(overtimeMultiplier) || 1;
  const discount = parseFloat(annualDiscount) || 0;

  const regularMonthly = retainer * rate;
  const overtimeMonthly = otHours * rate * otMult;
  const monthlyTotal = regularMonthly + overtimeMonthly;
  const annualNoDiscount = monthlyTotal * 12;
  const annualWithDiscount = annualNoDiscount * (1 - discount / 100);
  const totalHours = retainer + otHours;
  const effectiveHourly = totalHours > 0 ? monthlyTotal / totalHours : 0;
  const savingsFromRetainer = annualNoDiscount - annualWithDiscount;

  return (
    <div>
      <SectionHeader title="Client Billing Calculator" subtitle="Model retainer and hourly billing scenarios for client engagements" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-retainer-hours">
              Monthly Retainer Hours
            </label>
            <input id="calc-monthly-retainer-hours"  type="number" value={retainerHours} onChange={(e) => setRetainerHours(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-hourly-rate">
              Hourly Rate ($)
            </label>
            <input id="calc-hourly-rate"  type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-overtime-hours-month">
              Overtime Hours/Month
            </label>
            <input id="calc-overtime-hours-month"  type="number" value={overtimeHours} onChange={(e) => setOvertimeHours(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-overtime-multiplier">
              Overtime Multiplier
            </label>
            <input id="calc-overtime-multiplier"  type="number" value={overtimeMultiplier} onChange={(e) => setOvertimeMultiplier(e.target.value)} step="0.1"
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-annual-retainer-discount">
              Annual Retainer Discount (%)
            </label>
            <input id="calc-annual-retainer-discount"  type="number" value={annualDiscount} onChange={(e) => setAnnualDiscount(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📅" label="Monthly Total" value={`$${monthlyTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📆" label="Annual Total (Discounted)" value={`$${annualWithDiscount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="⏱️" label="Effective Hourly Rate" value={`$${effectiveHourly.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} />
        <ResultCard icon="💰" label="Annual Savings from Retainer" value={`$${savingsFromRetainer.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Retainer Hours" value={`${retainer} hrs`} />
        <ResultRow label="Hourly Rate" value={`$${rate}`} />
        <ResultRow label="Regular Monthly" value={`$${regularMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Overtime Hours" value={`${otHours} hrs`} />
        <ResultRow label="OT Multiplier" value={`${otMult}x`} />
        <ResultRow label="Overtime Cost" value={`$${overtimeMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Total" value={`$${monthlyTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Annual (No Discount)" value={`$${annualNoDiscount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label={`Annual Discount (${discount}%)`} value={`-$${savingsFromRetainer.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Annual Total" value={`$${annualWithDiscount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Total Monthly Hours" value={`${totalHours} hrs`} />
        <ResultRow label="Effective Hourly Rate" value={`$${effectiveHourly.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Retainer agreements provide predictable income while offering clients a discount off your standard hourly rate. The effective hourly rate accounts for both retainer and overtime hours. Annual discounts are applied to the full annual total (retainer + overtime). Adjust the overtime multiplier based on your agreement (1.5x is standard time and a half).</p>
      </div>
    </div>
  );
}
