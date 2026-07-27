import Link from 'next/link';
import type { Calculator } from '@/lib/types';

export default function CalculatorCard({ calc }: { calc: Calculator }) {
  return (
    <Link
      href={`/calculator/${calc.slug}/`}
      className="group block rounded-xl border p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-[var(--brand)]"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">{calc.icon}</span>
        <h3
          className="font-semibold text-sm leading-snug group-hover:text-[var(--brand)] transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          {calc.name}
        </h3>
      </div>
      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
        {calc.description}
      </p>
      <div className="mt-3 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--brand)' }}>
        Use calculator
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l5-5-5-5" />
        </svg>
      </div>
    </Link>
  );
}
