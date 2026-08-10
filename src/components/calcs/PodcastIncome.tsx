'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function PodcastIncome() {
  const [monthlyDownloads, setMonthlyDownloads] = useState('10000');
  const [cpmAds, setCpmAds] = useState('20');
  const [episodesPerMonth, setEpisodesPerMonth] = useState('4');
  const [sponsorPerEpisode, setSponsorPerEpisode] = useState('200');
  const [patreonSupporters, setPatreonSupporters] = useState('50');
  const [avgPledge, setAvgPledge] = useState('5');

  const downloads = parseFloat(monthlyDownloads) || 0;
  const cpm = parseFloat(cpmAds) || 0;
  const episodes = parseFloat(episodesPerMonth) || 0;
  const sponsor = parseFloat(sponsorPerEpisode) || 0;
  const supporters = parseFloat(patreonSupporters) || 0;
  const pledge = parseFloat(avgPledge) || 0;

  const adRevenue = (downloads / 1000) * cpm;
  const sponsorTotal = sponsor * episodes;
  const patreonTotal = supporters * pledge;
  const totalIncome = adRevenue + sponsorTotal + patreonTotal;

  return (
    <div>
      <SectionHeader title="Podcast Income Calculator" subtitle="Estimate your monthly revenue from ads, sponsors, and Patreon" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-downloads">Monthly Downloads</label>
            <input id="calc-monthly-downloads"  type="number" value={monthlyDownloads} onChange={(e) => setMonthlyDownloads(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-episodes-per-month">Episodes per Month</label>
            <input id="calc-episodes-per-month"  type="number" value={episodesPerMonth} onChange={(e) => setEpisodesPerMonth(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-cpm-for-ads">CPM for Ads ($)</label>
          <input id="calc-cpm-for-ads"  type="number" value={cpmAds} onChange={(e) => setCpmAds(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-sponsorship-per-episode">Sponsorship per Episode ($)</label>
          <input id="calc-sponsorship-per-episode"  type="number" value={sponsorPerEpisode} onChange={(e) => setSponsorPerEpisode(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-patreon-supporters">Patreon Supporters</label>
            <input id="calc-patreon-supporters"  type="number" value={patreonSupporters} onChange={(e) => setPatreonSupporters(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-average-patreon-pledge">Average Patreon Pledge ($)</label>
            <input id="calc-average-patreon-pledge"  type="number" value={avgPledge} onChange={(e) => setAvgPledge(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <ResultCard icon="💰" label="Total Monthly Income" value={formatCurrency(totalIncome)} highlight />
        <ResultCard icon="📺" label="Ad Revenue" value={formatCurrency(adRevenue)} />
        <ResultCard icon="🤝" label="Sponsorship Revenue" value={formatCurrency(sponsorTotal)} />
        <ResultCard icon="❤️" label="Patreon Revenue" value={formatCurrency(patreonTotal)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Revenue Breakdown</p>
        <ResultRow label="Ad Revenue (downloads ÷ 1000 × CPM)" value={formatCurrency(adRevenue)} />
        <ResultRow label={`Sponsorships (${episodes} episodes × ${formatCurrency(sponsor)})`} value={formatCurrency(sponsorTotal)} />
        <ResultRow label={`Patreon (${supporters} supporters × ${formatCurrency(pledge)})`} value={formatCurrency(patreonTotal)} />
        <ResultRow label="Total Monthly Income" value={formatCurrency(totalIncome)} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Annual Projection</p>
        <ResultRow label="Annual Ad Revenue" value={formatCurrency(adRevenue * 12)} />
        <ResultRow label="Annual Sponsorship Revenue" value={formatCurrency(sponsorTotal * 12)} />
        <ResultRow label="Annual Patreon Revenue" value={formatCurrency(patreonTotal * 12)} />
        <ResultRow label="Total Annual Income" value={formatCurrency(totalIncome * 12)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>CPM (cost per mille) is what advertisers pay per 1,000 downloads. Podcast CPM typically ranges from $15–$50. Ad revenue assumes dynamic ad insertion on all downloads. Patreon income is your total recurring monthly pledges. Sponsorship rate is per episode, paid regardless of download count.</p>
      </div>
    </div>
  );
}
