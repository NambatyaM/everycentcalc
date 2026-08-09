import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorSearchBar from '@/components/CalculatorSearchBar';

export const metadata: Metadata = {
  title: 'Page Not Found (404) | EveryCentCalc',
  description: 'This page could not be found. Use the search or browse our free calculators to get back on track.',
  robots: { index: false, follow: true },
};

const popularLinks = [
  { href: '/calculator/self-employment-tax-calculator/', label: 'Self-Employment Tax Calculator' },
  { href: '/calculator/quarterly-tax-calculator/', label: 'Quarterly Tax Calculator' },
  { href: '/calculator/1099-income-tax-calculator/', label: '1099 Income Tax Calculator' },
  { href: '/calculator/freelancer-rate-calculator/', label: 'Freelancer Rate Calculator' },
  { href: '/calculator/rent-vs-buy-calculator/', label: 'Rent vs. Buy Calculator' },
  { href: '/calculator/break-even-calculator/', label: 'Break-Even Calculator' },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-7xl font-extrabold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: 'var(--brand-gradient)' }}>
            404
          </p>
          <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            This page got lost in the math
          </h1>
          <p className="text-sm md:text-base mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            The page you&apos;re looking for doesn&apos;t exist or was moved. Search for the calculator you need, or jump straight to one of our most-used tools.
          </p>

          <div className="mb-10 max-w-md mx-auto">
            <CalculatorSearchBar autoFocus placeholder="Search 100 free calculators…" />
          </div>

          <div className="text-left rounded-2xl border p-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-center" style={{ color: 'var(--brand)' }}>
              Popular calculators
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {popularLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--bg-tertiary)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span style={{ color: 'var(--brand)' }}>→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/#calculators"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
            style={{ background: 'var(--brand-gradient)' }}
          >
            Browse All Calculators
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
