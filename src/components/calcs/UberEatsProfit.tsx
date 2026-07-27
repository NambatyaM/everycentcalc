'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function UberEatsProfit() {
  const [weeklyEarnings, setWeeklyEarnings] = useState('600');
  const [deliveriesPerWeek, setDeliveriesPerWeek] = useState('50');
  const [milesDriven, setMilesDriven] = useState('250');
  const [hoursWorked, setHoursWorked] = useState('25');
  const [vehicleExpenses, setVehicleExpenses] = useState('30');

  const gross = parseFloat(weeklyEarnings) || 0;
  const deliveries = parseFloat(deliveriesPerWeek) || 0;
  const miles = parseFloat(milesDriven) || 0;
  const hours = parseFloat(hoursWorked) || 0;
  const vehicle = parseFloat(vehicleExpenses) || 0;

  const earningsPerDelivery = deliveries > 0 ? gross / deliveries : 0;
  const netWeekly = gross - vehicle;
  const hourlyRate = hours > 0 ? netWeekly / hours : 0;
  const annualNet = netWeekly * 52;
  const mileageDeduction = miles * 0.70;

  return (
    <div>
      <SectionHeader title="Uber Eats Driver Profit Calculator" subtitle="Know your real earnings after vehicle costs" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Weekly Earnings ($)</label>
            <input type="number" value={weeklyEarnings} onChange={(e) => setWeeklyEarnings(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Deliveries per Week</label>
            <input type="number" value={deliveriesPerWeek} onChange={(e) => setDeliveriesPerWeek(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Hours Worked per Week</label>
            <input type="number" value={hoursWorked} onChange={(e) => setHoursWorked(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Miles Driven per Week</label>
            <input type="number" value={milesDriven} onChange={(e) => setMilesDriven(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Vehicle Expenses per Week ($)</label>
          <input type="number" value={vehicleExpenses} onChange={(e) => setVehicleExpenses(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <ResultCard icon="💰" label="Net Weekly Profit" value={formatCurrency(netWeekly)} highlight />
        <ResultCard icon="📦" label="Per Delivery Earning" value={formatCurrency(earningsPerDelivery)} highlight />
        <ResultCard icon="⏱️" label="Hourly Rate" value={formatCurrency(hourlyRate)} />
        <ResultCard icon="📈" label="Annual Net Income" value={formatCurrency(annualNet)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Weekly Earnings Breakdown</p>
        <ResultRow label="Gross Earnings" value={formatCurrency(gross)} />
        <ResultRow label="Vehicle Expenses" value={`-${formatCurrency(vehicle)}`} />
        <ResultRow label="Net Weekly Profit" value={formatCurrency(netWeekly)} bold />
        <ResultRow label="IRS Mileage Deduction Reference" value={formatCurrency(mileageDeduction)} />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Vehicle expenses include gas, maintenance, depreciation, insurance, and other car related costs. The IRS mileage deduction of $0.70/mile is shown for tax reference. Net profit = gross earnings − vehicle expenses. Annual projection assumes consistent weekly earnings over 52 weeks.</p>
      </div>
    </div>
  );
}
