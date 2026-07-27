'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function FreelanceHourlyVsProjectCalc() {
  const [hourlyRate, setHourlyRate] = useState('100');
  const [estimatedHours, setEstimatedHours] = useState('20');
  const [actualHours, setActualHours] = useState('14');
  const [projectsPerMonth, setProjectsPerMonth] = useState('4');
  const [overheadHours, setOverheadHours] = useState('5');

  const rate = parseFloat(hourlyRate) || 0;
  const estimated = parseFloat(estimatedHours) || 0;
  const actual = parseFloat(actualHours) || 0;
  const projects = parseFloat(projectsPerMonth) || 0;
  const overhead = parseFloat(overheadHours) || 0;

  const hourlyRevenue = rate * (actual + overhead) * projects;
  const hourlyEffective = hourlyRevenue / ((actual + overhead) * projects || 1);

  const projectBase = rate * estimated * 1.2;
  const projectRevenue = projectBase * projects;
  const projectEffective = projectRevenue / ((actual + overhead) * projects || 1);

  const savings = projectRevenue - hourlyRevenue;
  const effectiveGain = projectEffective - hourlyEffective;
  const annualDifference = savings * 12;

  return (
    <div>
      <SectionHeader title="Hourly vs. Project Pricing Calculator" subtitle="Compare your earnings under hourly and project based pricing models" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Your Hourly Rate ($)
          </label>
          <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Estimated Hours per Project
            </label>
            <input type="number" value={estimatedHours} onChange={(e) => setEstimatedHours(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Actual Hours per Project
            </label>
            <input type="number" value={actualHours} onChange={(e) => setActualHours(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Projects per Month
            </label>
            <input type="number" value={projectsPerMonth} onChange={(e) => setProjectsPerMonth(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Non-Billable Hours per Project
            </label>
            <input type="number" value={overheadHours} onChange={(e) => setOverheadHours(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="⏱️" label="Hourly Monthly Revenue" value={formatCurrency(hourlyRevenue)} />
        <ResultCard icon="📋" label="Project Monthly Revenue" value={formatCurrency(projectRevenue)} highlight />
        <ResultCard icon="💡" label="Extra from Project Pricing" value={formatCurrency(savings)} highlight subtitle="per month" />
        <ResultCard icon="📈" label="Annual Difference" value={formatCurrency(annualDifference)} highlight />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Hourly Effective Rate" value={`$${hourlyEffective.toFixed(0)}/hr`} />
        <ResultRow label="Project Effective Rate" value={`$${projectEffective.toFixed(0)}/hr`} bold />
        <ResultRow label="Efficiency Gain" value={`+$${effectiveGain.toFixed(0)}/hr`} />
        <ResultRow label="Monthly Hours Worked" value={`${((actual + overhead) * projects).toFixed(0)} hrs`} />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          {savings > 0
            ? <>Project pricing earns you <strong>{formatCurrency(savings)}</strong> more per month ({formatCurrency(annualDifference)}/year). Your effective hourly rate jumps from ${hourlyEffective.toFixed(0)} to ${projectEffective.toFixed(0)}/hr — a {((effectiveGain / hourlyEffective) * 100).toFixed(0)}% increase.</>
            : <>At these numbers, hourly pricing earns more. This happens when your actual hours exceed estimates. Consider raising project prices or improving efficiency.</>
          }
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Project pricing includes a 20% risk premium over hourly (complexity buffer, scope creep protection). The model assumes you finish projects faster than estimated — which experienced freelancers typically do. Adjust actual hours to your real performance.</p>
      </div>
    </div>
  );
}
