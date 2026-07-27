import type { Calculator, Category } from './types';

export const categories: Category[] = [
  {
    slug: 'freelance-tax',
    name: 'Freelance & Self-Employment Tax',
    icon: '🧾',
    description: 'Stop guessing how much you owe. These calculators break down your self-employment tax, federal income tax, and quarterly payments — so you don’t get hit with penalties.',
  },
  {
    slug: 'freelance-business',
    name: 'Freelance Business',
    icon: '💼',
    description: 'Set your rates, track your profitability, and know exactly how much to charge. Built for freelancers, consultants, and solopreneurs who want to earn more.',
  },
  {
    slug: 'side-hustle',
    name: 'Side Hustle & Gig Economy',
    icon: '🚗',
    description: 'Etsy, Uber, DoorDash, tutoring — every side hustle is different. These calculators show you what you’re actually making after expenses, taxes, and time.',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate Investing',
    icon: '🏠',
    description: 'Before you buy your next rental property, know the numbers. Cash flow, cap rate, ROI, rent vs. buy, DSCR — all calculated instantly.',
  },
  {
    slug: 'llc-tax',
    name: 'LLC & Business Entity Tax',
    icon: '🏢',
    description: 'Sole proprietor vs. LLC vs. S-Corp — which saves you the most on taxes? These calculators show the real difference, not the marketing pitch.',
  },
  {
    slug: 'business-finance',
    name: 'Business Finance',
    icon: '📊',
    description: 'Break-even points, startup runway, profit margins, debt payoff — the numbers that determine whether your business survives or thrives.',
  },
  {
    slug: 'investment',
    name: 'Investment & Retirement',
    icon: '📈',
    description: 'Compound interest, required minimum distributions, Roth conversions, 401(k) planning — maximize every dollar you invest.',
  },
];

