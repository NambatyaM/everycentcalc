import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    default: 'EveryCentCalc — Free Tax & Financial Calculators (2026)',
    template: '%s | EveryCentCalc',
  },
  description:
    '100 free tax and financial calculators for freelancers, side hustlers, and small business owners. Self employment tax, 1099 income, quarterly payments, rent vs buy, and profit margins with 2026 IRS rates. No signup required.',
  keywords: [
    'self-employment tax calculator 2026',
    'freelancer tax calculator',
    'quarterly estimated taxes',
    '1099 tax calculator',
    'freelancer rate calculator',
    'side hustle profit calculator',
    'rent vs buy calculator',
    'small business calculator',
    'free financial calculator',
    'rental property ROI calculator',
    'break even calculator',
    'mortgage calculator',
    'Etsy profit calculator',
    'Amazon FBA profit calculator',
    'startup runway calculator',
    'compound interest calculator',
  ],
  authors: [{ name: 'EveryCentCalc' }],
  creator: 'EveryCentCalc',
  publisher: 'EveryCentCalc',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://everycentcalc.biz.id'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'EveryCentCalc',
    title: 'EveryCentCalc — 100 Free Tax & Financial Calculators (2026)',
    description:
      '100 free tax and financial calculators for freelancers, side hustlers, and small business owners. 2026 IRS rates. 100% private.',
    url: 'https://everycentcalc.biz.id',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'EveryCentCalc — 100 Free Tax & Financial Calculators (2026)' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EveryCentCalc — Free Tax & Financial Calculators (2026)',
    description:
      '100 free calculators for freelancers, side hustlers, and small business owners.',
    images: ['/og.png'],
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

export const viewport: Viewport = {
  themeColor: '#059669',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="p:domain_verify" content="126d1234c42680b715fe721ef448ed15" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'EveryCentCalc',
              url: 'https://everycentcalc.biz.id',
              description:
                '100 free online financial calculators for freelancers, side hustlers, real estate investors, and small business owners.',
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}
        style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        {children}
        <Analytics />
        <Script
          src="https://pl30565935.effectivecpmnetwork.com/5c/32/f4/5c32f490e7297948bf8b3b806f975fd1.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
