'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function EtsyProfitCalc() {
  const [salePrice, setSalePrice] = useState('25');
  const [shippingCharged, setShippingCharged] = useState('5');
  const [listingFee, setListingFee] = useState('0.20');
  const [transactionFee, setTransactionFee] = useState('6.5');
  const [paymentProcessing, setPaymentProcessing] = useState('3');
  const [paymentProcessingFlat, setPaymentProcessingFlat] = useState('0.25');
  const [materialCost, setMaterialCost] = useState('5');
  const [shippingCost, setShippingCost] = useState('4');
  const [otherExpenses, setOtherExpenses] = useState('1');

  const sp = parseFloat(salePrice) || 0;
  const sc = parseFloat(shippingCharged) || 0;
  const lf = parseFloat(listingFee) || 0;
  const tf = parseFloat(transactionFee) || 0;
  const pp = parseFloat(paymentProcessing) || 0;
  const ppf = parseFloat(paymentProcessingFlat) || 0;
  const mc = parseFloat(materialCost) || 0;
  const shipC = parseFloat(shippingCost) || 0;
  const oe = parseFloat(otherExpenses) || 0;

  const totalOrderValue = sp + sc;
  const etsyFees = lf + totalOrderValue * (tf / 100) + totalOrderValue * (pp / 100) + ppf;
  const totalCosts = mc + shipC + oe + etsyFees;
  const netProfit = totalOrderValue - totalCosts;
  const profitMargin = totalOrderValue > 0 ? (netProfit / totalOrderValue) * 100 : 0;
  const money = (n: number) => `${n < 0 ? '-' : ''}$${Math.abs(n).toFixed(2)}`;

  return (
    <div>
      <SectionHeader title="Etsy Profit Margin Calculator" subtitle="Calculate your true profit after all Etsy fees" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-sale-price">Sale Price ($)</label>
          <input id="calc-sale-price"  type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-shipping-charged-to-customer">Shipping Charged to Customer ($)</label>
          <input id="calc-shipping-charged-to-customer"  type="number" value={shippingCharged} onChange={(e) => setShippingCharged(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-listing-fee">Listing Fee ($)</label>
            <input id="calc-listing-fee"  type="number" value={listingFee} onChange={(e) => setListingFee(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-transaction-fee">Transaction Fee (%)</label>
            <input id="calc-transaction-fee"  type="number" value={transactionFee} onChange={(e) => setTransactionFee(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-payment-processing">Payment Processing (%)</label>
            <input id="calc-payment-processing"  type="number" value={paymentProcessing} onChange={(e) => setPaymentProcessing(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-payment-processing-flat-fee">Payment Processing Flat Fee ($)</label>
          <input id="calc-payment-processing-flat-fee"  type="number" value={paymentProcessingFlat} onChange={(e) => setPaymentProcessingFlat(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-material-cost">Material Cost ($)</label>
            <input id="calc-material-cost"  type="number" value={materialCost} onChange={(e) => setMaterialCost(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-shipping-cost">Shipping Cost ($)</label>
            <input id="calc-shipping-cost"  type="number" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-other-expenses">Other Expenses ($)</label>
            <input id="calc-other-expenses"  type="number" value={otherExpenses} onChange={(e) => setOtherExpenses(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💰" label="Net Profit" value={money(netProfit)} highlight />
        <ResultCard icon="📊" label="Profit Margin" value={`${profitMargin.toFixed(1)}%`} highlight />
        <ResultCard icon="🛒" label="Total Etsy Fees" value={money(etsyFees)} />
        <ResultCard icon="📦" label="Total Costs" value={money(totalCosts)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Fee Breakdown</p>
        <ResultRow label="Listing Fee" value={`$${lf.toFixed(2)}`} />
        <ResultRow label={`Transaction Fee (${tf}%)`} value={`$${(totalOrderValue * (tf / 100)).toFixed(2)}`} />
        <ResultRow label={`Payment Processing (${pp}%)`} value={`$${(totalOrderValue * (pp / 100)).toFixed(2)}`} />
        <ResultRow label="Payment Processing Flat" value={`$${ppf.toFixed(2)}`} />
        <ResultRow label="Total Etsy Fees" value={`$${etsyFees.toFixed(2)}`} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Profit Calculation</p>
        <ResultRow label="Sale Price" value={`$${sp.toFixed(2)}`} />
        <ResultRow label="Shipping Charged" value={`$${sc.toFixed(2)}`} />
        <ResultRow label="Total Revenue" value={`$${totalOrderValue.toFixed(2)}`} bold />
        <ResultRow label="Material Cost" value={`-$${mc.toFixed(2)}`} />
        <ResultRow label="Shipping Cost" value={`-$${shipC.toFixed(2)}`} />
        <ResultRow label="Other Expenses" value={`-$${oe.toFixed(2)}`} />
        <ResultRow label="Etsy Fees" value={`-${money(etsyFees)}`} />
        <ResultRow label="Net Profit" value={money(netProfit)} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Etsy charges a $0.20 listing fee, 6.5% transaction fee on sale price + shipping charged, and payment processing of 3% + $0.25. Fees are calculated on the total order value (sale price + shipping charged to customer). Adjust rates for your specific Etsy plan.</p>
      </div>
    </div>
  );
}
