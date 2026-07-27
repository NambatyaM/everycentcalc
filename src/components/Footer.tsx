import Link from 'next/link';
import { categories } from '@/lib/calculators';

export default function Footer() {
  return (
    <footer className="border-t mt-20" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="font-bold text-lg mb-3" style={{ color: 'var(--brand)' }}>
              EveryCentCalc
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Free financial calculators for freelancers, side hustlers, real estate investors, and small business owners.
            </p>
          </div>

          {categories.slice(0, 3).map((cat) => (
            <div key={cat.slug}>
              <h4 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                {cat.icon} {cat.name.replace(' Calculators', '')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={`/${cat.slug}/`}
                    className="text-sm hover:underline"
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
            &copy; {new Date().getFullYear()} EveryCentCalc. All calculators are for informational purposes only. Not financial, tax, or legal advice. Consult a qualified professional for specific guidance.
          </p>
          <div className="flex gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            <Link href="/about/" className="hover:underline">About</Link>
            <Link href="/privacy/" className="hover:underline">Privacy</Link>
            <Link href="/terms/" className="hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
