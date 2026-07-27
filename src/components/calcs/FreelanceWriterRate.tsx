'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function FreelanceWriterRate() {
  const [desiredIncome, setDesiredIncome] = useState('75000');
  const [wordsPerHour, setWordsPerHour] = useState('500');
  const [billableHours, setBillableHours] = useState('20');
  const [researchPct, setResearchPct] = useState('20');
  const [editingPct, setEditingPct] = useState('15');

  const income = parseFloat(desiredIncome) || 0;
  const wph = parseFloat(wordsPerHour) || 1;
  const hours = parseFloat(billableHours) || 1;
  const research = parseFloat(researchPct) || 0;
  const editing = parseFloat(editingPct) || 0;

  const hourlyRate = income / (52 * hours);
  const perWord = hourlyRate / wph;
  const wordsPerArticle = 1500;
  const timePerArticle = (wordsPerArticle / wph) * (1 + (research + editing) / 100);
  const perArticle = hourlyRate * timePerArticle;
  const monthlyIncome = hourlyRate * hours * 4;

  return (
    <div>
      <SectionHeader title="Freelance Writer Rate Calculator" subtitle="Set the right rates to hit your income goals" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Desired Annual Income ($)</label>
          <input type="number" value={desiredIncome} onChange={(e) => setDesiredIncome(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Words per Hour</label>
            <input type="number" value={wordsPerHour} onChange={(e) => setWordsPerHour(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Billable Hours per Week</label>
            <input type="number" value={billableHours} onChange={(e) => setBillableHours(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Research Time per Article (%)</label>
            <input type="number" value={researchPct} onChange={(e) => setResearchPct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Editing Time per Article (%)</label>
            <input type="number" value={editingPct} onChange={(e) => setEditingPct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <ResultCard icon="⏱️" label="Hourly Rate" value={formatCurrency(hourlyRate)} highlight />
        <ResultCard icon="📝" label="Per-Word Rate" value={formatCurrency(perWord)} highlight />
        <ResultCard icon="📄" label="Per-Article Rate" value={formatCurrency(perArticle)} />
        <ResultCard icon="💰" label="Monthly Income" value={formatCurrency(monthlyIncome)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Rate Breakdown</p>
        <ResultRow label="Desired Annual Income" value={formatCurrency(income)} />
        <ResultRow label="Weeks per Year" value="52" />
        <ResultRow label="Billable Hours per Week" value={hours.toString()} />
        <ResultRow label="Hourly Rate (income ÷ 52 ÷ hours)" value={formatCurrency(hourlyRate)} bold />
        <ResultRow label="Per-Word Rate (hourly ÷ words/hr)" value={formatCurrency(perWord)} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Per-Article Estimate (1,500 words)</p>
        <ResultRow label="Writing Time (1,500 ÷ words/hr)" value={`${(wordsPerArticle / wph).toFixed(2)} hrs`} />
        <ResultRow label={`+ Research (${research}%)`} value={`+${((wordsPerArticle / wph) * (research / 100)).toFixed(2)} hrs`} />
        <ResultRow label={`+ Editing (${editing}%)`} value={`+${((wordsPerArticle / wph) * (editing / 100)).toFixed(2)} hrs`} />
        <ResultRow label="Total Time per Article" value={`${timePerArticle.toFixed(2)} hrs`} />
        <ResultRow label="Charge per Article" value={formatCurrency(perArticle)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Based on a standard 1,500-word article. Research and editing percentages add to your total time per article. Per-word rate = hourly rate ÷ writing speed. Increase billable hours or writing speed to improve your effective rate.</p>
      </div>
    </div>
  );
}
