import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { guides } from '@/lib/guides';
import { getCategoryBySlug } from '@/lib/calculators';

export const metadata: Metadata = {
  title: 'Money Guides & Calculators Explained',
  description:
    'Plain-English guides on self-employment tax, quarterly estimated taxes, freelance pricing, and rent vs buy — each paired with a free calculator to run your own numbers.',
  alternates: {
    canonical: 'https://everycentcalc.biz.id/guides/',
  },
};

export default function GuidesIndexPage() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <nav className="text-sm mb-6 flex flex-wrap items-center gap-y-1.5" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span style={{ color: 'var(--text-primary)' }}>Guides</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: 'var(--text-primary)' }}>
            Guides that explain the numbers
          </h1>
          <p className="text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            The math behind the calculators, in plain English. Pick a topic, learn how it works, then run your own numbers with the free tool that pairs with each guide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {guides.map((guide) => {
            const cat = getCategoryBySlug(guide.categorySlug);
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}/`}
                className="group block rounded-2xl border p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-[var(--brand)]"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-sm)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--brand)' }}>
                  {cat ? `${cat.icon} ${cat.name}` : 'Guide'}
                </p>
                <h2 className="text-lg font-bold mb-2 group-hover:text-[var(--brand)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {guide.title}
                </h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {guide.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {guide.readMinutes} min read · Updated {new Date(guide.updated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: 'var(--brand)' }}>
                    Read guide
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5-5-5-5" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/#calculators"
            className="inline-flex px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
            style={{ background: 'var(--brand-gradient)' }}
          >
            Browse All 100 Calculators
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