const freelanceTaxCalculators = [
  {
    slug: 'self-employment-tax-calculator',
    name: 'Self-Employment Tax Calculator',
    description: 'How much do freelancers actually pay in SE tax? This calculator breaks down the 15.3% self-employment tax, including the 92.35% adjustment and the one-half deduction most people miss.',
    category: 'freelance-tax',
    url: '/calculator/self-employment-tax-calculator/',
    canonical: '/calculator/self-employment-tax-calculator/',
    color: '#8B5CF6',
    icon: '🧾',
    tags: ['self employment tax', 'freelance tax', '1099 tax', 'SE tax calculator', 'how much self employment tax do i owe'],
    faqs: [
      {
        q: 'How is self-employment tax calculated?',
        a: 'Self-employment tax is 15.3% of your net self-employment income: 12.4% for Social Security (on the first $184,500 in 2026) plus 2.9% for Medicare (with no income limit). The IRS lets you calculate on 92.35% of net earnings, and you can deduct half of the SE tax from your gross income.',
      },
      {
        q: 'Do freelancers pay both self-employment tax and income tax?',
        a: 'Yes. Self-employment tax covers Social Security and Medicare (the employer + employee portions). Federal income tax is separate and calculated on your taxable income after deductions. You pay both — but the SE tax deduction and business expense deductions reduce your income tax.',
      },
      {
        q: 'Can I deduct half of my self-employment tax?',
        a: 'Yes. The IRS allows you to deduct 50% of your self-employment tax as an adjustment to income on your 1040. This deduction is automatic — you don\'t need to itemize to claim it.',
      },
    ],
    keywords: ['self employment tax calculator 2026', 'freelance tax calculator', '1099 tax calculator', 'how much SE tax do i owe', 'self employed tax rate'],
  },
  {
    slug: 'quarterly-tax-calculator',
    name: 'Quarterly Tax Calculator',
    description: 'Freelancers don\'t have taxes withheld — that means quarterly payments. This calculator tells you exactly how much to pay each quarter (April 15, June 15, September 15, January 15) based on your income.',
    category: 'freelance-tax',
    url: '/calculator/quarterly-tax-calculator/',
    canonical: '/calculator/quarterly-tax-calculator/',
    color: '#06B6D4',
    icon: '📅',
    tags: ['quarterly tax calculator', 'estimated tax calculator', '1040-es calculator', 'quarterly estimated taxes'],
    faqs: [
      {
        q: 'How much should I pay in quarterly taxes?',
        a: 'The IRS requires you to pay estimated taxes if you expect to owe $1,000 or more in taxes for the year. For most freelancers, paying 100-110% of last year\'s total tax (110% if AGI > $150k) across four equal quarterly payments avoids underpayment penalties. This calculator computes your quarterly amount automatically.',
      },
      {
        q: 'When are quarterly tax payments due?',
        a: 'Quarterly estimated taxes are due: Q1 (Jan 1 – Mar 31) → April 15; Q2 (Apr 1 – May 31) → June 15; Q3 (Jun 1 – Aug 31) → September 15; Q4 (Sep 1 – Dec 31) → January 15 of the following year. Miss a deadline and the IRS charges penalties — even if you overpay for the year.',
      },
      {
        q: 'What happens if I don\'t pay quarterly taxes?',
        a: 'The IRS charges an underpayment penalty if you owe $1,000+ and didn\'t pay at least 90% of your current year tax or 100% of last year\'s tax through withholdings or estimated payments. The penalty rate is set quarterly and compounds on the unpaid amount.',
      },
    ],
    keywords: ['quarterly tax calculator 2026', 'how much quarterly taxes do i owe', '1040-es calculator', 'estimated tax payment calculator', 'quarterly estimated tax'],
  },
  {
    slug: 'side-hustle-tax-calculator',
    name: 'Side Hustle Tax Calculator',
    description: 'Got a W-2 job but also freelance on the side? Your W-2 withholdings might not cover the extra income. This calculator shows exactly how much more you\'ll owe in taxes from your side hustle.',
    category: 'freelance-tax',
    url: '/calculator/side-hustle-tax-calculator/',
    canonical: '/calculator/side-hustle-tax-calculator/',
    color: '#F59E0B',
    icon: '💼',
    tags: ['side hustle tax calculator', 'tax on side income', 'how much tax do i owe on side hustle', 'freelance tax on top of w2'],
    faqs: [
      {
        q: 'Do I have to pay taxes on my side hustle income?',
        a: 'Yes. The IRS taxes all income — whether it\'s from your main job, freelance work, or a weekend gig. Side hustle income is subject to income tax plus self-employment tax (15.3%). Your W-2 withholdings only cover your main job; you need to account for the additional income separately.',
      },
      {
        q: 'How much tax should I set aside from my side hustle?',
        a: 'A common rule of thumb is setting aside 25-30% of net side hustle income for federal taxes (income tax + SE tax). However, your actual rate depends on your total income, filing status, and deductions. This calculator gives you the exact number instead of guessing.',
      },
      {
        q: 'Can I deduct side hustle expenses from my taxes?',
        a: 'Yes. Any ordinary and necessary business expense for your side hustle is deductible: supplies, software, home office, mileage, phone, internet (business portion), marketing, and more. These deductions reduce your net self-employment income, which lowers both your income tax and SE tax.',
      },
    ],
    keywords: ['side hustle tax calculator', 'how much tax on side hustle income', 'tax on side job', 'freelance tax with w2 job', 'additional income tax calculator'],
  },
  {
    slug: 'freelance-income-tax-calculator',
    name: 'Freelance Income Tax Calculator',
    description: 'What\'s your effective tax rate as a freelancer? This calculator computes your total federal income tax using 2026 brackets — including the standard deduction — so you know what you\'ll actually pay.',
    category: 'freelance-tax',
    url: '/calculator/freelance-income-tax-calculator/',
    canonical: '/calculator/freelance-income-tax-calculator/',
    color: '#10B981',
    icon: '💰',
    tags: ['freelance income tax calculator', 'federal income tax calculator', '1099 income tax', 'freelancer tax rate'],
    faqs: [
      {
        q: 'What is the freelance tax rate for 2026?',
        a: 'There isn\'t one "freelance tax rate." Your total federal tax burden includes income tax (10-37% depending on bracket) plus self-employment tax (15.3%). Most freelancers pay an effective federal rate of 22-35% depending on income. State taxes add another 0-13%. This calculator computes your exact federal income tax.',
      },
      {
        q: 'How do I calculate taxes on 1099 income?',
        a: 'Take your gross 1099 income, subtract business expenses to get net profit. Then: (1) Calculate SE tax on 92.35% of net profit. (2) Calculate income tax on net profit minus half the SE tax minus the standard deduction. (3) Add income tax + SE tax. This calculator does all three steps automatically.',
      },
      {
        q: 'What deductions can freelancers claim?',
        a: 'Key deductions: business expenses (supplies, software, equipment), home office deduction, health insurance premium deduction, retirement plan contributions (SEP IRA, Solo 401k), half of SE tax deduction, and the qualified business income (QBI) deduction of up to 20% of qualified income.',
      },
    ],
    keywords: ['freelance income tax calculator 2026', 'federal income tax calculator 1099', 'what is my tax rate as a freelancer', '1099 income tax calculator', 'freelancer federal tax rate'],
  },
  {
    slug: 'freelance-tax-deduction-calculator',
    name: 'Freelance Tax Deduction Calculator',
    description: 'Freelancers leave thousands on the table by missing deductions. This calculator shows you exactly how much your business deductions reduce your tax bill — in real dollars, not just percentages.',
    category: 'freelance-tax',
    url: '/calculator/freelance-tax-deduction-calculator/',
    canonical: '/calculator/freelance-tax-deduction-calculator/',
    color: '#EC4899',
    icon: '🧮',
    tags: ['freelance tax deduction calculator', 'what can freelancers deduct', 'business deduction calculator', 'self employed deductions'],
    faqs: [
      {
        q: 'What is the biggest tax deduction for freelancers?',
        a: 'The qualified business income (QBI) deduction is often the largest — it lets you deduct up to 20% of your qualified business income from your taxable income. After that, the home office deduction, health insurance deduction, and retirement contributions (SEP IRA up to $70,000 in 2026) are typically the biggest.',
      },
      {
        q: 'How much do business deductions actually save me?',
        a: 'It depends on your tax bracket. A $1,000 deduction saves you $220 if you\'re in the 22% bracket, or $320 if you\'re in the 32% bracket. But deductions also reduce your self-employment tax (an additional 15.3% savings on the deduction amount). This calculator shows your total savings across both taxes.',
      },
      {
        q: 'Can I deduct my home office as a freelancer?',
        a: 'Yes, if you use part of your home exclusively and regularly for business. The simplified method gives you $5 per square foot (up to 300 sq ft = $1,500 max). The regular method deducts actual expenses (rent/mortgage interest, utilities, insurance) proportioned by office square footage. The deduction reduces both income and SE taxes.',
      },
    ],
    keywords: ['freelance tax deduction calculator', 'how much can i deduct as a freelancer', 'business deduction savings calculator', 'self employed tax deductions', 'freelancer write offs calculator'],
  },
  {
    slug: 'quarterly-tax-deadline-calculator',
    name: 'Quarterly Tax Deadline Calculator',
    description: 'Missed a quarterly deadline? This calculator shows if you owe penalties, how much they are, and exactly when your next payment is due. Never miss a quarterly deadline again.',
    category: 'freelance-tax',
    url: '/calculator/quarterly-tax-deadline-calculator/',
    canonical: '/calculator/quarterly-tax-deadline-calculator/',
    color: '#EF4444',
    icon: '⏰',
    tags: ['quarterly tax deadline calculator', 'tax deadline calculator', 'underpayment penalty calculator', 'irs quarterly due dates'],
    faqs: [
      {
        q: 'What are the 2026 quarterly tax deadlines?',
        a: 'Q1 (income Jan 1–Mar 31): April 15, 2026. Q2 (income Apr 1–May 31): June 15, 2026. Q3 (income Jun 1–Aug 31): September 15, 2026. Q4 (income Sep 1–Dec 31): January 15, 2027. If a deadline falls on a weekend or holiday, it\'s pushed to the next business day.',
      },
      {
        q: 'How is the IRS underpayment penalty calculated?',
        a: 'The penalty is based on how much you underpaid, for how long, and the quarterly interest rate set by the IRS (typically 7-8% in recent years). The IRS uses Form 2210 to calculate it. Even small underpayments can result in penalties if the shortfall is large and long-standing.',
      },
      {
        q: 'Can I avoid quarterly tax penalties?',
        a: 'Yes. Pay at least 90% of your current year tax liability OR 100% of last year\'s total tax (110% if AGI > $150,000) through quarterly payments. You can also use the annualized income installment method if your income is uneven throughout the year.',
      },
    ],
    keywords: ['quarterly tax deadline calculator', 'when are quarterly taxes due 2026', 'underpayment penalty calculator', 'irs quarterly tax deadlines', 'did i miss a quarterly tax deadline'],
  },
];

