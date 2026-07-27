'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency, formatPercent } from '@/lib/tax';

const PAYMENT_TERMS_DAYS: Record<string, number> = {
  net15: 15,
  net30: 30,
  net45: 45,
  net60: 60,
};

export default function ClientInvoiceCalc() {
  const [projectHours, setProjectHours] = useState('40');
  const [hourlyRate, setHourlyRate] = useState('100');
  const [expenseType, setExpenseType] = useState('none');
  const [expenses, setExpenses] = useState('0');
  const [paymentTerms, setPaymentTerms] = useState('net30');
  const [lateFeePercent, setLateFeePercent] = useState('1.5');
  const [retainerDiscount, setRetainerDiscount] = useState('0');

  const hours = parseFloat(projectHours) || 0;
  const rate = parseFloat(hourlyRate) || 0;
  const exp = expenseType === 'custom' ? (parseFloat(expenses) || 0) : 0;
  const terms = PAYMENT_TERMS_DAYS[paymentTerms];
  const lateFeeRate = (parseFloat(lateFeePercent) || 0) / 100;
  const discountRate = (parseFloat(retainerDiscount) || 0) / 100;

  const base = hours * rate;
  const subtotal = base + exp;
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;
  const lateFee = total * lateFeeRate;
  const effectiveRate = hours > 0 ? total / hours : 0;

  const today = new Date();
  const dueDate = new Date(today.getTime() + terms * 24 * 60 * 60 * 1000);
  const formattedDue = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div>
      <SectionHeader title="Client Invoice Calculator" subtitle="Generate accurate invoices with expenses, discounts, and late fee terms" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Project Hours</label>
            <input type="number" value={projectHours} onChange={(e) => setProjectHours(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Hourly Rate ($)</label>
            <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Expense Type</label>
            <select value={expenseType} onChange={(e) => setExpenseType(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="none">No Expenses</option>
              <option value="custom">Custom Amount</option>
            </select>
          </div>
          {expenseType === 'custom' && (
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Expenses ($)</label>
              <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
                style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Payment Terms</label>
            <select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="net15">Net 15</option>
              <option value="net30">Net 30</option>
              <option value="net45">Net 45</option>
              <option value="net60">Net 60</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Late Fee (% per month)</label>
            <input type="number" value={lateFeePercent} onChange={(e) => setLateFeePercent(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Retainer Discount (%)</label>
            <input type="number" value={retainerDiscount} onChange={(e) => setRetainerDiscount(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📄" label="Invoice Total" value={formatCurrency(total)} highlight />
        <ResultCard icon="⚠️" label="Late Fee (if unpaid)" value={formatCurrency(lateFee)} subtitle={`${formatPercent(lateFeeRate * 100)} per month`} />
        <ResultCard icon="📅" label="Payment Due" value={formattedDue} subtitle={`${paymentTerms.toUpperCase()} terms`} />
        <ResultCard icon="💰" label="Effective Hourly Rate" value={formatCurrency(effectiveRate)} subtitle="After discount" />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Invoice Breakdown</div>
        <ResultRow label={`Labor: ${hours} hrs × ${formatCurrency(rate)}`} value={formatCurrency(base)} />
        {exp > 0 && <ResultRow label="Expenses" value={formatCurrency(exp)} />}
        <ResultRow label="Subtotal" value={formatCurrency(subtotal)} />
        {discountRate > 0 && <ResultRow label={`Retainer Discount (${formatPercent(discountRate * 100)})`} value={`-${formatCurrency(discountAmount)}`} />}
        <ResultRow label="Total Due" value={formatCurrency(total)} bold />
        <ResultRow label="Late Fee (if overdue)" value={formatCurrency(lateFee)} />
        <ResultRow label="Amount if Late" value={formatCurrency(total + lateFee)} bold />
        <ResultRow label="Effective Rate Per Hour" value={formatCurrency(effectiveRate)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> Late fee calculated as a flat percentage of the invoice total per month overdue. Due date is calculated from today. Effective hourly rate accounts for discounts and expenses. Does not include sales tax, which may apply depending on your jurisdiction and service type.</p>
      </div>
    </div>
  );
}
