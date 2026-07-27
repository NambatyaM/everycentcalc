import Link from 'next/link';

const navLinks = [
  { href: '/freelancer-tax/', label: 'Freelancer Tax' },
  { href: '/freelancer-rate/', label: 'Freelancer Rates' },
  { href: '/side-hustle/', label: 'Side Hustle' },
  { href: '/real-estate/', label: 'Real Estate' },
  { href: '/small-business/', label: 'Small Business' },
];

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        background: 'color-mix(in srgb, var(--bg-primary) 85%, transparent)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--brand)' }}>
          <span className="text-2xl">$</span>
          <span className="hidden sm:inline">EveryCentCalc</span>
          <span className="sm:hidden">ECC</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:opacity-80"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#calculators"
            className="px-4 py-2 text-sm font-semibold rounded-lg transition-opacity hover:opacity-90"
            style={{ background: 'var(--brand)', color: '#fff' }}
          >
            All Calculators
          </Link>
        </div>
      </div>
    </header>
  );
}
