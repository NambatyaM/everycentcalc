'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/freelance-tax/', label: 'Freelance Tax' },
  { href: '/freelance-business/', label: 'Freelance Business' },
  { href: '/side-hustle/', label: 'Side Hustle' },
  { href: '/real-estate/', label: 'Real Estate' },
  { href: '/business-finance/', label: 'Business Finance' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        background: 'color-mix(in srgb, var(--bg-primary) 80%, transparent)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight" style={{ color: 'var(--brand)' }}>
          <span className="flex items-center justify-center w-8 h-8 rounded-lg text-white text-sm font-bold" style={{ background: 'var(--brand-gradient)' }}>$</span>
          <span className="hidden sm:inline">EveryCentCalc</span>
          <span className="sm:hidden">ECC</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium rounded-lg transition-all hover:bg-[var(--bg-tertiary)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#calculators"
            className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold rounded-lg text-white transition-all hover:opacity-90 hover:shadow-md"
            style={{ background: 'var(--brand-gradient)' }}
          >
            All Calculators
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#calculators"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-semibold rounded-lg text-white text-center mt-2"
              style={{ background: 'var(--brand-gradient)' }}
            >
              All Calculators
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
