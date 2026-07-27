import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    default: 'EveryCentCalc — Free Financial Calculators for Freelancers & Small Business',
    template: '%s | EveryCentCalc',
  },
  description:
    'Free online calculators for freelancers, side hustlers, real estate investors, and small business owners. Calculate taxes, rates, ROI, and more — no signup required.',
  keywords: [
    'freelancer tax calculator',
    'self-employment tax',
    'quarterly estimated taxes',
    'freelancer rate calculator',
    'side hustle profit calculator',
    'rent vs buy calculator',
    'small business calculator',
    'free financial calculator',
    '1099 tax calculator',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'EveryCentCalc',
    title: 'EveryCentCalc — Free Financial Calculators',
    description:
      'Free calculators for freelancers, side hustlers, real estate investors, and small business owners.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EveryCentCalc — Free Financial Calculators',
    description:
      'Free calculators for freelancers, side hustlers, real estate investors, and small business owners.',
  },
  metadataBase: new URL('https://everycentcalc.biz.id'),
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
                'Free online financial calculators for freelancers, side hustlers, real estate investors, and small business owners.',
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
      </body>
    </html>
  );
}
