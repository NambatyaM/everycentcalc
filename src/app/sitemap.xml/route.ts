import { calculators, categories } from '@/lib/calculators';
import { guides } from '@/lib/guides';

const BASE_URL = 'https://everycentcalc.biz.id';

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
  image?: { loc: string; title: string };
};

const urlEntry = (
  url: string,
  lastModified: Date,
  changeFrequency: string,
  priority: number,
  images?: { loc: string; title: string }[],
) => {
  const imageTags = (images ?? [])
    .map(
      (img) =>
        `    <image:image>\n      <image:loc>${img.loc}</image:loc>\n      <image:title><![CDATA[${img.title}]]></image:title>\n    </image:image>`,
    )
    .join('\n');
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastModified.toISOString()}</lastmod>\n    <changefreq>${changeFrequency}</changefreq>\n    <priority>${priority}</priority>\n${imageTags}</url>\n`;
};

export async function GET(): Promise<Response> {
  const staticPages: SitemapEntry[] = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/guides/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  const guidePages: SitemapEntry[] = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}/`,
    lastModified: new Date(guide.updated),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const now = new Date();
  const inTaxSeason = now.getMonth() >= 1 && now.getMonth() <= 4;

  const boostedCalcs: SitemapEntry[] = calculators.map((calc) => {
    const boosted = TAX_SEASON.has(calc.slug);
    const tierPriority = PRIORITY_TIERS[calc.slug] ?? 0.7;
    const priority = inTaxSeason && boosted ? Math.max(0.9, tierPriority) : tierPriority;
    return {
      url: `${BASE_URL}/calculator/${calc.slug}/`,
      lastModified: new Date(),
      changeFrequency: inTaxSeason && boosted ? 'weekly' : 'monthly',
      priority,
      image: {
        loc: `${BASE_URL}/images/calculators/${calc.slug}.svg`,
        title: `${calc.name} — EveryCentCalc`,
      },
    };
  });

  const boostedCategoryPages: SitemapEntry[] = categories.map((cat) => {
    const hasTaxBoost = cat.slug === 'freelance-tax' || cat.slug === 'llc-tax';
    return {
      url: `${BASE_URL}/${cat.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: inTaxSeason && hasTaxBoost ? 0.9 : 0.8,
    };
  });

  const entries = [
    ...staticPages,
    ...guidePages,
    ...boostedCategoryPages,
    ...boostedCalcs,
  ].map((p) => urlEntry(p.url, p.lastModified, p.changeFrequency, p.priority, p.image ? [p.image] : []));

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.join('\n')}</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
}

const TAX_SEASON = new Set([
  'self-employment-tax-calculator',
  'quarterly-tax-calculator',
  'quarterly-tax-deadline-calculator',
  'quarterly-tax-penalty-calculator',
  '1099-income-tax-calculator',
  'side-hustle-income-tax-calculator',
  'freelance-income-tax-calculator',
  'tax-extension-calculator',
  'side-hustle-tax-calculator',
]);

const PRIORITY_TIERS: Record<string, number> = {
  'mortgage-payment-calculator': 0.9,
  'take-home-pay-calculator': 0.9,
  'salary-to-hourly-calculator': 0.9,
  'self-employment-tax-calculator': 0.9,
  '1099-income-tax-calculator': 0.9,
  'quarterly-tax-calculator': 0.9,
  'side-hustle-tax-calculator': 0.9,
  'sales-tax-calculator': 0.9,
  'net-worth-calculator': 0.9,
  'compound-interest-calculator': 0.9,
  'rent-vs-buy-calculator': 0.9,
  'house-affordability-calculator': 0.9,
  'credit-card-payoff-calculator': 0.9,
  'student-loan-calculator': 0.9,
  'auto-loan-calculator': 0.9,
  '401k-calculator': 0.9,
  'roth-ira-calculator': 0.9,
  'home-office-deduction-calculator': 0.9,
  'break-even-calculator': 0.9,
  'business-profit-margin-calculator': 0.9,
  'freelance-income-tax-calculator': 0.9,
  'etsy-profit-calculator': 0.9,
  'rideshare-driver-calculator': 0.9,
  'down-payment-calculator': 0.9,
  'rental-property-calculator': 0.8,
  'freelancer-rate-calculator': 0.8,
  'freelance-vs-employment-calculator': 0.8,
  's-corp-tax-calculator': 0.8,
  'mortgage-interest-calculator': 0.8,
  'emergency-fund-calculator': 0.8,
  'cd-calculator': 0.8,
  'tax-extension-calculator': 0.8,
  'quarterly-tax-deadline-calculator': 0.8,
  'expense-ratio-calculator': 0.8,
  'cap-rate-calculator': 0.8,
  'required-minimum-distribution-calculator': 0.8,
  'retirement-withdrawal-calculator': 0.8,
  'investment-return-calculator': 0.8,
  'stock-portfolio-return-calculator': 0.8,
  'revenue-growth-calculator': 0.8,
  'startup-runway-calculator': 0.8,
  'customer-acquisition-cost-calculator': 0.8,
  'customer-lifetime-value-calculator': 0.8,
  'quarterly-tax-penalty-calculator': 0.8,
  'retirement-savings-gap-calculator': 0.8,
  'inflation-adjusted-calculator': 0.8,
  'roth-conversion-calculator': 0.8,
  'etf-fee-calculator': 0.8,
  '529-college-savings-calculator': 0.8,
  'side-hustle-income-tax-calculator': 0.8,
  'freelancer-effective-tax-rate-calculator': 0.8,
  'self-employed-health-insurance-deduction-calculator': 0.8,
  'se-tax-vs-fica-calculator': 0.8,
  'freelancer-qbi-deduction-calculator': 0.8,
  'freelancer-health-insurance-calculator': 0.8,
  'freelancer-retirement-savings-calculator': 0.8,
  'freelancer-profitability-calculator': 0.8,
  'freelancer-savings-rate-calculator': 0.8,
  'freelance-project-rate-calculator': 0.8,
  'freelance-hourly-vs-project-calculator': 0.8,
  'freelance-net-worth-calculator': 0.8,
  'client-billing-calculator': 0.8,
  'freelance-tax-deduction-calculator': 0.8,
  'rental-cash-flow-calculator': 0.8,
  'house-flipping-calculator': 0.8,
  'real-estate-flipping-profit-calculator': 0.8,
  'real-estate-agent-commission-calculator': 0.8,
  'rental-yield-calculator': 0.8,
  'home-equity-calculator': 0.8,
  'dscr-loan-calculator': 0.8,
  'airbnb-revenue-calculator': 0.8,
  'brrrr-calculator': 0.8,
  'llc-vs-sole-proprietor-tax-calculator': 0.8,
  'llc-tax-savings-calculator': 0.8,
  's-corp-salary-calculator': 0.8,
  'payroll-tax-calculator': 0.8,
  'business-entity-tax-comparison': 0.8,
  'c-corp-vs-s-corp-calculator': 0.8,
  'entity-formation-cost-calculator': 0.8,
  'business-debt-payoff-calculator': 0.8,
  'business-loan-interest-calculator': 0.8,
  'cash-flow-calculator': 0.8,
  'saas-metrics-calculator': 0.8,
  'pricing-strategy-calculator': 0.8,
  'doordash-profit-calculator': 0.8,
  'uber-eats-profit-calculator': 0.8,
  'print-on-demand-profit-calculator': 0.8,
  'amazon-fba-profit-calculator': 0.8,
  'youtube-revenue-calculator': 0.8,
  'online-course-profit-calculator': 0.8,
  'freelance-writer-rate-calculator': 0.8,
  'freelance-graphic-designer-rate-calculator': 0.8,
  'podcast-income-calculator': 0.8,
  'social-media-manager-rate-calculator': 0.8,
  'content-creator-revenue-calculator': 0.8,
  'is-side-hustle-worth-it-calculator': 0.8,
  'shopify-profit-calculator': 0.8,
  'freelance-debt-payoff-calculator': 0.8,
  'time-tracking-value-calculator': 0.8,
};
