'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

export default function AmazonFbaProfit() {
  const [sellingPrice, setSellingPrice] = useState('30');
  const [productCost, setProductCost] = useState('8');
  const [fbaFees, setFbaFees] = useState('5');
  const [shippingToAmazon, setShippingToAmazon] = useState('2');
  const [monthlyUnits, setMonthlyUnits] = useState('200');
  const [adCostPerUnit, setAdCostPerUnit] = useState('3');

  const price = parseFloat(sellingPrice) || 0;
  const cost = parseFloat(productCost) || 0;
  const fba = parseFloat(fbaFees) || 0;
  const shipping = parseFloat(shippingToAmazon) || 0;
  const units = parseFloat(monthlyUnits) || 0;
  const ads = parseFloat(adCostPerUnit) || 0;

  const profitPerUnit = price - cost - fba - shipping - ads;
  const monthlyProfit = profitPerUnit * units;
  const annualProfit = monthlyProfit * 12;
  const margin = price > 0 ? (profitPerUnit / price) * 100 : 0;
  const totalCostPerUnit = cost + fba + shipping + ads;

  return (
    <div>
      <SectionHeader title="Amazon FBA Profit Calculator" subtitle="Calculate your true profit per unit with all FBA fees and advertising" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-selling-price">Selling Price ($)</label>
            <input id="calc-selling-price"  type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-product-cost">Product Cost ($)</label>
            <input id="calc-product-cost"  type="number" value={productCost} onChange={(e) => setProductCost(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-fba-fees">FBA Fees ($)</label>
            <input id="calc-fba-fees"  type="number" value={fbaFees} onChange={(e) => setFbaFees(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-shipping-to-amazon">Shipping to Amazon ($)</label>
            <input id="calc-shipping-to-amazon"  type="number" value={shippingToAmazon} onChange={(e) => setShippingToAmazon(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-advertising-cost-per-unit">Advertising Cost per Unit ($)</label>
            <input id="calc-advertising-cost-per-unit"  type="number" value={adCostPerUnit} onChange={(e) => setAdCostPerUnit(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-monthly-units-sold">Monthly Units Sold</label>
            <input id="calc-monthly-units-sold"  type="number" value={monthlyUnits} onChange={(e) => setMonthlyUnits(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <ResultCard icon="💰" label="Profit per Unit" value={formatCurrency(profitPerUnit)} highlight />
        <ResultCard icon="📅" label="Monthly Profit" value={formatCurrency(monthlyProfit)} highlight />
        <ResultCard icon="📈" label="Annual Profit" value={formatCurrency(annualProfit)} />
        <ResultCard icon="📊" label="Profit Margin" value={`${margin.toFixed(1)}%`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Cost Breakdown (Per Unit)</p>
        <ResultRow label="Product Cost" value={formatCurrency(cost)} />
        <ResultRow label="FBA Fees" value={formatCurrency(fba)} />
        <ResultRow label="Shipping to Amazon" value={formatCurrency(shipping)} />
        <ResultRow label="Advertising Cost" value={formatCurrency(ads)} />
        <ResultRow label="Total Cost per Unit" value={formatCurrency(totalCostPerUnit)} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Monthly Summary</p>
        <ResultRow label="Units Sold" value={units.toLocaleString()} />
        <ResultRow label="Total Revenue" value={formatCurrency(price * units)} />
        <ResultRow label="Total Costs" value={formatCurrency(totalCostPerUnit * units)} />
        <ResultRow label="Monthly Profit" value={formatCurrency(monthlyProfit)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>FBA fees vary by product size and weight — enter your actual fee. Advertising cost per unit should be calculated as your total ad spend divided by units sold. Profit margin = profit per unit ÷ selling price × 100. Adjust fees to match your specific product category.</p>
      </div>
    </div>
  );
}
