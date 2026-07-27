import Link from 'next/link';
import { categories, calculators } from '@/lib/calculators';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorCard from '@/components/CalculatorCard';

function HeroSection() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Every cent counts.{' '}
          <span style={{ color: 'var(--brand)' }}>Calculate it.</span>
        </h1>
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Free financial calculators for freelancers, side hustlers, real estate investors,
          and small business owners. No signup. No ads. Just math.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#calculators"
            className="px-8 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--brand)' }}
          >
            Browse All Calculators
          </Link>
          <Link
            href="/calculator/self-employment-tax/"
            className="px-8 py-3 rounded-xl font-semibold border-2 transition-opacity hover:opacity-80"
            style={{ borderColor: 'var(--brand)', color: 'var(--brand)' }}
          >
            Start with Self-Employment Tax
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrustBadges() {
  const badges = [
    { icon: '🔒', text: '100% Private — Data never leaves your browser' },
    { icon: '💰', text: 'Always Free — No accounts, no paywalls' },
    { icon: '⚡', text: 'Instant Results — Real-time calculations' },
    { icon: '📊', text: 'IRS-Compliant — Based on current tax rates' },
  ];

  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.text}
            className="text-center p-4 rounded-xl border"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
          >
            <div className="text-2xl mb-2">{badge.icon}</div>
            <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              {badge.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SuiteSection({ category }: { category: (typeof categories)[number] }) {
  const suiteCalcs = calculators.filter((c) => c.category === category.slug);

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{category.icon}</span>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {category.name}
        </h2>
      </div>
      <p className="text-sm mb-6 ml-12" style={{ color: 'var(--text-secondary)' }}>
        {category.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suiteCalcs.map((calc) => (
          <CalculatorCard key={calc.slug} calc={calc} />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <section id="calculators" className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl font-bold text-center mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              All Calculators
            </h2>
            <p
              className="text-center mb-12 max-w-xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Choose a suite or jump straight into a calculator. Every tool is free, works in
              your browser, and stores nothing.
            </p>
            {categories.map((cat) => (
              <SuiteSection key={cat.slug} category={cat} />
            ))}
          </div>
        </section>
        <section className="py-16 px-4" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Why EveryCentCalc?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-10 text-left">
              <div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Built for Freelancers
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Unlike generic calculators, ours handle the nuances of 1099 income,
                  quarterly estimated taxes, health insurance deductions, and self-employment tax.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Actionable Results
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  We don't just give you a number. Get breakdowns, recommendations, and
                  explanations you can actually use to make financial decisions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  SEO & AI-Optimized
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Every calculator includes detailed explanations, FAQs, and structured data
                  so you can find us via Google, ChatGPT, and Perplexity.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <a
              href="https://www.hostinger.com?REFERRALCODE=KKCNKEVINV2U"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex flex-col sm:flex-row items-center justify-between rounded-xl border p-6 transition-all hover:shadow-lg group"
              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
            >
              <div className="mb-4 sm:mb-0 text-center sm:text-left">
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Build your own calculator site
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Fast, affordable hosting starting at $2.99/mo with a free domain included.
                </p>
              </div>
              <span
                className="px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap group-hover:opacity-90 transition-opacity"
                style={{ background: 'var(--brand)', color: '#fff' }}
              >
                Get Hostinger →
              </span>
            </a>
            <p className="text-[10px] text-center mt-2" style={{ color: 'var(--text-muted)' }}>
              Affiliate link — we earn a commission at no cost to you.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
