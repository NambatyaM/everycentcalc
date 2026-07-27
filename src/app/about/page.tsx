import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About EveryCentCalc — Free Financial Calculators for Freelancers & Side Hustlers',
  description: 'Built by a freelancer who was tired of guessing how much to save for taxes. 28 free calculators with 2026 IRS rates, no signup required.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About EveryCentCalc',
    url: 'https://everycentcalc.biz.id/about',
    description: 'About EveryCentCalc — free financial calculators for freelancers, side hustlers, and small business owners.',
  };

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Every Cent, Calculated.
        </h1>

        <div className="space-y-6 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p>
            I started freelancing in 2024. By April 2025, I owed the IRS $8,400 in taxes I didn&apos;t know I was supposed to save for. No one told me about self-employment tax, quarterly payments, or the deductions I could have claimed.
          </p>

          <p>
            That&apos;s why I built EveryCentCalc — a collection of <strong style={{ color: 'var(--text-primary)' }}>28 free financial calculators</strong> designed specifically for people like us: freelancers, side hustlers, gig workers, and small business owners who need real numbers, not generic advice.
          </p>

          <h2 className="text-xl font-bold pt-4" style={{ color: 'var(--text-primary)' }}>
            What Makes This Different
          </h2>

          <p>
            Most tax calculators assume you&apos;re a W-2 employee. We don&apos;t. Every calculator on this site handles the complexity of self-employment: the 15.3% self-employment tax, the 92.35% adjustment, quarterly estimated payments, business deductions, and the difference between sole proprietor, LLC, and S-Corp taxation.
          </p>

          <p>
            All calculations run in your browser. We never see your numbers. There&apos;s no account to create, no email to enter, no upsell. Just the answer you need, instantly.
          </p>

          <h2 className="text-xl font-bold pt-4" style={{ color: 'var(--text-primary)' }}>
            Built for Real Questions
          </h2>

          <p>
            Every calculator answers a specific question real people are asking:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>&quot;How much do I owe in self-employment tax?&quot;</li>
            <li>&quot;Should I rent or buy a house?&quot;</li>
            <li>&quot;Is my side hustle actually profitable?&quot;</li>
            <li>&quot;How much should I charge as a freelancer?&quot;</li>
            <li>&quot;Should I form an LLC or S-Corp?&quot;</li>
            <li>&quot;How many months of startup runway do I have?&quot;</li>
          </ul>

          <p>
            We update all tax rates and brackets annually based on IRS announcements. For 2026, we use the latest federal brackets, standard deductions ($16,100 single, $32,200 married filing jointly), Social Security wage base ($184,500), and all relevant thresholds.
          </p>

          <h2 className="text-xl font-bold pt-4" style={{ color: 'var(--text-primary)' }}>
            How It&apos;s Free
          </h2>

          <p>
            This site is supported by affiliate links (like{' '}
            <a
              href="https://www.hostinger.com?REFERRALCODE=KKCNKEVINV2U"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="underline"
              style={{ color: 'var(--brand)' }}
            >
              Hostinger
            </a>
            {' '}for web hosting) and tasteful ads. We only recommend products we actually use and trust. No paywalls, no premium tiers, no "enter your email to unlock results."
          </p>

          <h2 className="text-xl font-bold pt-4" style={{ color: 'var(--text-primary)' }}>
            Questions?
          </h2>

          <p>
            Have a calculator request, found an error, or just want to say hi? Reach out at{' '}
            <a href="mailto:hello@everycentcalc.biz.id" className="underline" style={{ color: 'var(--brand)' }}>
              hello@everycentcalc.biz.id
            </a>
          </p>

          <div className="pt-6 flex gap-3">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg"
              style={{ background: 'var(--brand-gradient)' }}
            >
              Browse All Calculators
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
