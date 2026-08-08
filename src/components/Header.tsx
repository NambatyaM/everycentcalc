'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import LogoMark from '@/components/LogoMark';

const navLinks = [
  { href: '/freelance-tax/', label: 'Freelance Tax' },
  { href: '/freelance-business/', label: 'Freelance Business' },
  { href: '/side-hustle/', label: 'Side Hustle' },
  { href: '/real-estate/', label: 'Real Estate' },
  { href: '/llc-tax/', label: 'LLC & S-Corp' },
  { href: '/business-finance/', label: 'Business Finance' },
  { href: '/investment/', label: 'Investing' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setTheme((document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // ignore storage errors (private mode)
    }
  };

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl safe-top"
      style={{
        background: 'color-mix(in srgb, var(--bg-primary) 80%, transparent)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight" style={{ color: 'var(--brand)' }}>
          <LogoMark size={32} />
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
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]"
            style={{ color: 'var(--text-secondary)' }}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
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
        <div
          id="mobile-menu"
          className="lg:hidden border-t overflow-y-auto max-h-[calc(100dvh-4rem)] safe-bottom"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}
        >
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
