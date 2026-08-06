'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

function getExtensionDeadline() {
  const now = new Date();
  const year = now.getFullYear();
  const deadline = new Date(year, 9, 15);
  if (now > deadline) deadline.setFullYear(year + 1);
  while (deadline.getDay() === 0 || deadline.getDay() === 6) {
    deadline.setDate(deadline.getDate() + 1);
  }
  return deadline;
}

export default function TaxExtension() {
  const [totalOwed, setTotalOwed] = useState('10000');
  const [amountPaid, setAmountPaid] = useState('6000');

  const owed = parseFloat(totalOwed) || 0;
  const paid = parseFloat(amountPaid) || 0;

  const safeHarbor = owed * 0.9;
  const dueByApril15 = Math.max(0, safeHarbor - paid);
  const balance = Math.max(0, owed - paid);
  const interestRate = 0.08;
  const interest = balance * interestRate * (6 / 12);
  const failToFilePenalty = Math.min(balance * 0.05 * 6, balance * 0.25);
  const deadline = getExtensionDeadline();
  const daysUntil = Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / 86400000));
  const formattedDeadline = deadline.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div>
      <SectionHeader title="Tax Extension Calculator" subtitle="See your extended deadline and how much to pay now to avoid IRS penalties" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Total Tax Owed for the Year ($)
          </label>
          <input type="number" value={totalOwed} onChange={(e) => setTotalOwed(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Already Paid (estimated payments + withholding) ($)
          </label>
          <input type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="🗓️" label="Extended Filing Deadline" value={formattedDeadline} highlight />
        <ResultCard icon="💳" label="Pay by April 15" value={`$${dueByApril15.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} />
        <ResultCard icon="⏳" label="Days Until Deadline" value={`${daysUntil} days`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Total Tax Owed" value={`$${owed.toLocaleString()}`} />
        <ResultRow label="Amount Already Paid" value={`-$${paid.toLocaleString()}`} />
        <ResultRow label="Balance Due" value={`$${balance.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} />
        <ResultRow label="90% Safe Harbor (pay by April 15)" value={`$${safeHarbor.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} />
        <ResultRow label="Pay Now to Avoid Penalties" value={`$${dueByApril15.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} bold />
        <ResultRow label="Estimated Interest on Balance (6 mo @ 8%)" value={`$${interest.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} />
        <ResultRow label="Failure-to-File Penalty if Missed (max 25%)" value={`$${failToFilePenalty.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>File Form 4868 by the original deadline to get an automatic 6-month extension to file (October 15 for most filers). An extension only extends time to <strong>file</strong> — not time to <strong>pay</strong>. Pay at least 90% of your total tax by the original deadline to avoid underpayment penalties, then settle the balance by your extension deadline. Interest (about 8% in 2026) accrues on any unpaid balance from the original deadline. This is an estimate; consult a tax professional for your situation.</p>
      </div>
    </div>
  );
}
