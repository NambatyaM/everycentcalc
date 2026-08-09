import type { FAQ } from './types';

export type GuideBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'callout'; text: string };

export interface GuideSection {
  heading: string;
  blocks: GuideBlock[];
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  categorySlug: string;
  updated: string;
  readMinutes: number;
  primaryCalc: string;
  takeaway: string;
  sections: GuideSection[];
  faqs: FAQ[];
  relatedCalcs: string[];
}

export const guides: Guide[] = [
  {
    slug: 'self-employment-tax-guide',
    title: 'Self-Employment Tax: How Much Do Freelancers Really Pay in 2026?',
    metaTitle: 'Self-Employment Tax 2026: Rates, Deductions & How to Calculate',
    description:
      "In 2026, self-employment tax is 15.3% — 12.4% for Social Security plus 2.9% for Medicare — but you don't owe it on gross income. Here's how to calculate exactly what you owe, the deductions that shrink your bill, and how to pay less legally.",
    categorySlug: 'freelance-tax',
    updated: '2026-08-09',
    readMinutes: 8,
    primaryCalc: 'self-employment-tax-calculator',
    takeaway:
      "Self-employment tax is **15.3%** of your net profit (or roughly 14.13% of gross profit, after the IRS's 0.9235 rule). You owe it only on income over $400, and two levers actually lower your bill: business expenses that cut net profit, and the QBI deduction that cuts income tax.",
    sections: [
      {
        heading: 'What is self-employment tax?',
        blocks: [
          {
            type: 'p',
            text: "Self-employment tax is the Social Security and Medicare contribution that 1099 workers, freelancers, and small business owners pay directly to the IRS. When you're a W-2 employee, your employer covers half of these taxes and withholds your half from every paycheck. When you work for yourself, there's no employer — so you're responsible for **both halves**. That's the real reason the tax feels so expensive the first time you file.",
          },
          {
            type: 'h3',
            text: 'Who has to pay it',
          },
          {
            type: 'list',
            items: [
              'Independent contractors and 1099 workers of any kind',
              'Sole proprietors and single-member LLC owners (pass-through income)',
              'Partners in a partnership',
              'Freelancers with a side hustle — even if you also have a full-time W-2 job',
              'Anyone with **$400 or more** of net self-employment income for the year',
            ],
          },
          {
            type: 'callout',
            text: "If your net profit is under $400, you don't owe self-employment tax at all. But remember: it's net profit — revenue minus expenses — that counts, not your total sales.",
          },
        ],
      },
      {
        heading: 'The 2026 self-employment tax rate, broken down',
        blocks: [
          {
            type: 'p',
            text: 'The 15.3% figure is really two separate taxes with different rules. Social Security tax applies only up to an income cap, while Medicare tax applies to every dollar — and high earners pay an extra surcharge.',
          },
          {
            type: 'table',
            headers: ['Component', '2026 rate', 'Income cap'],
            rows: [
              ['Social Security', '12.4%', 'First $176,100 of net earnings'],
              ['Medicare', '2.9%', 'No cap — applies to every dollar'],
              ['Additional Medicare', '+0.9%', 'Over $200,000 single / $250,000 married joint'],
              ['Total (most filers)', '15.3%', '—'],
            ],
          },
          {
            type: 'p',
            text: "Two numbers above $400 matter. First, the **$176,100 Social Security wage base** — earnings above it are exempt from the 12.4% portion (but not from Medicare). Second, the **additional Medicare tax** adds 0.9% once your income passes the $200,000/$250,000 thresholds, so the truly high earners pay 15.3% + 0.9% on the excess.",
          },
        ],
      },
      {
        heading: 'How to calculate your self-employment tax (with a real example)',
        blocks: [
          {
            type: 'list',
            items: [
              '**Step 1:** Add up your total 1099 income for the year.',
              '**Step 2:** Subtract every legitimate business expense (software, supplies, home office, vehicle, travel). The result is your **net profit**.',
              '**Step 3:** Multiply net profit by **0.9235** — the IRS lets you deduct the employer-half of your SE tax before calculating it.',
              '**Step 4:** Multiply that number by **15.3%** (or the split rates if you are over the wage base).',
            ],
          },
          {
            type: 'p',
            text: '**Example:** You earned $50,000 in 1099 income and had $10,000 in deductions. Net profit is $40,000. Your taxable base is $40,000 × 0.9235 = $36,940, and your self-employment tax is 15.3% × $36,940 = **$5,652**. Half of that — $2,826 — is deductible on your federal income tax return.',
          },
          {
            type: 'callout',
            text: 'Do this by hand once so you understand it, then never again. The {{calc:self-employment-tax-calculator:free self-employment tax calculator}} applies the 2026 wage base, the 0.9235 rule, and the Medicare surcharge automatically — and shows you every line of the math.',
          },
        ],
      },
      {
        heading: 'The deductions that actually shrink your bill',
        blocks: [
          {
            type: 'p',
            text: 'There are two layers of deductions, and it helps to keep them straight. Expenses that reduce your **net profit** lower your SE tax directly. Above-the-line deductions lower your **income tax** but not your SE tax. Use both.',
          },
          {
            type: 'h3',
            text: 'Deductions that cut your self-employment tax',
          },
          {
            type: 'list',
            items: [
              '**Home office** — the exclusive-use portion of rent, utilities, and internet',
              '**Vehicle and mileage** — the standard mileage rate for business miles',
              '**Equipment and software** — computers, cameras, design tools, subscriptions',
              '**Supplies and inventory** — anything consumed by your work',
              '**Business travel and meals** — travel costs plus 50% of qualifying meals',
              '**Health insurance premiums** — for you, your spouse, and dependents',
            ],
          },
          {
            type: 'h3',
            text: 'Deductions that cut your income tax',
          },
          {
            type: 'list',
            items: [
              '**Qualified Business Income (QBI) deduction** — up to 20% of your pass-through income, with no itemizing required',
              '**The employer-half of your SE tax** — the $2,826 from the example above',
              '**Retirement contributions** — solo 401(k) or SEP IRA contributions up to the annual limit',
              '**Self-employed health insurance** — premiums paid from your own pocket',
            ],
          },
          {
            type: 'callout',
            text: 'The QBI deduction is the most-missed lever in freelance taxes. Run your full picture through the {{calc:1099-income-tax-calculator:1099 income tax calculator}} to see SE tax and income tax side by side.',
          },
        ],
      },
      {
        heading: 'W-2 vs. 1099: what the tax difference really is',
        blocks: [
          {
            type: 'p',
            text: 'People often treat self-employment tax like a penalty for going freelance. It isn\u2019t — it\u2019s simply **paying both the employee and employer shares of FICA** that your boss used to cover for you. On $80,000 of income, that\u2019s roughly $12,240 in SE tax versus about $6,120 withheld from a W-2 paycheck.',
          },
          {
            type: 'p',
            text: 'The trade-off cuts the other way too. Self-employed filers can deduct expenses employees can\u2019t, defer income with retirement accounts, and usually land in a lower effective bracket after the QBI deduction. The gross number looks scary; the **net picture is far closer** than people expect — and sometimes better.',
          },
        ],
      },
      {
        heading: 'How to pay less — legally',
        blocks: [
          {
            type: 'list',
            items: [
              '**Max out deductible retirement contributions** before December 31 — every dollar deferred is a dollar not taxed now',
              '**Claim every legitimate expense** with clean records (a receipt tracker beats a shoebox in an audit)',
              '**Run a mileage log** if you drive for work — the standard rate often beats actual costs',
              '**Review an S-Corp election** once your net profit passes roughly $80,000–$100,000; the {{calc:s-corp-tax-calculator:S-Corp tax calculator}} shows if it saves you more than it costs',
              '**Pay estimated taxes on time** — penalties on late quarterly payments quietly undo your savings',
            ],
          },
          {
            type: 'callout',
            text: 'Whatever your final bill, don\u2019t wait until April to pay it. Freelancers are required to pay estimated taxes quarterly — the {{calc:quarterly-tax-calculator:quarterly tax calculator}} tells you exactly what to send at each deadline.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'How much is self-employment tax in 2026?',
        a: 'The self-employment tax rate in 2026 is 15.3%: 12.4% for Social Security (on the first $176,100 of net earnings) and 2.9% for Medicare. High earners pay an additional 0.9% Medicare surcharge on income over $200,000 (single) or $250,000 (married filing jointly).',
      },
      {
        q: 'Is self-employment tax on gross income or net income?',
        a: 'Net income. You owe self-employment tax on profit after deducting legitimate business expenses. Using gross revenue instead of net profit will overstate your bill dramatically — and miss legal deductions.',
      },
      {
        q: 'Do I pay self-employment tax if I have a full-time job too?',
        a: 'Yes, if your self-employment income is $400 or more, you owe SE tax on that income even when a W-2 job already withholds Social Security tax. The Social Security wage base is shared across both jobs, but Medicare tax still applies to your freelance profit.',
      },
      {
        q: 'Can I write off half of my self-employment tax?',
        a: "Yes. The IRS lets you deduct the employer-equivalent half (7.65%) of your self-employment tax as an above-the-line adjustment to income. It lowers your taxable income even if you don't itemize.",
      },
      {
        q: 'Do I need to pay self-employment tax if I have an LLC?',
        a: 'Usually yes. A single-member LLC is taxed as a sole proprietorship by default, so its pass-through profit is subject to self-employment tax. An S-Corp election can reduce that burden once profits are substantial, but it adds payroll costs — model it before switching.',
      },
    ],
    relatedCalcs: ['self-employment-tax-calculator', '1099-income-tax-calculator', 'quarterly-tax-calculator', 's-corp-tax-calculator'],
  },
  {
    slug: 'quarterly-estimated-tax-guide',
    title: 'Quarterly Estimated Taxes 2026: A Complete Guide for Freelancers',
    metaTitle: 'Quarterly Estimated Taxes 2026: Deadlines, Safe Harbor & Penalties',
    description:
      "Freelancers must pay estimated taxes four times a year. Here are the 2026 quarterly tax deadlines, how to calculate each payment, the safe harbor rule that protects you from underpayment penalties, and what to do if you're late.",
    categorySlug: 'freelance-tax',
    updated: '2026-08-09',
    readMinutes: 7,
    primaryCalc: 'quarterly-tax-calculator',
    takeaway:
      "Pay **100% of last year's tax liability** (or 90% of this year's) across the four deadlines — **April 15, June 15, September 15, and January 15** — and you won't owe underpayment penalties. The simplest system: set aside 25–30% of every client payment into a separate account.",
    sections: [
      {
        heading: 'Who has to pay estimated taxes in 2026?',
        blocks: [
          {
            type: 'p',
            text: "Anyone who expects to owe at least **$1,000 in tax for the year** — after employer withholdings and credits — and who isn't covered by enough withholding. In practice, that includes most 1099 contractors, freelancers, gig workers, side-hustlers, landlords, and investors with untaxed gains.",
          },
          {
            type: 'h3',
            text: 'You probably owe estimated taxes if…',
          },
          {
            type: 'list',
            items: [
              'You worked as a freelancer or 1099 contractor last year and owed tax',
              'You run a side hustle in addition to a W-2 job (withholdings rarely cover it)',
              'You rent out a property or earn income without tax withholding',
              'You sold stocks or crypto and owe capital gains tax',
            ],
          },
          {
            type: 'callout',
            text: "The general rule: if you owed tax last year, you'll probably owe estimated taxes this year. The IRS expects payment as you earn income, not once a year.",
          },
        ],
      },
      {
        heading: 'The four 2026 quarterly tax deadlines',
        blocks: [
          {
            type: 'p',
            text: 'Estimated taxes are due four times a year, and each payment covers income from a specific window. When a deadline falls on a weekend or federal holiday, it shifts to the next business day.',
          },
          {
            type: 'table',
            headers: ['Quarter', '2026 due date', 'Covers income earned'],
            rows: [
              ['Q1', 'April 15, 2026', 'January 1 – March 31'],
              ['Q2', 'June 15, 2026', 'April 1 – May 31'],
              ['Q3', 'September 15, 2026', 'June 1 – August 31'],
              ['Q4', 'January 15, 2027', 'September 1 – December 31'],
            ],
          },
          {
            type: 'callout',
            text: "Deadlines shift when they land on a weekend or holiday. The {{calc:quarterly-tax-deadline-calculator:quarterly tax deadline calculator}} shows the exact 2026 dates and how many days remain before your next payment.",
          },
        ],
      },
      {
        heading: 'How to calculate each quarterly payment',
        blocks: [
          {
            type: 'p',
            text: 'The standard method is a four-step projection: estimate your full-year income, subtract deductions, compute the total tax (income tax plus self-employment tax), then divide by four.',
          },
          {
            type: 'list',
            items: [
              '**Step 1:** Estimate your total year income — clients, sales, gigs, everything',
              '**Step 2:** Subtract business expenses, retirement contributions, and the QBI deduction',
              '**Step 3:** Add income tax and self-employment tax for your projected bracket',
              '**Step 4:** Divide by 4 and pay that amount each quarter',
            ],
          },
          {
            type: 'p',
            text: 'If your income comes in **unevenly** — a huge project in March, nothing in May — you can instead use Form 2210\u2019s annualized method, which bases each payment on income actually earned that quarter. It\u2019s more paperwork but can avoid overpaying early.',
          },
          {
            type: 'callout',
            text: 'The easiest path: enter your recent paychecks and expenses into the {{calc:quarterly-tax-calculator:quarterly estimated tax calculator}}. It projects your annual totals and splits the payment across each quarter automatically.',
          },
        ],
      },
      {
        heading: 'The safe harbor rule that protects you from penalties',
        blocks: [
          {
            type: 'p',
            text: 'The IRS won\u2019t charge an underpayment penalty if your quarterly payments total at least **100% of last year\u2019s tax** — or **110%** if your prior-year adjusted gross income was over $150,000 — even if your actual tax for this year ends up higher.',
          },
          {
            type: 'table',
            headers: ['Your last-year AGI', 'Safe harbor target', 'Alternative that also works'],
            rows: [
              ['Under $150,000', '100% of last year\u2019s tax', '90% of this year\u2019s actual tax'],
              ['Over $150,000', '110% of last year\u2019s tax', '90% of this year\u2019s actual tax'],
            ],
          },
          {
            type: 'p',
            text: 'The safe harbor is the **lowest-risk number you can pay** because it doesn\u2019t depend on forecasting this year\u2019s income. That\u2019s why knowing last year\u2019s total tax matters more than almost any other number in your quarterly planning.',
          },
        ],
      },
      {
        heading: 'What happens if you miss a payment?',
        blocks: [
          {
            type: 'p',
            text: 'The IRS charges an **underpayment penalty** on the amount paid late and the number of days it was late — roughly the short-term federal rate plus 3 percentage points, compounded quarterly. It\u2019s calculated per-quarter, so a missed September payment is penalized separately from a missed January payment.',
          },
          {
            type: 'p',
            text: 'If you fall behind, pay as soon as you can — the penalty accrues daily. File **Form 2210** to formally reconcile your payments, and if your income was uneven, use the annualized method to see whether it lowers the penalty.',
          },
          {
            type: 'callout',
            text: 'The {{calc:quarterly-tax-penalty-calculator:quarterly tax penalty calculator}} estimates exactly what a late payment will cost you, so there are no surprises at tax time.',
          },
        ],
      },
      {
        heading: 'A simple system for never missing a payment',
        blocks: [
          {
            type: 'list',
            items: [
              '**Set aside 25–30% of every client payment** the day it lands — before it hits your spending account',
              '**Put it in a separate savings account** labeled "Taxes" so it\u2019s not part of your spending balance',
              '**Automate the transfer by percentage** — many banks let you route a fixed % of deposits automatically',
              '**Calendar every deadline the day it\u2019s announced**, not a week before (holidays shift dates)',
              '**Re-check your set-aside rate each quarter** — as income climbs, your bracket climbs with it',
            ],
          },
          {
            type: 'callout',
            text: 'Not sure what percentage fits your bracket? Work backward from the {{calc:quarterly-tax-calculator:quarterly tax calculator}} for your income level, then round up a few points as a cushion.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What are the 2026 quarterly estimated tax due dates?',
        a: 'April 15, June 15, September 15, and January 15 of the following year. When a date lands on a weekend or holiday it moves to the next business day, so confirm the exact dates each year.',
      },
      {
        q: 'Can I skip estimated payments if I also have a W-2 job?',
        a: "Only if your employer's withholdings, plus any estimated payments, cover at least 90% of your total tax or 100% of last year's liability. Freelance income usually tips you over the $1,000 threshold, so most hybrid workers still pay quarterly.",
      },
      {
        q: 'Is the safe harbor 100% or 110% of last year\u2019s tax?',
        a: "100% for most filers; 110% if your prior-year adjusted gross income exceeded $150,000. Farmers and fishers have special rules and can make a single payment by January 15.",
      },
      {
        q: 'What happens if I miss a quarterly tax deadline?',
        a: "Pay as soon as possible — the underpayment penalty accrues daily on the shortfall. File Form 2210 to reconcile, and check whether the annualized method lowers your penalty if your income was back-loaded.",
      },
      {
        q: 'How much should I set aside for quarterly taxes?',
        a: 'A common starting point is 25–30% of your freelance income. Your exact percentage depends on your bracket, deductions, and state tax — the quarterly tax calculator turns your real numbers into a dollar amount per deadline.',
      },
    ],
    relatedCalcs: ['quarterly-tax-calculator', 'quarterly-tax-deadline-calculator', 'quarterly-tax-penalty-calculator', 'tax-extension-calculator'],
  },
  {
    slug: 'freelancer-rate-guide',
    title: 'How to Set Your Freelance Hourly Rate: The Math That Actually Works',
    metaTitle: 'How to Set Your Freelance Hourly Rate: The Math That Works',
    description:
      "The salary ÷ 2,080 method underpays you. Here's the real formula: add your target income, expenses, and taxes, divide by realistic billable hours — then decide when to raise rates and why project pricing usually beats hourly.",
    categorySlug: 'freelance-business',
    updated: '2026-08-09',
    readMinutes: 7,
    primaryCalc: 'freelancer-rate-calculator',
    takeaway:
      "Your minimum hourly rate = **(target income + business expenses + self-employment tax) ÷ realistic billable hours**. For a $75,000 target with 1,600 billable hours, that's roughly **$60/hr before any profit margin** — not the $36/hr the 'divide by 2080' shortcut would suggest.",
    sections: [
      {
        heading: 'Why "salary ÷ 2,080" underpays you',
        blocks: [
          {
            type: 'p',
            text: "The most common advice is to divide your target salary by 2,080 work hours. It feels smart and it's wrong — it ignores three realities of self-employment: **you can't bill every hour**, **you pay both halves of payroll tax**, and **you have no paid time off or benefits**.",
          },
          {
            type: 'list',
            items: [
              '**Un-billable time:** proposals, admin, client email, marketing, bookkeeping — a realistic freelancer bills 60–75% of a 40-hour week',
              '**Taxes:** you pay both the employee and employer shares of FICA (about 15.3% of profit)',
              '**Benefits:** vacation, sick days, insurance, and retirement all come out of your own rate',
              '**Gaps:** between projects, you earn nothing — your rate has to cover the quiet weeks too',
            ],
          },
          {
            type: 'callout',
            text: 'A rate built on "salary ÷ 2,080" quietly pays you below minimum wage once real hours and taxes are counted. The math has to start with gross profit, not salary.',
          },
        ],
      },
      {
        heading: 'The real cost of being self-employed',
        blocks: [
          {
            type: 'p',
            text: 'Compare your target take-home to what a W-2 employee actually costs their employer. A $75,000 salary becomes roughly **$95,000 in real cost** once payroll taxes, insurance, retirement matching, and paid time off are added. As a freelancer, you absorb all of that yourself — and it has to fit inside your rate.',
          },
          {
            type: 'table',
            headers: ['Item', 'W-2 employer pays', 'Freelancer pays'],
            rows: [
              ['Base salary', '$75,000', '$75,000 (target income)'],
              ['Payroll tax (FICA)', '+$5,738', '+$11,475 (both halves)'],
              ['Health insurance', '+$6,000', '+$6,000'],
              ['Retirement match', '+$4,500', '+$4,500 (if you fund it)'],
              ['Paid time off', '+$4,327', 'Built into billable hours'],
              ['Total real cost', '~$95,565', '~$95,565'],
            ],
          },
          {
            type: 'p',
            text: 'Notice the bottom line matches. **Being self-employed isn\u2019t cheaper for you to run** — it just moves the employer-side costs onto your shoulders, which is exactly why your rate needs to be higher than a simple hourly translation of salary.',
          },
        ],
      },
      {
        heading: 'A three-step formula that actually works',
        blocks: [
          {
            type: 'p',
            text: 'Use this formula once and update it every year. It\u2019s the difference between hoping a rate works and knowing it does.',
          },
          {
            type: 'list',
            items: [
              '**Step 1 — Set your target gross profit.** The income you want before income tax. ($75,000)',
              '**Step 2 — Add expenses and the employer half of self-employment tax.** ($5,000 + $11,475)',
              '**Step 3 — Divide by realistic billable hours.** Plan for ~1,600 hours a year — a full-time freelancer with two to three weeks of vacation.',
            ],
          },
          {
            type: 'table',
            headers: ['Input', 'Example', 'Your numbers'],
            rows: [
              ['Target annual income', '$75,000', '—'],
              ['Business expenses', '$5,000', '—'],
              ['Self-employment tax (est.)', '$11,475', '—'],
              ['Total needed', '$95,000', '—'],
              ['Billable hours / year', '1,600', '—'],
              ['Minimum hourly rate', '$59.38', '—'],
            ],
          },
          {
            type: 'callout',
            text: 'The {{calc:freelancer-rate-calculator:freelancer rate calculator}} runs this exact formula — enter your target income, expenses, and vacation days and it returns your minimum hourly rate, monthly income, and per-project minimums.',
          },
        ],
      },
      {
        heading: 'Hourly vs. project pricing (and why it matters)',
        blocks: [
          {
            type: 'p',
            text: 'Once you know your **floor rate**, consider switching to project pricing. Hourly pricing punishes efficiency — the faster you get, the less you earn. Project pricing lets you estimate scope, multiply by your floor rate plus a risk buffer, and quote a fixed number that rewards speed.',
          },
          {
            type: 'list',
            items: [
              '**Quote a project price** when scope is well-defined and outcomes are clear',
              '**Use a day rate** (6–8× your hourly) for strategy and creative work to reduce client hour-anxiety',
              '**If you must quote hourly,** anchor at your calculated floor and never discount it — every discount cuts expenses and taxes too',
            ],
          },
          {
            type: 'callout',
            text: 'Comparing a salary offer? The {{calc:salary-to-hourly-calculator:salary to hourly calculator}} converts salary, benefits, and PTO into a true hourly equivalent so you can compare apples to apples.',
          },
        ],
      },
      {
        heading: 'When (and how much) to raise your rates',
        blocks: [
          {
            type: 'p',
            text: 'Review your rate every **six to twelve months**. If you\u2019re fully booked, every new client costs you opportunity — your price should rise. A proven rhythm: raise new-client rates 10–20% per year until conversion dips, then optimize scope instead.',
          },
          {
            type: 'list',
            items: [
              '**Raise new-client rates first**, grandfathered clients keep old pricing for a cycle',
              '**Announce annual increases in writing** 30–60 days ahead — it normalizes the conversation',
              '**Re-evaluate grandfathered clients yearly** — loyalty discounts shouldn\u2019t become permanent',
              '**Let low-value work go** when your pipeline is full; capacity is a pricing signal',
            ],
          },
        ],
      },
      {
        heading: 'Six pricing mistakes that cost you money',
        blocks: [
          {
            type: 'list',
            items: [
              '**Underpricing out of fear** — clients rarely leave over price; they leave over delivery',
              '**Basing your rate on a friend\u2019s** — their costs and skill level are different from yours',
              '**Forgetting taxes in the rate** — a 15.3% SE tax plus income tax isn\u2019t optional math',
              '**Quoting a "nice round number"** instead of a calculated one — round after the math, not instead of it',
              '**Never raising rates** — every month you keep an old rate you pay the difference',
              '**Discounting to win** — the discount comes out of your taxes and expenses, not the client\u2019s',
            ],
          },
          {
            type: 'callout',
            text: 'Run your numbers fresh with the {{calc:freelancer-rate-calculator:freelancer rate calculator}} before your next pitch. You\u2019ll walk in with a number you can defend instead of one you hope they\u2019ll accept.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What is a good freelance hourly rate in 2026?',
        a: 'Rates vary by skill and niche, but a defensible floor is: (target income + expenses + taxes) ÷ billable hours. That typically lands general freelancers at $50–$150/hr, and specialists (developers, senior consultants, medical writers) much higher. The math, not the industry average, protects your income.',
      },
      {
        q: 'How many hours should I actually bill each year?',
        a: 'A realistic target is 1,400–1,700 billable hours for a full-time freelancer. That accounts for holidays, sick days, admin, and the business development time you can\u2019t invoice.',
      },
      {
        q: 'How do I convert a salary to an hourly freelance rate?',
        a: 'Take your target salary, add the value of benefits and paid time off, add both halves of payroll tax, then divide by billable hours — not by 2,080. The salary-to-hourly calculator does this in one step.',
      },
      {
        q: 'Should I charge hourly or per project?',
        a: 'Project pricing rewards efficiency and is easier to sell for defined-scope work. Hourly is fine for ongoing support or genuinely variable work. Whatever you use, the floor comes from the same rate formula.',
      },
      {
        q: 'When should I raise my freelance rates?',
        a: 'Review every 6–12 months. Raise new-client rates 10–20% per year until conversion drops, grandfather existing clients for one cycle, and re-evaluate grandfathered pricing annually.',
      },
    ],
    relatedCalcs: ['freelancer-rate-calculator', 'salary-to-hourly-calculator', 'break-even-calculator'],
  },
  {
    slug: 'rent-vs-buy-guide',
    title: 'Rent vs. Buy: The Honest 2026 Comparison',
    metaTitle: 'Rent vs. Buy in 2026: The Honest Math That Decides It',
    description:
      "Renting isn't 'throwing money away.' Whether buying wins depends on price-to-rent ratio, how long you'll stay, and what your down payment could earn invested. Here's how to decide with math instead of emotion.",
    categorySlug: 'real-estate',
    updated: '2026-08-09',
    readMinutes: 7,
    primaryCalc: 'rent-vs-buy-calculator',
    takeaway:
      "Use the **5% rule**: if annual rent is less than 5% of the purchase price, renting usually wins; if it's more, buying tends to come out ahead. Planning to stay **under five years? Rent.** Staying **7+ years?** Buying usually wins. Your break-even date is the number that decides it.",
    sections: [
      {
        heading: 'It\u2019s rent vs. the true cost of owning — not rent vs. mortgage',
        blocks: [
          {
            type: 'p',
            text: 'Comparing your rent check to a mortgage payment misses most of the picture. Owners pay property taxes, insurance, maintenance, HOA fees, and occasional big-ticket repairs. Renters pay none of those directly — the landlord absorbs them into the rent.',
          },
          {
            type: 'h3',
            text: 'The costs owners pay that renters never see',
          },
          {
            type: 'list',
            items: [
              '**Property taxes** — 0.5–1.5% of home value every year, forever',
              '**Maintenance** — budget 1% of the home value per year, plus big-ticket reserves',
              '**Homeowners insurance** — several hundred to thousands a year',
              '**HOA dues** — hundreds a month in many communities',
              '**Closing costs** — 2–5% at purchase, 5–7% again when you sell',
            ],
          },
          {
            type: 'p',
            text: 'The honest comparison nets all of those costs against the equity you build and any appreciation. That\u2019s a far more complex calculation than most people run before making the biggest financial decision of their lives.',
          },
        ],
      },
      {
        heading: 'The opportunity cost of your down payment',
        blocks: [
          {
            type: 'p',
            text: 'A 20% down payment on a $400,000 home is **$80,000 tied up in your house**. Invested in a diversified index fund at a long-run 7–10% return, that same $80,000 could earn roughly **$5,600–$8,000 a year**. Your home\u2019s appreciation on that same equity might be 3–4% — and you can\u2019t easily touch it without refinancing or selling.',
          },
          {
            type: 'callout',
            text: 'Many rent-vs-buy analyses ignore opportunity cost entirely. Counting it flips the conclusion for a surprising number of buyers — especially in high-priced markets.',
          },
        ],
      },
      {
        heading: 'The 5% rule of thumb',
        blocks: [
          {
            type: 'p',
            text: 'A fast sanity check before you run the full math: the true annual cost of owning runs about **5% of the home\u2019s value** — roughly 1% property taxes, 1% maintenance, and 3% opportunity cost on your equity. Now compare it to annual rent.',
          },
          {
            type: 'table',
            headers: ['Your situation', 'Usually smarter'],
            rows: [
              ['Annual rent under 5% of the purchase price', 'Rent'],
              ['Annual rent over 5% of the purchase price', 'Buy'],
              ['Planning to stay under 5 years', 'Rent'],
              ['Planning to stay 7+ years', 'Buy'],
              ['Down payment would earn more than home appreciation', 'Rent'],
              ['You value mobility or minimal maintenance', 'Rent'],
            ],
          },
          {
            type: 'callout',
            text: 'The 5% rule works best in stable markets and breaks down when appreciation is unusually fast or slow. Use it as a first filter, then run the real math for your price, rent, and rate.',
          },
        ],
      },
      {
        heading: 'Why time horizon decides the answer',
        blocks: [
          {
            type: 'p',
            text: 'Buying is **front-loaded with one-time costs**: closing fees, inspections, and often 5–7% in total transaction costs that you\u2019ll pay again when you sell. Amortizing those over 2–3 years usually leaves renting ahead; over 5–7+ years, ownership tends to pull ahead.',
          },
          {
            type: 'list',
            items: [
              '**Under 2 years:** renting almost always wins',
              '**2–5 years:** likely renting wins, unless the market is unusually strong',
              '**5–7 years:** the tipping point — run the real numbers',
              '**7+ years:** buying usually wins on the math',
            ],
          },
          {
            type: 'p',
            text: 'If there\u2019s a real chance you\u2019ll move for a job, family, or city change within five years, renting is usually the lower-risk play. **Your break-even date is the single most useful number in this entire decision.**',
          },
        ],
      },
      {
        heading: 'Hidden costs that sink buyers\u2019 budgets',
        blocks: [
          {
            type: 'list',
            items: [
              '**Repairs and replacements** — a new roof or HVAC runs $10,000–$25,000 with little warning',
              '**The gap between asking price and "move-in ready"** — paint, floors, and fixes add up fast',
              '**Escrow surprises** — property tax and insurance estimates can be low in year one',
              '**Rate and escrow increases** — costs rise over time, so year-one numbers underestimate years five and ten',
            ],
          },
          {
            type: 'p',
            text: 'A good analysis includes these explicitly. The {{calc:rent-vs-buy-calculator:rent vs buy calculator}} accounts for down payment, closing costs, maintenance, taxes, insurance, appreciation, and what your money could earn instead — then gives you your break-even date.',
          },
        ],
      },
      {
        heading: 'When renting is genuinely smarter',
        blocks: [
          {
            type: 'list',
            items: [
              '**You value mobility** — a new job, city, or lifestyle change is on the horizon',
              '**Prices are stretched** — price-to-rent ratios near historic highs favor renting',
              '**You\u2019re not ready for maintenance** — repairs, contractors, and Saturday DIY aren\u2019t free or fun',
              '**Your down payment beats the house** — market returns exceed likely home appreciation',
              '**You\u2019d be house-poor** — ownership costs squeeze savings, investing, and emergency funds',
            ],
          },
          {
            type: 'callout',
            text: 'None of that is shameful. Homeownership is a lifestyle choice as much as an investment — what\u2019s irrational is buying because "rent is dead money" when the numbers say otherwise. Run your own numbers, not the neighborhood\u2019s.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is it better to rent or buy in 2026?',
        a: 'There\u2019s no universal answer. It depends on your price-to-rent ratio, mortgage rate, how long you\u2019ll stay, and what your down payment could earn invested. In most markets, staying under five years favors renting; seven or more years tends to favor buying.',
      },
      {
        q: 'What is the rent vs buy break-even point?',
        a: 'The break-even point is the number of years you must stay in a home before buying becomes cheaper than renting — after closing costs, maintenance, taxes, insurance, and the opportunity cost of your down payment. The rent-vs-buy calculator computes it for your specific numbers.',
      },
      {
        q: 'What is the 5% rule for renting vs buying?',
        a: 'A rule of thumb: the true annual cost of owning is roughly 5% of the home\u2019s value (taxes, maintenance, and opportunity cost). If your annual rent is less than 5% of the purchase price, renting usually wins; if it\u2019s more, buying tends to win.',
      },
      {
        q: 'How much of my income should go to housing?',
        a: 'A common guideline is 25–30% of gross income for total housing costs. Lenders often allow more, but the strict rule protects your other financial goals — saving, investing, and emergencies — from being squeezed by the house.',
      },
      {
        q: 'Is buying a house worth it if I might move in 3 years?',
        a: 'Usually not. The one-time costs of buying and selling (often 5–7% each side) rarely amortize over three years, so renting typically wins unless you expect unusually fast appreciation in your market.',
      },
    ],
    relatedCalcs: ['rent-vs-buy-calculator', 'mortgage-payment-calculator', 'compound-interest-calculator'],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
