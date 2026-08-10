import Link from 'next/link';
import { Suspense } from 'react';
import { categories, calculators } from '@/lib/calculators';
import { getCalculatorImage } from '@/lib/calculatorImages';
import { guides } from '@/lib/guides';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorCatalog from '@/components/CalculatorCatalog';
import AdsterraBanner from '@/components/AdsterraBanner';

function HeroSection() {
  const totalCalcs = calculators.length;
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ background: 'var(--brand-gradient)' }} />
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6" style={{ background: 'var(--brand-light)', color: 'var(--brand)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--brand)' }} />
            {totalCalcs} free calculators · 2026 IRS rates
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-balance"
            style={{ color: 'var(--text-primary)' }}
          >
            Free tax &amp; money calculators for{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--brand-gradient)' }}>freelancers and small business owners</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed text-balance"
            style={{ color: 'var(--text-secondary)' }}
          >
            Self-employment tax, 1099 income, quarterly payments, rent vs. buy, and profit margins — {totalCalcs} free tools built for the self-employed. No signup. No guessing. Just the number you need in 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
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
              Calculate Self Employment Tax
            </Link>
          </div>
        </div>
        <div className="hidden md:block relative">
          <div
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
              alt="Freelancer calculating self employment tax and finances"
              width={800}
              height={560}
              className="w-full h-auto object-cover"
              fetchPriority="high"
            />
          </div>
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

function TopAffiliateBanner() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-2xl border p-6 md:p-8 transition-all hover:shadow-lg relative overflow-hidden"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--brand)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-xs font-bold text-white" style={{ background: 'var(--brand-gradient)' }}>
            Recommended
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-5xl flex-shrink-0">📊</div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--brand)' }}>
                Freelancer Favorite
              </p>
              <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                Track Every Dollar of Your Freelance Income
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Auto-generate insights on your income, expenses, and savings with a dynamic Google Sheets budget planner. Built specifically for freelancers and self employed professionals.
              </p>
            </div>
            <a
              href="https://www.digital-planning-studio.com/#aff=KevinMegan"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:opacity-90 whitespace-nowrap"
              style={{ background: 'var(--brand-gradient)' }}
            >
              Get the Planner
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5-5-5-5" />
              </svg>
            </a>
          </div>
          <p className="text-[10px] mt-4 text-center md:text-left" style={{ color: 'var(--text-muted)' }}>
            Affiliate link — we earn a commission at no cost to you. We only recommend tools we trust.
          </p>
        </div>
      </div>
    </section>
  );
}

