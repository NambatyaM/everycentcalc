export interface CalculatorImage {
  src: string;
  alt: string;
}

const ALT_MAP: Record<string, string> = {
  'self-employment-tax-calculator':
    'Self employment tax calculator 2026 showing how much 1099 freelancers owe in SE tax',
  'quarterly-tax-calculator':
    'Quarterly tax calculator 2026 — figure out how much to pay each estimated tax deadline',
  'side-hustle-tax-calculator':
    'Side hustle tax calculator showing how much tax you owe on side income with a W-2 job',
  'freelance-income-tax-calculator':
    'Freelance income tax calculator 2026 for 1099 workers — know your federal tax rate',
  'freelance-tax-deduction-calculator':
    'Freelance tax deduction calculator showing how much business deductions save you',
  'quarterly-tax-deadline-calculator':
    'Quarterly tax deadline calculator with IRS due dates and underpayment penalty amounts',
  'quarterly-tax-penalty-calculator':
    'Quarterly tax penalty calculator estimating IRS underpayment penalties in 2026',
  'freelancer-effective-tax-rate-calculator':
    'Freelancer effective tax rate calculator comparing marginal vs effective tax rate',
  'self-employed-health-insurance-deduction-calculator':
    'Self employed health insurance deduction calculator showing your tax savings on premiums',
  'home-office-deduction-calculator':
    'Home office deduction calculator comparing the simplified vs regular IRS methods',
  '1099-income-tax-calculator':
    '1099 income tax calculator 2026 showing how much tax on 1099-NEC income',
  'se-tax-vs-fica-calculator':
    'Self employment tax vs FICA calculator comparing what freelancers and W-2 employees pay',
  'freelancer-qbi-deduction-calculator':
    'Freelancer QBI deduction calculator for the Section 199A qualified business income deduction',
  'freelancer-health-insurance-calculator':
    'Freelancer health insurance cost calculator with ACA premium and tax deduction estimates',
  'tax-extension-calculator':
    'Tax extension calculator with Form 4868 details and October 15 filing deadline',
  'freelancer-rate-calculator':
    'Freelancer rate calculator showing how much to charge per hour to hit your income goal',
  'freelancer-profitability-calculator':
    'Freelancer profitability calculator showing your true profit after expenses and taxes',
  'freelancer-retirement-savings-calculator':
    'Freelancer retirement savings calculator with SEP IRA and Solo 401k contribution limits',
  'freelance-project-rate-calculator':
    'Freelance project rate calculator showing how to price projects for profit',
  'freelancer-savings-rate-calculator':
    'Freelancer savings rate calculator showing how much to save for taxes and emergencies',
  'freelance-hourly-vs-project-calculator':
    'Freelance hourly vs project pricing calculator showing which earns you more money',
  'freelance-net-worth-calculator':
    'Freelancer net worth calculator tracking assets minus liabilities for financial health',
  'client-billing-calculator':
    'Client billing calculator comparing retainer vs hourly rates for freelancers',
  'salary-to-hourly-calculator':
    'Salary to hourly calculator converting annual salary into hourly, weekly and monthly pay',
  'etsy-profit-calculator':
    'Etsy profit calculator showing real profit after Etsy fees shipping and taxes',
  'rideshare-driver-calculator':
    'Rideshare driver calculator showing Uber and Lyft hourly earnings after expenses',
  'freelance-vs-employment-calculator':
    'Freelance vs employment calculator comparing salary and 1099 income after taxes',
  'freelance-debt-payoff-calculator':
    'Freelance debt payoff calculator with debt snowball and avalanche strategies',
  'time-tracking-value-calculator':
    'Time tracking value calculator showing how much your freelance time is really worth',
  'doordash-profit-calculator':
    'DoorDash profit calculator showing what drivers actually make after gas and taxes',
  'uber-eats-profit-calculator':
    'Uber Eats profit calculator showing real driver hourly rate after expenses',
  'print-on-demand-profit-calculator':
    'Print on demand profit calculator for t-shirt and POD sellers showing real margins',
  'amazon-fba-profit-calculator':
    'Amazon FBA profit calculator showing profit per unit after fees and shipping',
  'youtube-revenue-calculator':
    'YouTube revenue calculator showing how much YouTubers make per 1000 views',
  'online-course-profit-calculator':
    'Online course profit calculator showing how much course creators really make',
  'freelance-writer-rate-calculator':
    'Freelance writer rate calculator showing per word and per article pricing',
  'freelance-graphic-designer-rate-calculator':
    'Freelance graphic designer rate calculator for logo design and project pricing',
  'podcast-income-calculator':
    'Podcast income calculator showing how much podcasters make per episode',
  'social-media-manager-rate-calculator':
    'Social media manager rate calculator showing monthly retainer pricing',
  'content-creator-revenue-calculator':
    'Content creator revenue calculator for influencer and YouTube income breakdown',
  'is-side-hustle-worth-it-calculator':
    'Is my side hustle worth it calculator comparing hourly earnings and time value',
  'shopify-profit-calculator':
    'Shopify profit margin calculator showing fees and profit per sale',
  'take-home-pay-calculator':
    'Take home pay calculator 2026 showing net pay after federal taxes and deductions',
  'rent-vs-buy-calculator':
    'Rent vs buy calculator 2026 showing whether renting or buying a home costs less',
  'rental-property-calculator':
    'Rental property calculator showing cash flow cap rate and ROI for investors',
  'house-flipping-calculator':
    'House flipping calculator using the 70 percent rule for fix and flip profits',
  'rental-cash-flow-calculator':
    'Rental cash flow calculator for landlords showing monthly positive cash flow',
  'mortgage-payment-calculator':
    'Mortgage payment calculator 2026 including taxes and insurance breakdown',
  'house-affordability-calculator':
    'House affordability calculator showing how much house you can afford on your salary',
  'real-estate-agent-commission-calculator':
    'Real estate agent commission calculator showing realtor fees and net proceeds',
  'rental-yield-calculator':
    'Rental yield calculator comparing gross and net yield for investment properties',
  'mortgage-interest-calculator':
    'Mortgage interest calculator showing total interest paid over 30 years',
  'home-equity-calculator':
    'Home equity calculator showing equity amount and HELOC borrowing power',
  'dscr-loan-calculator':
    'DSCR loan calculator for rental property debt service coverage ratio',
  'real-estate-flipping-profit-calculator':
    'Real estate flipping profit calculator showing flip ROI and total costs',
  'cap-rate-calculator':
    'Cap rate calculator showing capitalization rate for real estate investors',
  'airbnb-revenue-calculator':
    'Airbnb revenue calculator for short term rental income estimates',
  'brrrr-calculator':
    'BRRRR method calculator for buy rehab rent refinance repeat investing',
  'rent-vs-buy-new-calculator':
    'Rent vs buy calculator showing home buying costs and breakeven years',
  'llc-vs-sole-proprietor-tax-calculator':
    'LLC vs sole proprietor tax calculator showing which saves more on taxes',
  's-corp-tax-calculator':
    'S corp tax calculator showing savings from electing S corporation taxation',
  'business-entity-tax-comparison':
    'Business entity tax comparison calculator for LLC S corp and C corp structures',
  's-corp-salary-calculator':
    'S corp reasonable salary calculator showing how much to pay yourself',
  'llc-tax-savings-calculator':
    'LLC tax savings calculator showing how much an S corp election saves',
  'c-corp-vs-s-corp-calculator':
    'C corp vs S corp tax calculator comparing double taxation and savings',
  'entity-formation-cost-calculator':
    'LLC formation cost calculator showing state filing fees to start a business',
  'payroll-tax-calculator':
    'Payroll tax calculator for small business showing employer costs per employee',
  'break-even-calculator':
    'Break even calculator showing how many sales you need to cover costs',
  'startup-runway-calculator':
    'Startup runway calculator showing burn rate and months of cash runway',
  'business-profit-margin-calculator':
    'Business profit margin calculator showing gross and net profit margins',
  'business-debt-payoff-calculator':
    'Business debt payoff calculator using debt avalanche and snowball methods',
  'saas-metrics-calculator':
    'SaaS metrics calculator for MRR churn and unit economics',
  'customer-acquisition-cost-calculator':
    'Customer acquisition cost calculator showing CAC across marketing channels',
  'customer-lifetime-value-calculator':
    'Customer lifetime value calculator showing CLV and LTV ratio',
  'cash-flow-calculator':
    'Business cash flow calculator projecting monthly cash in and out',
  'business-loan-interest-calculator':
    'Business loan interest calculator showing total interest and APR',
  'revenue-growth-calculator':
    'Revenue growth calculator projecting business revenue growth rates',
  'expense-ratio-calculator':
    'Business expense ratio calculator showing operating expenses breakdown',
  'pricing-strategy-calculator':
    'Pricing strategy calculator comparing cost plus and value based pricing',
  'sales-tax-calculator':
    'Sales tax calculator 2026 with reverse sales tax and state rates',
  'compound-interest-calculator':
    'Compound interest calculator with monthly contributions for investment growth',
  'required-minimum-distribution-calculator':
    'Required minimum distribution calculator with 2026 IRS RMD tables',
  'roth-conversion-calculator':
    'Roth conversion calculator showing whether converting to a Roth IRA is worth it',
  '401k-calculator':
    '401k calculator showing how much your 401k will be worth at retirement',
  'investment-return-calculator':
    'Investment return calculator showing how much your investments will grow',
  'stock-portfolio-return-calculator':
    'Stock portfolio return calculator showing how your portfolio is performing',
  'etf-fee-calculator':
    'ETF fee calculator showing how expense ratios reduce returns over time',
  'retirement-savings-gap-calculator':
    'Retirement savings gap calculator showing if you are on track for retirement',
  'inflation-adjusted-calculator':
    'Inflation calculator showing what money will be worth in the future',
  'side-hustle-income-tax-calculator':
    'Side hustle income tax calculator for W-2 employees with freelance income',
  'emergency-fund-calculator':
    'Emergency fund calculator showing how much you should save for emergencies',
  'auto-loan-calculator':
    'Auto loan calculator showing monthly car payment and total loan interest',
  'credit-card-payoff-calculator':
    'Credit card payoff calculator showing how long it takes to clear your balance',
  'student-loan-calculator':
    'Student loan calculator showing monthly payments and total interest',
  'net-worth-calculator':
    'Net worth calculator showing total assets minus liabilities',
  'down-payment-calculator':
    'Down payment calculator showing your loan amount and PMI costs',
  'cd-calculator':
    'CD calculator showing certificate of deposit interest earnings and maturity value',
  'roth-ira-calculator':
    'Roth IRA growth calculator showing tax free retirement savings',
  'retirement-withdrawal-calculator':
    'Retirement withdrawal calculator using the 4 percent rule to see how long savings last',
  '529-college-savings-calculator':
    '529 college savings calculator showing projected savings against future college costs',
};

export function getCalculatorImage(
  _name: string,
  slug: string,
): CalculatorImage {
  return {
    src: `/images/calculators/${slug}.jpg`,
    alt:
      ALT_MAP[slug] || `${_name} calculator — free online tool from EveryCentCalc`,
  };
}
