import Link from 'next/link';
import { categories } from '@/lib/calculators';
import LogoMark from '@/components/LogoMark';

export default function Footer() {
  return (
    <footer className="border-t mt-20" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg mb-3" style={{ color: 'var(--brand)' }}>
              <LogoMark size={32} />
              EveryCentCalc
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              Free financial calculators for freelancers, side hustlers, real estate investors, and small business owners.
            </p>
            <a
              href="https://www.hostinger.com?REFERRALCODE=KKCNKEVINV2U"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-3 transition-all hover:shadow-md group text-left"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}
            >
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Running a side hustle or website?
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Hostinger hosting from $2.99/mo — fast, reliable, free domain included.
                </p>
              </div>
            </a>
            <p className="text-[10px] mt-1.5" style={{ color: 'var(--text-muted)' }}>
              Affiliate link — we earn a commission at no cost to you.
            </p>
          </div>

          {categories.map((cat) => (
            <div key={cat.slug}>
              <h4 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                {cat.icon} {cat.name.replace(' Calculators', '')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={`/${cat.slug}/`}
                    className="text-sm hover:underline transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    View All
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} EveryCentCalc. All calculators are for informational purposes only. Not financial, tax, or legal advice.
          </p>
          <div className="flex gap-5 text-xs" style={{ color: 'var(--text-muted)' }}>
            <Link href="/guides/" className="hover:underline transition-colors">Guides</Link>
            <Link href="/about/" className="hover:underline transition-colors">About</Link>
            <Link href="/privacy/" className="hover:underline transition-colors">Privacy</Link>
            <Link href="/terms/" className="hover:underline transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
