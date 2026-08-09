const BRAND = '#4F46E5';
const BRAND_LIGHT = '#EEF2FF';
const TEXT = '#1F2937';
const MUTED = '#6B7280';
const GREEN = '#10B981';
const AMBER = '#F59E0B';
const RED = '#EF4444';
const BLUE = '#3B82F6';
const VIOLET = '#8B5CF6';

interface SvgProps {
  caption?: string;
}

function Wrap({ title, caption, children }: { title: string; caption?: string; children: React.ReactNode }) {
  return (
    <figure className="my-6">
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--bg-tertiary)' }}>
        {children}
      </div>
      {caption && (
        <figcaption className="text-xs text-center mt-2" style={{ color: 'var(--text-muted)' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function SeTaxBreakdownSvg({ caption }: SvgProps) {
  const cx = 120;
  const cy = 110;
  const r = 70;
  const start = -Math.PI / 2;
  const arc = (pct: number, from: number) => {
    const a0 = from;
    const a1 = from + pct * 2 * Math.PI;
    const large = pct > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const path = `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`;
    return path;
  };
  const ssStart = start;
  const medStart = ssStart + 0.8105 * 2 * Math.PI;
  const addStart = medStart + 0.1895 * 2 * Math.PI;
  return (
    <Wrap title="self employment tax breakdown" caption={caption}>
      <svg viewBox="0 0 320 220" role="img" aria-label="Breakdown of the 15.3% self employment tax rate" className="w-full h-auto">
        <path d={arc(0.8105, ssStart)} fill={BLUE} />
        <path d={arc(0.1895, medStart)} fill={GREEN} />
        <path d={arc(0, addStart)} fill={AMBER} />
        <text x={cx} y={cy} textAnchor="middle" fontSize="20" fontWeight="700" fill={TEXT}>15.3%</text>
        <text x={cx} y={cy + 18} textAnchor="middle" fontSize="10" fill={MUTED}>total SE tax</text>
        <g fontSize="11">
          <rect x="215" y="52" width="12" height="12" rx="2" fill={BLUE} />
          <text x="233" y="62" fill={TEXT} fontWeight="600">Social Security</text>
          <text x="233" y="76" fill={MUTED}>12.4% up to cap</text>
          <rect x="215" y="92" width="12" height="12" rx="2" fill={GREEN} />
          <text x="233" y="102" fill={TEXT} fontWeight="600">Medicare</text>
          <text x="233" y="116" fill={MUTED}>2.9% no cap</text>
          <rect x="215" y="132" width="12" height="12" rx="2" fill={AMBER} />
          <text x="233" y="142" fill={TEXT} fontWeight="600">Extra Medicare</text>
          <text x="233" y="156" fill={MUTED}>+0.9% high earners</text>
        </g>
        <text x="120" y="200" textAnchor="middle" fontSize="9" fill={MUTED}>Net profit × 0.9235 × 15.3%</text>
      </svg>
    </Wrap>
  );
}

export function SeTaxStepsSvg({ caption }: SvgProps) {
  const steps = [
    { x: 40, y: 50, t: '1. Total income', d: 'Add up every 1099 payment', color: BLUE },
    { x: 40, y: 110, t: '2. Minus expenses', d: 'Subtract business costs', color: GREEN },
    { x: 40, y: 170, t: '3. Net profit', d: 'This is what is taxed', color: AMBER },
  ];
  return (
    <Wrap title="how to calculate self employment tax" caption={caption}>
      <svg viewBox="0 0 320 220" role="img" aria-label="Four step flow for calculating self employment tax" className="w-full h-auto">
        {steps.map((s, i) => (
          <g key={i}>
            <rect x="24" y={s.y - 26} width="192" height="52" rx="10" fill={s.color} opacity="0.12" stroke={s.color} strokeWidth="1.5" />
            <text x="40" y={s.y - 8} fontSize="11" fontWeight="700" fill={s.color}>{s.t}</text>
            <text x="40" y={s.y + 10} fontSize="10" fill={TEXT}>{s.d}</text>
            {i < steps.length - 1 && (
              <path d={`M 120 ${s.y + 26} L 120 ${s.y + 32}`} stroke={MUTED} strokeWidth="2" />
            )}
          </g>
        ))}
        <g>
          <rect x="24" y="196" width="192" height="40" rx="10" fill={TEXT} />
          <text x="40" y="213" fontSize="11" fontWeight="700" fill="#fff">4. × 0.9235 × 15.3%</text>
          <text x="40" y="227" fontSize="10" fill="#D1D5DB">your SE tax bill</text>
        </g>
        <text x="120" y="190" textAnchor="middle" fontSize="18">⬇</text>
        <rect x="236" y="30" width="64" height="200" rx="10" fill={BRAND_LIGHT} stroke={BRAND} strokeWidth="1.5" />
        <text x="268" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill={BRAND}>Remember</text>
        <text x="268" y="120" textAnchor="middle" fontSize="9" fill={TEXT}>Only net profit</text>
        <text x="268" y="134" textAnchor="middle" fontSize="9" fill={TEXT}>over $400 is</text>
        <text x="268" y="148" textAnchor="middle" fontSize="9" fill={TEXT}>taxable</text>
      </svg>
    </Wrap>
  );
}

export function QuarterlyTimelineSvg({ caption }: SvgProps) {
  const pts = [
    { x: 60, d: 'Apr 15', q: 'Q1' },
    { x: 120, d: 'Jun 15', q: 'Q2' },
    { x: 180, d: 'Sep 15', q: 'Q3' },
    { x: 240, d: 'Jan 15', q: 'Q4' },
  ];
  return (
    <Wrap title="quarterly estimated tax deadlines" caption={caption}>
      <svg viewBox="0 0 320 200" role="img" aria-label="Timeline of the four 2026 quarterly estimated tax deadlines" className="w-full h-auto">
        <line x1="30" y1="110" x2="290" y2="110" stroke={MUTED} strokeWidth="3" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy="110" r="8" fill={BRAND} />
            <rect x={p.x - 34} y="30" width="68" height="46" rx="8" fill={BRAND_LIGHT} stroke={BRAND} strokeWidth="1.5" />
            <text x={p.x} y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill={BRAND}>{p.q}</text>
            <text x={p.x} y="66" textAnchor="middle" fontSize="10" fontWeight="600" fill={TEXT}>{p.d}</text>
            <text x={p.x} y="135" textAnchor="middle" fontSize="9" fill={MUTED}>2026</text>
            <text x={p.x} y="150" textAnchor="middle" fontSize="9" fill={MUTED}>deadline</text>
          </g>
        ))}
        <text x="160" y="185" textAnchor="middle" fontSize="9" fill={MUTED}>Deadlines shift to the next business day on weekends and holidays</text>
      </svg>
    </Wrap>
  );
}

export function SafeHarborSvg({ caption }: SvgProps) {
  return (
    <Wrap title="safe harbor rule" caption={caption}>
      <svg viewBox="0 0 320 230" role="img" aria-label="Safe harbor rule comparison for estimated tax payments" className="w-full h-auto">
        <rect x="30" y="20" width="260" height="70" rx="12" fill={BLUE} opacity="0.12" stroke={BLUE} strokeWidth="1.5" />
        <text x="160" y="48" textAnchor="middle" fontSize="11" fontWeight="700" fill={BLUE}>Your last-year AGI</text>
        <text x="160" y="70" textAnchor="middle" fontSize="10" fill={TEXT}>Under $150,000 → pay 100%</text>
        <text x="160" y="84" textAnchor="middle" fontSize="10" fill={TEXT}>Over $150,000 → pay 110%</text>
        <path d="M 160 92 L 160 102" stroke={MUTED} strokeWidth="2" />
        <rect x="30" y="104" width="260" height="70" rx="12" fill={GREEN} opacity="0.12" stroke={GREEN} strokeWidth="1.5" />
        <text x="160" y="132" textAnchor="middle" fontSize="11" fontWeight="700" fill={GREEN}>Target: last year's tax bill</text>
        <text x="160" y="152" textAnchor="middle" fontSize="10" fill={TEXT}>Paid across 4 deadlines</text>
        <text x="160" y="166" textAnchor="middle" fontSize="10" fill={TEXT}>No underpayment penalty</text>
        <rect x="40" y="192" width="240" height="28" rx="14" fill={BRAND} />
        <text x="160" y="211" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Alternative: 90% of this year's tax</text>
      </svg>
    </Wrap>
  );
}

export function RateFormulaSvg({ caption }: SvgProps) {
  return (
    <Wrap title="freelance hourly rate formula" caption={caption}>
      <svg viewBox="0 0 320 210" role="img" aria-label="Formula for calculating a minimum freelance hourly rate" className="w-full h-auto">
        <rect x="20" y="24" width="130" height="44" rx="10" fill={BLUE} opacity="0.14" stroke={BLUE} strokeWidth="1.5" />
        <text x="85" y="42" textAnchor="middle" fontSize="10" fontWeight="700" fill={BLUE}>Target income</text>
        <text x="85" y="58" textAnchor="middle" fontSize="10" fill={MUTED}>$75,000</text>
        <rect x="170" y="24" width="130" height="44" rx="10" fill={AMBER} opacity="0.14" stroke={AMBER} strokeWidth="1.5" />
        <text x="235" y="42" textAnchor="middle" fontSize="10" fontWeight="700" fill={AMBER}>+ Expenses & taxes</text>
        <text x="235" y="58" textAnchor="middle" fontSize="10" fill={MUTED}>$5,000 + $11,475</text>
        <text x="160" y="86" textAnchor="middle" fontSize="18">⬇</text>
        <rect x="20" y="92" width="280" height="40" rx="10" fill={TEXT} />
        <text x="160" y="118" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Total needed: $95,000 / year</text>
        <text x="160" y="150" textAnchor="middle" fontSize="18">÷</text>
        <rect x="95" y="158" width="130" height="40" rx="10" fill={BRAND} opacity="0.14" stroke={BRAND} strokeWidth="1.5" />
        <text x="160" y="177" textAnchor="middle" fontSize="10" fontWeight="700" fill={BRAND}>Billable hours</text>
        <text x="160" y="191" textAnchor="middle" fontSize="10" fill={MUTED}>1,600 / year</text>
      </svg>
    </Wrap>
  );
}

export function W2VsFreelanceSvg({ caption }: SvgProps) {
  const bars = [
    { label: 'W-2 cost', value: 60, color: BLUE, amount: '$95,565' },
    { label: 'Freelancer cost', value: 60, color: GREEN, amount: '$95,565' },
  ];
  return (
    <Wrap title="W2 vs freelancer true cost" caption={caption}>
      <svg viewBox="0 0 320 210" role="img" aria-label="Comparison of the true cost of a W-2 employee versus a freelancer" className="w-full h-auto">
        {bars.map((b, i) => (
          <g key={i}>
            <rect x="20" y={40 + i * 80} width="160" height="34" rx="8" fill="#E5E7EB" />
            <rect x="20" y={40 + i * 80} width={b.value * 2.4} height="34" rx="8" fill={b.color} />
            <text x="30" y={62 + i * 80} fontSize="11" fontWeight="700" fill="#fff">{b.label}</text>
            <text x="196" y={62 + i * 80} fontSize="12" fontWeight="700" fill={TEXT}>{b.amount}</text>
          </g>
        ))}
        <text x="160" y="180" textAnchor="middle" fontSize="10" fill={MUTED}>Same true cost — the freelancer pays both halves of FICA</text>
        <text x="160" y="198" textAnchor="middle" fontSize="10" fontWeight="700" fill={TEXT}>That is why your rate must be higher</text>
      </svg>
    </Wrap>
  );
}

export function BreakEvenSvg({ caption }: SvgProps) {
  const line = 'M 40 180 L 280 60';
  return (
    <Wrap title="rent vs buy break even point" caption={caption}>
      <svg viewBox="0 0 320 220" role="img" aria-label="Chart showing when buying beats renting over time" className="w-full h-auto">
        <line x1="40" y1="20" x2="40" y2="185" stroke={MUTED} strokeWidth="1.5" />
        <line x1="40" y1="185" x2="285" y2="185" stroke={MUTED} strokeWidth="1.5" />
        <path d="M 40 150 C 80 148, 120 152, 160 140 S 240 80, 280 60" fill="none" stroke={GREEN} strokeWidth="3" />
        <text x="225" y="55" fontSize="10" fontWeight="700" fill={GREEN}>Buying</text>
        <path d="M 40 90 C 80 92, 120 96, 160 100 S 240 112, 280 118" fill="none" stroke={BLUE} strokeWidth="3" />
        <text x="238" y="128" fontSize="10" fontWeight="700" fill={BLUE}>Renting</text>
        <circle cx="160" cy="100" r="6" fill={BRAND} stroke="#fff" strokeWidth="2" />
        <text x="160" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill={BRAND}>break-even</text>
        <text x="160" y="78" textAnchor="middle" fontSize="9" fill={MUTED}>~5-7 years</text>
        <text x="40" y="205" fontSize="9" fill={MUTED}>Year 0</text>
        <text x="255" y="205" fontSize="9" fill={MUTED}>Year 10</text>
        <text x="160" y="214" textAnchor="middle" fontSize="9" fill={MUTED}>Stay longer than the break-even date and buying wins</text>
      </svg>
    </Wrap>
  );
}

export function FivePercentRuleSvg({ caption }: SvgProps) {
  return (
    <Wrap title="the 5 percent rule" caption={caption}>
      <svg viewBox="0 0 320 200" role="img" aria-label="The five percent rule for deciding rent versus buy" className="w-full h-auto">
        <rect x="30" y="30" width="260" height="64" rx="12" fill={BLUE} opacity="0.12" stroke={BLUE} strokeWidth="1.5" />
        <text x="160" y="56" textAnchor="middle" fontSize="12" fontWeight="700" fill={BLUE}>True cost of owning</text>
        <text x="160" y="80" textAnchor="middle" fontSize="11" fill={TEXT}>≈ 5% of home value per year</text>
        <path d="M 160 98 L 160 108" stroke={MUTED} strokeWidth="2" />
        <rect x="30" y="110" width="120" height="60" rx="12" fill={GREEN} opacity="0.12" stroke={GREEN} strokeWidth="1.5" />
        <text x="90" y="136" textAnchor="middle" fontSize="10" fontWeight="700" fill={GREEN}>Rent &lt; 5%</text>
        <text x="90" y="154" textAnchor="middle" fontSize="10" fill={TEXT}>→ Keep renting</text>
        <rect x="170" y="110" width="120" height="60" rx="12" fill={AMBER} opacity="0.14" stroke={AMBER} strokeWidth="1.5" />
        <text x="230" y="136" textAnchor="middle" fontSize="10" fontWeight="700" fill={AMBER}>Rent &gt; 5%</text>
        <text x="230" y="154" textAnchor="middle" fontSize="10" fill={TEXT}>→ Buying usually wins</text>
      </svg>
    </Wrap>
  );
}

export function GuideSvg({ name, caption }: { name: string; caption?: string }) {
  switch (name) {
    case 'se-tax-breakdown':
      return <SeTaxBreakdownSvg caption={caption} />;
    case 'se-tax-steps':
      return <SeTaxStepsSvg caption={caption} />;
    case 'quarterly-timeline':
      return <QuarterlyTimelineSvg caption={caption} />;
    case 'safe-harbor':
      return <SafeHarborSvg caption={caption} />;
    case 'rate-formula':
      return <RateFormulaSvg caption={caption} />;
    case 'w2-vs-freelance':
      return <W2VsFreelanceSvg caption={caption} />;
    case 'break-even':
      return <BreakEvenSvg caption={caption} />;
    case 'five-percent-rule':
      return <FivePercentRuleSvg caption={caption} />;
    default:
      return null;
  }
}