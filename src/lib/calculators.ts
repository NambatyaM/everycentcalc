export interface Calculator {
  slug: string;
  name: string;
  description: string;
  category: string;
  categoryLabel: string;
  categorySlug: string;
  icon: string;
  keywords: string[];
  question: string;
  answer: string;
  faqs: { q: string; a: string }[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    slug: 'freelancer-tax',
    name: 'Freelancer Tax Calculators',
    description: 'Calculate self-employment tax, quarterly payments, and deductions for your 1099 income.',
    icon: '🧾',
  },
  {
    slug: 'freelancer-rate',
    name: 'Freelancer Rate Calculators',
    description: 'Figure out what to charge, compare freelance vs. employee pay, and price your work profitably.',
    icon: '💰',
  },
  {
    slug: 'side-hustle',
    name: 'Side Hustle Calculators',
    description: 'Determine if your side hustle is worth it, calculate profit margins, and estimate taxes on extra income.',
    icon: '🚀',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate & Rental Calculators',
    description: 'Evaluate rental property ROI, decide rent vs. buy, and calculate mortgage payments.',
    icon: '🏠',
  },
  {
    slug: 'small-business',
    name: 'Small Business Calculators',
    description: 'Find your break-even point, calculate runway, and model your business unit economics.',
    icon: '📊',
  },
];

