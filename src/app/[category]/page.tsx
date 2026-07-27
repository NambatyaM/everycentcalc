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
    title: cat.name,
    description: cat.description,
    openGraph: {
      title: cat.name,
      description: cat.description,
      type: 'website',
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
      <main className="max-w-6xl mx-auto px-4 py-8">
        <nav className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span style={{ color: 'var(--text-primary)' }}>{cat.icon} {cat.name}</span>
        </nav>

        <div className="mb-10">
          <div className="text-5xl mb-4">{cat.icon}</div>
          <h1 className="text-4xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>
            {cat.name}
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            {cat.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {calcs.map((calc) => (
            <CalculatorCard key={calc.slug} calc={calc} />
          ))}
        </div>

        {calcs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              Calculators for this category are coming soon.
            </p>
          </div>
        )}

        <div className="mt-16 rounded-xl border p-8" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Why Use {cat.name.replace(' Calculators', '')}?
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            {cat.description} Every calculator is free, works in your browser, and stores no data. Get instant, actionable results with detailed breakdowns and explanations.
          </p>
          <Link
            href="/"
            className="inline-flex px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--brand)' }}
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
