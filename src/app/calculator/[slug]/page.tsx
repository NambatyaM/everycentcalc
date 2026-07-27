import { calculators, getCalculatorBySlug, getAllSlugs, getCategoryBySlug } from '@/lib/calculators';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import SelfEmploymentTaxCalc from '@/components/calcs/SelfEmploymentTax';
import QuarterlyTaxCalc from '@/components/calcs/QuarterlyTax';
import FreelancerRateCalc from '@/components/calcs/FreelancerRate';
import RentVsBuyCalc from '@/components/calcs/RentVsBuy';
import BreakEvenCalc from '@/components/calcs/BreakEven';
import MortgageCalc from '@/components/calcs/Mortgage';
import SideHustleTaxCalc from '@/components/calcs/SideHustleTax';
import GenericCalc from '@/components/calcs/Generic';

const CALC_COMPONENTS: Record<string, React.FC> = {
  'self-employment-tax-calculator': SelfEmploymentTaxCalc,
  'quarterly-tax-calculator': QuarterlyTaxCalc,
  'freelancer-hourly-rate-calculator': FreelancerRateCalc,
  'rent-vs-buy-calculator': RentVsBuyCalc,
  'break-even-calculator': BreakEvenCalc,
  'mortgage-calculator': MortgageCalc,
  'side-hustle-income-tax-calculator': SideHustleTaxCalc,
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) return {};

  return {
    title: calc.name,
    description: calc.description,
    keywords: calc.keywords,
    openGraph: {
      title: calc.name,
      description: calc.description,
      type: 'website',
    },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) notFound();

  const CalcComponent = CALC_COMPONENTS[slug] || GenericCalc;
  const cat = getCategoryBySlug(calc.categorySlug);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: calc.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use the ${calc.name}`,
    description: calc.description,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter your information',
        text: 'Input the relevant financial figures into the calculator fields.',
      },
      {
        '@type': 'HowToStep',
        name: 'Get your results',
        text: 'Review the calculated results, breakdowns, and recommendations.',
      },
    ],
  };

  const related = calculators.filter((c) => c.category === calc.category && c.slug !== calc.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <nav className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          {cat && (
            <>
              <Link href={`/${cat.slug}/`} className="hover:underline">{cat.icon} {cat.name.replace(' Calculators', '')}</Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span style={{ color: 'var(--text-primary)' }}>{calc.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="text-4xl mb-3">{calc.icon}</div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>
                {calc.name}
              </h1>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {calc.description}
              </p>
            </div>

            <div
              className="rounded-2xl border p-6 md:p-8 mb-8"
              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
            >
              <CalcComponent />
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Frequently Asked Questions
              </h2>
              {calc.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border-b py-1"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <summary
                    className="flex justify-between items-center py-4 cursor-pointer font-medium list-none"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {faq.q}
                    <span
                      className="ml-2 transition-transform group-open:rotate-45 text-xl font-light flex-shrink-0"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                {calc.question}
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {calc.answer}
              </p>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div
              className="sticky top-20 rounded-xl border p-6"
              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
            >
              <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Related Calculators
              </h3>
              <ul className="space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/calculator/${r.slug}/`}
                      className="flex items-center gap-2 text-sm hover:underline"
                      style={{ color: 'var(--brand)' }}
                    >
                      <span>{r.icon}</span>
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                <h4 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                  {cat?.icon} {cat?.name.replace(' Calculators', '')}
                </h4>
                <Link
                  href={`/${calc.categorySlug}/`}
                  className="text-sm hover:underline"
                  style={{ color: 'var(--brand)' }}
                >
                  View all {cat?.name.replace(' Calculators', '')} →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
