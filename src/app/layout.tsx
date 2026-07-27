import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    default: 'EveryCentCalc — Free Financial Calculators for Freelancers & Small Business',
    template: '%s | EveryCentCalc',
  },
  description:
    '28 free online calculators for freelancers, side hustlers, real estate investors, and small business owners. Calculate self-employment tax, quarterly payments, rental ROI, break-even, and more — no signup required.',
  keywords: [
    'freelancer tax calculator',
    'self-employment tax calculator',
    'quarterly estimated taxes',
    'freelancer rate calculator',
    'side hustle profit calculator',
    'rent vs buy calculator',
    'small business calculator',
    'free financial calculator',
    '1099 tax calculator',
    'rental property ROI calculator',
    'break even calculator',
    'mortgage calculator',
    'Etsy profit calculator',
    'Amazon FBA profit calculator',
    'startup runway calculator',
  ],
  authors: [{ name: 'EveryCentCalc' }],
  creator: 'EveryCentCalc',
  publisher: 'EveryCentCalc',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://everycentcalc.biz.id'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'EveryCentCalc',
    title: 'EveryCentCalc — 28 Free Financial Calculators',
    description:
      'Free calculators for freelancers, side hustlers, real estate investors, and small business owners. 2026 IRS rates. 100% private.',
    url: 'https://everycentcalc.biz.id',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EveryCentCalc — Free Financial Calculators',
    description:
      '28 free calculators for freelancers, side hustlers, real estate investors, and small business owners.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'EveryCentCalc',
              url: 'https://everycentcalc.biz.id',
              description:
                '28 free online financial calculators for freelancers, side hustlers, real estate investors, and small business owners.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://everycentcalc.biz.id/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}
        style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        {children}
        <Script
          src="https://pl30565935.effectivecpmnetwork.com/5c/32/f4/5c32f490e7297948bf8b3b806f975fd1.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
