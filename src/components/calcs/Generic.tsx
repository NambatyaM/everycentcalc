'use client';

import { useState } from 'react';
import { SectionHeader, ResultCard } from '@/components/Results';

export default function GenericCalc() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  return (
    <div>
      <SectionHeader title="Calculator" subtitle="Enter your values below" />
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Value 1</label>
          <input type="number" value={input1} onChange={(e) => setInput1(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Value 2</label>
          <input type="number" value={input2} onChange={(e) => setInput2(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Value 3</label>
          <input type="number" value={input3} onChange={(e) => setInput3(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <ResultCard icon="📊" label="Result" value="—" highlight />
      </div>
      <div className="rounded-lg border p-4" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          This calculator is coming soon with detailed functionality. Check back for the full implementation.
        </p>
      </div>
    </div>
  );
}
