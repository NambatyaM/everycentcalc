'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CalculatorCard from '@/components/CalculatorCard';
import type { Calculator, Category } from '@/lib/types';

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default function CalculatorCatalog({
  calculators,
  categories,
}: {
  calculators: Calculator[];
  categories: Category[];
}) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');

  useEffect(() => {
    setQuery(params.get('q') || '');
  }, [params]);

  const q = query.trim().toLowerCase();
  const terms = q ? q.split(/\s+/) : [];
  const active = q.length > 0;

  const results = useMemo(() => {
    if (terms.length === 0) return [];
    return calculators.filter((c) => {
      const hay = normalize(
        [c.name, c.description, c.category, ...(c.tags || []), ...(c.keywords || [])].join(' '),
      );
      return terms.every((t) => hay.includes(t));
    });
  }, [terms, calculators]);

  const popularSuggestions = [
    'self-employment-tax-calculator',
    'quarterly-tax-calculator',
    'freelancer-rate-calculator',
    'rent-vs-buy-calculator',
    'break-even-calculator',
    'compound-interest-calculator',
  ]
    .map((slug) => calculators.find((c) => c.slug === slug))
    .filter((c): c is Calculator => Boolean(c))
    .filter((c) => !results.includes(c));

  return (
    <div id="calculators" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            All {calculators.length} Free Calculators
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Pick a category or search for the calculator you need. Every tool runs in your browser, stores nothing, and gives you an instant answer.
          </p>
        </div>

        <div className="relative max-w-xl mx-auto mb-10">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all calculators…"
            aria-label="Search all calculators"
            className="w-full rounded-xl border py-3.5 pr-12 pl-12 text-base focus:outline-none focus:ring-2 transition-colors"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          />
          {active && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors hover:bg-[var(--bg-tertiary)]"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {active ? (
          <div>
            <p className="text-sm mb-5 text-center" style={{ color: 'var(--text-muted)' }}>
              {results.length} {results.length === 1 ? 'result' : 'results'} for{' '}
              <strong style={{ color: 'var(--text-primary)' }}>"{query.trim()}"</strong>
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((calc) => (
                  <CalculatorCard key={calc.slug} calc={calc} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  No calculators match "{query.trim()}"
                </p>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                  Try a different keyword, or check out a popular tool below.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularSuggestions.map((calc) => (
                    <CalculatorCard key={calc.slug} calc={calc} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {categories.map((cat) => {
              const suiteCalcs = calculators.filter((c) => c.category === cat.slug);
              if (suiteCalcs.length === 0) return null;
              return (
                <div className="mb-14" key={cat.slug}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{cat.icon}</span>
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {cat.name}
                    </h3>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                      {suiteCalcs.length} tools
                    </span>
                  </div>
                  <p className="text-sm mb-5 ml-10" style={{ color: 'var(--text-secondary)' }}>
                    {cat.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {suiteCalcs.map((calc) => (
                      <CalculatorCard key={calc.slug} calc={calc} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
