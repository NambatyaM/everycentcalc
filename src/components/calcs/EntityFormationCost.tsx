'use client';

import { useState } from 'react';
import { ResultCard, ResultRow, SectionHeader } from '@/components/Results';
import { formatCurrency } from '@/lib/tax';

const STATE_FEES: Record<string, number> = {
  california: 80,
  delaware: 90,
  florida: 125,
  newyork: 200,
  texas: 300,
  other: 150,
};

const STATE_NAMES: Record<string, string> = {
  california: 'California',
  delaware: 'Delaware',
  florida: 'Florida',
  newyork: 'New York',
  texas: 'Texas',
  other: 'Other',
};

const ENTITY_ANNUAL_FEES: Record<string, number> = {
  llc: 200,
  scorp: 300,
  ccorp: 300,
};

const ENTITY_LEGAL_FEES: Record<string, number> = {
  llc: 800,
  scorp: 1200,
  ccorp: 2000,
};

const ENTITY_NAME: Record<string, string> = {
  llc: 'LLC',
  scorp: 'S-Corp',
  ccorp: 'C-Corp',
};

export default function EntityFormationCost() {
  const [state, setState] = useState('delaware');
  const [entityType, setEntityType] = useState('llc');
  const [annualRevenue, setAnnualRevenue] = useState('100000');
  const [registeredAgent, setRegisteredAgent] = useState('yes');

  const revenue = parseFloat(annualRevenue) || 0;
  const needsAgent = registeredAgent === 'yes';

  const filingFee = STATE_FEES[state];
  const agentCost = needsAgent ? 150 : 0;
  const legalFee = ENTITY_LEGAL_FEES[entityType];
  const formationCost = filingFee + agentCost + legalFee;

  const annualReportFee = ENTITY_ANNUAL_FEES[entityType];
  const agentAnnual = needsAgent ? 150 : 0;
  const annualCompliance = annualReportFee + agentAnnual;
  const payrollCost = entityType === 'scorp' ? 1000 : 0;
  const totalAnnual = annualCompliance + payrollCost;

  const threeYearTotal = formationCost + totalAnnual * 3;
  const monthlyCost = threeYearTotal / 36;

  return (
    <div>
      <SectionHeader title="Business Entity Formation Cost Calculator" subtitle="Estimate total costs to form and maintain your business entity" />

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>State</label>
            <select value={state} onChange={(e) => setState(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="california">California ($80)</option>
              <option value="delaware">Delaware ($90)</option>
              <option value="florida">Florida ($125)</option>
              <option value="newyork">New York ($200)</option>
              <option value="texas">Texas ($300)</option>
              <option value="other">Other ($150)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Entity Type</label>
            <select value={entityType} onChange={(e) => setEntityType(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="llc">LLC</option>
              <option value="scorp">S-Corporation</option>
              <option value="ccorp">C-Corporation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Annual Revenue Estimate ($)</label>
            <input type="number" value={annualRevenue} onChange={(e) => setAnnualRevenue(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Need Registered Agent?</label>
            <select value={registeredAgent} onChange={(e) => setRegisteredAgent(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 font-mono text-lg"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <option value="yes">Yes ($150/yr)</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <ResultCard icon="📝" label="Formation Cost" value={formatCurrency(formationCost)} highlight subtitle="One-time" />
        <ResultCard icon="📋" label="Annual Compliance" value={formatCurrency(totalAnnual)} subtitle="Per year" />
        <ResultCard icon="💰" label="3-Year Total Cost" value={formatCurrency(threeYearTotal)} highlight />
        <ResultCard icon="📅" label="Monthly Cost" value={formatCurrency(monthlyCost)} subtitle="Over 3 years" />
      </div>

      <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
        <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{ENTITY_NAME[entityType]} Cost Breakdown — {STATE_NAMES[state]}</div>
        <ResultRow label="State Filing Fee" value={formatCurrency(filingFee)} />
        <ResultRow label="Registered Agent (Year 1)" value={formatCurrency(agentCost)} />
        <ResultRow label="Legal / Filing Assistance" value={formatCurrency(legalFee)} />
        <ResultRow label="EIN (IRS)" value="$0" />
        <ResultRow label="Total Formation Cost" value={formatCurrency(formationCost)} bold />
        <ResultRow label="Annual Report Fee" value={formatCurrency(annualReportFee)} />
        <ResultRow label="Registered Agent (Annual)" value={formatCurrency(agentAnnual)} />
        {payrollCost > 0 && <ResultRow label="Payroll Processing" value={formatCurrency(payrollCost)} />}
        <ResultRow label="Total Annual Cost" value={formatCurrency(totalAnnual)} bold />
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand)' }}>
        <p className="text-sm" style={{ color: 'var(--brand)' }}>
          {entityType === 'scorp'
            ? `S-Corp includes estimated payroll processing costs ($1,000/yr). Total 3-year investment: ${formatCurrency(threeYearTotal)}, or ${formatCurrency(monthlyCost)}/month.`
            : `Total 3-year investment: ${formatCurrency(threeYearTotal)}, averaging ${formatCurrency(monthlyCost)}/month.`
          }
        </p>
      </div>

      <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p><strong>Disclaimer:</strong> Costs are estimates based on typical filing fees and standard service pricing. Actual costs vary by state, legal complexity, and service provider. Registered agent fees assume standard commercial service. Does not include potential state franchise taxes, annual reports with revenue-based fees, or expedited processing. Consult an attorney for precise estimates.</p>
      </div>
    </div>
  );
}
