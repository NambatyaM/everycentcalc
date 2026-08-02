'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function YoutubeRevenue() {
  const [monthlyViews, setMonthlyViews] = useState('50000');
  const [cpmRate, setCpmRate] = useState('5');
  const [sponsorRate, setSponsorRate] = useState('500');
  const [videosPerMonth, setVideosPerMonth] = useState('8');
  const [affiliatePerVideo, setAffiliatePerVideo] = useState('100');

  const views = parseFloat(monthlyViews) || 0;
  const cpm = parseFloat(cpmRate) || 0;
  const sponsor = parseFloat(sponsorRate) || 0;
  const videos = parseFloat(videosPerMonth) || 0;
  const affiliate = parseFloat(affiliatePerVideo) || 0;

  const adRevenue = (views / 1000) * cpm * 0.55;
  const sponsorTotal = sponsor * videos;
  const affiliateTotal = affiliate * videos;
  const totalRevenue = adRevenue + sponsorTotal + affiliateTotal;
  const perVideo = videos > 0 ? totalRevenue / videos : 0;

  return (
    <div>
      <SectionHeader title="YouTube Channel Revenue Calculator" subtitle="Estimate your total monthly income from ads, sponsorships, and affiliates" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Views</label>
          <input type="number" value={monthlyViews} onChange={(e) => setMonthlyViews(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>CPM Rate ($)</label>
            <input type="number" value={cpmRate} onChange={(e) => setCpmRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Videos per Month</label>
            <input type="number" value={videosPerMonth} onChange={(e) => setVideosPerMonth(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Sponsorship Rate per Video ($)</label>
            <input type="number" value={sponsorRate} onChange={(e) => setSponsorRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Affiliate Revenue per Video ($)</label>
            <input type="number" value={affiliatePerVideo} onChange={(e) => setAffiliatePerVideo(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <ResultCard icon="💰" label="Total Monthly Revenue" value={formatCurrency(totalRevenue)} highlight />
        <ResultCard icon="📺" label="Ad Revenue" value={formatCurrency(adRevenue)} />
        <ResultCard icon="🤝" label="Sponsorship Revenue" value={formatCurrency(sponsorTotal)} />
        <ResultCard icon="🎥" label="Revenue per Video" value={formatCurrency(perVideo)} highlight />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Revenue Breakdown</p>
        <ResultRow label="Ad Revenue (views ÷ 1000 × CPM × 55%)" value={formatCurrency(adRevenue)} />
        <ResultRow label={`Sponsorships (${videos} videos × ${formatCurrency(sponsor)})`} value={formatCurrency(sponsorTotal)} />
        <ResultRow label={`Affiliate (${videos} videos × ${formatCurrency(affiliate)})`} value={formatCurrency(affiliateTotal)} />
        <ResultRow label="Total Monthly Revenue" value={formatCurrency(totalRevenue)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>CPM (cost per mille) is what advertisers pay per 1,000 views. YouTube typically pays creators 55% of ad revenue. Typical CPM ranges from $1–$10 depending on niche. Sponsorship and affiliate rates vary widely by channel size and audience. This calculator uses your actual rate per video.</p>
      </div>
    </div>
  );
}