const freelanceBusinessCalculators = [
  {
    slug: 'freelancer-rate-calculator',
    name: 'Freelancer Rate Calculator',
    description: 'Are you charging what you\'re worth? This calculator factors in your expenses, taxes, profit goals, and billable hours to tell you the minimum rate you should charge.',
    category: 'freelance-business',
    url: '/calculator/freelancer-rate-calculator/',
    canonical: '/calculator/freelancer-rate-calculator/',
    color: '#3B82F6',
    icon: '💵',
    tags: ['freelancer rate calculator', 'how much should i charge', 'freelance hourly rate', 'what rate should i charge'],
    faqs: [
      {
        q: 'How do I calculate my freelance rate?',
        a: 'Take your target annual income, add business expenses, add self-employment and income taxes, divide by billable hours per year. Most freelancers underestimate by 30-50% because they forget taxes, expenses, and non-billable time. This calculator does the math for you.',
      },
      {
        q: 'How many billable hours do freelancers actually work?',
        a: 'Most freelancers bill 20-25 hours per week out of a 40-hour work week. The rest goes to admin, marketing, invoicing, and business development. If you bill 40 hours, you\'re probably undercharging or working unsustainable hours.',
      },
      {
        q: 'Should I charge hourly or project-based?',
        a: 'Hourly is simpler but caps your income. Project-based rewards efficiency. Most experienced freelancers switch to project-based or value-based pricing. This calculator gives you the hourly baseline you need to set profitable project rates.',
      },
    ],
    keywords: ['freelancer rate calculator', 'how much should i charge as a freelancer', 'freelance hourly rate calculator', 'what rate to charge freelancing', 'freelance pricing calculator'],
  },
  {
    slug: 'freelancer-profitability-calculator',
    name: 'Freelancer Profitability Calculator',
    description: 'Revenue is vanity, profit is sanity. This calculator shows your actual take-home profit after expenses, taxes, and the costs you didn\'t know you had.',
    category: 'freelance-business',
    url: '/calculator/freelancer-profitability-calculator/',
    canonical: '/calculator/freelancer-profitability-calculator/',
    color: '#8B5CF6',
    icon: '📊',
    tags: ['freelancer profitability calculator', 'freelance profit calculator', 'how profitable is my freelance business', 'freelance income vs expenses'],
    faqs: [
      {
        q: 'What is a good profit margin for freelancers?',
        a: 'Most successful freelancers aim for a 40-60% profit margin (after taxes and business expenses). If you\'re below 30%, you\'re either undercharging or over-spending. Below 15% and you\'re essentially working for free after considering the risks of self-employment.',
      },
      {
        q: 'What expenses should freelancers track?',
        a: 'Track everything: software subscriptions, home office, phone/internet, professional development, marketing, travel, equipment, coworking space, health insurance, retirement contributions, and professional services (accountant, lawyer). These all reduce your taxable income.',
      },
      {
        q: 'How often should I review my freelance profitability?',
        a: 'Monthly minimum, quarterly ideally. Track revenue vs. expenses every month so you can catch pricing problems early. A quarterly review lets you adjust rates, cut expenses, or shift focus before a bad quarter becomes a bad year.',
      },
    ],
    keywords: ['freelancer profitability calculator', 'how profitable is my freelance business', 'freelance profit margin calculator', 'am i making money freelancing', 'freelance income breakdown'],
  },
  {
    slug: 'freelancer-retirement-savings-calculator',
    name: 'Freelancer Retirement Savings Calculator',
    description: 'No employer 401(k) match? No problem. This calculator shows you how much to save monthly to hit your retirement goal — and the best account types for freelancers.',
    category: 'freelance-business',
    url: '/calculator/freelancer-retirement-savings-calculator/',
    canonical: '/calculator/freelancer-retirement-savings-calculator/',
    color: '#10B981',
    icon: '🏦',
    tags: ['freelancer retirement calculator', 'self employed retirement savings', 'sep ira calculator', 'freelance retirement planning'],
    faqs: [
      {
        q: 'How much should a freelancer save for retirement?',
        a: 'Aim for 15-20% of net income. Since you don\'t get an employer match, you may need to save more than traditional employees. A SEP IRA lets you save up to 25% of net self-employment income (up to $70,000 in 2026). A Solo 401(k) allows even more with employee + employer contributions.',
      },
      {
        q: 'What is the best retirement account for freelancers?',
        a: 'SEP IRA: Simplest, contribute up to 25% of net SE income (up to $70k). Solo 401(k): Highest potential contributions with employee + employer portions, plus Roth option. Traditional/Roth IRA: Lower limits but Roth provides tax-free withdrawals. Most freelancers use a SEP IRA for simplicity or a Solo 401(k) for maximum savings.',
      },
      {
        q: 'Can I deduct retirement contributions as a freelancer?',
        a: 'Yes. SEP IRA and Solo 401(k) contributions are deductible from your income, reducing both income tax and SE tax. A $10,000 contribution saves you $2,200-$3,200 in income tax plus $1,530 in SE tax. This calculator shows the exact tax savings.',
      },
    ],
    keywords: ['freelancer retirement savings calculator', 'how much should a freelancer save for retirement', 'sep ira calculator', 'self employed retirement calculator', 'freelance retirement planning calculator'],
  },
];

