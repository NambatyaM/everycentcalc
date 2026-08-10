'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function FreelanceProjectRate() {
  const [estimatedHours, setEstimatedHours] = useState('40');
  const [hourlyRate, setHourlyRate] = useState('100');
  const [complexityFactor, setComplexityFactor] = useState('1.2');
  const [revisionRounds, setRevisionRounds] = useState('2');
  const [bufferPercent, setBufferPercent] = useState('20');

  const hours = parseFloat(estimatedHours) || 0;
  const rate = parseFloat(hourlyRate) || 0;
  const complexity = parseFloat(complexityFactor) || 1;
  const rounds = parseFloat(revisionRounds) || 0;
  const buffer = parseFloat(bufferPercent) || 0;

  const baseRate = hours * rate;
  const adjusted = baseRate * complexity;
  const revisionCost = adjusted * 0.15 * rounds;
  const subtotal = adjusted + revisionCost;
  const totalWithBuffer = subtotal * (1 + buffer / 100);
  const dailyRate = rate * 8;

  return (
    <div>
      <SectionHeader title="Freelance Project Rate Calculator" subtitle="Price your projects accurately with complexity and revision buffers" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-estimated-hours-for-project">
              Estimated Hours for Project
            </label>
            <input id="calc-estimated-hours-for-project"  type="number" value={estimatedHours} onChange={(e) => setEstimatedHours(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-desired-hourly-rate">
              Desired Hourly Rate ($)
            </label>
            <input id="calc-desired-hourly-rate"  type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-complexity-factor-1-0-2-0">
              Complexity Factor (1.0–2.0)
            </label>
            <input id="calc-complexity-factor-1-0-2-0"  type="number" value={complexityFactor} onChange={(e) => setComplexityFactor(e.target.value)} step="0.1"
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-revision-rounds">
              Revision Rounds
            </label>
            <input id="calc-revision-rounds"  type="number" value={revisionRounds} onChange={(e) => setRevisionRounds(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-buffer">
              Buffer (%)
            </label>
            <input id="calc-buffer"  type="number" value={bufferPercent} onChange={(e) => setBufferPercent(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="💰" label="Recommended Price" value={`$${totalWithBuffer.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📋" label="Base Rate" value={`$${baseRate.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="🔄" label="Revision Cost" value={`$${revisionCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📊" label="Total with Buffer" value={`$${totalWithBuffer.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Hours × Hourly Rate" value={`${hours} × $${rate.toLocaleString()}`} />
        <ResultRow label="Base Rate" value={`$${baseRate.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label={`× Complexity (${complexity}x)`} value={`$${adjusted.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label={`Revisions (${rounds} rounds × 15%)`} value={`$${revisionCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Subtotal" value={`$${subtotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label={`+ Buffer (${buffer}%)`} value={`$${(subtotal * buffer / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Recommended Price" value={`$${totalWithBuffer.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Daily Equivalent" value={`$${dailyRate.toLocaleString()}`} />
        <ResultRow label="Effective Hourly Rate" value={`$${(hours > 0 ? totalWithBuffer / hours : 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}/hr`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Complexity factor accounts for technical difficulty, unfamiliar tools, or research time (1.0 = straightforward, 1.5 = complex, 2.0 = highly specialized). Each revision round is estimated at 15% of the adjusted project cost. Buffer covers scope creep, communication overhead, and unforeseen delays. Adjust these factors based on your experience with similar projects.</p>
      </div>
    </div>
  );
}
