import Link from 'next/link';

interface AffiliateBannerProps {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon?: string;
  badge?: string;
}

export default function AffiliateBanner({ title, description, cta, href, icon, badge }: AffiliateBannerProps) {
  return (
    <div
      className="rounded-2xl border p-5 md:p-6 mb-8 transition-all hover:shadow-lg"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-sm)' }}
    >
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold mb-3" style={{ background: 'var(--brand-light)', color: 'var(--brand)' }}>
          {badge}
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {icon && <span className="text-3xl flex-shrink-0">{icon}</span>}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:shadow-lg hover:opacity-90"
          style={{ background: 'var(--brand-gradient)' }}
        >
          {cta}
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5-5-5-5" />
          </svg>
        </a>
      </div>
      <p className="text-[10px] mt-3" style={{ color: 'var(--text-muted)' }}>
        Affiliate link — we earn a commission at no cost to you. We only recommend products we trust.
      </p>
    </div>
  );
}
