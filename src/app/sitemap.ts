import { calculators, categories } from '@/lib/calculators';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://everycentcalc.biz.id';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/${cat.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const calcPages: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${BASE_URL}/calculator/${calc.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...calcPages];
}