function PopularCalculators() {
  const popularSlugs = [
    'self-employment-tax-calculator',
    'quarterly-tax-calculator',
    'freelancer-rate-calculator',
    'rent-vs-buy-calculator',
    'etsy-profit-calculator',
    'break-even-calculator',
  ];
  const popularCalcs = popularSlugs
    .map((slug) => calculators.find((c) => c.slug === slug))
    .filter(Boolean) as typeof calculators;

  const benefitDescriptions: Record<string, string> = {
    'self-employment-tax-calculator': 'See exactly how much the 15.3% SE tax costs you — and the deductions most freelancers miss.',
    'quarterly-tax-calculator': 'Never miss a quarterly payment or get hit with IRS penalties again.',
    'freelancer-rate-calculator': 'Find the minimum hourly rate you should charge to hit your income goals.',
    'rent-vs-buy-calculator': 'Stop guessing and see which option wins for your specific numbers.',
    'etsy-profit-calculator': 'The real profit after Etsy fees, shipping, materials, and taxes.',
    'break-even-calculator': 'Know exactly how many sales you need before your business turns a profit.',
  };

  return (
    <section className="py-12 px-4" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--brand)' }}>
            Start here
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Most Popular Calculators
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            The tools freelancers use most. Pick one and get your answer in seconds.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularCalcs.map((calc) => {
            const img = getCalculatorImage(calc.name, calc.slug);
            return (
              <Link
                key={calc.slug}
                href={`/calculator/${calc.slug}/`}
                className="group block rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-[var(--brand)]"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="overflow-hidden" style={{ aspectRatio: '1200/630', background: 'var(--bg-tertiary)' }}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={1200}
                    height={630}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5">
                  <h3
                    className="font-semibold text-sm leading-snug group-hover:text-[var(--brand)] transition-colors mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {calc.name}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {benefitDescriptions[calc.slug] || calc.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--brand)' }}>
                    Use calculator
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5-5-5-5" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function getNextQuarterlyDeadline(): { date: Date; quarter: string } {
  const now = new Date();
  const year = now.getFullYear();
  const quarters = [
    { month: 3, day: 15, quarter: 'Q1' },
    { month: 5, day: 15, quarter: 'Q2' },
    { month: 8, day: 15, quarter: 'Q3' },
    { month: 0, day: 15, quarter: 'Q4' },
  ];
  for (const q of quarters) {
    const candidate = new Date(year, q.month, q.day);
    if (candidate > now) return { date: candidate, quarter: q.quarter };
  }
  return { date: new Date(year + 1, 0, 15), quarter: 'Q4' };
}

function DeadlineBanner() {
  const { date, quarter } = getNextQuarterlyDeadline();
  const formatted = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto rounded-2xl border-2 p-6 md:p-8 relative overflow-hidden" style={{ borderColor: 'var(--brand)', background: 'var(--brand-light)' }}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="text-4xl flex-shrink-0">⏰</div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--brand)' }}>
              Estimated tax deadline — {quarter}
            </p>
            <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              Next quarterly tax payment due {formatted}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              1099 workers and freelancers owe estimated taxes four times a year. Miss a payment and the IRS adds underpayment penalties on top of what you owe. Calculate your amount before the deadline.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                href="/calculator/quarterly-tax-calculator/"
                className="px-5 py-2.5 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:opacity-90 text-sm"
                style={{ background: 'var(--brand-gradient)' }}
              >
                Calculate My Quarterly Tax
              </Link>
              <Link
                href="/calculator/quarterly-tax-deadline-calculator/"
                className="px-5 py-2.5 rounded-xl font-semibold border-2 transition-all hover:shadow-md text-sm"
                style={{ borderColor: 'var(--border-hover)', color: 'var(--text-primary)' }}
              >
                Quarterly Tax Deadlines
              </Link>
              <Link
                href="/calculator/self-employment-tax-calculator/"
                className="px-5 py-2.5 rounded-xl font-semibold border-2 transition-all hover:shadow-md text-sm"
                style={{ borderColor: 'var(--border-hover)', color: 'var(--text-primary)' }}
              >
                Self-Employment Tax
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuidesPreview() {
  return (
    <section className="py-12 px-4" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--brand)' }}>
            Learn the math
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Free Money Guides
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Plain-English explainers that pair with our calculators — so you know not just the number, but the why.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}/`}
              className="group block rounded-xl border p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-[var(--brand)]"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--brand)' }}>
                {guide.readMinutes} min read · Updated {new Date(guide.updated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
              <h3 className="font-bold mb-2 group-hover:text-[var(--brand)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                {guide.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {guide.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--brand)' }}>
                Read guide
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5-5-5-5" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/guides/" className="text-sm font-semibold hover:underline" style={{ color: 'var(--brand)' }}>
            Browse all guides →
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="py-14 px-4" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Financial data and analytics"
                width={800}
                height={560}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Why 50,000+ Freelancers Use EveryCentCalc
            </h2>
            <p className="text-sm mb-8 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
              Generic tax calculators don&apos;t understand 1099 income. Ours do.
            </p>
            <div className="space-y-5">
              {[
                {
                  icon: '🧾',
                  title: '100 Calculators Across 7 Categories',
                  desc: 'Self employment tax, quarterly estimates, S-Corp savings, rental property ROI, side hustle profit, business finance, and investment planning — all in one place.',
                },
                {
                  icon: '📈',
                  title: 'Not Just a Number — a Plan',
                  desc: 'Every calculator gives you a breakdown: what you owe, why you owe it, and what to do next. Side-by-side comparisons, deduction impact, and quarterly payment schedules included.',
                },
                {
                  icon: '🤖',
                  title: 'Found via Google & AI',
                  desc: 'Every page includes structured data, FAQs, and plain English explanations so you can find us through Google, ChatGPT, Perplexity, or any AI assistant.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: 'var(--brand-light)' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeoContentSection() {
  return (
    <section className="py-14 px-4">
      <div className="max-w-4xl mx-auto space-y-5 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Free Online Financial Calculators for Freelancers &amp; the Self-Employed
        </h2>
        <p>
          Whether you&apos;re a freelancer, 1099 contractor, gig worker, or small business owner, EveryCentCalc gives you the exact numbers you need — free. Start with the{' '}
          <Link href="/calculator/self-employment-tax-calculator/" className="underline underline-offset-2" style={{ color: 'var(--brand)' }}>
            self-employment tax calculator
          </Link>{' '}
          to see what the 15.3% SE tax costs you, run the{' '}
          <Link href="/calculator/1099-income-tax-calculator/" className="underline underline-offset-2" style={{ color: 'var(--brand)' }}>
            1099 income tax calculator
          </Link>{' '}
          for your full federal bill, and plan your payments with the{' '}
          <Link href="/calculator/quarterly-tax-calculator/" className="underline underline-offset-2" style={{ color: 'var(--brand)' }}>
            quarterly estimated tax calculator
          </Link>{' '}
          before each IRS deadline.
        </p>
        <h3 className="text-lg md:text-xl font-bold pt-2" style={{ color: 'var(--text-primary)' }}>
          Built Around Tax Season, Not Generic Math
        </h3>
        <p>
          Tax searches spike every February through April, and quarterly deadlines hit in April, June, September, and January. All our tax tools are updated with current 2026 IRS rates, self-employment caps, standard deductions, and tax brackets — so the numbers match what you&apos;ll actually owe, not last year&apos;s figures.
        </p>
        <h3 className="text-lg md:text-xl font-bold pt-2" style={{ color: 'var(--text-primary)' }}>
          From Self-Employment Tax to Business Profit
        </h3>
        <p>
          Beyond taxes, you&apos;ll find the numbers freelancers and small business owners search for every week: a{' '}
          <Link href="/calculator/rent-vs-buy-calculator/" className="underline underline-offset-2" style={{ color: 'var(--brand)' }}>
            rent vs buy calculator
          </Link>{' '}
          for housing decisions,{' '}
          <Link href="/calculator/etsy-profit-calculator/" className="underline underline-offset-2" style={{ color: 'var(--brand)' }}>
            Etsy profit calculator
          </Link>{' '}
          for marketplace sellers, a{' '}
          <Link href="/calculator/break-even-calculator/" className="underline underline-offset-2" style={{ color: 'var(--brand)' }}>
            break even calculator
          </Link>{' '}
          to find how many sales you need, and a{' '}
          <Link href="/calculator/compound-interest-calculator/" className="underline underline-offset-2" style={{ color: 'var(--brand)' }}>
            compound interest calculator
          </Link>{' '}
          to grow your savings. Every tool is free, private, and works entirely in your browser.
        </p>
      </div>
    </section>
  );
}

function HostingerBanner() {
  return (
    <section className="py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-2xl border-2 p-8 md:p-10 transition-all hover:shadow-xl relative overflow-hidden"
          style={{ borderColor: 'var(--brand)', background: 'var(--bg-card)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
        >
          <div
            className="absolute top-0 left-0 w-full h-1"
            style={{ background: 'var(--brand-gradient)' }}
          />
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                style={{ background: 'var(--brand-light)' }}
              >
                🚀
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--brand)' }}>
                Build Your Own Calculator Site
              </p>
              <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Want to build a site like this as a side hustle?
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                Hostinger gives you fast, reliable hosting starting at just <strong>$2.99/mo</strong> — free domain, free SSL, and one-click WordPress install. Launch your own tool site this weekend and start earning passive income.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a
                  href="https://www.hostinger.com?REFERRALCODE=KKCNKEVINV2U"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all hover:shadow-lg hover:opacity-90 text-base"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  Get Hostinger — $2.99/mo
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5-5-5-5" />
                  </svg>
                </a>
                <span className="inline-flex items-center justify-center text-xs font-medium px-4 py-2 rounded-xl" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                  Free domain + SSL included
                </span>
              </div>
            </div>
          </div>
          <p className="text-[10px] mt-5 text-center md:text-left" style={{ color: 'var(--text-muted)' }}>
            Affiliate link — we earn a commission at no cost to you. We only recommend services we trust.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
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
        <TopAffiliateBanner />
        <DeadlineBanner />
        <PopularCalculators />
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <AdsterraBanner />
          </div>
        </section>
        <Suspense fallback={null}>
          <CalculatorCatalog calculators={calculators} categories={categories} />
        </Suspense>
        <GuidesPreview />
        <WhySection />
        <SeoContentSection />
        <HostingerBanner />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
    </>
  );
}
