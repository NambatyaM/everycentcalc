import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About EveryCentCalc — 91 Free Financial Calculators',
  description: 'Built by a freelancer who was tired of guessing how much to save for taxes. 91 free calculators with 2026 IRS rates. No signup required.',
  alternates: { canonical: '/about/' },
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
        <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-10">
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
            alt="Freelancer reviewing financial documents at a desk"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Every Cent, Calculated.
        </h1>

        <div className="space-y-6 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p>
            I started freelancing in 2024. By April 2025, I owed the IRS $8,400 in taxes I didn&apos;t know I was supposed to save for. No one told me about self employment tax, quarterly payments, or the deductions I could have claimed.
          </p>

          <p>
            That&apos;s why I built EveryCentCalc — a collection of <strong style={{ color: 'var(--text-primary)' }}>91 free financial calculators</strong> designed specifically for people like us: freelancers, side hustlers, gig workers, and small business owners who need real numbers, not generic advice.
          </p>

          <h2 className="text-xl font-bold pt-4" style={{ color: 'var(--text-primary)' }}>
            What Makes This Different
          </h2>

          <p>
            Most tax calculators assume you&apos;re a W-2 employee. We don&apos;t. Our 91 calculators span 7 categories — from self employment tax and quarterly estimated payments to rent vs buy analysis, LLC vs S-Corp comparison, break even analysis, and profitability tracking. Every one handles the complexity real freelancers face: the 15.3% self employment tax, the 92.35% adjustment, business deductions, and the differences between sole proprietor, LLC, and S-Corp taxation.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4">
            {['Tax & IRS', 'Income & Profit', 'Pricing & Rates', 'Business Structure', 'Rent vs Buy', 'Retirement', 'Startup & Runway'].map((cat) => (
              <div
                key={cat}
                className="text-center py-3 px-2 rounded-xl text-sm font-medium"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              >
                {cat}
              </div>
            ))}
          </div>

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
            <li>&quot;How much do I owe in self employment tax?&quot;</li>
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
            Why Freelancers Trust This
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
            {[
              { value: '88', label: 'Free Calculators' },
              { value: '7', label: 'Categories' },
              { value: '2026', label: 'IRS Rates' },
              { value: '$0', label: 'Cost Forever' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center py-4 px-3 rounded-xl"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <div className="text-2xl font-bold" style={{ color: 'var(--brand)' }}>{stat.value}</div>
                <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <p>
            Freelancers across the country use EveryCentCalc to plan their quarterly payments, price their services, decide on business structure, and finally understand where their money is going. No login walls, no premium tiers, no gated results.
          </p>

          <h2 className="text-xl font-bold pt-4" style={{ color: 'var(--text-primary)' }}>
            How It&apos;s Free
          </h2>

          <p>
            Running 91 calculators with current tax data isn&apos;t free for us either. Here&apos;s how we keep the lights on without charging you a cent:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a
                href="https://www.hostinger.com?REFERRALCODE=KKCNKEVINV2U"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="underline font-medium"
                style={{ color: 'var(--brand)' }}
              >
                Hostinger
              </a>
              {' '}— affordable web hosting we actually use to run this site
            </li>
            <li>
              <strong>Budget Planner</strong> — a Google Sheets template that helps you track income and expenses like a pro
            </li>
            <li>
              <strong>Affiliate Marketing Masterclass</strong> — a course for freelancers who want to diversify income
            </li>
            <li>
              <strong>Build A One Person Business</strong> — an ebook on going from side hustle to full time self employment
            </li>
            <li>
              <strong>TubeMagic AI Tools</strong> — AI powered tools for content creators and solopreneurs
            </li>
          </ul>

          <p>
            We only recommend products we actually use and trust. If you find any of these helpful, you&apos;re supporting the site at no extra cost to you. No paywalls, no premium tiers, no &quot;enter your email to unlock results.&quot;
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
              Browse All 91 Calculators
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
