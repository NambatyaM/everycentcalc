'use client';

import Script from 'next/script';

const AD_SCRIPT_SRC =
  'https://pl30565866.effectivecpmnetwork.com/f29432aa4667b28e0df8c69f37dd1997/invoke.js';
const AD_CONTAINER_ID = 'container-f29432aa4667b28e0df8c69f37dd1997';

interface AdsterraBannerProps {
  label?: string;
  className?: string;
}

export default function AdsterraBanner({ label = 'Advertisement', className = '' }: AdsterraBannerProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <p
          className="text-center text-[10px] font-medium uppercase tracking-[0.2em] mb-1.5"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
        </p>
      )}
      <div
        id={AD_CONTAINER_ID}
        className="w-full rounded-xl border flex items-center justify-center overflow-hidden"
        style={{ minHeight: 120, background: 'var(--bg-card)', borderColor: 'var(--border)' }}
      />
      <Script
        src={AD_SCRIPT_SRC}
        strategy="afterInteractive"
        async
        data-cfasync="false"
      />
    </div>
  );
}
