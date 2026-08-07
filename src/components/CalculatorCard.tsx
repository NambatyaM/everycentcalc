import Link from 'next/link';
import Image from 'next/image';
import type { Calculator } from '@/lib/types';
import { getCalculatorImage } from '@/lib/calculatorImages';

export default function CalculatorCard({ calc }: { calc: Calculator }) {
  const img = getCalculatorImage(calc.name, calc.slug);

  return (
    <Link
      href={`/calculator/${calc.slug}/`}
      className="group block rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-[var(--brand)]"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div className="overflow-hidden" style={{ aspectRatio: '1200/630', background: 'var(--bg-tertiary)' }}>
        <Image
          src={img.src}
          alt={img.alt}
          width={1200}
          height={630}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-5">
        <h3
          className="font-semibold text-sm leading-snug group-hover:text-[var(--brand)] transition-colors mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {calc.name}
        </h3>
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {calc.description}
        </p>
        <div className="mt-3 flex items-center gap-1 text-xs font-medium transition-colors" style={{ color: 'var(--brand)' }}>
          Use calculator
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5-5-5-5" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