export const calculators: Calculator[] = [
  // ─── SUITE 1: FREELANCER TAX ────────────────────────────────
  {
    slug: 'self-employment-tax-calculator',
    name: 'Self-Employment Tax Calculator',
    description: 'Calculate your exact 1099 self-employment tax including Social Security (12.4%) and Medicare (2.9%) on your net freelance income.',
    category: 'freelancer-tax',
    categoryLabel: 'Freelancer Tax',
    categorySlug: 'freelancer-tax',
    icon: '🧾',
    keywords: ['self employment tax calculator', '1099 tax calculator', 'freelance tax calculator', 'self employed tax'],
    question: 'How much is self-employment tax on $50,000 of freelance income?',
    answer: 'Self-employment tax on $50,000 of net freelance income is approximately $7,065. This includes $6,120 for Social Security (12.4% of 92.35% of $50,000) and $945 for Medicare (2.9% of $46,175). You may also owe federal and state income tax on top of this.',
    faqs: [
      { q: 'What is the self-employment tax rate for 2026?', a: 'The self-employment tax rate is 15.3%, which consists of 12.4% for Social Security (on the first $176,100 of earnings) and 2.9% for Medicare (with no income cap). You pay both the employer and employee portions since you are self-employed.' },
      { q: 'Do I have to pay self-employment tax if I earn under $400?', a: 'No. You generally do not owe self-employment tax if your net earnings from self-employment are under $400 for the tax year. However, you may still owe income tax on that income if it exceeds your standard deduction.' },
      { q: 'How is self-employment tax calculated?', a: 'Self-employment tax is calculated on 92.35% of your net self-employment income. Multiply that amount by 15.3% (12.4% Social Security + 2.9% Medicare). The Social Security portion only applies to earnings up to $176,100 in 2026.' },
      { q: 'Can I deduct half of my self-employment tax?', a: 'Yes. You can deduct 50% of your self-employment tax as an adjustment to income on your federal tax return (Form 1040, Schedule 1). This reduces your adjusted gross income (AGI) but does not reduce your self-employment tax itself.' },
    ],
  },
  {
    slug: 'quarterly-tax-calculator',
    name: 'Quarterly Estimated Tax Calculator',
    description: 'Calculate how much you owe the IRS each quarter to avoid underpayment penalties on your freelance and side hustle income.',
    category: 'freelancer-tax',
    categoryLabel: 'Freelancer Tax',
    categorySlug: 'freelancer-tax',
    icon: '📅',
    keywords: ['quarterly tax calculator', 'estimated tax payment', '1099 quarterly taxes', 'irs estimated tax'],
    question: 'How much quarterly tax should I pay on $80,000 freelance income?',
    answer: 'If you earn $80,000 net freelance income and have no other income, your quarterly estimated tax payments should be approximately $5,712 per quarter ($22,848 annually). This includes self-employment tax (~$11,301) and federal income tax (~$11,547), divided by 4 quarterly payments.',
    faqs: [
      { q: 'When are quarterly tax payments due?', a: 'Quarterly estimated tax payments for 2026 are due: Q1 on April 15, Q2 on June 16, Q3 on September 15, and Q4 on January 15, 2027. Missing these deadlines results in penalties and interest from the IRS.' },
      { q: 'What happens if I miss a quarterly payment?', a: 'The IRS charges an underpayment penalty calculated quarterly. The penalty rate fluctuates based on federal short-term rates plus 3 percentage points. Even a small late payment can cost $50-200+ in penalties depending on how much you owe.' },
      { q: 'Do I need to pay quarterly taxes on side hustle income?', a: 'Yes, if you expect to owe $1,000 or more in tax for the year and your withholding does not cover it. Most freelancers and side hustlers who earn over $400 must make quarterly estimated payments.' },
      { q: 'How do I calculate safe harbor quarterly payments?', a: 'To avoid any penalty, pay 100% of last year\'s total tax liability (110% if your AGI exceeded $150,000) divided by 4, OR 90% of this year\'s estimated tax liability divided by 4 — whichever is less.' },
    ],
  },
  {
    slug: 'freelance-tax-set-aside-calculator',
    name: 'How Much to Set Aside for Taxes',
    description: 'A simple calculator that tells you exactly what percentage of every freelance paycheck to save for taxes so you are never surprised at tax time.',
    category: 'freelancer-tax',
    categoryLabel: 'Freelancer Tax',
    categorySlug: 'freelancer-tax',
    icon: '🏦',
    keywords: ['how much to save for taxes freelancer', 'tax savings calculator', 'freelance tax percentage', 'set aside for taxes'],
    question: 'What percentage of freelance income should I save for taxes?',
    answer: 'Most freelancers should save 25-35% of their net income for taxes. This covers self-employment tax (15.3%) plus federal income tax (10-22% depending on bracket) and any applicable state income tax. In high-tax states like California or New York, save 35-40%.',
    faqs: [
      { q: 'How much should a freelancer set aside for taxes?', a: 'A general rule is to set aside 25-30% of your net freelance income for federal taxes. If you live in a state with income tax, increase this to 30-35%. High-tax states like California, New York, or Oregon may require 35-40%.' },
      { q: 'Do I save taxes on gross or net income?', a: 'You save taxes on your net income — that is gross income minus legitimate business expenses. Deductible expenses like software subscriptions, home office, equipment, and health insurance reduce the income you owe taxes on.' },
      { q: 'Should I save more or less if I have a day job too?', a: 'If you have W-2 income from a day job, your side hustle income stacks on top at a higher marginal tax rate. You may need to save 30-40% of your freelance income since it is taxed at your top bracket, not your average rate.' },
    ],
  },
  {
    slug: 'freelancer-hourly-rate-calculator',
    name: 'Freelancer Hourly Rate Calculator',
    description: 'Calculate the true hourly rate you need to charge to hit your income goals after accounting for taxes, expenses, and unpaid time off.',
    category: 'freelancer-rate',
    categoryLabel: 'Freelancer Rate',
    categorySlug: 'freelancer-rate',
    icon: '⏱️',
    keywords: ['freelancer hourly rate calculator', 'what should i charge hourly', 'freelance rate calculator', 'contractor rate calculator'],
    question: 'What hourly rate should a freelancer charge to earn $100,000?',
    answer: 'To earn $100,000 take-home as a US freelancer, you need to charge approximately $75-85/hour working 40 billable hours per week. This accounts for 15.3% self-employment tax, ~22% federal income tax, business expenses (10-15%), and unpaid time off (vacation, sick days, admin work).',
    faqs: [
      { q: 'How do I calculate my freelance hourly rate?', a: 'Start with your desired annual income, add 25-35% for taxes, add business expenses (typically 10-20%), then divide by your actual billable hours per year (usually 1,200-1,600 for full-time freelancers who account for admin, marketing, and unpaid time).' },
      { q: 'What is a good hourly rate for a beginner freelancer?', a: 'Beginner freelancers typically charge $25-50/hour depending on the field. Web developers average $50-75/hour, designers $40-65/hour, and writers $30-60/hour. As you gain experience and testimonials, increase your rate by 10-20% every 6-12 months.' },
      { q: 'Should I charge more as a freelancer than a salaried employee?', a: 'Yes, significantly more. As a freelancer you pay both employer and employee portions of payroll taxes (extra 7.65%), plus you have no paid vacation, no health insurance subsidy, no 401k match, and inconsistent income. A common multiplier is 1.5-2x your equivalent salaried hourly rate.' },
    ],
  },
  {
    slug: 'freelance-vs-employee-calculator',
    name: 'Freelance vs. Employee Take-Home Pay',
    description: 'Compare your take-home pay as a W-2 employee versus a 1099 freelancer at the same gross income. See the real difference after taxes, benefits, and expenses.',
    category: 'freelancer-rate',
    categoryLabel: 'Freelancer Rate',
    categorySlug: 'freelancer-rate',
    icon: '⚖️',
    keywords: ['freelance vs employee calculator', '1099 vs w2 calculator', 'contractor vs employee pay', 'self employed vs employed taxes'],
    question: 'How much more do I need to earn as a freelancer to match a $70,000 salary?',
    answer: 'To match the take-home pay of a $70,000 W-2 salary, a freelancer needs to earn approximately $87,000-$92,000. This is because freelancers pay an extra 7.65% in self-employment taxes (both employer and employee share), plus their own health insurance, and have no employer benefits like 401k matching or paid time off.',
    faqs: [
      { q: 'Why do freelancers earn less than employees at the same gross income?', a: 'Freelancers pay 15.3% self-employment tax (employees pay 7.65% — the employer covers the other half), must buy their own health insurance, get no paid vacation or sick days, have no employer 401k match, and face inconsistent income that requires larger emergency savings.' },
      { q: 'What is the real difference between 1099 and W-2 pay?', a: 'At the same gross income, a W-2 employee typically takes home 10-15% more than a 1099 freelancer. This gap comes from self-employment taxes (7.65% extra), lack of employer benefits (health insurance, 401k match), and business expenses that freelancers must cover themselves.' },
    ],
  },
  {
    slug: 'freelancer-health-insurance-cost',
    name: 'Freelancer Health Insurance Cost Estimator',
    description: 'Estimate your monthly health insurance costs as a self-employed individual, including ACA marketplace options and the self-employed health insurance deduction.',
    category: 'freelancer-rate',
    categoryLabel: 'Freelancer Rate',
    categorySlug: 'freelancer-rate',
    icon: '🏥',
    keywords: ['freelancer health insurance cost', 'self employed health insurance', 'aca marketplace cost freelancer', 'health insurance for 1099 workers'],
    question: 'How much does health insurance cost for a freelancer?',
    answer: 'Health insurance for a self-employed individual averages $400-600/month for a Silver plan on the ACA marketplace, or $250-450/month for a Bronze plan. Costs vary significantly by state, age, and income. The self-employed health insurance deduction lets you deduct 100% of premiums from your taxable income.',
    faqs: [
      { q: 'Can freelancers deduct health insurance premiums?', a: 'Yes. Self-employed individuals can deduct 100% of health, dental, and qualified long-term care insurance premiums for themselves, their spouse, and dependents. This is an above-the-line deduction on Schedule 1 of Form 1040.' },
      { q: 'What is the cheapest health insurance for freelancers?', a: 'Bronze ACA marketplace plans are typically the cheapest at $250-450/month for individuals. If your income is below 400% of the federal poverty level, you may qualify for premium tax credits that reduce your monthly cost significantly.' },
    ],
  },
  {
    slug: 'llc-vs-sole-proprietorship-tax',
    name: 'LLC vs. Sole Proprietorship Tax Calculator',
    description: 'Compare the tax implications of operating as a sole proprietorship versus an LLC to see which entity structure saves you the most money.',
    category: 'freelancer-tax',
    categoryLabel: 'Freelancer Tax',
    categorySlug: 'freelancer-tax',
    icon: '🏛️',
    keywords: ['llc vs sole proprietorship tax', 'should i form an llc', 'llc tax calculator', 'sole prop vs llc taxes'],
    question: 'Is an LLC or sole proprietorship better for taxes?',
    answer: 'For most solo freelancers earning under $100,000, there is no significant tax difference between a sole proprietorship and a single-member LLC — both are taxed the same way on Schedule C. An LLC provides liability protection but does not change your self-employment tax. Consider an S-Corp election if you earn over $60,000 to potentially save on self-employment taxes.',
    faqs: [
      { q: 'Does an LLC save money on taxes?', a: 'A basic LLC (taxed as a disregarded entity) does NOT save you money on taxes compared to a sole proprietorship. Both report income on Schedule C and pay the same self-employment tax. The tax savings come from electing S-Corp taxation for the LLC, which can save 15.3% on distributions above a reasonable salary.' },
      { q: 'When should a freelancer form an LLC?', a: 'Form an LLC when you want personal liability protection (separating business and personal assets), when you are entering into contracts with clients who require it, or when your income exceeds $60,000+ and S-Corp election becomes tax-advantageous.' },
    ],
  },
  {
    slug: 'tax-deduction-tracker',
    name: 'Freelance Tax Deduction Estimator',
    description: 'Estimate your total tax deductions as a freelancer including home office, equipment, software, health insurance, and other business expenses.',
    category: 'freelancer-tax',
    categoryLabel: 'Freelancer Tax',
    categorySlug: 'freelancer-tax',
    icon: '📝',
    keywords: ['freelance tax deductions', 'self employed deductions', 'tax write offs for freelancers', 'what can freelancers deduct'],
    question: 'What can freelancers deduct on taxes?',
    answer: 'Freelancers can deduct home office expenses, computer equipment, software subscriptions, internet and phone bills, health insurance premiums, professional development, marketing costs, business travel, office supplies, and more. The average freelancer can deduct $5,000-$15,000 per year, reducing taxable income significantly.',
    faqs: [
      { q: 'What are the biggest tax deductions for freelancers?', a: 'The biggest deductions are: home office (up to $1,500+), health insurance premiums (100% deductible), equipment and technology (laptops, monitors), software subscriptions, internet and phone (business percentage), professional development, and business insurance.' },
      { q: 'How does the home office deduction work?', a: 'You can use the simplified method ($5 per square foot, up to 300 sq ft = $1,500 max) or the regular method (actual expenses multiplied by the percentage of your home used for business). The space must be used regularly and exclusively for business.' },
    ],
  },

  // ─── SUITE 2: SIDE HUSTLE ──────────────────────────────────
  {
    slug: 'side-hustle-income-tax-calculator',
    name: 'Side Hustle Income Tax Calculator',
    description: 'Calculate the exact taxes owed on your side hustle income including self-employment tax, federal tax, and state tax on top of your W-2 salary.',
    category: 'side-hustle',
    categoryLabel: 'Side Hustle',
    categorySlug: 'side-hustle',
    icon: '💼',
    keywords: ['side hustle tax calculator', 'side job tax calculator', 'tax on side income', 'second job tax calculator'],
    question: 'How much tax do I owe on $20,000 side hustle income?',
    answer: 'On $20,000 net side hustle income (assuming $50,000 W-2 salary and single filing), you owe approximately $5,380 in combined taxes: ~$2,828 in self-employment tax (15.3% of 92.35% of $20,000), ~$2,000 in federal income tax (at your marginal 22% bracket), and ~$550 in state income tax (varies by state).',
    faqs: [
      { q: 'Do I have to report side hustle income?', a: 'Yes. All income is taxable regardless of whether you receive a 1099 form. If you earn over $400 from self-employment, you must file Schedule C with your tax return. The IRS receives copies of 1099-NEC and 1099-K forms and expects to see matching income on your return.' },
      { q: 'How is side hustle income taxed differently from my salary?', a: 'Side hustle income is subject to self-employment tax (15.3%) on top of regular income tax, while W-2 salary has the employer paying half of payroll taxes. Your side income also stacks on top of your salary, meaning it is taxed at your highest marginal rate.' },
    ],
  },
  {
    slug: 'is-side-hustle-worth-it-calculator',
    name: 'Is My Side Hustle Worth It Calculator',
    description: 'Calculate the true hourly value of your side hustle after taxes, expenses, and time invested — to see if it is actually worth your time.',
    category: 'side-hustle',
    categoryLabel: 'Side Hustle',
    categorySlug: 'side-hustle',
    icon: '🤔',
    keywords: ['is my side hustle worth it', 'side hustle profit calculator', 'side hustle hourly rate', 'is side hustling worth it'],
    question: 'Is a side hustle worth it if I only earn $500/month?',
    answer: 'It depends on your effective hourly rate. If you spend 20 hours/month for $500, your gross rate is $25/hour. After taxes (25-30%) and expenses, your net is $17-19/hour. Compare this to your alternative — if your time could be spent learning a higher-paying skill, building a business, or resting, the opportunity cost matters. A side hustle is worth it if your net hourly rate exceeds what you value your free time at.',
    faqs: [
      { q: 'How do I calculate if my side hustle is profitable?', a: 'Take your monthly side hustle revenue, subtract all business expenses (tools, software, supplies), subtract estimated taxes (25-30% of profit), then divide by total hours worked (including admin, marketing, not just delivery). If the result exceeds what you value your hourly time at, it is worth continuing.' },
      { q: 'What is a good side hustle profit margin?', a: 'A healthy side hustle should have a 50-70% profit margin after expenses but before taxes. If your margins are below 30%, you are either underpricing your services or your expenses are too high. Service-based side hustles (consulting, freelancing) typically have higher margins than product-based ones.' },
    ],
  },
  {
    slug: 'etsy-profit-calculator',
    name: 'Etsy Profit Margin Calculator',
    description: 'Calculate your true profit margin on Etsy sales after fees (transaction fee, listing fee, payment processing), shipping costs, and material costs.',
    category: 'side-hustle',
    categoryLabel: 'Side Hustle',
    categorySlug: 'side-hustle',
    icon: '🛒',
    keywords: ['etsy profit calculator', 'etsy fee calculator', 'etsy margin calculator', 'how much do i make on etsy'],
    question: 'What are the actual fees for selling on Etsy?',
    answer: 'Etsy charges: $0.20 listing fee per item, 6.5% transaction fee on the sale price + shipping, and 3% + $0.25 payment processing fee. On a $30 item with $5 shipping, you pay approximately $3.85 in total fees (12.8% of revenue). Factor in material costs, shipping supplies, and your time to find true profit.',
    faqs: [
      { q: 'How much profit do Etsy sellers make?', a: 'Profit varies widely. Successful Etsy sellers typically keep 30-50% of revenue as profit after all fees, materials, and shipping costs. A seller earning $5,000/month in revenue might net $1,500-$2,500/month in profit depending on their product type and cost structure.' },
      { q: 'What percentage does Etsy take from each sale?', a: 'Etsy takes approximately 10-13% of your total sale price (including shipping) when you combine the listing fee ($0.20), transaction fee (6.5%), and payment processing fee (3% + $0.25). High-volume sellers can reduce this slightly with Etsy Plus or negotiated rates.' },
    ],
  },
  {
    slug: 'amazon-fba-profit-calculator',
    name: 'Amazon FBA Profit Calculator',
    description: 'Calculate your true profit per unit on Amazon FBA products after fulfillment fees, referral fees, storage costs, and shipping.',
    category: 'side-hustle',
    categoryLabel: 'Side Hustle',
    categorySlug: 'side-hustle',
    icon: '📦',
    keywords: ['amazon fba profit calculator', 'fba fees calculator', 'amazon seller profit calculator', 'fba cost calculator'],
    question: 'How much profit do you make per item on Amazon FBA?',
    answer: 'Profit per Amazon FBA item depends on the product category and price point. On a $25 product, expect $5-$10 profit after: Amazon referral fee (15% = $3.75), FBA fulfillment fee (~$5 for standard size), shipping to Amazon (~$0.50), and product cost ($5-8). Many successful FBA sellers target 25-35% profit margins.',
    faqs: [
      { q: 'How much are Amazon FBA fees per item?', a: 'Amazon FBA fees include: referral fee (8-15% depending on category, typically 15%), fulfillment fee ($3-$10+ depending on size/weight), and monthly storage fee ($0.87-$2.40 per cubic foot). On a typical $20-30 product, total Amazon fees are $6-$12.' },
      { q: 'Is Amazon FBA still profitable in 2026?', a: 'Yes, but margins are tighter than in previous years. Successful FBA sellers in 2026 focus on higher-margin products ($20+ price point), private label branding, and optimized listings. The average profitable FBA seller earns $1,000-$5,000/month in net profit.' },
    ],
  },
  {
    slug: 'break-even-calculator',
    name: 'Break-Even Point Calculator',
    description: 'Calculate exactly how many units you need to sell or how much revenue you need to generate to cover all your costs and break even.',
    category: 'small-business',
    categoryLabel: 'Small Business',
    categorySlug: 'small-business',
    icon: '🎯',
    keywords: ['break even calculator', 'break even point calculator', 'break even analysis calculator', 'when will i break even'],
    question: 'How do I calculate my break-even point?',
    answer: 'Break-even point (units) = Fixed Costs / (Price per Unit - Variable Cost per Unit). For example, if your monthly fixed costs are $3,000, you sell a product for $50, and variable costs are $20, your break-even is 100 units ($3,000 / $30 contribution margin).',
    faqs: [
      { q: 'What is a break-even point?', a: 'The break-even point is the amount of revenue or number of units you need to sell to cover all your costs — both fixed (rent, software, salaries) and variable (materials, transaction fees). At break-even, profit is exactly $0. Above it, you are profitable.' },
      { q: 'How long does it take most startups to break even?', a: 'Most small businesses take 2-3 years to break even. Service-based businesses typically break even faster (6-18 months) than product-based businesses (12-36 months) due to lower upfront costs and faster revenue generation.' },
    ],
  },
  {
    slug: 'startup-runway-calculator',
    name: 'Startup Runway Calculator',
    description: 'Calculate how many months your startup can survive at its current burn rate before running out of cash.',
    category: 'small-business',
    categoryLabel: 'Small Business',
    categorySlug: 'small-business',
    icon: '✈️',
    keywords: ['startup runway calculator', 'burn rate calculator', 'cash runway calculator', 'how long will my startup last'],
    question: 'How many months of runway should a startup have?',
    answer: 'Most advisors recommend 12-18 months of runway at all times. With 6 months or less, you are in danger zone and should cut costs or raise immediately. Calculate runway by dividing your total cash balance by your monthly net burn rate (expenses minus revenue). For example, $120,000 in the bank with $10,000/month burn = 12 months of runway.',
    faqs: [
      { q: 'What is a good startup burn rate?', a: 'A healthy burn rate depends on your stage. Pre-revenue startups should aim for $5,000-$15,000/month total burn. Revenue-generating startups can sustain higher burns if their revenue covers 30-50% of expenses. The key metric is runway length, not burn rate alone.' },
      { q: 'How do I extend my startup runway?', a: 'Cut discretionary spending (marketing, office space, tools), negotiate longer payment terms with vendors, accelerate revenue through pricing optimization, consider pre-sales or annual billing to bring in cash faster, and reduce headcount if necessary.' },
    ],
  },
  {
    slug: 'saas-unit-economics-calculator',
    name: 'SaaS Unit Economics Calculator (CAC/LTV)',
    description: 'Calculate your Customer Acquisition Cost (CAC), Lifetime Value (LTV), LTV:CAC ratio, and payback period for your SaaS or subscription business.',
    category: 'small-business',
    categoryLabel: 'Small Business',
    categorySlug: 'small-business',
    icon: '📈',
    keywords: ['cac ltv calculator', 'saas unit economics', 'customer lifetime value calculator', 'cac payback period calculator'],
    question: 'What is a good LTV to CAC ratio for SaaS?',
    answer: 'A healthy LTV:CAC ratio for SaaS is 3:1 or higher. This means for every $1 you spend acquiring a customer, you earn $3+ in lifetime revenue. Below 1:1 you are losing money on every customer. Between 1:1 and 3:1 you are barely sustainable. Above 5:1 you may be under-investing in growth.',
    faqs: [
      { q: 'How do I calculate Customer Acquisition Cost (CAC)?', a: 'CAC = Total Sales & Marketing Costs / Number of New Customers Acquired in that period. Include all sales team salaries, marketing spend, tools, and overhead. A simple formula: if you spend $10,000/month on sales and marketing and acquire 100 new customers, your CAC is $100.' },
      { q: 'How do I calculate Customer Lifetime Value (LTV)?', a: 'Simple LTV = Average Monthly Revenue per Customer × Average Customer Lifespan (months). More accurately: (Average Revenue per Account × Gross Margin %) / Monthly Churn Rate. If your average customer pays $50/month and stays 24 months, LTV = $1,200.' },
    ],
  },
  {
    slug: 'pricing-strategy-calculator',
    name: 'Pricing Strategy Calculator',
    description: 'Compare cost-plus pricing, value-based pricing, and competitive pricing strategies to find the optimal price for your product or service.',
    category: 'small-business',
    categoryLabel: 'Small Business',
    categorySlug: 'small-business',
    icon: '💲',
    keywords: ['pricing strategy calculator', 'how to price my product', 'cost plus pricing calculator', 'value based pricing'],
    question: 'How do I calculate the right price for my product?',
    answer: 'Three methods: (1) Cost-plus: add your desired margin to total costs (e.g., $10 cost + 50% margin = $15 price). (2) Value-based: charge what the value is worth to the customer (e.g., if your tool saves them $500/month, charging $50/month is a no-brainer). (3) Competitive: price relative to competitors. Most successful businesses use a combination of all three.',
    faqs: [
      { q: 'What is the best pricing strategy for freelancers?', a: 'Value-based pricing is generally best for freelancers. Instead of charging by the hour (which punishes efficiency), charge based on the value delivered to the client. If your work generates $50,000 in revenue for a client, charging $5,000-10,000 is reasonable regardless of how many hours it took.' },
      { q: 'How do I know if I am underpricing?', a: 'Signs you are underpricing: you are always busy but cannot save money, you attract price-shoppers who demand lots of revisions, your close rate is above 80% (you are saying yes too easily), and more experienced peers charge 2-3x what you charge.' },
    ],
  },

  // ─── SUITE 4: REAL ESTATE ──────────────────────────────────
  {
    slug: 'rental-property-roi-calculator',
    name: 'Rental Property ROI Calculator',
    description: 'Calculate the cash-on-cash return, cap rate, and total ROI on a rental property investment including mortgage, taxes, insurance, and expenses.',
    category: 'real-estate',
    categoryLabel: 'Real Estate',
    categorySlug: 'real-estate',
    icon: '🏘️',
    keywords: ['rental property roi calculator', 'real estate roi calculator', 'cash on cash return calculator', 'rental income calculator'],
    question: 'What is a good ROI on a rental property?',
    answer: 'A good cash-on-cash return on a rental property is 8-12% annually. Cap rates typically range from 4-10% depending on market. Total ROI (including appreciation and mortgage paydown) can reach 15-25% with leverage. Below 5% cash-on-cash return, the investment may not be worth the management effort.',
    faqs: [
      { q: 'How do I calculate rental property ROI?', a: 'Cash-on-Cash Return = (Annual Pre-Tax Cash Flow / Total Cash Invested) × 100. For example, if you invest $50,000 and receive $5,000/year in net cash flow, your cash-on-cash return is 10%. Include all expenses: mortgage, taxes, insurance, maintenance, vacancy, and management fees.' },
      { q: 'What expenses should I include in my rental ROI calculation?', a: 'Include: mortgage principal and interest, property taxes, insurance, HOA fees, maintenance reserves (5-10% of rent), vacancy allowance (5-8%), property management (8-12% if not self-managing), and capital expenditure reserves (5% of rent for future repairs).' },
    ],
  },
  {
    slug: 'rent-vs-buy-calculator',
    name: 'Rent vs. Buy Calculator',
    description: 'Compare the true cost of renting versus buying a home over your planned time horizon, including mortgage, taxes, opportunity cost, and appreciation.',
    category: 'real-estate',
    categoryLabel: 'Real Estate',
    categorySlug: 'real-estate',
    icon: '🏡',
    keywords: ['rent vs buy calculator', 'should i rent or buy', 'is it better to rent or buy', 'home buying calculator'],
    question: 'Is it better to rent or buy in 2026?',
    answer: 'The answer depends on your local market, how long you plan to stay, and current interest rates. Generally, buying wins if you plan to stay 5+ years in a stable or appreciating market. Renting wins if you move frequently, live in a very expensive market, or can invest the difference at higher returns. Use the calculator with your specific numbers for a personalized comparison.',
    faqs: [
      { q: 'How long do you need to stay in a home for buying to beat renting?', a: 'In most US markets, buying beats renting after 4-7 years of ownership. This accounts for closing costs (3-6% when buying and selling), opportunity cost of the down payment, and the equity you build through mortgage paydown. The longer you stay, the more buying wins.' },
      { q: 'What are the hidden costs of buying a home?', a: 'Beyond the mortgage, buyers pay: property taxes (1-3% of value annually), homeowner insurance ($1,000-3,000/year), maintenance (1-2% of value annually), HOA fees ($200-500/month if applicable), closing costs (3-6% of purchase price), and opportunity cost of the down payment invested elsewhere.' },
    ],
  },
  {
    slug: 'cap-rate-calculator',
    name: 'Cap Rate Calculator',
    description: 'Calculate the capitalization rate of a rental property to compare investment opportunities and assess if a property is fairly priced.',
    category: 'real-estate',
    categoryLabel: 'Real Estate',
    categorySlug: 'real-estate',
    icon: '📐',
    keywords: ['cap rate calculator', 'capitalization rate calculator', 'what is a good cap rate', 'cap rate formula'],
    question: 'What is a good cap rate for rental property?',
    answer: 'A "good" cap rate depends on the market and property class. In expensive coastal cities (NYC, SF), cap rates of 3-5% are normal. In Midwest or Southeast markets, 6-10% is achievable. Generally, higher cap rates mean higher returns but often come with higher risk or less appreciation potential. Most investors target 5-8% cap rates.',
    faqs: [
      { q: 'How is cap rate calculated?', a: 'Cap Rate = (Net Operating Income / Property Value) × 100. NOI = Annual Rental Income - Operating Expenses (not including mortgage). For example, a property generating $24,000 NOI valued at $400,000 has a 6% cap rate.' },
      { q: 'Does cap rate include mortgage payments?', a: 'No. Cap rate is calculated before mortgage payments. It measures the property\'s return independent of financing. This makes it useful for comparing properties with different financing structures. Cash-on-cash return is the metric that includes mortgage payments.' },
    ],
  },
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Payment Calculator',
    description: 'Calculate your monthly mortgage payment including principal, interest, taxes, insurance (PITI), and see a full amortization schedule.',
    category: 'real-estate',
    categoryLabel: 'Real Estate',
    categorySlug: 'real-estate',
    icon: '🏦',
    keywords: ['mortgage calculator', 'mortgage payment calculator', 'home loan calculator', 'monthly mortgage payment'],
    question: 'What is the monthly payment on a $400,000 mortgage?',
    answer: 'At a 7% interest rate on a 30-year fixed $400,000 mortgage (after 20% down on a $500,000 home), your monthly principal and interest payment is approximately $2,661. Adding property taxes ($350/month), insurance ($150/month), and PMI if applicable, total monthly housing payment is approximately $3,161.',
    faqs: [
      { q: 'What is the mortgage payment formula?', a: 'Monthly Payment = P[r(1+r)^n]/[(1+r)^n-1], where P = loan principal, r = monthly interest rate (annual rate / 12), and n = total number of payments (years × 12). For a $400,000 loan at 7% for 30 years: $400,000[0.00583(1.00583)^360]/[(1.00583)^360-1] = $2,661/month.' },
      { q: 'How much house can I afford?', a: 'A common guideline is the 28/36 rule: your mortgage payment should not exceed 28% of gross monthly income, and total debt payments should not exceed 36%. On a $100,000 salary ($8,333/month gross), your mortgage payment should be under $2,333/month, supporting roughly a $350,000-400,000 home depending on rates and other debts.' },
    ],
  },
  {
    slug: 'airbnb-revenue-estimator',
    name: 'Airbnb Revenue Estimator',
    description: 'Estimate your potential Airbnb rental income based on location, property size, and occupancy assumptions compared to traditional long-term rental income.',
    category: 'real-estate',
    categoryLabel: 'Real Estate',
    categorySlug: 'real-estate',
    icon: '✈️',
    keywords: ['airbnb revenue calculator', 'airbnb income estimator', 'short term rental calculator', 'airbnb profit calculator'],
    question: 'How much can I make on Airbnb per month?',
    answer: 'Airbnb income varies dramatically by location and property type. A well-managed 2-bedroom in a tourist area can generate $2,000-5,000/month in gross revenue (at 65-75% occupancy). After cleaning, supplies, management fees, and higher utilities, net income is typically 50-65% of gross. Compare this to long-term rental income of $1,200-2,500/month for the same property.',
    faqs: [
      { q: 'Is Airbnb more profitable than long-term renting?', a: 'In popular tourist areas, Airbnb can generate 30-100% more gross revenue than traditional renting. However, after accounting for higher expenses (cleaning, supplies, more maintenance, platform fees, management), net income is typically 20-50% higher, with more management effort required.' },
      { q: 'What is a good Airbnb occupancy rate?', a: 'A good Airbnb occupancy rate is 65-75% for most markets. Top-performing properties in tourist destinations can achieve 80%+. Below 50%, you may be better off with a long-term tenant. Use AirDNA or similar tools to research occupancy rates in your specific market.' },
    ],
  },
  {
    slug: 'cash-on-cash-return-calculator',
    name: 'Cash-on-Cash Return Calculator',
    description: 'Calculate the cash-on-cash return on a real estate investment — the ratio of annual pre-tax cash flow to total cash invested.',
    category: 'real-estate',
    categoryLabel: 'Real Estate',
    categorySlug: 'real-estate',
    icon: '💵',
    keywords: ['cash on cash return calculator', 'cash on cash return formula', 'real estate cash return', 'investment property return'],
    question: 'What is a good cash-on-cash return?',
    answer: 'A good cash-on-cash return is 8-12% annually. In hot markets like NYC or SF, 4-6% may be acceptable if appreciation is expected. In cheaper markets, target 10-15%. Below 4%, you might get better risk-adjusted returns from index funds. Above 20% is exceptional but may indicate higher risk.',
    faqs: [
      { q: 'How is cash-on-cash return different from cap rate?', a: 'Cap rate measures return based on the property value (ignoring financing), while cash-on-cash return measures return based on the actual cash you invested (including the effects of your mortgage). Cash-on-cash is more useful for leveraged investments because it shows your real return on invested capital.' },
    ],
  },
  {
    slug: 'brrrr-calculator',
    name: 'BRRRR Method Calculator',
    description: 'Evaluate a BRRRR (Buy, Rehab, Rent, Refinance, Repeat) deal by calculating your all-in cost, After Repair Value, and how much cash you pull out on refinance.',
    category: 'real-estate',
    categoryLabel: 'Real Estate',
    categorySlug: 'real-estate',
    icon: '🔄',
    keywords: ['brrrr calculator', 'brrrr method calculator', 'buy rehab rent refinance repeat', 'brrrr deal calculator'],
    question: 'How does the BRRRR method work financially?',
    answer: 'In BRRRR, you buy a distressed property below market value, rehab it to increase the After Repair Value (ARV), rent it out, then refinance at 70-75% of ARV to pull out most or all of your initial investment. If the property appraises at $300,000 after a $40,000 rehab, a 75% refinance gives you $225,000 — ideally recovering most of your $180,000 all-in cost while keeping a cash-flowing rental.',
    faqs: [
      { q: 'What is the 70% rule in BRRRR?', a: 'The 70% rule states you should pay no more than 70% of the After Repair Value (ARV) minus repair costs. Example: if a property will be worth $300,000 after $40,000 in repairs, your max purchase price is ($300,000 × 0.70) - $40,000 = $170,000.' },
    ],
  },

  // ─── SUITE 5: MORE SIDE HUSTLE ─────────────────────────────
  {
    slug: 'shopify-profit-calculator',
    name: 'Shopify Profit Margin Calculator',
    description: 'Calculate your true profit margin on Shopify sales after payment processing fees, transaction costs, shipping, and product costs.',
    category: 'side-hustle',
    categoryLabel: 'Side Hustle',
    categorySlug: 'side-hustle',
    icon: '🛍️',
    keywords: ['shopify profit calculator', 'shopify fees calculator', 'ecommerce profit calculator', 'shopify margin calculator'],
    question: 'How much profit do Shopify store owners make?',
    answer: 'Successful Shopify stores typically achieve 20-40% net profit margins. On a $50 product, expect to keep $10-$20 after: product cost ($10-15), Shopify fees (2.9% + $0.30 = $1.75), shipping ($3-5), and marketing ($5-10 for paid ads). Stores with organic traffic or email marketing can achieve higher margins of 30-50%.',
    faqs: [
      { q: 'What are Shopify fees per transaction?', a: 'Shopify Basic plan charges 2.9% + $0.30 per online transaction (lower with Shopify Payments). Additionally, there is a monthly subscription ($39/month on Basic), and if using third-party payment processors, an extra 2% transaction fee applies.' },
    ],
  },
  {
    slug: 'content-creator-revenue-calculator',
    name: 'Content Creator Revenue Calculator',
    description: 'Estimate your total earnings as a content creator across YouTube ad revenue, sponsorships, merchandise, and affiliate income.',
    category: 'side-hustle',
    categoryLabel: 'Side Hustle',
    categorySlug: 'side-hustle',
    icon: '🎬',
    keywords: ['youtube earnings calculator', 'content creator income calculator', 'influencer revenue calculator', 'how much do youtubers make'],
    question: 'How much do content creators actually earn?',
    answer: 'Content creator income varies enormously. A YouTuber with 100K subscribers might earn $1,000-5,000/month from ads alone ($3-8 CPM), plus $2,000-10,000/month from sponsorships. Smaller creators (10K-50K) typically earn $500-2,000/month total. Instagram and TikTok creators earn less from platform payouts but can earn more from brand deals and affiliate marketing.',
    faqs: [
      { q: 'How much do YouTubers earn per 1,000 views?', a: 'YouTube CPM (cost per 1,000 views) varies by niche: Finance ($12-30), Technology ($8-15), Gaming ($2-5), Entertainment ($1-3). On average, US-based creators earn $3-8 per 1,000 views from AdSense alone, before sponsorships and other revenue.' },
      { q: 'What is the best revenue stream for content creators?', a: 'Sponsorships and brand deals typically provide the highest per-view revenue (10-50x more than AdSense). Affiliate marketing offers the best passive income potential. Ad revenue provides the most reliable baseline income. Digital products and courses offer the highest profit margins.' },
    ],
  },
  {
    slug: 'freelance-project-profitability',
    name: 'Freelance Project Profitability Calculator',
    description: 'Calculate whether a freelance project is profitable by comparing your total time investment against the revenue and your effective hourly rate.',
    category: 'freelancer-rate',
    categoryLabel: 'Freelancer Rate',
    categorySlug: 'freelancer-rate',
    icon: '📋',
    keywords: ['freelance project profitability', 'freelance project calculator', 'is this freelance project worth it', 'freelance bid calculator'],
    question: 'How do I know if a freelance project is profitable?',
    answer: 'Calculate your effective hourly rate: (Project Revenue - Expenses) / Hours Spent. If it meets or exceeds your target hourly rate, the project is profitable. Also factor in intangibles: portfolio value, referral potential, learning opportunities, and whether the client could become a recurring source of work.',
    faqs: [
      { q: 'What is a good hourly rate for freelance projects?', a: 'A good effective hourly rate for freelancers is $50-150/hour depending on your field and experience. Web developers average $75-150/hour, designers $60-120/hour, and writers $50-100/hour. If a project pays below $40/hour effective, it is likely not worth your time unless it provides significant strategic value.' },
    ],
  },
  {
    slug: 'savings-goal-calculator',
    name: 'Savings Goal Calculator',
    description: 'Calculate how much you need to save each month to reach your financial goal by a specific date, including the effect of compound interest.',
    category: 'small-business',
    categoryLabel: 'Small Business',
    categorySlug: 'small-business',
    icon: '🎯',
    keywords: ['savings goal calculator', 'how much to save monthly', 'financial goal calculator', 'compound savings calculator'],
    question: 'How much do I need to save per month to reach $10,000 in one year?',
    answer: 'To save $10,000 in 12 months, you need to save approximately $833/month. If you put that money in a high-yield savings account earning 5% APY, you would only need to save about $816/month because interest would contribute roughly $240 over the year.',
    faqs: [
      { q: 'How does compound interest affect my savings goal?', a: 'Compound interest accelerates your savings growth by earning interest on interest. At 5% APY, $100/month becomes $12,763 after 12 months (vs. $12,000 without interest). Over longer periods, the effect is dramatic: $500/month at 7% becomes $204,977 after 20 years vs. $120,000 without compounding.' },
    ],
  },
  {
    slug: 'business-loan-calculator',
    name: 'Business Loan Affordability Calculator',
    description: 'Calculate your monthly loan payment, total interest paid, and whether a business loan is affordable given your revenue and profit margins.',
    category: 'small-business',
    categoryLabel: 'Small Business',
    categorySlug: 'small-business',
    icon: '🏛️',
    keywords: ['business loan calculator', 'small business loan calculator', 'loan payment calculator', 'can i afford a business loan'],
    question: 'Can my small business afford a loan?',
    answer: 'A general rule: your total debt service (all loan payments) should not exceed 25-35% of your monthly revenue. If your business generates $20,000/month, your max loan payment should be $5,000-7,000. For a $50,000 loan at 8% over 5 years, monthly payments are approximately $1,014 — affordable for a business earning $5,000+/month.',
    faqs: [
      { q: 'What credit score do I need for a small business loan?', a: 'Traditional bank loans typically require a credit score of 680+. SBA loans require 650+. Online lenders may approve scores as low as 500-600, but at higher interest rates (15-30% vs. 6-10% for bank loans). Your business revenue, time in business, and collateral also matter significantly.' },
    ],
  },
];

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(categorySlug: string): Calculator[] {
  return calculators.filter((c) => c.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return calculators.map((c) => c.slug);
}
