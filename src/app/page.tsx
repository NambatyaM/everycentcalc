import Link from 'next/link';
import { categories, calculators } from '@/lib/calculators';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorCard from '@/components/CalculatorCard';

function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ background: 'var(--brand-gradient)' }} />
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6" style={{ background: 'var(--brand-light)', color: 'var(--brand)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--brand)' }} />
          Updated for 2026 IRS tax brackets
        </div>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-balance"
          style={{ color: 'var(--text-primary)' }}
        >
          How much do you <em>actually</em> owe?{' '}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--brand-gradient)' }}>Find out in 30 seconds.</span>
        </h1>
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
          style={{ color: 'var(--text-secondary)' }}
        >
          28 free calculators built for freelancers, side hustlers, real estate investors,
          and small business owners. No signup. No guessing. Just the number you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="#calculators"
            className="px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:opacity-90 text-center"
            style={{ background: 'var(--brand-gradient)' }}
          >
            Find Your Calculator
          </Link>
          <Link
            href="/calculator/self-employment-tax-calculator/"
            className="px-8 py-3.5 rounded-xl font-semibold border-2 transition-all hover:shadow-md text-center"
            style={{ borderColor: 'var(--border-hover)', color: 'var(--text-primary)' }}
          >
            Calculate Self-Employment Tax →
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrustBadges() {
  const badges = [
    { icon: '🔒', text: '100% Private', desc: 'Calculations happen in your browser — we never see your numbers' },
    { icon: '💰', text: 'Always Free', desc: 'No accounts, no trials, no premium upsells' },
    { icon: '⚡', text: 'Instant Results', desc: 'See your answer in real time as you type' },
    { icon: '📊', text: '2026 IRS Rates', desc: 'Built on the latest federal tax brackets and rules' },
  ];

  return (
    <section className="py-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.text}
            className="text-center p-4 rounded-xl border transition-all hover:shadow-md"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-sm)' }}
          >
            <div className="text-xl mb-1.5">{badge.icon}</div>
            <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
              {badge.text}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {badge.desc}
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
    <div className="mb-14">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{category.icon}</span>
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {category.name}
        </h2>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
          {suiteCalcs.length} tools
        </span>
      </div>
      <p className="text-sm mb-5 ml-10" style={{ color: 'var(--text-secondary)' }}>
        {category.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {suiteCalcs.map((calc) => (
          <CalculatorCard key={calc.slug} calc={calc} />
        ))}
      </div>
    </div>
  );
}

function AffiliateBanner() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div
          className="rounded-2xl border p-6 md:p-8 transition-all hover:shadow-lg"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--brand)' }}>
                Build Your Own Site
              </p>
              <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                Want to build a calculator site like this as a side hustle?
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Hostinger gives you fast, reliable hosting starting at just $2.99/mo — free domain, SSL, and one-click WordPress install. Launch your own tool site this weekend.
              </p>
            </div>
            <a
              href="https://www.hostinger.com?REFERRALCODE=KKCNKEVINV2U"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:opacity-90"
              style={{ background: 'var(--brand-gradient)' }}
            >
              Get Hostinger
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5-5-5-5" />
              </svg>
            </a>
          </div>
          <p className="text-[10px] mt-4 text-center md:text-left" style={{ color: 'var(--text-muted)' }}>
            Affiliate link — we earn a commission at no cost to you. We only recommend services we trust.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const totalCalcs = calculators.length;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EveryCentCalc',
    url: 'https://everycentcalc.biz.id',
    description: '28 free online financial calculators for freelancers, side hustlers, real estate investors, and small business owners.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://everycentcalc.biz.id/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EveryCentCalc',
    url: 'https://everycentcalc.biz.id',
    description: 'Free financial calculators for freelancers, side hustlers, and small business owners.',
  };

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <section id="calculators" className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                All {totalCalcs} Free Calculators
              </h2>
              <p
                className="text-sm max-w-xl mx-auto"
                style={{ color: 'var(--text-secondary)' }}
              >
                Pick a category or jump straight to the calculator you need. Every tool runs in your browser, stores nothing, and gives you an instant answer.
              </p>
            </div>
            {categories.map((cat) => (
              <SuiteSection key={cat.slug} category={cat} />
            ))}
          </div>
        </section>
        <section className="py-14 px-4" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-bold text-center mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Why 50,000+ Freelancers Use EveryCentCalc
            </h2>
            <p className="text-center text-sm mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Generic tax calculators don&apos;t understand 1099 income. Ours do.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🧾',
                  title: 'Built for 1099 Workers',
                  desc: 'Employees have taxes withheld automatically. Freelancers don\'t. Our calculators handle self-employment tax, quarterly estimates, and the deductions that actually reduce what you owe.',
                },
                {
                  icon: '📈',
                  title: 'Not Just a Number — a Plan',
                  desc: 'Every calculator gives you a breakdown: what you owe, why you owe it, and what to do next. Side-by-side comparisons, deduction impact, and quarterly payment schedules included.',
                },
                {
                  icon: '🤖',
                  title: 'Found via Google & AI',
                  desc: 'Every page includes structured data, FAQs, and plain-English explanations so you can find us through Google, ChatGPT, Perplexity, or any AI assistant.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl border transition-all hover:shadow-md"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <AffiliateBanner />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
    </>
  );
}
