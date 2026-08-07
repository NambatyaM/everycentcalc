'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function GraphicDesignerRate() {
  const [desiredIncome, setDesiredIncome] = useState('80000');
  const [billableHours, setBillableHours] = useState('20');
  const [logoEstimate, setLogoEstimate] = useState('1500');
  const [businessCardsEstimate, setBusinessCardsEstimate] = useState('300');
  const [socialMediaEstimate, setSocialMediaEstimate] = useState('800');
  const [websiteEstimate, setWebsiteEstimate] = useState('3000');

  const income = parseFloat(desiredIncome) || 0;
  const hours = parseFloat(billableHours) || 1;
  const logo = parseFloat(logoEstimate) || 0;
  const cards = parseFloat(businessCardsEstimate) || 0;
  const social = parseFloat(socialMediaEstimate) || 0;
  const website = parseFloat(websiteEstimate) || 0;

  const hourly = income / (52 * hours);
  const monthlyRevenue = hourly * hours * (52 / 12);
  const annualAtCurrent = monthlyRevenue * 12;

  const logoHours = hourly > 0 ? logo / hourly : 0;
  const cardsHours = hourly > 0 ? cards / hourly : 0;
  const socialHours = hourly > 0 ? social / hourly : 0;
  const websiteHours = hourly > 0 ? website / hourly : 0;

  return (
    <div>
      <SectionHeader title="Freelance Graphic Designer Rate Calculator" subtitle="Set your hourly rate and project pricing to hit income goals" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Desired Annual Income ($)</label>
            <input type="number" value={desiredIncome} onChange={(e) => setDesiredIncome(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Billable Hours per Week</label>
            <input type="number" value={billableHours} onChange={(e) => setBillableHours(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Logo Design Estimate ($)</label>
            <input type="number" value={logoEstimate} onChange={(e) => setLogoEstimate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Business Cards Estimate ($)</label>
            <input type="number" value={businessCardsEstimate} onChange={(e) => setBusinessCardsEstimate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Social Media Package Estimate ($)</label>
            <input type="number" value={socialMediaEstimate} onChange={(e) => setSocialMediaEstimate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Website Design Estimate ($)</label>
            <input type="number" value={websiteEstimate} onChange={(e) => setWebsiteEstimate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="⏱️" label="Hourly Rate" value={formatCurrency(hourly)} highlight />
        <ResultCard icon="💰" label="Monthly Revenue" value={formatCurrency(monthlyRevenue)} highlight />
        <ResultCard icon="📈" label="Annual at Current Hours" value={formatCurrency(annualAtCurrent)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Project Rates &amp; Estimated Hours</p>
        <ResultRow label="Logo Design" value={`${formatCurrency(logo)} (${logoHours.toFixed(1)} hrs)`} />
        <ResultRow label="Business Cards" value={`${formatCurrency(cards)} (${cardsHours.toFixed(1)} hrs)`} />
        <ResultRow label="Social Media Package" value={`${formatCurrency(social)} (${socialHours.toFixed(1)} hrs)`} />
        <ResultRow label="Website Design" value={`${formatCurrency(website)} (${websiteHours.toFixed(1)} hrs)`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Rate Calculation</p>
        <ResultRow label="Desired Annual Income" value={formatCurrency(income)} />
        <ResultRow label="Weeks per Year" value="52" />
        <ResultRow label="Billable Hours per Week" value={hours.toString()} />
        <ResultRow label="Hourly Rate (income ÷ 52 ÷ hours)" value={formatCurrency(hourly)} bold />
        <ResultRow label="Monthly Revenue (hourly × hours × 52/12)" value={formatCurrency(monthlyRevenue)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Hourly rate = desired annual income ÷ (52 weeks × billable hours). Project rates shown are estimates based on your hourly rate. Adjust estimates to match your actual project scope. Actual annual income assumes consistent billable hours year round.</p>
      </div>
    </div>
  );
}