const sideHustleCalculators = [
  {
    slug: 'etsy-profit-calculator',
    name: 'Etsy Profit Calculator',
    description: 'Selling on Etsy? This calculator shows your actual profit after Etsy fees (transaction fee, listing fee, payment processing), shipping, materials, and taxes. Most sellers are shocked by the real number.',
    category: 'side-hustle',
    url: '/calculator/etsy-profit-calculator/',
    canonical: '/calculator/etsy-profit-calculator/',
    color: '#F97316',
    icon: '🛒',
    tags: ['etsy profit calculator', 'etsy fee calculator', 'how much do i make on etsy', 'etsy seller profit', 'etsy fees breakdown'],
    faqs: [
      {
        q: 'What are all the Etsy fees in 2026?',
        a: 'Etsy charges: $0.20 listing fee per item, 6.5% transaction fee on the sale price + shipping, 3% + $0.25 payment processing fee, and optional ads fees. If you sell internationally, there\'s a 2.5% currency conversion fee. Etsy Plus costs $10/month but doesn\'t reduce fees.',
      },
      {
        q: 'How much profit do Etsy sellers actually make?',
        a: 'It varies wildly. After all fees, many sellers find their profit margin is 20-40% lower than expected. A $30 product might only net $18-22 after Etsy fees, shipping, materials, and taxes. This calculator shows your real take-home.',
      },
      {
        q: 'Do I have to pay taxes on Etsy income?',
        a: 'Yes. The IRS requires you to report all income, including Etsy sales. If you earn over $600 on Etsy in a year, Etsy issues a 1099-K. You owe self-employment tax (15.3%) plus income tax on your net profit. Deducting materials, shipping, fees, and home office expenses reduces your taxable income.',
      },
    ],
    keywords: ['etsy profit calculator 2026', 'etsy fees calculator', 'how much profit do i make on etsy', 'etsy seller profit calculator', 'etsy fees breakdown calculator'],
  },
  {
    slug: 'rideshare-driver-calculator',
    name: 'Rideshare Driver Calculator',
    description: 'Driving for Uber or Lyft? This calculator shows your actual hourly rate after gas, vehicle depreciation, insurance, and self-employment taxes. Spoiler: it\'s less than you think.',
    category: 'side-hustle',
    url: '/calculator/rideshare-driver-calculator/',
    canonical: '/calculator/rideshare-driver-calculator/',
    color: '#06B6D4',
    icon: '🚗',
    tags: ['rideshare driver calculator', 'uber tax calculator', 'lyft profit calculator', 'uber driver expenses', 'rideshare income calculator'],
    faqs: [
      {
        q: 'How much do Uber/Lyft drivers actually make after expenses?',
        a: 'The average gross is $15-25/hour, but after gas ($2-4/hr), vehicle depreciation ($3-5/hr), insurance, maintenance, and self-employment taxes (15.3%), most drivers net $8-15/hour. Some markets are worse. This calculator shows your real hourly rate.',
      },
      {
        q: 'What expenses can rideshare drivers deduct?',
        a: 'Deductible expenses: gas, vehicle depreciation (standard mileage rate or actual expenses), phone, phone mount, cleaning supplies, commercial insurance, tolls, parking, and a portion of your auto insurance. You can\'t deduct your time — only actual costs.',
      },
      {
        q: 'What is the standard mileage rate for 2026?',
        a: 'The IRS standard mileage rate for 2026 is $0.70/mile. This covers gas, depreciation, maintenance, and insurance. You choose either the standard mileage rate OR actual expenses — not both. Most rideshare drivers save more with the standard mileage rate.',
      },
    ],
    keywords: ['rideshare driver profit calculator', 'uber driver tax calculator', 'lyft expenses calculator', 'how much do uber drivers make after expenses', 'rideshare income after expenses'],
  },
  {
    slug: 'freelance-vs-employment-calculator',
    name: 'Freelance vs. Employment Calculator',
    description: 'Should you quit your W-2 and go freelance? This calculator compares the real numbers — salary vs. freelance income after taxes, benefits, and expenses — so you can make the leap with confidence.',
    category: 'side-hustle',
    url: '/calculator/freelance-vs-employment-calculator/',
    canonical: '/calculator/freelance-vs-employment-calculator/',
    color: '#8B5CF6',
    icon: '⚖️',
    tags: ['freelance vs employment calculator', 'should i go freelance', 'freelance vs w2 salary', 'is freelancing worth it', 'freelance income vs salary'],
    faqs: [
      {
        q: 'How much more do I need to earn freelancing to match a $100k salary?',
        a: 'Generally 120-130% of your W-2 salary. On a $100k salary, you\'d need to earn $120-130k freelancing to match the after-tax income — because you pay both employer and employee portions of FICA (15.3%), plus you lose employer benefits (health insurance, 401k match, PTO). This calculator computes the exact break-even.',
      },
      {
        q: 'What benefits do I lose by going freelance?',
        a: 'Major losses: employer health insurance (costs you $500-2,000/mo more), 401(k) match (typically 3-6% of salary), paid time off (10-20 days = $4-8k value), disability insurance, and unemployment benefits. Factor these in when comparing.',
      },
      {
        q: 'When does freelancing make more financial sense than a salary?',
        a: 'When your freelance rate is 2x your hourly salary equivalent, you have 6+ months of savings, you\'re in a high-demand field, and you\'re disciplined about taxes and benefits. Freelancing also wins if you have significant deductible expenses (home office, equipment, travel).',
      },
    ],
    keywords: ['freelance vs employment calculator', 'should i quit my job and freelance', 'freelance income vs salary comparison', 'is freelancing worth it calculator', 'freelance vs w2 income'],
  },
  {
    slug: 'freelance-debt-payoff-calculator',
    name: 'Freelance Debt Payoff Calculator',
    description: 'Variable income makes debt payoff harder. This calculator builds a custom payoff plan based on your income fluctuations — showing the fastest path to debt-free.',
    category: 'side-hustle',
    url: '/calculator/freelance-debt-payoff-calculator/',
    canonical: '/calculator/freelance-debt-payoff-calculator/',
    color: '#EF4444',
    icon: '💳',
    tags: ['debt payoff calculator', 'freelance debt payoff', 'credit card payoff calculator', 'debt snowball calculator', 'how to pay off debt freelancer'],
    faqs: [
      {
        q: 'How do I pay off debt with variable freelance income?',
        a: 'Use a modified debt avalanche: pay minimums on all debts with your baseline income. When you have a good month, throw the surplus at the highest-interest debt first. Build a 1-month income buffer so you can make consistent extra payments even during slow months.',
      },
      {
        q: 'Should I pay off debt or invest as a freelancer?',
        a: 'Pay off any debt with interest above 6-7% before investing. The guaranteed "return" of eliminating a 20% credit card rate beats any investment. After high-interest debt is gone, split surplus between retirement savings and remaining low-interest debt.',
      },
      {
        q: 'How much should freelancers save for emergencies before paying debt?',
        a: 'Keep a $1,000 starter emergency fund, then attack high-interest debt. Once high-interest debt is gone, build 3-6 months of expenses. Freelancers need a larger emergency fund than employees because income is irregular.',
      },
    ],
    keywords: ['freelance debt payoff calculator', 'how to pay off debt with variable income', 'credit card payoff calculator freelancer', 'debt snowball for freelancers', 'freelance financial planning calculator'],
  },
  {
    slug: 'time-tracking-value-calculator',
    name: 'Time Tracking Value Calculator',
    description: 'How much is your time actually worth? This calculator shows you the hourly value of every task — so you know what to outsource, what to automate, and what to do yourself.',
    category: 'side-hustle',
    url: '/calculator/time-tracking-value-calculator/',
    canonical: '/calculator/time-tracking-value-calculator/',
    color: '#14B8A6',
    icon: '⏱️',
    tags: ['time tracking calculator', 'hourly value calculator', 'what is my time worth', 'freelance time tracking', 'task value calculator'],
    faqs: [
      {
        q: 'How do I calculate the value of my time as a freelancer?',
        a: 'Divide your desired annual income by billable hours per year (typically 1,200-1,500). That\'s your baseline hourly value. Then compare: if a task takes you 2 hours but a VA charges $25/hr ($50 total), and your time is worth $100/hr, you lose $150 doing it yourself.',
      },
      {
        q: 'What tasks should freelancers outsource?',
        a: 'Outsource anything that: (1) costs less than your hourly rate, (2) you\'re not good at, (3) doesn\'t generate revenue, or (4) you hate doing. Common outsources: bookkeeping, admin, social media, design, editing, and customer service.',
      },
      {
        q: 'How many hours per week do freelancers spend on non-billable work?',
        a: 'Most freelancers spend 15-20 hours per week on non-billable tasks: admin, marketing, invoicing, emails, and business development. That\'s 40-50% of your work week. Reducing this (through outsourcing, automation, or better systems) directly increases your effective hourly rate.',
      },
    ],
    keywords: ['freelance time value calculator', 'how much is my time worth', 'freelance hourly value calculator', 'time tracking value calculator', 'what should i outsource as a freelancer'],
  },
];

