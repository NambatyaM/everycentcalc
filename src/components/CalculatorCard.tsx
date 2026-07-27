import Link from 'next/link';
import { Calculator } from '@/lib/calculators';

export default function CalculatorCard({ calc }: { calc: Calculator }) {
  return (
    <Link
      href={`/calculator/${calc.slug}/`}
      className="group block rounded-xl border p-5 transition-all hover:shadow-lg hover:-translate-y-0.5"
      style={{
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="text-3xl mb-3">{calc.icon}</div>
      <h3
        className="font-semibold text-base mb-1 group-hover:underline"
        style={{ color: 'var(--text-primary)' }}
      >
        {calc.name}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {calc.description.slice(0, 100)}...
      </p>
    </Link>
  );
}
