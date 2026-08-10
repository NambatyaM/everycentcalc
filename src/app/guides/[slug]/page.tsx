import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorCard from '@/components/CalculatorCard';
import { guides, getGuideBySlug, type GuideBlock } from '@/lib/guides';
import { getCategoryBySlug, getCalculatorBySlug } from '@/lib/calculators';
import { GuideSvg } from '@/components/GuideSvg';
import AdsterraBanner from '@/components/AdsterraBanner';

const BASE_URL = 'https://everycentcalc.biz.id';

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: { absolute: guide.metaTitle },
    description: guide.description,
    openGraph: {
      title: guide.metaTitle,
      description: guide.description,
      type: 'article',
      publishedTime: guide.updated,
      modifiedTime: guide.updated,
      url: `${BASE_URL}/guides/${guide.slug}/`,
    },
    alternates: {
      canonical: `${BASE_URL}/guides/${guide.slug}/`,
    },
  };
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function renderInline(text: string, key: string) {
  const parts = text.split(/(\{\{calc:[^}]+\}\}|\*\*[^*]+\*\*)/g);
  return (
    <span key={key}>
      {parts.map((part, i) => {
        const calcMatch = part.match(/^\{\{calc:([^:]+):(.+)\}\}$/);
        if (calcMatch) {
          return (
            <Link
              key={i}
              href={`/calculator/${calcMatch[1]}/`}
              className="font-semibold underline underline-offset-2"
              style={{ color: 'var(--brand)' }}
            >
              {calcMatch[2]}
            </Link>
          );
        }
        const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
        if (boldMatch) {
          return (
            <strong key={i} style={{ color: 'var(--text-primary)' }}>
              {boldMatch[1]}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

function renderBlock(block: GuideBlock, index: number) {
  switch (block.type) {
    case 'p':
      return (
        <p
          key={index}
          className="text-sm md:text-base leading-relaxed mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          {renderInline(block.text, `p${index}`)}
        </p>
      );
    case 'h3':
      return (
        <h3
          key={index}
          className="text-base md:text-lg font-bold mb-3 mt-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {renderInline(block.text, `h${index}`)}
        </h3>
      );
    case 'list':
      return (
        <ul key={index} className="space-y-2 mb-5 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand)' }} />
              <span>{renderInline(item, `li${i}`)}</span>
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div key={index} className="overflow-x-auto mb-5 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
          <table className="w-full text-sm min-w-[420px]">
            <thead>
              <tr style={{ background: 'var(--bg-tertiary)' }}>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {renderInline(h, `th${i}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} style={{ borderTop: '1px solid var(--border)' }}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-3"
                      style={{ color: ri === 0 || ci === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                    >
                      {renderInline(cell, `td${ri}-${ci}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout':
      return (
        <div
          key={index}
          className="flex gap-3 mb-5 p-4 rounded-xl border-l-4"
          style={{ borderLeftColor: 'var(--brand)', background: 'var(--brand-light)' }}
        >
          <span className="text-lg flex-shrink-0 leading-none mt-0.5">💡</span>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {renderInline(block.text, `call${index}`)}
          </p>
        </div>
      );
    case 'svg':
      return <GuideSvg key={index} name={block.name} caption={block.caption} />;
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const cat = getCategoryBySlug(guide.categorySlug);
  const primaryCalc = getCalculatorBySlug(guide.primaryCalc);
  const relatedCalcs = guide.relatedCalcs.map(getCalculatorBySlug).filter(Boolean) as NonNullable<
    ReturnType<typeof getCalculatorBySlug>
  >[];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.updated,
    dateModified: guide.updated,
    inLanguage: 'en-US',
    author: { '@type': 'Organization', name: 'EveryCentCalc', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'EveryCentCalc', url: BASE_URL },
    mainEntityOfPage: `${BASE_URL}/guides/${guide.slug}/`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const toc = guide.sections.map((s) => ({ id: slugify(s.heading), label: s.heading }));

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <nav className="text-sm mb-6 flex flex-wrap items-center gap-y-1.5" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          {cat && (
            <>
              <Link href={`/${cat.slug}/`} className="hover:underline">{cat.name}</Link>
              <span className="mx-2">/</span>
            </>
          )}
          <Link href="/guides/" className="hover:underline">Guides</Link>
          <span className="mx-2">/</span>
          <span style={{ color: 'var(--text-primary)' }}>{guide.title}</span>
        </nav>

        <article>
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--brand)' }}>
            Guide · Updated {new Date(guide.updated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {guide.readMinutes} min read
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4 text-balance" style={{ color: 'var(--text-primary)' }}>
            {guide.title}
          </h1>
          <p className="text-base md:text-lg mb-6 text-balance" style={{ color: 'var(--text-secondary)' }}>
            {guide.description}
          </p>

          <div
            className="rounded-2xl border-2 p-5 mb-8"
            style={{ borderColor: 'var(--brand)', background: 'var(--brand-light)' }}
          >
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--brand)' }}>
              ⚡ The short version
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {renderInline(guide.takeaway, 'takeaway')}
            </p>
          </div>

          <div className="rounded-2xl border p-5 mb-10" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
              In this guide
            </p>
            <ol className="space-y-1.5">
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm font-medium hover:underline" style={{ color: 'var(--text-secondary)' }}>
                    {i + 1}. {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {guide.sections.map((section) => (
            <section key={slugify(section.heading)} id={slugify(section.heading)} className="mb-10 scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                {section.heading}
              </h2>
              {section.blocks.map((block, i) => renderBlock(block, i))}
            </section>
          ))}
        </article>

        <AdsterraBanner className="mb-14" />

        {primaryCalc && (
          <div
            className="rounded-2xl border-2 p-6 md:p-8 mb-14 text-center"
            style={{ borderColor: 'var(--brand)', background: 'var(--brand-light)' }}
          >
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--brand)' }}>
              Run the numbers yourself
            </p>
            <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {primaryCalc.name}
            </h2>
            <p className="text-sm mb-5 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              {primaryCalc.description}
            </p>
            <Link
              href={`/calculator/${primaryCalc.slug}/`}
              className="inline-flex px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
              style={{ background: 'var(--brand-gradient)' }}
            >
              Use the {primaryCalc.name.replace(' Calculator', '')} Calculator
            </Link>
          </div>
        )}

        {relatedCalcs.length > 0 && (
          <div className="mb-14">
            <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
              Calculators that go with this guide
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedCalcs.map((calc) => (
                <CalculatorCard key={calc.slug} calc={calc} />
              ))}
            </div>
          </div>
        )}

        {guide.faqs.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl">
              {guide.faqs.map((faq, i) => (
                <details key={i} className="group border-b py-1" style={{ borderColor: 'var(--border)' }}>
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
          </div>
        )}

        <div className="text-center pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <Link
            href="/guides/"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
            style={{ color: 'var(--brand)' }}
          >
            <span aria-hidden="true">←</span> Browse all guides
          </Link>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