const realEstateCalculators = [
  {
    slug: 'rent-vs-buy-calculator',
    name: 'Rent vs. Buy Calculator',
    description: 'Should you rent or buy? This calculator factors in home price, rent, mortgage rate, property taxes, insurance, maintenance, opportunity cost, and appreciation to show which option wins for your specific situation.',
    category: 'real-estate',
    url: '/calculator/rent-vs-buy-calculator/',
    canonical: '/calculator/rent-vs-buy-calculator/',
    color: '#F59E0B',
    icon: '🏠',
    tags: ['rent vs buy calculator', 'should i rent or buy a house', 'home buying calculator', 'rent vs buy comparison', 'is it better to rent or buy'],
    faqs: [
      {
        q: 'Is it cheaper to rent or buy in 2026?',
        a: 'It depends on your market, how long you plan to stay, and current mortgage rates. In most markets, buying is cheaper after 5-7 years of ownership. But renting wins in the short term (under 5 years) because of closing costs, maintenance, and the opportunity cost of a large down payment.',
      },
      {
        q: 'What hidden costs does buying have that renting doesn\'t?',
        a: 'Property taxes (1-3% of home value/year), homeowner\'s insurance ($1,500-3,000/year), maintenance and repairs (1-2% of home value/year), HOA fees ($200-500/month), closing costs (2-5% of purchase price), and the opportunity cost of your down payment invested elsewhere.',
      },
      {
        q: 'How long do I need to stay in a home for buying to beat renting?',
        a: 'With current mortgage rates (6-7%), you typically need to stay 5-7 years for buying to be cheaper than renting. In expensive markets (NYC, SF), it can take 8-10 years. In affordable markets (Midwest, South), it can be as short as 3-4 years.',
      },
    ],
    keywords: ['rent vs buy calculator 2026', 'should i rent or buy a house calculator', 'is it cheaper to rent or buy', 'home buying cost calculator', 'rent vs buy comparison calculator'],
  },
  {
    slug: 'rental-property-calculator',
    name: 'Rental Property Calculator',
    description: 'Before you buy that rental, know the numbers. This calculator shows cash flow, cap rate, cash-on-cash return, and total ROI — so you can tell a good deal from a money pit.',
    category: 'real-estate',
    url: '/calculator/rental-property-calculator/',
    canonical: '/calculator/rental-property-calculator/',
    color: '#10B981',
    icon: '🏘️',
    tags: ['rental property calculator', 'rental income calculator', 'cap rate calculator', 'cash flow calculator rental', 'is this rental property worth it'],
    faqs: [
      {
        q: 'What is a good cap rate for rental properties?',
        a: 'A "good" cap rate is typically 5-10%, depending on the market. In high-cost areas (NYC, SF), 3-5% is common. In affordable markets (Midwest, South), 8-12% is achievable. Higher cap rate = higher return but often higher risk or less appreciation.',
      },
      {
        q: 'How do I calculate cash flow on a rental property?',
        a: 'Monthly rent minus: mortgage payment (PITI), property management (8-12% of rent), maintenance reserve (5-10%), vacancy allowance (5-8%), insurance, property taxes, and HOA fees. Positive cash flow means the property pays you every month. Most investors target $200-500/month minimum.',
      },
      {
        q: 'What is cash-on-cash return?',
        a: 'Cash-on-cash return = annual pre-tax cash flow ÷ total cash invested (down payment + closing costs + initial repairs). It measures how hard your invested cash is working. A 8-12% cash-on-cash return is considered good. Below 5% and you\'re better off in index funds.',
      },
    ],
    keywords: ['rental property calculator', 'rental cash flow calculator', 'cap rate calculator', 'is this rental property worth it', 'rental property ROI calculator'],
  },
  {
    slug: 'house-flipping-calculator',
    name: 'House Flipping Calculator',
    description: 'Thinking about flipping a house? This calculator shows your total cost, expected profit, and ROI after purchase price, renovation costs, holding costs, and selling fees.',
    category: 'real-estate',
    url: '/calculator/house-flipping-calculator/',
    canonical: '/calculator/house-flipping-calculator/',
    color: '#EC4899',
    icon: '🔨',
    tags: ['house flipping calculator', 'flip calculator', 'house flip profit calculator', 'fix and flip calculator', 'flipping house profit'],
    faqs: [
      {
        q: 'How much profit do house flippers typically make?',
        a: 'According to ATTOM Data, the average gross profit on a house flip in 2025 was about $70,000. But after holding costs, renovation overruns, and selling fees, net profit is typically $30,000-$50,000 per flip — or about 10-20% ROI on invested capital.',
      },
      {
        q: 'What costs do house flippers often forget?',
        a: 'Holding costs: mortgage payments during renovation ($2,000-5,000/mo), utilities, insurance, property taxes. Renovation overruns (budget 20% extra). Selling costs: agent commissions (5-6%), closing costs (1-2%), and carrying costs if the property sits unsold.',
      },
      {
        q: 'What is the 70% rule for house flipping?',
        a: 'The 70% rule says: pay no more than 70% of the after-repair value (ARV) minus renovation costs. Example: ARV = $300k, renovations = $50k → max offer = $300k × 0.70 − $50k = $160k. This leaves room for profit, holding costs, and unexpected expenses.',
      },
    ],
    keywords: ['house flipping calculator', 'house flip profit calculator', 'fix and flip calculator', 'flipping house ROI calculator', '70% rule calculator'],
  },
  {
    slug: 'rental-cash-flow-calculator',
    name: 'Rental Cash Flow Calculator',
    description: 'Positive cash flow is the whole point of rental investing. This calculator shows your monthly and annual cash flow after every expense — mortgage, taxes, insurance, management, vacancy, and maintenance.',
    category: 'real-estate',
    url: '/calculator/rental-cash-flow-calculator/',
    canonical: '/calculator/rental-cash-flow-calculator/',
    color: '#3B82F6',
    icon: '💵',
    tags: ['rental cash flow calculator', 'cash flow calculator rental property', 'monthly cash flow calculator', 'rental income vs expenses'],
    faqs: [
      {
        q: 'How do I calculate monthly cash flow on a rental?',
        a: 'Monthly cash flow = Monthly rent − (Mortgage payment + Property management + Maintenance reserve + Vacancy allowance + Insurance + Property taxes + HOA fees). A positive number means the property pays you each month. Negative means you\'re subsidizing the tenant.',
      },
      {
        q: 'What expenses should I include in my rental cash flow calculation?',
        a: 'Include: mortgage (PITI), property management (8-12% of rent), maintenance reserve (5-10% of rent), vacancy allowance (5-8% of rent), insurance, property taxes, HOA fees, and capital expenditure reserve (for roof, HVAC, etc.). Don\'t forget to account for seasonal vacancies.',
      },
      {
        q: 'Is negative cash flow always bad for rental properties?',
        a: 'Not necessarily. In high-appreciation markets (NYC, SF, LA), investors accept negative cash flow because the property value increases significantly. But for most investors, positive cash flow is essential — it covers your costs and provides income. Target $200-500/month minimum.',
      },
    ],
    keywords: ['rental cash flow calculator', 'monthly cash flow calculator rental', 'rental property cash flow analysis', 'cash flow calculator for landlords', 'positive cash flow calculator'],
  },
  {
    slug: 'mortgage-payment-calculator',
    name: 'Mortgage Payment Calculator',
    description: 'How much will your monthly mortgage payment be? This calculator shows principal and interest, property taxes, insurance, and total PITI — with an amortization schedule breakdown.',
    category: 'real-estate',
    url: '/calculator/mortgage-payment-calculator/',
    canonical: '/calculator/mortgage-payment-calculator/',
    color: '#8B5CF6',
    icon: '🏡',
    tags: ['mortgage payment calculator', 'monthly mortgage calculator', 'how much is my mortgage payment', 'mortgage calculator with taxes and insurance', 'PITI calculator'],
    faqs: [
      {
        q: 'How is my mortgage payment calculated?',
        a: 'Your monthly payment (PITI) = Principal + Interest + Property Taxes + Insurance. Principal and interest are calculated using: M = P[r(1+r)^n] / [(1+r)^n - 1], where P = loan amount, r = monthly interest rate, n = total months. Add monthly property taxes and insurance for the full payment.',
      },
      {
        q: 'How much house can I afford on my income?',
        a: 'A common guideline: your total housing payment (PITI) should be under 28% of gross monthly income, and total debt payments under 36%. On a $100k salary, that\'s roughly a $350-420k home with 20% down. But this varies by market, credit score, and other debts.',
      },
      {
        q: 'Should I put 20% down on my mortgage?',
        a: 'Putting 20% down avoids Private Mortgage Insurance (PMI), which costs $100-300/month on a typical loan. But if you can\'t afford 20%, many conventional loans allow 3-10% down with PMI. Compare: the opportunity cost of a larger down payment vs. PMI cost. Sometimes the money earns more invested.',
      },
    ],
    keywords: ['mortgage payment calculator 2026', 'monthly mortgage payment calculator', 'how much is my mortgage payment', 'mortgage calculator with taxes and insurance', 'affordable home price calculator'],
  },
];

