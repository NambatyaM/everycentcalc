'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';

export default function ShopifyProfitCalc() {
  const [salePrice, setSalePrice] = useState('50');
  const [productCost, setProductCost] = useState('15');
  const [feePct, setFeePct] = useState('2.9');
  const [flatFee, setFlatFee] = useState('0.30');
  const [shippingCost, setShippingCost] = useState('5');
  const [marketingCost, setMarketingCost] = useState('3');
  const [otherExpenses, setOtherExpenses] = useState('2');

  const sp = parseFloat(salePrice) || 0;
  const pc = parseFloat(productCost) || 0;
  const fp = parseFloat(feePct) || 0;
  const ff = parseFloat(flatFee) || 0;
  const sc = parseFloat(shippingCost) || 0;
  const mc = parseFloat(marketingCost) || 0;
  const oe = parseFloat(otherExpenses) || 0;

  const shopifyFee = sp * (fp / 100) + ff;
  const totalCosts = pc + shopifyFee + sc + mc + oe;
  const netProfit = sp - totalCosts;
  const profitMargin = sp > 0 ? (netProfit / sp) * 100 : 0;
  const money = (n: number) => `${n < 0 ? '-' : ''}$${Math.abs(n).toFixed(2)}`;

  return (
    <div>
      <SectionHeader title="Shopify Profit Margin Calculator" subtitle="Calculate your true profit per sale on Shopify" />

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-sale-price">Sale Price ($)</label>
          <input id="calc-sale-price"  type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-product-cost">Product Cost ($)</label>
          <input id="calc-product-cost"  type="number" value={productCost} onChange={(e) => setProductCost(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-shopify-fee">Shopify Fee (%)</label>
            <input id="calc-shopify-fee"  type="number" value={feePct} onChange={(e) => setFeePct(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-shopify-flat-fee">Shopify Flat Fee ($)</label>
            <input id="calc-shopify-flat-fee"  type="number" value={flatFee} onChange={(e) => setFlatFee(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-shipping-cost">Shipping Cost ($)</label>
          <input id="calc-shipping-cost"  type="number" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
            style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }} htmlFor="calc-marketing-cost-per-sale">Marketing Cost per Sale ($)</label>
          <input id="calc-marketing-cost-per-sale"  type="number" value={marketingCost} onChange={(e) => setMarketingCost(e.target.value)}
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

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ResultCard icon="💰" label="Net Profit" value={money(netProfit)} highlight />
        <ResultCard icon="📊" label="Profit Margin" value={`${profitMargin.toFixed(1)}%`} highlight />
        <ResultCard icon="🛒" label="Shopify Fee" value={money(shopifyFee)} />
        <ResultCard icon="📦" label="Total Costs" value={money(totalCosts)} />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Cost Breakdown</p>
        <ResultRow label="Sale Price" value={`$${sp.toFixed(2)}`} />
        <ResultRow label="Product Cost" value={`-$${pc.toFixed(2)}`} />
        <ResultRow label={`Shopify Fee (${fp}% + $${ff.toFixed(2)})`} value={`-$${shopifyFee.toFixed(2)}`} />
        <ResultRow label="Shipping Cost" value={`-$${sc.toFixed(2)}`} />
        <ResultRow label="Marketing Cost" value={`-$${mc.toFixed(2)}`} />
        <ResultRow label="Other Expenses" value={`-${money(oe)}`} />
        <ResultRow label="Net Profit" value={money(netProfit)} bold />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Profit per $100 Revenue</p>
        <ResultRow label="Revenue" value="$100.00" />
        <ResultRow label="Product Cost" value={sp > 0 ? `-$${((pc / sp) * 100).toFixed(2)}` : '$0.00'} />
        <ResultRow label="Shopify Fees" value={sp > 0 ? `-$${((shopifyFee / sp) * 100).toFixed(2)}` : '$0.00'} />
        <ResultRow label="Shipping" value={sp > 0 ? `-$${((sc / sp) * 100).toFixed(2)}` : '$0.00'} />
        <ResultRow label="Marketing" value={sp > 0 ? `-$${((mc / sp) * 100).toFixed(2)}` : '$0.00'} />
        <ResultRow label="Other" value={sp > 0 ? `-$${((oe / sp) * 100).toFixed(2)}` : '$0.00'} />
        <ResultRow label="Net Profit" value={`$${profitMargin.toFixed(2)}`} bold />
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>Shopify Payments charges 2.9% + $0.30 per transaction on the Basic plan. Additional payment gateways may charge more. Marketing cost per sale is your average customer acquisition cost (ad spend / orders). Adjust for your specific Shopify plan and expenses.</p>
      </div>
    </div>
  );
}
