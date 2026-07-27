import { ReactNode } from 'react';

interface ResultCardProps {
  label: string;
  value: string;
  subtitle?: string;
  highlight?: boolean;
  icon?: string;
}

export function ResultCard({ label, value, subtitle, highlight, icon }: ResultCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 transition-all ${highlight ? 'border-2 shadow-md' : ''}`}
      style={{
        background: highlight ? 'var(--brand-light)' : 'var(--bg-tertiary)',
        borderColor: highlight ? 'var(--brand)' : 'var(--border)',
      }}
    >
      <div className="text-xs font-medium mb-1.5 flex items-center gap-1.5" style={{ color: highlight ? 'var(--brand)' : 'var(--text-secondary)' }}>
        {icon && <span>{icon}</span>}
        {label}
      </div>
      <div
        className="text-xl md:text-2xl font-bold font-mono tracking-tight"
        style={{ color: highlight ? 'var(--brand)' : 'var(--text-primary)' }}
      >
        {value}
      </div>
      {subtitle && (
        <div className="text-[11px] mt-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

export function ResultRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div
      className={`flex justify-between items-center py-2.5 ${bold ? 'border-t-2 font-bold' : 'border-t'}`}
      style={{ borderColor: 'var(--border)' }}
    >
      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span
        className="font-mono text-sm font-medium"
        style={{ color: bold ? 'var(--brand)' : 'var(--text-primary)' }}
      >
        {value}
      </span>
    </div>
  );
}

export function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b" style={{ borderColor: 'var(--border)' }}>
      <summary
        className="flex justify-between items-center py-4 cursor-pointer font-medium list-none"
        style={{ color: 'var(--text-primary)' }}
      >
        {question}
        <span
          className="ml-2 transition-transform group-open:rotate-45 text-xl font-light flex-shrink-0"
          style={{ color: 'var(--text-muted)' }}
        >
          +
        </span>
      </summary>
      <p className="pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {answer}
      </p>
    </details>
  );
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm mt-1.5" style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