const llcTaxCalculators = [
  {
    slug: 'llc-vs-sole-proprietor-tax-calculator',
    name: 'LLC vs. Sole Proprietor Tax Calculator',
    description: 'LLC or sole proprietor? This calculator shows the actual tax difference — including self-employment tax, liability protection value, and filing requirements — for your specific income level.',
    category: 'llc-tax',
    url: '/calculator/llc-vs-sole-proprietor-tax-calculator/',
    canonical: '/calculator/llc-vs-sole-proprietor-tax-calculator/',
    color: '#F59E0B',
    icon: '🏢',
    tags: ['llc vs sole proprietor tax', 'should i form an llc', 'llc tax calculator', 'sole proprietor vs llc', 'llc tax savings'],
    faqs: [
      {
        q: 'Does an LLC save me taxes compared to a sole proprietor?',
        a: 'A basic LLC (single-member) doesn\'t change your taxes — the IRS treats it the same as a sole proprietor. You still pay self-employment tax on all net income. The tax savings come when you elect S-Corp taxation for your LLC, which can save 15.3% on income above a reasonable salary.',
      },
      {
        q: 'When should I convert from sole proprietor to LLC?',
        a: 'Form an LLC when: (1) you want personal asset protection (separates business and personal liability), (2) you\'re earning enough that the filing fees ($50-500/year) are worth it, (3) you want to appear more professional to clients, or (4) you plan to elect S-Corp taxation later.',
      },
      {
        q: 'What is the tax difference between LLC and S-Corp?',
        a: 'An LLC taxed as a sole prop pays SE tax on all net income. An LLC taxed as an S-Corp pays FICA only on a "reasonable salary" — the rest is a distribution that avoids SE tax. On $150k net income with a $80k salary, S-Corp saves about $10,600/year in SE tax.',
      },
    ],
    keywords: ['llc vs sole proprietor tax calculator', 'should i form an llc for taxes', 'llc tax savings calculator', 'sole proprietor vs llc tax difference', 'llc tax calculator 2026'],
  },
  {
    slug: 's-corp-tax-calculator',
    name: 'S-Corp Tax Calculator',
    description: 'An S-Corp can save you thousands in self-employment tax — but only if the numbers work. This calculator shows your exact savings after FICA, salary, distributions, and state taxes.',
    category: 'llc-tax',
    url: '/calculator/s-corp-tax-calculator/',
    canonical: '/calculator/s-corp-tax-calculator/',
    color: '#3B82F6',
    icon: '📋',
    tags: ['s corp tax calculator', 's corp savings calculator', 'should i elect s corp', 's corp vs llc tax', 's corp reasonable salary'],
    faqs: [
      {
        q: 'How much can I save with S-Corp taxation?',
        a: 'S-Corp saves you SE tax (15.3%) on distributions above your reasonable salary. Example: $200k net income, $100k salary → $100k in distributions avoids SE tax → saves about $15,300/year. But you\'re also paying yourself a salary, so the net savings is the SE tax on the distribution portion.',
      },
      {
        q: 'What is a reasonable salary for S-Corp?',
        a: 'The IRS requires a "reasonable" salary based on your role, experience, and industry. Paying yourself $20k when you should earn $100k invites an audit. Most tax professionals recommend 40-60% of net income as salary. Too low = IRS risk. Too high = no SE tax savings.',
      },
      {
        q: 'When does S-Corp taxation stop making sense?',
        a: 'Below $50-60k net income, S-Corp rarely saves enough to justify the extra costs: payroll processing ($500-1,500/year), additional tax return ($500-1,500/year), and state franchise fees. Above $80-100k net income, S-Corp savings usually outweigh the costs significantly.',
      },
    ],
    keywords: ['s corp tax calculator', 's corp savings calculator', 'should i elect s corp taxation', 's corp vs llc tax calculator', 's corp reasonable salary calculator'],
  },
  {
    slug: 'business-entity-tax-comparison',
    name: 'Business Entity Tax Comparison',
    description: 'Sole proprietor, LLC, S-Corp, C-Corp — which entity saves you the most? This calculator compares all four side-by-side with your actual numbers.',
    category: 'llc-tax',
    url: '/calculator/business-entity-tax-comparison/',
    canonical: '/calculator/business-entity-tax-comparison/',
    color: '#10B981',
    icon: '⚖️',
    tags: ['business entity tax comparison', 'llc vs s corp vs c corp', 'best business structure for taxes', 'sole proprietor vs llc vs s corp'],
    faqs: [
      {
        q: 'Which business entity pays the least in taxes?',
        a: 'It depends on your income level. Below $50k: sole prop or LLC is simplest. $50k-$150k: LLC with S-Corp election often saves the most. Above $150k: S-Corp usually wins. C-Corp (21% flat rate) can work for high-income businesses reinvesting profits, but double taxation makes it rare for solopreneurs.',
      },
      {
        q: 'What are the filing requirements for each entity?',
        a: 'Sole Prop: Schedule C on 1040, self-employment tax. LLC: State filing + Schedule C. LLC (S-Corp): Form 1120-S, K-1, payroll. C-Corp: Form 1120, double taxation. S-Corp has the most compliance requirements: payroll, separate return, and annual state filings.',
      },
      {
        q: 'Can I switch my business entity later?',
        a: 'Yes. You can convert between entities, though it\'s easier to go from sole prop → LLC → S-Corp than the reverse. The IRS allows LLCs to elect S-Corp taxation with Form 2553 (filed by March 15 for the current year). This is the most common tax-saving move for growing freelancers.',
      },
    ],
    keywords: ['business entity tax comparison', 'best business structure for taxes', 'llc vs s corp vs c corp calculator', 'sole proprietor vs llc vs s corp tax', 'business entity tax calculator'],
  },
];

