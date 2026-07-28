'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function AirbnbRevenueCalc() {
  const [nightlyRate, setNightlyRate] = useState('150');
  const [occupancy, setOccupancy] = useState('65');
  const [cleaningFee, setCleaningFee] = useState('75');
  const [numGuests, setNumGuests] = useState('2');
  const [monthlyMortgage, setMonthlyMortgage] = useState('1800');
  const [monthlyUtilities, setMonthlyUtilities] = useState('200');
  const [managementFee, setManagementFee] = useState('20');
  const [platformFee, setPlatformFee] = useState('3');

  const rate = parseFloat(nightlyRate) || 0;
  const occ = parseFloat(occupancy) || 0;
  const cleanFee = parseFloat(cleaningFee) || 0;
  const guests = parseInt(numGuests) || 1;
  const mortgage = parseFloat(monthlyMortgage) || 0;
  const utilities = parseFloat(monthlyUtilities) || 0;
  const mgmtFee = parseFloat(managementFee) || 0;
  const platFee = parseFloat(platformFee) || 0;

  const annualNights = Math.round(365 * (occ / 100));
  const avgStay = 3;
  const turnovers = annualNights / avgStay;

  const grossRevenue = rate * annualNights;
  const cleaningRevenue = cleanFee * turnovers;
  const totalGross = grossRevenue + cleaningRevenue;
  const platformFees = totalGross * (platFee / 100);
  const management = totalGross * (mgmtFee / 100);
  const annualCosts = (mortgage + utilities) * 12;
  const netIncome = totalGross - platformFees - management - annualCosts;
  const monthlyNetIncome = netIncome / 12;
  const monthlyTraditionalRent = rate * (occ / 100) * 30;
  const annualTraditionalRent = monthlyTraditionalRent * 12;

  return (
    <div>
      <SectionHeader title="Airbnb Revenue Calculator" subtitle="Estimate short term rental income vs. traditional renting" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Nightly Rate ($)</label>
            <input type="number" value={nightlyRate} onChange={(e) => setNightlyRate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Avg Occupancy (% of year)</label>
            <input type="number" value={occupancy} onChange={(e) => setOccupancy(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Cleaning Fee ($/turnover)</label>
            <input type="number" value={cleaningFee} onChange={(e) => setCleaningFee(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Number of Guests</label>
            <input type="number" value={numGuests} onChange={(e) => setNumGuests(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Mortgage ($)</label>
            <input type="number" value={monthlyMortgage} onChange={(e) => setMonthlyMortgage(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Utilities ($)</label>
            <input type="number" value={monthlyUtilities} onChange={(e) => setMonthlyUtilities(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Management Fee (% of revenue)</label>
            <input type="number" value={managementFee} onChange={(e) => setManagementFee(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Platform Fee (% of revenue)</label>
            <input type="number" value={platformFee} onChange={(e) => setPlatformFee(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} step="0.1" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💰" label="Gross Annual Revenue" value={`$${totalGross.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📈" label="Net Annual Income" value={`$${netIncome.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="💵" label="Monthly Net Income" value={`$${monthlyNetIncome.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="🏠" label="Traditional Rent (monthly)" value={`$${monthlyTraditionalRent.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} />
        <ResultCard icon="📊" label="Net vs. Traditional" value={`$${(monthlyNetIncome - monthlyTraditionalRent).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo`} />
        <ResultCard icon="🛏️" label="Booked Nights/Year" value={annualNights.toLocaleString()} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Revenue & Expense Breakdown</h3>
        <ResultRow label="Nightly Rental Revenue" value={`$${grossRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Cleaning Revenue" value={`$${cleaningRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Gross Revenue" value={`$${totalGross.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label={`Platform Fees (${platFee}%)`} value={`-$${platformFees.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label={`Management (${mgmtFee}%)`} value={`-$${management.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Mortgage + Utilities (annual)" value={`-$${annualCosts.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Net Annual Income" value={`$${netIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <ResultRow label="Total Turnovers/Year (avg 3 night stay)" value={turnovers.toFixed(0)} />
        <ResultRow label="Guests per Booking" value={guests.toString()} />
        <ResultRow label="Cleaning per Guest Night" value={`$${(turnovers > 0 ? cleanFee * turnovers / (annualNights * guests) : 0).toFixed(2)}`} />
        <ResultRow label="Revenue per Available Night" value={`$${(annualNights > 0 ? totalGross / annualNights : 0).toFixed(2)}`} />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>This estimator uses a simplified model with an assumed 3 night average stay. Actual results vary significantly by location, season, property type, and hosting quality. Additional costs not included: cleaning supplies, furnishing, repairs, insurance premiums, local regulations/permits, and personal time. Does not account for seasonal pricing variations or minimum stay requirements.</p>
      </div>
    </div>
  );
}
