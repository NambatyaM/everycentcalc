import { calculators, categories } from '@/lib/calculators';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://everycentcalc.biz.id';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  const now = new Date();
  const inTaxSeason = now.getMonth() >= 1 && now.getMonth() <= 4;

  const boostedCalcs: MetadataRoute.Sitemap = calculators.map((calc) => {
    const boosted = TAX_SEASON.has(calc.slug);
    return {
      url: `${BASE_URL}/calculator/${calc.slug}/`,
      lastModified: new Date(),
      changeFrequency: inTaxSeason && boosted ? ('weekly' as const) : ('monthly' as const),
      priority: inTaxSeason && boosted ? 0.9 : 0.7,
    };
  });

  const boostedCategoryPages: MetadataRoute.Sitemap = categories.map((cat) => {
    const hasTaxBoost = cat.slug === 'freelance-tax' || cat.slug === 'llc-tax';
    return {
      url: `${BASE_URL}/${cat.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: inTaxSeason && hasTaxBoost ? 0.9 : 0.8,
    };
  });

  return [...staticPages, ...boostedCategoryPages, ...boostedCalcs];
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
