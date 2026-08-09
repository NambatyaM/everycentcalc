'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CalculatorSearchBar({
  placeholder = 'Search calculators…',
  autoFocus = false,
  compact = false,
}: {
  placeholder?: string;
  autoFocus?: boolean;
  compact?: boolean;
}) {
  const [value, setValue] = useState('');
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    router.push(`/?q=${encodeURIComponent(q)}#calculators`);
  };

  return (
    <form onSubmit={onSubmit} role="search" className="w-full">
      <div className="relative">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 flex-shrink-0 pointer-events-none"
          style={{ color: 'var(--text-muted)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </span>
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Search calculators"
          autoFocus={autoFocus}
          className={`w-full rounded-lg border bg-[var(--bg-card)] pl-9 pr-3 text-sm focus:outline-none focus:ring-2 transition-colors ${
            compact ? 'py-2' : 'py-2.5'
          }`}
          style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-md text-xs font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'var(--brand-gradient)' }}
        >
          Go
        </button>
      </div>
    </form>
  );
}
