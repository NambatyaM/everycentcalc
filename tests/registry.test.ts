import { describe, it, expect } from 'vitest';
import { calculators, categories, getAllSlugs } from '@/lib/calculators';

describe('calculator registry integrity', () => {
  it('has 100+ calculators', () => {
    expect(calculators.length).toBeGreaterThanOrEqual(100);
  });

  it('has unique slugs', () => {
    const slugs = calculators.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every calculator references a valid category', () => {
    const catSlugs = new Set(categories.map((c) => c.slug));
    for (const calc of calculators) {
      expect(catSlugs.has(calc.category)).toBe(true);
      expect(calc.categorySlug).toBe(calc.category);
    }
  });

  it('every calculator has required content fields', () => {
    for (const calc of calculators) {
      expect(calc.name.trim().length).toBeGreaterThan(0);
      expect(calc.description.trim().length).toBeGreaterThan(20);
      expect(calc.slug.trim().length).toBeGreaterThan(0);
      expect(calc.url).toBe(`/calculator/${calc.slug}/`);
      expect(calc.canonical).toBe(`/calculator/${calc.slug}/`);
      expect(calc.icon.trim().length).toBeGreaterThan(0);
    }
  });

  it('every calculator has at least one FAQ', () => {
    for (const calc of calculators) {
      expect(calc.faqs.length).toBeGreaterThanOrEqual(1);
      for (const faq of calc.faqs) {
        expect(faq.q.trim().length).toBeGreaterThan(5);
        expect(faq.a.trim().length).toBeGreaterThan(20);
      }
    }
  });

  it('every calculator has question/answer derived content', () => {
    for (const calc of calculators) {
      expect(calc.question.length).toBeGreaterThan(0);
      expect(calc.answer.length).toBeGreaterThan(0);
    }
  });

  it('every calculator has keywords and tags', () => {
    for (const calc of calculators) {
      expect(calc.keywords.length).toBeGreaterThan(0);
      expect(calc.tags.length).toBeGreaterThan(0);
    }
  });

  it('getAllSlugs matches calculators', () => {
    expect(getAllSlugs()).toEqual(calculators.map((c) => c.slug));
  });

  it('every category slug maps to exactly one category', () => {
    for (const cat of categories) {
      expect(getCategorySlugCount(cat.slug)).toBe(1);
    }
  });
});

function getCategorySlugCount(slug: string): number {
  return categories.filter((c) => c.slug === slug).length;
}
