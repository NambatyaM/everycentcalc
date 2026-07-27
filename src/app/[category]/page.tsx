import { categories, getCalculatorsByCategory, getCategoryBySlug } from '@/lib/calculators';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorCard from '@/components/CalculatorCard';
import Link from 'next/link';

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};

  return {
    title: `${cat.name} — Free Online Calculators`,
    description: cat.description,
    openGraph: {
      title: `${cat.name} | EveryCentCalc`,
      description: cat.description,
      type: 'website',
    },
    alternates: {
      canonical: `https://everycentcalc.biz.id/${cat.slug}/`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const calcs = getCalculatorsByCategory(category);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://everycentcalc.biz.id' },
      { '@type': 'ListItem', position: 2, name: cat.name, item: `https://everycentcalc.biz.id/${cat.slug}/` },
    ],
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <nav className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span style={{ color: 'var(--text-primary)' }}>{cat.icon} {cat.name}</span>
        </nav>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{cat.icon}</span>
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              {cat.name}
            </h1>
          </div>
          <p className="text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            {cat.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {calcs.map((calc) => (
            <CalculatorCard key={calc.slug} calc={calc} />
          ))}
        </div>

        <div className="mt-14 p-8 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-md)' }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Why Use {cat.name.replace(' Calculators', '')}?
          </h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            {cat.description} Every calculator is free, runs in your browser, and stores no data. Get instant, actionable results with detailed breakdowns and explanations.
          </p>
          <Link
            href="/"
            className="inline-flex px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 hover:shadow-md"
            style={{ background: 'var(--brand-gradient)' }}
          >
            Browse All Calculators
          </Link>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
