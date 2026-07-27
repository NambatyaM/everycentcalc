'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function AmazonFbaProfitCalc() {
  const [salePrice, setSalePrice] = useState('25');
  const [productCost, setProductCost] = useState('8');
  const [referralFeePct, setReferralFeePct] = useState('15');
  const [fbaFee, setFbaFee] = useState('4.50');
  const [shippingToAmazon, setShippingToAmazon] = useState('1.50');
  const [monthlyStorage, setMonthlyStorage] = useState('50');
  const [unitsSold, setUnitsSold] = useState('200');

  const sp = parseFloat(salePrice) || 0;
  const pc = parseFloat(productCost) || 0;
  const rfp = parseFloat(referralFeePct) || 0;
  const fbaf = parseFloat(fbaFee) || 0;
  const sta = parseFloat(shippingToAmazon) || 0;
  const ms = parseFloat(monthlyStorage) || 0;
  const us = parseFloat(unitsSold) || 0;

  const referralFee = sp * (rfp / 100);
  const storagePerUnit = us > 0 ? ms / us : 0;
  const totalCostPerUnit = pc + referralFee + fbaf + sta + storagePerUnit;
  const profitPerUnit = sp - totalCostPerUnit;
  const monthlyProfit = profitPerUnit * us;
  const totalMonthlyCosts = totalCostPerUnit * us;
  const roiInput = pc + sta;
  const roi = roiInput > 0 ? (profitPerUnit / roiInput) * 100 : 0;

  return (
    <div>
      <SectionHeader title="Amazon FBA Profit Calculator" subtitle="Calculate your true profit per unit with all FBA fees" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Sale Price ($)</label>
          <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Product Cost ($)</label>
          <input type="number" value={productCost} onChange={(e) => setProductCost(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Referral Fee (%)</label>
            <input type="number" value={referralFeePct} onChange={(e) => setReferralFeePct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>FBA Fulfillment Fee ($)</label>
            <input type="number" value={fbaFee} onChange={(e) => setFbaFee(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Shipping to Amazon ($)</label>
            <input type="number" value={shippingToAmazon} onChange={(e) => setShippingToAmazon(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Storage Cost ($)</label>
            <input type="number" value={monthlyStorage} onChange={(e) => setMonthlyStorage(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Units Sold per Month</label>
          <input type="number" value={unitsSold} onChange={(e) => setUnitsSold(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💰" label="Profit per Unit" value={`$${profitPerUnit.toFixed(2)}`} highlight />
        <ResultCard icon="📈" label="Monthly Profit" value={`$${monthlyProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} highlight />
        <ResultCard icon="📊" label="ROI" value={`${roi.toFixed(1)}%`} />
        <ResultCard icon="📦" label="Total Monthly Costs" value={`$${totalMonthlyCosts.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Fee Breakdown (Per Unit)</p>
        <ResultRow label="Product Cost" value={`$${pc.toFixed(2)}`} />
        <ResultRow label={`Referral Fee (${rfp}%)`} value={`$${referralFee.toFixed(2)}`} />
        <ResultRow label="FBA Fulfillment Fee" value={`$${fbaf.toFixed(2)}`} />
        <ResultRow label="Shipping to Amazon" value={`$${sta.toFixed(2)}`} />
        <ResultRow label="Storage per Unit" value={`$${storagePerUnit.toFixed(2)}`} />
        <ResultRow label="Total Cost per Unit" value={`$${totalCostPerUnit.toFixed(2)}`} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Monthly Summary</p>
        <ResultRow label="Units Sold" value={us.toLocaleString()} />
        <ResultRow label="Total Revenue" value={`$${(sp * us).toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Total Costs" value={`$${totalMonthlyCosts.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />
        <ResultRow label="Monthly Profit" value={`$${monthlyProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} bold />
        <ResultRow label="ROI (on product + shipping)" value={`${roi.toFixed(1)}%`} />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Amazon referral fees are typically 15% for most categories. FBA fulfillment fees vary by product size and weight — enter your actual fee. Storage costs are divided evenly across units sold. ROI is calculated on your upfront investment (product cost + shipping to Amazon).</p>
      </div>
    </div>
  );
}
