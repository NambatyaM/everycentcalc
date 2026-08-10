'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function QuarterlyTaxPenalty() {
  const [estimatedTax, setEstimatedTax] = useState('5000');
  const [amountPaid, setAmountPaid] = useState('3000');
  const [underpaymentMonths, setUnderpaymentMonths] = useState('6');
  const [penaltyRate, setPenaltyRate] = useState('8');

  const totalOwed = parseFloat(estimatedTax) || 0;
  const paid = parseFloat(amountPaid) || 0;
  const months = parseFloat(underpaymentMonths) || 0;
  const rate = parseFloat(penaltyRate) || 0;

  const unpaidBalance = Math.max(0, totalOwed - paid);
  const penalty = unpaidBalance * (rate / 100) * (months / 12);
  const totalDue = unpaidBalance + penalty;

  return (
    <div>
      <SectionHeader title="Quarterly Tax Penalty Calculator" subtitle="Estimate the IRS underpayment penalty on unpaid estimated taxes" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-total-estimated-tax-owed">
            Total Estimated Tax Owed ($)
          </label>
          <input id="calc-total-estimated-tax-owed"  type="number" value={estimatedTax} onChange={(e) => setEstimatedTax(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-amount-already-paid">
            Amount Already Paid ($)
          </label>
          <input id="calc-amount-already-paid"  type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-underpayment-period-months">
              Underpayment Period (months)
            </label>
            <input id="calc-underpayment-period-months"  type="number" value={underpaymentMonths} onChange={(e) => setUnderpaymentMonths(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-irs-penalty-rate">
              IRS Penalty Rate (%)
            </label>
            <input id="calc-irs-penalty-rate"  type="number" value={penaltyRate} onChange={(e) => setPenaltyRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="⚠️" label="Total Penalty" value={`$${penalty.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} highlight />
        <ResultCard icon="📋" label="Unpaid Balance" value={`$${unpaidBalance.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} />
        <ResultCard icon="💰" label="Total Due" value={`$${totalDue.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} highlight />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Total Estimated Tax" value={`$${totalOwed.toLocaleString()}`} />
        <ResultRow label="Amount Already Paid" value={`-$${paid.toLocaleString()}`} />
        <ResultRow label="Unpaid Balance" value={`$${unpaidBalance.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} />
        <ResultRow label="Penalty Rate" value={`${rate}%`} />
        <ResultRow label="Period" value={`${months} months`} />
        <ResultRow label="Penalty Calculation" value={`${unpaidBalance.toLocaleString()} × ${rate}% × ${months}/12`} />
        <ResultRow label="Penalty Amount" value={`$${penalty.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} bold />
        <ResultRow label="Total Due" value={`$${totalDue.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>The IRS charges underpayment penalties when you don&apos;t pay enough estimated tax throughout the year. The penalty rate is the IRS underpayment rate (currently 8% for Q1-Q2 2026, may vary by quarter). This is a simplified estimate — actual penalties are calculated per quarter and may differ. Pay at least 90% of current year tax or 100% of prior year tax (110% if AGI &gt; $150K) to avoid penalties.</p>
      </div>
    </div>
  );
}
