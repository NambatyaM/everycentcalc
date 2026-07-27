export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Calculator {
  slug: string;
  name: string;
  description: string;
  category: string;
  categorySlug: string;
  url: string;
  canonical: string;
  color: string;
  icon: string;
  tags: string[];
  keywords: string[];
  faqs: FAQ[];
  question: string;
  answer: string;
}
