'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function PrintOnDemandProfit() {
  const [sellingPrice, setSellingPrice] = useState('25');
  const [productCost, setProductCost] = useState('12');
  const [shippingCharged, setShippingCharged] = useState('5');
  const [monthlyVolume, setMonthlyVolume] = useState('100');
  const [platformFeePct, setPlatformFeePct] = useState('15');
  const [marketingCost, setMarketingCost] = useState('2');

  const price = parseFloat(sellingPrice) || 0;
  const product = parseFloat(productCost) || 0;
  const shipping = parseFloat(shippingCharged) || 0;
  const volume = parseFloat(monthlyVolume) || 0;
  const feePct = parseFloat(platformFeePct) || 0;
  const marketing = parseFloat(marketingCost) || 0;

  const revenuePerSale = price + shipping;
  const costPerSale = product + marketing;
  const platformFee = revenuePerSale * (feePct / 100);
  const profitPerSale = revenuePerSale - costPerSale - platformFee;
  const monthlyProfit = profitPerSale * volume;
  const annualProfit = monthlyProfit * 12;
  const margin = revenuePerSale > 0 ? (profitPerSale / revenuePerSale) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Print on Demand Profit Calculator" subtitle="Calculate your true profit per sale across all costs" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Selling Price ($)</label>
            <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Product Cost ($)</label>
            <input type="number" value={productCost} onChange={(e) => setProductCost(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Shipping Charged ($)</label>
            <input type="number" value={shippingCharged} onChange={(e) => setShippingCharged(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Marketing Cost per Sale ($)</label>
            <input type="number" value={marketingCost} onChange={(e) => setMarketingCost(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Platform Fee (%)</label>
            <input type="number" value={platformFeePct} onChange={(e) => setPlatformFeePct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Sales Volume</label>
            <input type="number" value={monthlyVolume} onChange={(e) => setMonthlyVolume(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <ResultCard icon="💰" label="Profit per Sale" value={formatCurrency(profitPerSale)} highlight />
        <ResultCard icon="📅" label="Monthly Profit" value={formatCurrency(monthlyProfit)} highlight />
        <ResultCard icon="📈" label="Annual Profit" value={formatCurrency(annualProfit)} />
        <ResultCard icon="📊" label="Profit Margin" value={`${margin.toFixed(1)}%`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Per Sale Breakdown</p>
        <ResultRow label="Revenue (Price + Shipping)" value={formatCurrency(revenuePerSale)} />
        <ResultRow label="Product Cost" value={`-${formatCurrency(product)}`} />
        <ResultRow label="Marketing Cost" value={`-${formatCurrency(marketing)}`} />
        <ResultRow label={`Platform Fee (${feePct}%)`} value={`-${formatCurrency(platformFee)}`} />
        <ResultRow label="Profit per Sale" value={formatCurrency(profitPerSale)} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Monthly Summary</p>
        <ResultRow label="Units Sold" value={volume.toLocaleString()} />
        <ResultRow label="Total Revenue" value={formatCurrency(revenuePerSale * volume)} />
        <ResultRow label="Total Costs" value={formatCurrency((costPerSale + platformFee) * volume)} />
        <ResultRow label="Monthly Profit" value={formatCurrency(monthlyProfit)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Revenue per sale includes selling price plus any shipping charged to the customer. Platform fee is calculated on total revenue. Annual profit assumes consistent monthly volume over 12 months. Adjust platform fee percentage to match your actual marketplace (e.g., Shopify, Etsy, Redbubble).</p>
      </div>
    </div>
  );
}
