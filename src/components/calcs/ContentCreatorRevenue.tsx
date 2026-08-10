'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function ContentCreatorRevenueCalc() {
  const [monthlyViews, setMonthlyViews] = useState('50000');
  const [cpmRate, setCpmRate] = useState('5');
  const [sponsorships, setSponsorships] = useState('2');
  const [avgSponsorshipValue, setAvgSponsorshipValue] = useState('500');
  const [affiliateRevenue, setAffiliateRevenue] = useState('300');
  const [members, setMembers] = useState('50');
  const [membershipPrice, setMembershipPrice] = useState('5');

  const views = parseFloat(monthlyViews) || 0;
  const cpm = parseFloat(cpmRate) || 0;
  const sp = parseFloat(sponsorships) || 0;
  const asv = parseFloat(avgSponsorshipValue) || 0;
  const ar = parseFloat(affiliateRevenue) || 0;
  const mb = parseFloat(members) || 0;
  const mp = parseFloat(membershipPrice) || 0;

  const adRevenue = (views / 1000) * cpm;
  const sponsorshipRevenue = sp * asv;
  const membershipRevenue = mb * mp;
  const totalRevenue = adRevenue + sponsorshipRevenue + ar + membershipRevenue;
  const annualProjection = totalRevenue * 12;

  const adPct = totalRevenue > 0 ? (adRevenue / totalRevenue) * 100 : 0;
  const sponsorshipPct = totalRevenue > 0 ? (sponsorshipRevenue / totalRevenue) * 100 : 0;
  const affiliatePct = totalRevenue > 0 ? (ar / totalRevenue) * 100 : 0;
  const membershipPct = totalRevenue > 0 ? (membershipRevenue / totalRevenue) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Content Creator Revenue Calculator" subtitle="Break down your revenue streams and project your income" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-views">Monthly Views</label>
          <input id="calc-monthly-views"  type="number" value={monthlyViews} onChange={(e) => setMonthlyViews(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-cpm-rate-per-1k-views">CPM Rate ($ per 1K views)</label>
          <input id="calc-cpm-rate-per-1k-views"  type="number" value={cpmRate} onChange={(e) => setCpmRate(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-sponsorships-per-month">Sponsorships per Month</label>
            <input id="calc-sponsorships-per-month"  type="number" value={sponsorships} onChange={(e) => setSponsorships(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-avg-sponsorship-value">Avg Sponsorship Value ($)</label>
            <input id="calc-avg-sponsorship-value"  type="number" value={avgSponsorshipValue} onChange={(e) => setAvgSponsorshipValue(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-affiliate-commission-per-month">Affiliate Commission per Month ($)</label>
          <input id="calc-affiliate-commission-per-month"  type="number" value={affiliateRevenue} onChange={(e) => setAffiliateRevenue(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-members-subscribers">Members/Subscribers</label>
            <input id="calc-members-subscribers"  type="number" value={members} onChange={(e) => setMembers(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-membership-price">Membership Price ($)</label>
            <input id="calc-membership-price"  type="number" value={membershipPrice} onChange={(e) => setMembershipPrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💎" label="Total Monthly Revenue" value={`$${totalRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📈" label="Annual Projection" value={`$${annualProjection.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="🎬" label="Ad Revenue" value={`$${adRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="🤝" label="Sponsorship Revenue" value={`$${sponsorshipRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="🔗" label="Affiliate Revenue" value={`$${ar.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultCard icon="👥" label="Membership Revenue" value={`$${membershipRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>Revenue Breakdown</p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1 overflow-hidden min-w-0">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Ad Revenue</span>
              <span className="font-mono text-sm font-medium" style={{ color: 'var(--text-primary)' }}>${adRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })} ({adPct.toFixed(1)}%)</span>
            </div>
            <div className="w-full rounded-full h-3" style={{ background: 'var(--bg-primary)' }}>
              <div className="h-3 rounded-full" style={{ width: `${adPct}%`, background: '#3b82f6', minWidth: '2px' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 overflow-hidden min-w-0">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Sponsorships</span>
              <span className="font-mono text-sm font-medium" style={{ color: 'var(--text-primary)' }}>${sponsorshipRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })} ({sponsorshipPct.toFixed(1)}%)</span>
            </div>
            <div className="w-full rounded-full h-3" style={{ background: 'var(--bg-primary)' }}>
              <div className="h-3 rounded-full" style={{ width: `${sponsorshipPct}%`, background: '#8b5cf6', minWidth: '2px' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 overflow-hidden min-w-0">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Affiliate</span>
              <span className="font-mono text-sm font-medium" style={{ color: 'var(--text-primary)' }}>${ar.toLocaleString('en-US', { maximumFractionDigits: 0 })} ({affiliatePct.toFixed(1)}%)</span>
            </div>
            <div className="w-full rounded-full h-3" style={{ background: 'var(--bg-primary)' }}>
              <div className="h-3 rounded-full" style={{ width: `${affiliatePct}%`, background: '#10b981', minWidth: '2px' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 overflow-hidden min-w-0">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Membership</span>
              <span className="font-mono text-sm font-medium" style={{ color: 'var(--text-primary)' }}>${membershipRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })} ({membershipPct.toFixed(1)}%)</span>
            </div>
            <div className="w-full rounded-full h-3" style={{ background: 'var(--bg-primary)' }}>
              <div className="h-3 rounded-full" style={{ width: `${membershipPct}%`, background: '#f59e0b', minWidth: '2px' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Ad Revenue" value={`$${adRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Sponsorship Revenue" value={`$${sponsorshipRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Affiliate Revenue" value={`$${ar.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Membership Revenue" value={`$${membershipRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Monthly Revenue" value={`$${totalRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="Annual Projection" value={`$${annualProjection.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>CPM (cost per mille) is what advertisers pay per 1,000 views. YouTube CPM typically ranges $2-$12 depending on niche. Sponsorship values vary widely by audience size and engagement. Membership revenue assumes monthly recurring billing. All figures are before taxes and platform fees.</p>
      </div>
    </div>
  );
}