const businessFinanceCalculators = [
  {
    slug: 'break-even-calculator',
    name: 'Break-Even Calculator',
    description: 'How many units do you need to sell to break even? This calculator tells you the exact sales volume needed to cover all fixed and variable costs — so you know if your business idea is viable.',
    category: 'business-finance',
    url: '/calculator/break-even-calculator/',
    canonical: '/calculator/break-even-calculator/',
    color: '#EF4444',
    icon: '📉',
    tags: ['break even calculator', 'break even point calculator', 'how many units to break even', 'break even analysis', 'break even point formula'],
    faqs: [
      {
        q: 'How do I calculate my break-even point?',
        a: 'Break-even point (units) = Fixed costs ÷ (Price per unit − Variable cost per unit). The denominator is your contribution margin. If fixed costs are $50,000, price is $100, and variable cost is $40, you need 834 units to break even.',
      },
      {
        q: 'What is the difference between fixed and variable costs?',
        a: 'Fixed costs stay the same regardless of sales: rent, salaries, insurance, loan payments. Variable costs change with each unit sold: materials, shipping, packaging, transaction fees. Knowing this split is essential for pricing, forecasting, and break-even analysis.',
      },
      {
        q: 'How long do most startups take to break even?',
        a: 'Most small businesses take 18-36 months to break even. Service businesses break even faster (6-12 months) because they have lower startup costs. Product businesses take longer due to inventory, equipment, and marketing costs. Plan for at least 12 months of losses.',
      },
    ],
    keywords: ['break even calculator', 'break even point calculator', 'how many sales to break even', 'break even analysis calculator', 'startup break even calculator'],
  },
  {
    slug: 'startup-runway-calculator',
    name: 'Startup Runway Calculator',
    description: 'How many months can you survive before running out of money? This calculator shows your runway in months — and how many more months you gain by cutting costs or increasing revenue.',
    category: 'business-finance',
    url: '/calculator/startup-runway-calculator/',
    canonical: '/calculator/startup-runway-calculator/',
    color: '#F59E0B',
    icon: '🚀',
    tags: ['startup runway calculator', 'how long can i survive', 'runway calculator startup', 'months of runway', 'burn rate calculator'],
    faqs: [
      {
        q: 'How do I calculate my startup runway?',
        a: 'Runway (months) = Cash on hand ÷ Monthly burn rate. Monthly burn rate = Monthly expenses − Monthly revenue. If you have $100k saved, spend $15k/month, and earn $5k/month, your burn rate is $10k/month and your runway is 10 months.',
      },
      {
        q: 'What is a healthy runway for a startup?',
        a: 'Aim for 12-18 months of runway minimum. 6 months is dangerously short — one bad month and you\'re done. 24+ months gives you breathing room to iterate and find product-market fit. Always add a 20% buffer because expenses are always higher than expected.',
      },
      {
        q: 'How do I extend my runway?',
        a: 'Three levers: (1) Cut fixed costs — renegotiate contracts, switch tools, reduce team. (2) Increase revenue — raise prices, add services, improve conversion. (3) Raise capital — investors, loans, grants. Cutting costs is fastest but has limits. Revenue growth compounds.',
      },
    ],
    keywords: ['startup runway calculator', 'how long can my startup survive', 'months of runway calculator', 'burn rate calculator', 'startup cash runway calculator'],
  },
  {
    slug: 'business-profit-margin-calculator',
    name: 'Business Profit Margin Calculator',
    description: 'What\'s your actual profit margin? This calculator shows gross, operating, and net margins — so you know exactly where your money is going and where to optimize.',
    category: 'business-finance',
    url: '/calculator/business-profit-margin-calculator/',
    canonical: '/calculator/business-profit-margin-calculator/',
    color: '#8B5CF6',
    icon: '📊',
    tags: ['profit margin calculator', 'business profit margin', 'what is my profit margin', 'gross margin calculator', 'net profit margin calculator'],
    faqs: [
      {
        q: 'What is a good profit margin for a small business?',
        a: 'It varies by industry. Service businesses: 15-30% net margin is healthy. Product businesses: 5-20%. Retail: 2-10%. SaaS: 20-40%. If your margin is below the industry average, you\'re either underpricing or overspending.',
      },
      {
        q: 'What is the difference between gross, operating, and net margin?',
        a: 'Gross margin = (Revenue − Cost of goods sold) ÷ Revenue. Operating margin = (Revenue − COGS − Operating expenses) ÷ Revenue. Net margin = Net income ÷ Revenue. Gross shows product profitability. Operating shows business efficiency. Net shows bottom-line health.',
      },
      {
        q: 'How do I improve my profit margin?',
        a: 'Four strategies: (1) Raise prices (most impactful, least effort). (2) Reduce COGS (find cheaper suppliers, improve efficiency). (3) Cut overhead (renegotiate rent, reduce subscriptions, automate). (4) Increase volume (spreads fixed costs over more revenue).',
      },
    ],
    keywords: ['profit margin calculator', 'business profit margin calculator', 'what is my profit margin', 'gross margin calculator', 'net profit margin calculator small business'],
  },
  {
    slug: 'business-debt-payoff-calculator',
    name: 'Business Debt Payoff Calculator',
    description: 'Business debt doesn\'t have to keep you up at night. This calculator shows you the fastest payoff strategy — avalanche vs. snowball — with a month-by-month schedule.',
    category: 'business-finance',
    url: '/calculator/business-debt-payoff-calculator/',
    canonical: '/calculator/business-debt-payoff-calculator/',
    color: '#06B6D4',
    icon: '💳',
    tags: ['business debt payoff calculator', 'business loan payoff calculator', 'debt payoff strategy calculator', 'avalanche vs snowball calculator'],
    faqs: [
      {
        q: 'Should I use the avalanche or snowball method to pay off business debt?',
        a: 'Avalanche (highest interest first) saves the most money mathematically. Snowball (smallest balance first) gives psychological wins faster. If you have high-interest debt (credit cards, MCAs), use avalanche. If you need motivation, use snowball. Both work — pick the one you\'ll stick with.',
      },
      {
        q: 'How do I decide which business debts to pay off first?',
        a: 'Priority: (1) Merchant cash advances and factoring (effective rates often 50-200%). (2) Credit cards (15-25%). (3) Equipment loans (6-15%). (4) SBA loans (6-8%). (5) Friends/family. Always pay minimums on everything else while targeting the highest-rate debt.',
      },
      {
        q: 'Should I use business revenue to pay off debt or reinvest?',
        a: 'Pay off high-interest debt (above 10%) first — the guaranteed return of eliminating that rate beats most investments. For low-interest debt (SBA loans, mortgages), reinvesting in growth often has a higher ROI. Balance: maintain cash reserves while making extra debt payments.',
      },
    ],
    keywords: ['business debt payoff calculator', 'business loan payoff calculator', 'debt avalanche calculator', 'debt snowball calculator business', 'how to pay off business debt'],
  },
  {
    slug: 'saas-metrics-calculator',
    name: 'SaaS Metrics Calculator',
    description: 'Running a SaaS business? This calculator tracks MRR, ARR, churn, LTV, CAC, and payback period — the metrics that determine whether your SaaS is investable.',
    category: 'business-finance',
    url: '/calculator/saas-metrics-calculator/',
    canonical: '/calculator/saas-metrics-calculator/',
    color: '#EC4899',
    icon: '💻',
    tags: ['saas metrics calculator', 'mrr calculator', 'ltv cac calculator', 'saas churn calculator', 'saas unit economics'],
    faqs: [
      {
        q: 'What is a good LTV:CAC ratio for SaaS?',
        a: 'Aim for 3:1 or higher. If your LTV:CAC is below 1:1, you\'re losing money on every customer. 1:1-3:1 is unsustainable. 3:1+ means you have a healthy, scalable business. Below 3:1, either reduce CAC or increase LTV through retention and upsells.',
      },
      {
        q: 'How do I calculate churn rate?',
        a: 'Monthly churn rate = (Customers lost in month ÷ Customers at start of month) × 100. A 5% monthly churn means you lose 5% of customers each month. For SaaS, aim for under 5% monthly (under 2% is excellent). High churn kills growth no matter how fast you acquire.',
      },
      {
        q: 'What is the SaaS payback period?',
        a: 'Payback period = CAC ÷ Monthly revenue per customer. If it costs $500 to acquire a customer paying $50/month, your payback is 10 months. Under 12 months is good. Under 6 months is excellent. Long payback means you need more capital to grow.',
      },
    ],
    keywords: ['saas metrics calculator', 'mrr calculator', 'ltv cac calculator', 'saas churn rate calculator', 'saas unit economics calculator'],
  },
];

const investmentCalculators = [
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    description: 'See how your money grows over time. This calculator shows the power of compound interest with monthly contributions, different compounding frequencies, and inflation adjustment.',
    category: 'investment',
    url: '/calculator/compound-interest-calculator/',
    canonical: '/calculator/compound-interest-calculator/',
    color: '#10B981',
    icon: '📈',
    tags: ['compound interest calculator', 'investment growth calculator', 'how much will my money grow', 'compound interest formula', 'investment calculator with contributions'],
    faqs: [
      {
        q: 'How does compound interest work?',
        a: 'Compound interest earns returns on your original investment PLUS previous returns. Example: $10,000 at 7% compounded annually becomes $10,700 after year 1, then $11,449 after year 2 (interest on $10,700). Over 30 years, $10,000 grows to $76,123 without adding a penny.',
      },
      {
        q: 'How much will $10,000 grow in 10 years?',
        a: 'At 7% annual return (stock market average): $19,672. At 4% (savings account): $14,802. At 10% (aggressive investing): $25,937. Adding $500/month: $10k + contributions = $103,000+ at 7%. The monthly contributions matter more than the initial amount.',
      },
      {
        q: 'What is the rule of 72?',
        a: 'The Rule of 72 estimates how long it takes your money to double: 72 ÷ interest rate = years to double. At 7%: doubles in ~10 years. At 10%: doubles in ~7.2 years. At 4%: doubles in ~18 years. It\'s a quick mental math trick for investment planning.',
      },
    ],
    keywords: ['compound interest calculator', 'compound interest calculator with contributions', 'how much will my investment grow', 'compound interest formula calculator', 'investment growth calculator'],
  },
  {
    slug: 'required-minimum-distribution-calculator',
    name: 'Required Minimum Distribution Calculator',
    description: 'Turning 73? The IRS requires you to start withdrawing from retirement accounts. This calculator shows your exact RMD amount — and the penalties for getting it wrong.',
    category: 'investment',
    url: '/calculator/required-minimum-distribution-calculator/',
    canonical: '/calculator/required-minimum-distribution-calculator/',
    color: '#F59E0B',
    icon: '🏦',
    tags: ['required minimum distribution calculator', 'rmd calculator', 'rmd calculator 2026', 'when do i need to take rmd', 'rmd penalty calculator'],
    faqs: [
      {
        q: 'When do I need to start taking RMDs?',
        a: 'Under SECURE 2.0, RMDs begin at age 73 (for those born 1951-1959) or age 75 (born 1960+). Your first RMD must be taken by April 1 of the year after you turn 73/75. After that, all RMDs must be taken by December 31 each year.',
      },
      {
        q: 'How is my RMD calculated?',
        a: 'RMD = Account balance ÷ Distribution period (from IRS Table III). Example: $500,000 account at age 73 → distribution period is 26.5 → RMD = $18,868. The divisor decreases each year, so RMDs increase as you age.',
      },
      {
        q: 'What is the penalty for not taking my RMD?',
        a: 'The penalty for missing an RMD was 50% of the amount not withdrawn. Under SECURE 2.0, it\'s reduced to 25% (and 10% if corrected within the correction window). Even at 25%, it\'s harsh: missing a $20,000 RMD costs a $5,000 penalty.',
      },
    ],
    keywords: ['required minimum distribution calculator 2026', 'rmd calculator', 'rmd calculator 2026', 'irs rmd calculator', 'required minimum distribution penalty'],
  },
  {
    slug: 'roth-conversion-calculator',
    name: 'Roth Conversion Calculator',
    description: 'Should you convert your traditional IRA to a Roth? This calculator shows the tax cost of converting — and whether the long-term tax-free growth makes it worth it.',
    category: 'investment',
    url: '/calculator/roth-conversion-calculator/',
    canonical: '/calculator/roth-conversion-calculator/',
    color: '#8B5CF6',
    icon: '🔄',
    tags: ['roth conversion calculator', 'should i convert to roth', 'roth ira conversion calculator', 'roth conversion tax calculator', 'backdoor roth calculator'],
    faqs: [
      {
        q: 'How much tax do I pay on a Roth conversion?',
        a: 'The converted amount is added to your taxable income for the year. Example: converting $50,000 while in the 22% bracket = $11,000 in additional federal tax. If it pushes you into the 32% bracket, part is taxed at 32%. Plan conversions to stay within a target bracket.',
      },
      {
        q: 'When does a Roth conversion make sense?',
        a: 'Best when: (1) You\'re in a lower tax bracket now than you expect in retirement. (2) You have years with low income (job loss, sabbatical, early retirement). (3) You want to avoid RMDs. (4) You want tax-free inheritance for heirs. The break-even point is typically 7-10 years.',
      },
      {
        q: 'Can I do a partial Roth conversion?',
        a: 'Yes. You can convert any amount — you don\'t have to convert everything. Many people do partial conversions over several years to manage their tax bracket. This is especially useful if you\'re near a bracket boundary. Convert just enough to fill up your current bracket.',
      },
    ],
    keywords: ['roth conversion calculator', 'should i convert to roth ira calculator', 'roth conversion tax calculator', 'roth conversion strategy calculator', 'is roth conversion worth it'],
  },
  {
    slug: '401k-calculator',
    name: '401(k) Calculator',
    description: 'How much will your 401(k) be worth at retirement? This calculator shows growth with employer matching, contribution limits, and the real impact of starting early vs. late.',
    category: 'investment',
    url: '/calculator/401k-calculator/',
    canonical: '/calculator/401k-calculator/',
    color: '#3B82F6',
    icon: '💼',
    tags: ['401k calculator', '401k growth calculator', 'how much will my 401k be worth', '401k contribution calculator', '401k retirement calculator'],
    faqs: [
      {
        q: 'How much should I contribute to my 401(k)?',
        a: 'At minimum, contribute enough to get the full employer match — that\'s free money (typically 3-6% of salary). Beyond that, aim for 15% of gross income total (including match). For 2026, the max is $23,500 ($31,000 if 50+). Maxing out at 25 can grow to $1M+ in 20 years.',
      },
      {
        q: 'How much will I have in my 401(k) at retirement?',
        a: 'It depends on contributions, match, and returns. Contributing $500/month with 50% employer match ($250/month) at 7% annual return: $750/month → $380,000 in 15 years, $750,000 in 25 years, $1.6M in 35 years. Starting 10 years earlier roughly doubles your balance.',
      },
      {
        q: 'Should I choose traditional or Roth 401(k)?',
        a: 'Choose Roth 401(k) if you expect higher taxes in retirement (you\'re early in career, tax rates may rise). Choose traditional 401(k) if you\'re in a high bracket now and expect lower income in retirement. Many people split contributions for tax diversification.',
      },
    ],
    keywords: ['401k calculator', '401k growth calculator', '401k retirement calculator', 'how much will my 401k be worth', '401k contribution calculator 2026'],
  },
];

export const calculators: Calculator[] = [
  ...freelanceTaxCalculators,
  ...freelanceBusinessCalculators,
  ...sideHustleCalculators,
  ...realEstateCalculators,
  ...llcTaxCalculators,
  ...businessFinanceCalculators,
  ...investmentCalculators,
].map((calc) => ({
  ...calc,
  categorySlug: calc.category,
  question: calc.faqs[0]?.q || '',
  answer: calc.faqs[0]?.a || '',
}));

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((calc) => calc.slug === slug);
}

export function getCalculatorsByCategory(categorySlug: string): Calculator[] {
  return calculators.filter((calc) => calc.category === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function getAllSlugs(): string[] {
  return calculators.map((calc) => calc.slug);
}
