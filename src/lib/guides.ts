import type { FAQ } from './types';

export type GuideBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'callout'; text: string }
  | { type: 'svg'; name: string; caption?: string };

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
    title: 'Self Employment Tax in 2026: How Much Freelancers Really Pay and How to Pay Less',
    metaTitle: 'Self Employment Tax 2026: Rate, Calculator, Deductions and How to Lower It',
    description:
      "Self employment tax in 2026 is 15.3% of your net profit, split between Social Security and Medicare. But you don't owe it on gross income, and smart deductions can shrink it dramatically. Here is exactly how the math works, what the IRS lets you deduct, and how to legally pay less every quarter.",
    categorySlug: 'freelance-tax',
    updated: '2026-08-09',
    readMinutes: 14,
    primaryCalc: 'self-employment-tax-calculator',
    takeaway:
      "Self employment tax is **15.3%** of net profit, or roughly 14.13% of gross profit after the IRS 0.9235 rule. You owe it only when net profit passes **$400**, and three levers actually lower the bill: business expenses that cut net profit, the employer half deduction, and the QBI deduction that cuts income tax. Use the {{calc:self-employment-tax-calculator:free self employment tax calculator}} to see your exact number in seconds.",
    sections: [
      {
        heading: 'What is self employment tax?',
        blocks: [
          {
            type: 'p',
            text: "Self employment tax is the Social Security and Medicare contribution that 1099 workers, freelancers, gig workers, and small business owners pay directly to the IRS. When you work a W2 job, your employer covers half of these taxes and quietly withholds your half from every paycheck. When you work for yourself there is no employer to split the cost, so you are responsible for both halves at once.",
          },
          {
            type: 'p',
            text: "That double share is the reason the tax feels so painful the first time you file. A W2 employee earning $80,000 pays roughly $6,120 of their own FICA while their employer chips in another $6,120 behind the scenes. A freelancer with the same $80,000 profit writes a single check for about $12,240. The tax rate is identical, it just looks different because the bill lands entirely on you.",
          },
          {
            type: 'h3',
            text: 'Who has to pay it',
          },
          {
            type: 'list',
            items: [
              'Independent contractors and 1099 workers of any kind',
              'Sole proprietors and single member LLC owners with pass through income',
              'Partners in a partnership and LLC members treated as partners',
              'Freelancers with a side hustle, even if you also hold a full time W2 job',
              'Anyone with **$400 or more** of net self employment income for the year',
              'Gig workers earning from apps like Uber, DoorDash, Etsy, and Amazon',
            ],
          },
          {
            type: 'callout',
            text: "If your net profit is under $400, you don't owe self employment tax at all. Remember that it is net profit, revenue minus expenses, that counts, not your total sales. A business that earns $50,000 but spends $40,000 on legitimate costs only owes SE tax on the $10,000 that remains.",
          },
          {
            type: 'p',
            text: "One more group often surprises people: freelancers who also have a W2 job. You owe self employment tax on the $400 plus of self employment profit even while your employer is already withholding Social Security tax. The wage base is shared between both jobs, so the total Social Security cap applies across your combined earnings, but Medicare tax still hits your freelance profit on top of your salary.",
          },
        ],
      },
      {
        heading: 'The 2026 self employment tax rate, broken down',
        blocks: [
          {
            type: 'p',
            text: "The 15.3% figure is really two separate taxes with different rules. Social Security tax applies only up to an income cap, Medicare tax applies to every dollar, and high earners owe an extra surcharge on top. Getting the split right matters because the cap changes the math at higher incomes.",
          },
          {
            type: 'svg',
            name: 'se-tax-breakdown',
            caption: 'How the 15.3% self employment tax rate splits between Social Security and Medicare.',
          },
          {
            type: 'table',
            headers: ['Component', '2026 rate', 'Income cap'],
            rows: [
              ['Social Security', '12.4%', 'First $184,500 of net earnings'],
              ['Medicare', '2.9%', 'No cap, applies to every dollar'],
              ['Additional Medicare', '+0.9%', 'Over $200,000 single / $250,000 married joint'],
              ['Total for most filers', '15.3%', 'No additional surcharge'],
            ],
          },
          {
            type: 'p',
            text: "Three numbers above $400 matter. First, the **$184,500 Social Security wage base** for 2026, the ceiling above which earnings are exempt from the 12.4% portion but still owe Medicare. Second, the **additional Medicare tax** of 0.9% that kicks in once income passes the $200,000 single or $250,000 married thresholds, so very high earners pay 15.3% plus 0.9% on the excess. Third, the **0.9235 multiplier**, the IRS rule that lets you deduct the employer half of the tax before calculating the tax itself, which effectively lowers the real rate to about 14.13% of gross profit.",
          },
          {
            type: 'p',
            text: "A quick way to think about it: for the vast majority of freelancers, self employment tax is simply 15.3% of net profit, and the complicated caps only matter once you cross roughly $200,000 of combined income. Below that level the answer is predictable and easy to estimate.",
          },
        ],
      },
      {
        heading: 'How to calculate your self employment tax, step by step',
        blocks: [
          {
            type: 'p',
            text: "The IRS computes self employment tax on Schedule SE, which you file alongside your return. The math has four steps and each one is simple on its own. Here is the full path from gross revenue to your final bill.",
          },
          {
            type: 'svg',
            name: 'se-tax-steps',
            caption: 'The four steps from total income to your self employment tax bill.',
          },
          {
            type: 'list',
            items: [
              '**Step 1:** Add up every dollar of self employment income for the year, from all clients, apps, and platforms.',
              '**Step 2:** Subtract every legitimate business expense such as software, supplies, home office, vehicle, travel, and health insurance. The result is your **net profit**.',
              '**Step 3:** Multiply net profit by **0.9235**. The IRS lets you deduct the employer half of the SE tax before calculating it.',
              '**Step 4:** Multiply that result by **15.3%**, or apply the split rates if you are over the wage base or additional Medicare threshold.',
            ],
          },
          {
            type: 'p',
            text: "**Worked example:** You earned $50,000 in 1099 income and had $10,000 in valid deductions. Net profit is $40,000. Your taxable base is $40,000 multiplied by 0.9235, which equals $36,940. Self employment tax is 15.3% of that, which is $5,652. Half of it, $2,826, is deductible on your federal income tax return. That deduction does not reduce the SE tax itself, but it lowers your taxable income, and the money you keep is real.",
          },
          {
            type: 'p',
            text: "Now raise the income and watch the caps change the answer. At $200,000 of net profit, Social Security tax applies only up to the $184,500 base, so you pay $22,878 on the first portion and Medicare on the full $200,000, which adds the 0.9% surcharge on the amount over the threshold. The final bill is no longer a flat 15.3%, which is exactly why the calculator exists.",
          },
          {
            type: 'callout',
            text: 'Do this by hand once so you truly understand it, then never again. The {{calc:self-employment-tax-calculator:free self employment tax calculator}} applies the 2026 wage base, the 0.9235 rule, and the Medicare surcharge automatically, and shows every line of the math so the answer always checks out.',
          },
        ],
      },
      {
        heading: 'The deductions that actually shrink your bill',
        blocks: [
          {
            type: 'p',
            text: "There are two distinct layers of deductions, and mixing them up is a common and costly mistake. Expenses that reduce your net profit lower your self employment tax directly, because SE tax is computed on profit. Above the line deductions lower your income tax but not your SE tax. You want to use both layers, and each one has its own rules.",
          },
          {
            type: 'h3',
            text: 'Deductions that cut your self employment tax',
          },
          {
            type: 'list',
            items: [
              '**Home office** using the exclusive use portion of rent, utilities, and internet',
              '**Vehicle and mileage** using the standard mileage rate for business miles',
              '**Equipment and software** such as computers, cameras, design tools, and subscriptions',
              '**Supplies and inventory** consumed by your work',
              '**Business travel and meals**, including 50% of qualifying meals',
              '**Health insurance premiums** for you, your spouse, and dependents',
            ],
          },
          {
            type: 'h3',
            text: 'Deductions that cut your income tax but not your SE tax',
          },
          {
            type: 'list',
            items: [
              '**Qualified Business Income (QBI) deduction**, up to 20% of pass through income, with no itemizing required',
              '**The employer half of your SE tax**, the $2,826 from the example above',
              '**Retirement contributions** to a solo 401(k) or SEP IRA up to the annual limit',
              '**Self employed health insurance** premiums paid from your own pocket',
            ],
          },
          {
            type: 'p',
            text: "The QBI deduction is the most missed lever in freelance taxes. It lets you exclude up to 20% of your qualified business income from income tax entirely, and you do not have to itemize to claim it. On $40,000 of net profit you could shield up to $8,000 from income tax before any other deduction, which is worth hundreds of dollars in most brackets. It does not reduce SE tax, but it does reduce the other half of your bill.",
          },
          {
            type: 'callout',
            text: 'Run your full picture through the {{calc:1099-income-tax-calculator:1099 income tax calculator}} to see SE tax and income tax side by side, including the QBI deduction and the employer half of SE tax.',
          },
        ],
      },
      {
        heading: 'W2 vs 1099: what the tax difference really is',
        blocks: [
          {
            type: 'p',
            text: "People often treat self employment tax as a penalty for going freelance. It isn't. It is simply paying both the employee and employer shares of FICA that a boss used to cover. On $80,000 of income that is roughly $12,240 in SE tax versus about $6,120 withheld from a W2 paycheck. The gross difference looks enormous, but the trade off cuts the other way too.",
          },
          {
            type: 'p',
            text: "Self employed filers can deduct expenses employees cannot, defer income with retirement accounts, and usually land in a lower effective bracket after the QBI deduction. The gross number looks scary, but the net picture is far closer than people expect, and for many freelancers it is actually better. When you compare a W2 salary to freelance income, always compare after tax, after deduction numbers, never the headline rate.",
          },
          {
            type: 'table',
            headers: ['Factor', 'W2 employee', 'Self employed'],
            rows: [
              ['FICA share you pay', '7.65%', '15.3%'],
              ['Health insurance deductibility', 'Often pre tax', 'Deductible when self employed'],
              ['Home office deduction', 'Almost never', 'Available with rules'],
              ['QBI 20% deduction', 'No', 'Yes, up to income limit'],
              ['Vehicle and mileage', 'Very limited', 'Full business use'],
            ],
          },
          {
            type: 'p',
            text: "The honest way to think about it: going freelance gives up the employer share subsidy on paper, but it hands back a toolkit of deductions that most employees simply cannot access. Run your own numbers with the {{calc:freelance-vs-employment-calculator:freelance vs employment calculator}} before assuming a W2 offer is automatically better.",
          },
        ],
      },
      {
        heading: 'How to pay less, legally',
        blocks: [
          {
            type: 'p',
            text: "There is a reliable order of operations for legally lowering your self employment tax and income tax together. It starts with the things that reduce profit and ends with the elections that restructure how you pay.",
          },
          {
            type: 'list',
            items: [
              '**Max out deductible retirement contributions** before December 31, every dollar deferred is a dollar not taxed now',
              '**Claim every legitimate expense** with clean records, since a receipt tracker beats a shoebox in an audit',
              '**Run a mileage log** if you drive for work, the standard rate often beats actual costs',
              '**Take the home office deduction** with the simplified method if you qualify, it is easier than people think',
              '**Pay estimated taxes on time**, because penalties on late quarterly payments quietly undo your savings',
              '**Review an S Corp election** once net profit passes roughly $80,000 to $100,000, the {{calc:s-corp-tax-calculator:S Corp tax calculator}} shows if it saves more than it costs',
            ],
          },
          {
            type: 'p',
            text: "The S Corp question deserves extra attention because it is the biggest structural lever. An S Corp owner takes a reasonable salary subject to payroll tax, then takes the remaining profit as a distribution that avoids self employment tax entirely. On $150,000 of net profit with an $80,000 salary, that can save close to $10,000 a year in SE tax. But it adds payroll processing, an extra tax return, and state filing fees, so the savings only win above a real income threshold.",
          },
          {
            type: 'callout',
            text: "Whatever your final bill, don't wait until April to pay it. Freelancers are required to pay estimated taxes quarterly, and the {{calc:quarterly-tax-calculator:quarterly tax calculator}} tells you exactly what to send at each deadline so you never owe a surprise at filing time.",
          },
        ],
      },
      {
        heading: 'State taxes on self employment income',
        blocks: [
          {
            type: 'p',
            text: "Self employment tax is purely federal, but most states add their own layer on top of your freelance profit. Every state except Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming charges a personal income tax that applies to your net business income. A few states also tax you on gross receipts or charge LLC and S Corp franchise fees regardless of profit.",
          },
          {
            type: 'p',
            text: "Because state tax is computed on the same net profit figure, every deduction that lowers your federal SE tax lowers your state tax too. That is why the home office, mileage, and retirement deductions compound in value. If you operate across multiple states, remember that app based gig work can create filing obligations in every state where you earn, which is a common surprise for rideshare drivers and freelancers who travel.",
          },
          {
            type: 'p',
            text: "Check whether your state offers a QBI style deduction as well, because several states conform to the federal 20% exclusion and a few have added their own versions. The {{calc:self-employment-tax-calculator:self employment tax calculator}} focuses on the federal bill, so pair it with your state revenue agency's estimator to get the complete picture.",
          },
        ],
      },
      {
        heading: 'Common mistakes that inflate your self employment tax',
        blocks: [
          {
            type: 'list',
            items: [
              '**Paying SE tax on gross revenue** instead of net profit, which overstates the bill by ignoring every deduction',
              '**Skipping the 0.9235 multiplier**, which makes the calculation look bigger than it really is',
              '**Missing the employer half deduction**, a real tax saving that applies even when you do not itemize',
              '**Forgetting the QBI deduction**, worth up to 20% of pass through income against income tax',
              '**Not tracking small expenses**, since a $5 monthly subscription is a deduction people forget and the IRS never checks if you never claim it',
              '**Ignoring quarterly deadlines**, where a 5% late penalty quietly erases a chunk of your savings',
              '**Paying zero salary in an S Corp**, which invites IRS scrutiny and can undo the whole structure',
            ],
          },
          {
            type: 'callout',
            text: "Audits are rare but they do happen, and the freelancers who survive them cleanly are the ones with organized records. A simple spreadsheet or a receipt scanning app costs minutes a month and can be the difference between a smooth audit and a painful one.",
          },
        ],
      },
      {
        heading: 'When should you hire a professional?',
        blocks: [
          {
            type: 'p',
            text: "For most freelancers a good tax software package plus the calculators on this site is enough. But there are clear moments to spend money on a CPA: the year you buy property, the year you start an S Corp or LLC, the year you have a large one time income spike, and the year you first earn from multiple states. In those situations the complexity is real and the professional fee is usually paid for by the savings they find.",
          },
          {
            type: 'p',
            text: "The good news is you do not need a professional to get the baseline right. The four step math on this page, combined with the {{calc:1099-income-tax-calculator:1099 income tax calculator}} and the {{calc:quarterly-tax-calculator:quarterly tax calculator}}, gets you to a correct, defensible estimate that you can hand to anyone for review.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'How much is self employment tax in 2026?',
        a: 'The self employment tax rate in 2026 is 15.3%, which is 12.4% for Social Security on the first $184,500 of net earnings plus 2.9% for Medicare on all of it. High earners pay an additional 0.9% Medicare surcharge once income passes $200,000 single or $250,000 married filing jointly.',
      },
      {
        q: 'Is self employment tax based on gross income or net income?',
        a: 'Net income. You owe self employment tax only on profit after deducting legitimate business expenses. Using gross revenue instead of net profit will overstate your bill dramatically and miss legal deductions that could save you thousands.',
      },
      {
        q: 'Do I pay self employment tax if I already have a full time job?',
        a: 'Yes, if your self employment profit is $400 or more you owe SE tax on that profit even when a W2 job already withholds Social Security tax. The Social Security wage base is shared across both jobs, but Medicare tax still applies to your freelance profit on top of your salary.',
      },
      {
        q: 'Can I write off half of my self employment tax?',
        a: "Yes. The IRS lets you deduct the employer equivalent half, 7.65%, of your self employment tax as an above the line adjustment to income. It lowers your taxable income even if you don't itemize, so it is a real saving on top of the SE tax itself.",
      },
      {
        q: 'Do I pay self employment tax if I have an LLC?',
        a: 'Usually yes. A single member LLC is taxed as a sole proprietorship by default, so its pass through profit is subject to self employment tax. An S Corp election can reduce that burden once profit is substantial, but it adds payroll and filing costs, so model it before switching.',
      },
      {
        q: 'What is the Social Security wage base for 2026?',
        a: 'The 2026 Social Security wage base is $184,500 of net earnings. Earnings above that amount are exempt from the 12.4% Social Security portion of self employment tax, but the 2.9% Medicare portion still applies to every dollar, plus the 0.9% surcharge for high earners.',
      },
      {
        q: 'Do I need to pay self employment tax quarterly?',
        a: 'Yes. If you expect to owe $1,000 or more in tax for the year, the IRS expects estimated tax payments in April, June, September, and January. Paying quarterly avoids the underpayment penalty and keeps the bill predictable.',
      },
    ],
    relatedCalcs: ['self-employment-tax-calculator', '1099-income-tax-calculator', 'quarterly-tax-calculator', 's-corp-tax-calculator'],
  },
  {
    slug: 'quarterly-estimated-tax-guide',
    title: 'Quarterly Estimated Taxes 2026: Deadlines, Safe Harbor, and How to Never Miss a Payment',
    metaTitle: 'Quarterly Estimated Tax 2026: Deadlines, Safe Harbor Rule and Penalty Calculator',
    description:
      "Freelancers must pay estimated taxes four times a year. Here are the exact 2026 quarterly deadlines, how to calculate each payment, the safe harbor rule that protects you from underpayment penalties, and a simple system for never missing a due date again.",
    categorySlug: 'freelance-tax',
    updated: '2026-08-09',
    readMinutes: 13,
    primaryCalc: 'quarterly-tax-calculator',
    takeaway:
      "Pay **100% of last year's tax liability** (or 110% if your prior year AGI was over $150,000) across the four deadlines, **April 15, June 15, September 15, and January 15**, and you will not owe underpayment penalties even if this year earns more. The simplest system that works: set aside 25 to 30% of every client payment into a separate account the day it lands.",
    sections: [
      {
        heading: 'Who has to pay estimated taxes in 2026?',
        blocks: [
          {
            type: 'p',
            text: "Anyone who expects to owe at least **$1,000 in tax for the year** after employer withholdings and credits, and who is not already covered by enough withholding, must pay estimated taxes. In practice that includes most 1099 contractors, freelancers, gig workers, side hustlers, landlords, and investors who sell stocks or crypto at a gain.",
          },
          {
            type: 'p',
            text: "The IRS operates on a simple principle: taxes are due as you earn income, not once a year in April. Employees satisfy this automatically because employers withhold from every paycheck. When your income has no withholding, the IRS expects you to estimate and prepay four times a year instead. Ignoring that requirement does not avoid the tax, it just adds a penalty on top of the bill you owe anyway.",
          },
          {
            type: 'h3',
            text: 'You probably owe estimated taxes if',
          },
          {
            type: 'list',
            items: [
              'You worked as a freelancer or 1099 contractor last year and owed tax',
              'You run a side hustle in addition to a W2 job, and withholdings rarely cover the extra income',
              'You rent out a property and receive rental income with no withholding',
              'You sold stocks, crypto, or other assets and owe capital gains tax',
              'You received interest, dividends, or retirement distributions without withholding',
              'You are self employed full time and your entire income is untaxed at the source',
            ],
          },
          {
            type: 'callout',
            text: "The general rule is reliable: if you owed tax last year, you will probably owe estimated taxes this year. The IRS expects payment as you earn, so the safest habit is to treat quarterly tax as a non negotiable business expense from your very first freelance paycheck.",
          },
        ],
      },
      {
        heading: 'The four 2026 quarterly tax deadlines',
        blocks: [
          {
            type: 'p',
            text: "Estimated taxes are due four times a year, and each payment covers income from a specific window. When a deadline falls on a weekend or federal holiday it shifts to the next business day, so the calendar date can move by a day or two in some years.",
          },
          {
            type: 'svg',
            name: 'quarterly-timeline',
            caption: 'The four 2026 estimated tax deadlines and the income window each one covers.',
          },
          {
            type: 'table',
            headers: ['Quarter', '2026 due date', 'Covers income earned'],
            rows: [
              ['Q1', 'April 15, 2026', 'January 1 to March 31'],
              ['Q2', 'June 15, 2026', 'April 1 to May 31'],
              ['Q3', 'September 15, 2026', 'June 1 to August 31'],
              ['Q4', 'January 15, 2027', 'September 1 to December 31'],
            ],
          },
          {
            type: 'p',
            text: "Note that the windows are not even. The second quarter covers only two months while the fourth covers four, which is a quirk of the IRS calendar. For payment purposes you can ignore the windows entirely and simply pay one quarter of your projected annual tax each time, which is what most freelancers do and it is perfectly acceptable.",
          },
          {
            type: 'callout',
            text: "Deadlines shift when they land on a weekend or holiday. The {{calc:quarterly-tax-deadline-calculator:quarterly tax deadline calculator}} shows the exact 2026 dates and how many days remain before your next payment, so you never guess wrong.",
          },
        ],
      },
      {
        heading: 'How to calculate each quarterly payment',
        blocks: [
          {
            type: 'p',
            text: "The standard method is a four step projection: estimate your full year income, subtract deductions, compute the total tax for the year, then divide by four. It takes ten minutes and gives you a payment amount you can set on autopilot.",
          },
          {
            type: 'list',
            items: [
              '**Step 1:** Estimate your total income for the year from clients, sales, gigs, rentals, and investments',
              '**Step 2:** Subtract business expenses, retirement contributions, and the QBI deduction',
              '**Step 3:** Add federal income tax and self employment tax together for your projected bracket',
              '**Step 4:** Divide the total by 4 and pay that amount by each deadline',
            ],
          },
          {
            type: 'p',
            text: "If your income arrives **unevenly**, a big project in March and nothing in May, you can instead use the annualized method on Form 2210, which bases each payment on income actually earned during that specific quarter. It requires more paperwork but can prevent you from overpaying early in the year and locking up cash you need for expenses.",
          },
          {
            type: 'p',
            text: "A real example keeps the math honest. Suppose you project $80,000 of freelance profit, expect $9,000 in deductions and retirement contributions, and land in the 22% bracket. Federal income tax on roughly $55,000 of taxable income is about $8,000, and self employment tax on the profit is about $11,200. Add them, subtract any credits, and your total for the year is roughly $19,200, so each quarterly payment is about $4,800.",
          },
          {
            type: 'callout',
            text: "The easiest path is to enter your recent paychecks and expenses into the {{calc:quarterly-tax-calculator:quarterly estimated tax calculator}}. It projects your annual totals and splits the payment across each quarter automatically, with no manual bracket math.",
          },
        ],
      },
      {
        heading: 'The safe harbor rule that protects you from penalties',
        blocks: [
          {
            type: 'p',
            text: "The IRS will not charge an underpayment penalty if your quarterly payments total at least **100% of last year's tax**, or **110%** if your prior year adjusted gross income was over $150,000, even when your actual tax for this year ends up much higher. This is called the safe harbor, and it is the most valuable number in your quarterly planning.",
          },
          {
            type: 'svg',
            name: 'safe-harbor',
            caption: 'How the safe harbor rule sets your minimum quarterly payment target.',
          },
          {
            type: 'table',
            headers: ['Your prior year AGI', 'Safe harbor target', 'Alternative that also works'],
            rows: [
              ['Under $150,000', '100% of last year tax', '90% of this year actual tax'],
              ['Over $150,000', '110% of last year tax', '90% of this year actual tax'],
            ],
          },
          {
            type: 'p',
            text: "The safe harbor is the lowest risk number you can pay because it does not depend on forecasting this year's income at all. If last year's tax bill was $12,000, paying $3,000 each quarter guarantees you owe no penalty even if this year's income doubles. That certainty is why knowing last year's total tax matters more than almost any other number in your planning.",
          },
          {
            type: 'p',
            text: "The 90% alternative matters when you have a strong estimate of this year's income and it is clearly lower than last year's. In that case paying 90% of the lower actual tax is cheaper than paying 100% of last year's higher bill. Most freelancers use whichever target is smaller, and both are fully legal.",
          },
          {
            type: 'callout',
            text: "If last year's tax bill is available in your files, open it before you do anything else this quarter. It instantly tells you the minimum you can safely pay at every deadline.",
          },
        ],
      },
      {
        heading: 'What happens if you miss a payment?',
        blocks: [
          {
            type: 'p',
            text: "The IRS charges an **underpayment penalty** on the amount you paid late and the number of days it was late, at roughly the short term federal rate plus 3 percentage points, compounded quarterly. It is calculated separately for each quarter, so a missed September payment is penalized independently of a missed January payment.",
          },
          {
            type: 'p',
            text: "The penalty is an interest charge, not a fine, but it accrues daily and it compounds, so it quietly erodes your savings the longer you wait. If you fall behind, pay as soon as you can because every day of delay adds to the total. Then file **Form 2210** to formally reconcile what you paid, and if your income was uneven, use the annualized method to see whether it lowers the penalty you owe.",
          },
          {
            type: 'p',
            text: "There is also a separate late filing penalty that applies if you skip a whole deadline without paying anything at all, and it can be steeper than the interest on a partial payment. The combination is why catching up even one week late is always better than waiting until April to deal with everything at once.",
          },
          {
            type: 'callout',
            text: "The {{calc:quarterly-tax-penalty-calculator:quarterly tax penalty calculator}} estimates exactly what a late payment will cost you, so there are no surprises at tax time and you can decide whether paying now or waiting is actually cheaper.",
          },
        ],
      },
      {
        heading: 'How to set the right percentage for your situation',
        blocks: [
          {
            type: 'p',
            text: "The 25 to 30% rule of thumb works for most freelancers, but the right number depends on three variables: your income bracket, the size of your deductions, and whether you owe state tax. A freelancer earning $40,000 in a low tax state might only need 20%, while a six figure earner in California can need 35% or more.",
          },
          {
            type: 'list',
            items: [
              '**Under $30,000 profit:** set aside 15 to 20%, most of it self employment tax',
              '**$30,000 to $75,000 profit:** set aside 25 to 30%, a mix of SE tax and income tax',
              '**$75,000 to $150,000 profit:** set aside 30 to 35%, higher brackets start to bite',
              '**Over $150,000 profit:** set aside 35% or more, and strongly review an S Corp election',
              '**Add 2 to 5 points** for high income tax states like California, Oregon, or New York',
            ],
          },
          {
            type: 'p',
            text: "The percentage is just a starting point. What matters is that you recalculate it whenever your income jumps, because a 30% set aside on $50,000 of profit leaves you short if a single great month pushes you to $90,000 for the year.",
          },
          {
            type: 'callout',
            text: "Not sure what percentage fits your bracket? Work backward from the {{calc:quarterly-tax-calculator:quarterly tax calculator}} for your income level, then round up a few points as a cushion. An overpayment becomes a refund; an underpayment becomes a penalty.",
          },
        ],
      },
      {
        heading: 'A simple system for never missing a payment',
        blocks: [
          {
            type: 'p',
            text: "Missing a deadline is almost never a math problem, it is a system problem. The freelancers who pay on time every year do not rely on discipline, they rely on automation and separation. Here is the exact system that works.",
          },
          {
            type: 'list',
            items: [
              '**Set aside 25 to 30% of every client payment** the day it lands, before it ever touches your spending account',
              '**Put it in a separate savings account** labeled Taxes so it never looks like spendable money',
              '**Automate the transfer by percentage** because most banks let you route a fixed share of deposits automatically',
              '**Calendar every deadline the day it is announced**, not a week before, because holidays shift dates',
              '**Recheck your set aside rate each quarter** since your bracket climbs as income climbs',
              '**Pay through the IRS Direct Pay portal** which takes two minutes and records your payment instantly',
            ],
          },
          {
            type: 'p',
            text: "The psychology is the trick. Money that sits in your checking account will get spent, not because you are undisciplined but because every budgeting decision is easier when cash is visible. A separate tax account with an automated deposit makes the decision for you, and by tax time you are never scrambling for money you already spent.",
          },
          {
            type: 'callout',
            text: "Combine the system with the calculators on this page and you have a complete workflow: the {{calc:quarterly-tax-calculator:quarterly tax calculator}} tells you the dollar amount, the {{calc:quarterly-tax-deadline-calculator:deadline calculator}} tells you when, and the automatic set aside makes sure the money exists on both days.",
          },
        ],
      },
      {
        heading: 'Common mistakes and how to avoid them',
        blocks: [
          {
            type: 'list',
            items: [
              '**Paying from the wrong bank account** and accidentally spending the money you set aside',
              '**Using last year\u2019s safe harbor but never updating it**, which works until your income drops and you overpay for no reason',
              '**Forgetting that state taxes are also due quarterly** in many states, with their own separate deadlines',
              '**Assuming the deadline is always the 15th**, when weekends and holidays push it to the next business day',
              '**Waiting until April to catch up**, which converts a manageable quarterly bill into a penalty stack',
              '**Ignoring the annualized method** when income is back loaded, which makes you overpay all year for no reason',
            ],
          },
          {
            type: 'callout',
            text: "If this is your first year as a freelancer, note that the penalty can be waived for the first year if the shortfall was caused by reasonable cause. Claim it correctly with Form 2210 and keep the documentation that explains why you underestimated.",
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
        q: 'Can I skip estimated payments if I also have a W2 job?',
        a: "Only if your employer's withholdings plus any estimated payments cover at least 90% of your total tax or 100% of last year's liability. Freelance income usually tips you over the $1,000 threshold, so most hybrid workers still pay quarterly.",
      },
      {
        q: 'Is the safe harbor 100% or 110% of last year tax?',
        a: "100% for most filers, 110% if your prior year adjusted gross income exceeded $150,000. Farmers and fishers have special rules and can make a single payment by January 15.",
      },
      {
        q: 'What happens if I miss a quarterly tax deadline?',
        a: "Pay as soon as possible because the underpayment penalty accrues daily on the shortfall. File Form 2210 to reconcile, and check whether the annualized method lowers your penalty if your income was back loaded.",
      },
      {
        q: 'How much should I set aside for quarterly taxes?',
        a: 'A common starting point is 25 to 30% of your freelance income. Your exact percentage depends on your bracket, deductions, and state tax, and the quarterly tax calculator turns your real numbers into a dollar amount per deadline.',
      },
      {
        q: 'Do state estimated taxes have the same deadlines as federal?',
        a: 'Most states use the same four deadlines as the IRS, but a few states have different dates or different minimum payment rules. Check your state revenue agency for its schedule, since a late state payment triggers a separate penalty from the federal one.',
      },
      {
        q: 'What if I overpay my quarterly estimated taxes?',
        a: "Overpayment is the safe side of the error. You either receive a refund or apply the excess to next year's tax when you file. Underpayment is the expensive side, so when in doubt, round your quarterly payment up.",
      },
    ],
    relatedCalcs: ['quarterly-tax-calculator', 'quarterly-tax-deadline-calculator', 'quarterly-tax-penalty-calculator', 'tax-extension-calculator'],
  },
  {
    slug: 'freelancer-rate-guide',
    title: 'How to Set Your Freelance Hourly Rate: The Math That Actually Works in 2026',
    metaTitle: 'Freelance Hourly Rate Calculator Guide 2026: The Formula That Works',
    description:
      "The salary divided by 2,080 method underpays you. The real formula adds your target income, business expenses, and self employment tax, then divides by realistic billable hours. This guide shows the full math, when to raise rates, and why project pricing usually beats hourly.",
    categorySlug: 'freelance-business',
    updated: '2026-08-09',
    readMinutes: 13,
    primaryCalc: 'freelancer-rate-calculator',
    takeaway:
      "Your minimum hourly rate is **(target income + business expenses + self employment tax) divided by realistic billable hours**. For a $75,000 target with 1,600 billable hours, that is roughly **$60 per hour before any profit margin**, not the $36 per hour the divide by 2,080 shortcut suggests. The formula, not the industry average, protects your income.",
    sections: [
      {
        heading: 'Why the salary divided by 2,080 method underpays you',
        blocks: [
          {
            type: 'p',
            text: "The most common advice for setting a freelance rate is to divide your target salary by 2,080, the number of full time work hours in a year. It feels smart and it is wrong, because it ignores three realities of self employment: **you cannot bill every hour**, **you pay both halves of payroll tax**, and **you have no paid time off or benefits**.",
          },
          {
            type: 'p',
            text: "A full time job pays you for every hour you are in the building, including lunch breaks, meetings, and the slow Tuesday afternoons. A freelancer only earns money for the hours a client is willing to pay for. Everything else, proposals, admin, client email, marketing, bookkeeping, and learning new skills, is unpaid work that still has to be covered by the rate you charge.",
          },
          {
            type: 'list',
            items: [
              '**Unbillable time:** proposals, admin, client email, marketing, and bookkeeping, since a realistic freelancer bills 60 to 75% of a 40 hour week',
              '**Taxes:** you pay both the employee and employer shares of FICA, about 15.3% of profit',
              '**Benefits:** vacation, sick days, insurance, and retirement all come out of your own rate',
              '**Gaps:** between projects you earn nothing, so your rate has to cover the quiet weeks too',
              '**Tooling:** software, hardware, and training that an employer would provide',
            ],
          },
          {
            type: 'callout',
            text: "A rate built on salary divided by 2,080 quietly pays you below minimum wage once real hours and taxes are counted. The math has to start with gross profit, not salary, or you are volunteering your time to a client who thinks they are paying fair market value.",
          },
        ],
      },
      {
        heading: 'The real cost of being self employed',
        blocks: [
          {
            type: 'p',
            text: "Compare your target take home to what a W2 employee actually costs their employer. A $75,000 salary becomes roughly **$95,000 in real cost** once payroll taxes, insurance, retirement matching, and paid time off are added on. As a freelancer you absorb all of that yourself, and every dollar of it has to fit inside your rate.",
          },
          {
            type: 'svg',
            name: 'w2-vs-freelance',
            caption: 'The true cost of a W2 employee versus the same cost shouldered by a freelancer.',
          },
          {
            type: 'table',
            headers: ['Item', 'W2 employer pays', 'Freelancer pays'],
            rows: [
              ['Base salary', '$75,000', '$75,000 (target income)'],
              ['Payroll tax (FICA)', '+$5,738', '+$11,475 (both halves)'],
              ['Health insurance', '+$6,000', '+$6,000'],
              ['Retirement match', '+$4,500', '+$4,500 (if you fund it)'],
              ['Paid time off', '+$4,327', 'Built into billable hours'],
              ['Software and hardware', '+$3,000', '+$3,000'],
              ['Total real cost', '~$98,565', '~$98,565'],
            ],
          },
          {
            type: 'p',
            text: "Notice that the bottom line matches. **Being self employed is not cheaper for you to run**, it just moves the employer side costs onto your shoulders. That is exactly why your rate needs to be higher than a simple hourly translation of salary, and why a rate that looks high to a client can still leave you underpaid.",
          },
          {
            type: 'p',
            text: "This is also why comparing a freelance rate to a W2 hourly rate is misleading without a load factor. A $50 per hour freelance rate is not comparable to a $50 per hour W2 wage. Once taxes, benefits, downtime, and tools are included, the freelancer equivalent of a $50 W2 wage is closer to $85 to $95 per hour.",
          },
          {
            type: 'callout',
            text: "If you are weighing a job offer against freelance work, the {{calc:freelance-vs-employment-calculator:freelance vs employment calculator}} converts both sides into one comparable after tax number so you are not comparing apples to oranges.",
          },
        ],
      },
      {
        heading: 'A three step formula that actually works',
        blocks: [
          {
            type: 'p',
            text: "Use this formula once and update it every year. It is the difference between hoping a rate works and knowing it does, and it takes about five minutes with a calculator.",
          },
          {
            type: 'svg',
            name: 'rate-formula',
            caption: 'The three part formula: total needed income divided by realistic billable hours.',
          },
          {
            type: 'list',
            items: [
              '**Step 1, set your target gross profit.** Decide the income you want before income tax. In the example that is $75,000.',
              '**Step 2, add expenses and the employer half of self employment tax.** Add $5,000 of business costs plus roughly $11,475 of SE tax.',
              '**Step 3, divide by realistic billable hours.** Plan for about 1,600 hours a year, a full time freelancer with two to three weeks of vacation.',
            ],
          },
          {
            type: 'table',
            headers: ['Input', 'Example', 'Your numbers'],
            rows: [
              ['Target annual income', '$75,000', 'your number'],
              ['Business expenses', '$5,000', 'your number'],
              ['Self employment tax (estimate)', '$11,475', 'your number'],
              ['Total needed', '$95,000', 'your number'],
              ['Billable hours per year', '1,600', 'your number'],
              ['Minimum hourly rate', '$59.38', 'your number'],
            ],
          },
          {
            type: 'p',
            text: "The rate that comes out of this formula is a floor, not a target. It is the number below which you are losing money, and any quote below it should trigger a red flag. Above the floor you can price based on positioning, demand, and the value you deliver, but the floor itself is non negotiable if the business is going to survive.",
          },
          {
            type: 'p',
            text: "To make the formula concrete, imagine you want $75,000 of take home before income tax. Add $5,000 of software, marketing, and supplies. Add the employer half of self employment tax, which on this profit is about $11,475. Your total needed is $95,000. Divide by 1,600 billable hours and your minimum rate is $59.38 per hour. Every hour you bill below that number is a quiet subsidy to the client.",
          },
          {
            type: 'callout',
            text: "The {{calc:freelancer-rate-calculator:freelancer rate calculator}} runs this exact formula. Enter your target income, expenses, and vacation days and it returns your minimum hourly rate, monthly income, and per project minimums in seconds.",
          },
        ],
      },
      {
        heading: 'Hourly vs project pricing, and why it matters',
        blocks: [
          {
            type: 'p',
            text: "Once you know your **floor rate**, consider switching to project pricing. Hourly pricing punishes efficiency, because the faster you get, the less you earn per project. Project pricing lets you estimate scope, multiply by your floor rate plus a risk buffer, and quote a fixed number that rewards speed instead of punishing it.",
          },
          {
            type: 'list',
            items: [
              '**Quote a project price** when scope is well defined and outcomes are clear',
              '**Use a day rate** of 6 to 8 times your hourly for strategy and creative work, which reduces client hour anxiety',
              '**If you must quote hourly,** anchor at your calculated floor and never discount it, since every discount cuts expenses and taxes too',
              '**Add a scope buffer** of 20 to 30% to project estimates, because clients almost always ask for more',
              '**Price by outcome** when you can, since the client is buying the result, not your time',
            ],
          },
          {
            type: 'p',
            text: "Project pricing has a second advantage that is easy to miss: it decouples your income from your hours. The moment your rate stops depending on the clock, the ceiling on your earnings disappears. A freelancer who can deliver $10,000 of value in 20 hours is not worth $250 per hour, they are worth a $10,000 project fee.",
          },
          {
            type: 'callout',
            text: "Comparing a salary offer? The {{calc:salary-to-hourly-calculator:salary to hourly calculator}} converts salary, benefits, and paid time off into a true hourly equivalent, so you can compare a job offer to your freelance floor on equal footing.",
          },
        ],
      },
      {
        heading: 'When, and how much, to raise your rates',
        blocks: [
          {
            type: 'p',
            text: "Review your rate every **six to twelve months**. If you are fully booked, every new client costs you opportunity, and your price should rise to reflect that. A proven rhythm is to raise new client rates 10 to 20% per year until conversion dips, then optimize scope instead of price.",
          },
          {
            type: 'list',
            items: [
              '**Raise new client rates first,** and let grandfathered clients keep old pricing for one cycle',
              '**Announce annual increases in writing** 30 to 60 days ahead, which normalizes the conversation',
              '**Reevaluate grandfathered clients yearly,** because loyalty discounts should not become permanent',
              '**Let low value work go** when your pipeline is full, since capacity is a pricing signal',
              '**Track your true hourly rate** after the project ends, and raise prices whenever it lands below the floor',
            ],
          },
          {
            type: 'p',
            text: "The most reliable signal to raise rates is a full calendar. When you are turning away work, your price is too low by definition. The second most reliable signal is your realized hourly rate, the project fee divided by actual hours spent, which is very often lower than people expect once admin time is counted.",
          },
          {
            type: 'p',
            text: "Raise prices in a way that protects relationships. Existing clients rarely notice a 10% increase if it is announced politely and tied to the value you deliver. New clients have no reference point, so they absorb increases more easily. The goal is a small annual increase rather than a huge jump every few years, which is the pattern that loses clients.",
          },
        ],
      },
      {
        heading: 'Six pricing mistakes that cost you money',
        blocks: [
          {
            type: 'list',
            items: [
              '**Underpricing out of fear,** when clients rarely leave over price and usually leave over delivery',
              '**Basing your rate on a friend,** since their costs and skill level are different from yours',
              '**Forgetting taxes in the rate,** because a 15.3% SE tax plus income tax is not optional math',
              '**Quoting a nice round number** instead of a calculated one, so round after the math, not instead of it',
              '**Never raising rates,** since every month you keep an old rate you pay the difference',
              '**Discounting to win the deal,** because the discount comes out of your taxes and expenses, not the client bottom line',
            ],
          },
          {
            type: 'p',
            text: "Underpricing is the most common and the most expensive mistake, and it compounds. A rate set $20 too low on a 1,500 hour year costs $30,000 a year, every year, silently. That is not a negotiation problem, it is a math problem that no amount of extra projects will fix, because every extra project at the wrong rate just multiplies the loss.",
          },
          {
            type: 'callout',
            text: "Run your numbers fresh with the {{calc:freelancer-rate-calculator:freelancer rate calculator}} before your next pitch. You will walk in with a number you can defend instead of one you hope they will accept.",
          },
        ],
      },
      {
        heading: 'How to price for beginners and specialists',
        blocks: [
          {
            type: 'p',
            text: "The formula above gives a universal floor, but market position matters above it. Beginners with less than two years of experience should price near the floor and trade some margin for portfolio and testimonials. Established specialists should price well above it, because clients pay for outcome and risk reduction, not hours.",
          },
          {
            type: 'table',
            headers: ['Position', 'Typical rate band', 'Strategy'],
            rows: [
              ['Beginner, under 2 years', '$30 to $60 per hour', 'Price near the floor, build testimonials'],
              ['Established, 2 to 5 years', '$60 to $120 per hour', 'Raise 10 to 20% per year'],
              ['Senior specialist', '$120 to $250 per hour', 'Move to day rates and project pricing'],
              ['Niche expert or agency', '$250+ per hour or retainer', 'Price by outcome and positioning'],
            ],
          },
          {
            type: 'p',
            text: "None of these bands override the formula. They are guidance for where to set the rate above your floor. A beginner whose floor is $48 should not charge $25 to win work, and a specialist whose floor is $80 should not discount to $55 to close a deal. The market band sets the ceiling, the formula sets the floor, and the space between them is where you negotiate.",
          },
          {
            type: 'callout',
            text: "Use the {{calc:freelance-project-rate-calculator:freelance project rate calculator}} to turn your hourly floor into a defensible per project quote, and the {{calc:break-even-calculator:break even calculator}} to see exactly how much work you need to sell at that rate to cover your costs.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What is a good freelance hourly rate in 2026?',
        a: 'Rates vary by skill and niche, but a defensible floor is target income plus expenses plus taxes divided by billable hours. That typically lands general freelancers at $50 to $150 per hour, and specialists like developers, senior consultants, and medical writers much higher. The math, not the industry average, protects your income.',
      },
      {
        q: 'How many hours should I actually bill each year?',
        a: 'A realistic target is 1,400 to 1,700 billable hours for a full time freelancer. That accounts for holidays, sick days, admin, and the business development time you cannot invoice.',
      },
      {
        q: 'How do I convert a salary to an hourly freelance rate?',
        a: 'Take your target salary, add the value of benefits and paid time off, add both halves of payroll tax, then divide by billable hours, not by 2,080. The salary to hourly calculator does this in one step.',
      },
      {
        q: 'Should I charge hourly or per project?',
        a: 'Project pricing rewards efficiency and is easier to sell for defined scope work. Hourly is fine for ongoing support or genuinely variable work. Whatever you use, the floor comes from the same rate formula.',
      },
      {
        q: 'When should I raise my freelance rates?',
        a: 'Review every 6 to 12 months. Raise new client rates 10 to 20% per year until conversion drops, grandfather existing clients for one cycle, and reevaluate grandfathered pricing annually.',
      },
      {
        q: 'Why is my rate not covering my costs?',
        a: 'Most likely you are basing the rate on billable hours but forgetting unbillable time, taxes, benefits, and downtime. Recompute your floor with the full formula and raise your price, or add a load factor of 1.5 to 1.9 on top of your ideal hourly salary equivalent.',
      },
    ],
    relatedCalcs: ['freelancer-rate-calculator', 'salary-to-hourly-calculator', 'break-even-calculator', 'freelance-project-rate-calculator'],
  },
  {
    slug: 'rent-vs-buy-guide',
    title: 'Rent vs Buy in 2026: The Honest Math That Decides It',
    metaTitle: 'Rent vs Buy Calculator Guide 2026: Break Even Point and the 5% Rule',
    description:
      "Renting is not throwing money away. Whether buying wins depends on your price to rent ratio, how long you will stay, and what your down payment could earn invested. This guide shows the true cost of owning, the 5% rule, and how to find your break even date.",
    categorySlug: 'real-estate',
    updated: '2026-08-09',
    readMinutes: 13,
    primaryCalc: 'rent-vs-buy-calculator',
    takeaway:
      "Use the **5% rule**: if annual rent is less than 5% of the purchase price, renting usually wins, and if it is more, buying tends to come out ahead. Planning to stay **under five years? Rent.** Staying **7 or more years?** Buying usually wins. Your break even date, not the mortgage payment, is the number that decides it.",
    sections: [
      {
        heading: 'It is rent versus the true cost of owning, not rent versus mortgage',
        blocks: [
          {
            type: 'p',
            text: "Comparing your rent check to a mortgage payment misses most of the picture. Owners pay property taxes, insurance, maintenance, HOA fees, and occasional big ticket repairs. Renters pay none of those directly, because the landlord absorbs them into the rent. The honest comparison nets all of those owner costs against the equity you build and any appreciation.",
          },
          {
            type: 'p',
            text: "This is where most rent versus buy analyses go wrong. People look at a $2,400 mortgage payment and a $2,200 rent check, conclude the mortgage is barely more expensive, and decide to buy. They forget the $400 a month in property taxes, the $150 a month in insurance, the $250 a month in maintenance reserves, and the $12,000 in closing costs they paid on day one. Suddenly renting was the cheaper option all along.",
          },
          {
            type: 'h3',
            text: 'The costs owners pay that renters never see',
          },
          {
            type: 'list',
            items: [
              '**Property taxes** of 0.5 to 1.5% of home value every year, forever',
              '**Maintenance** budgeted at about 1% of the home value per year, plus big ticket reserves',
              '**Homeowners insurance** at several hundred to thousands of dollars a year',
              '**HOA dues** at hundreds a month in many communities',
              '**Closing costs** of 2 to 5% at purchase and 5 to 7% again when you sell',
              '**Capital expenditures** like roofs, HVAC, and appliances on their own unpredictable schedule',
            ],
          },
          {
            type: 'p',
            text: "None of these are optional. A roof fails, an AC unit dies, and property tax reassessments happen whether you budgeted for them or not. The buyers who feel house poor are rarely the ones who overspent on the down payment, they are the ones who ignored the ongoing carrying costs until the first big repair arrived.",
          },
        ],
      },
      {
        heading: 'The opportunity cost of your down payment',
        blocks: [
          {
            type: 'p',
            text: "A 20% down payment on a $400,000 home is **$80,000 tied up in your house**. Invested in a diversified index fund at a long run 7 to 10% return, that same $80,000 could earn roughly **$5,600 to $8,000 a year**. Your home appreciation on that same equity might be 3 to 4%, and you cannot easily touch the money without refinancing or selling.",
          },
          {
            type: 'p',
            text: "That difference is the opportunity cost of your down payment, and it is the most ignored number in the entire decision. A house that appreciates 3% on $80,000 of equity is working at half the rate of the same money in a simple index fund. Over ten years that compounds into tens of thousands of dollars of difference, and it has to be paid out of the house value before buying can win.",
          },
          {
            type: 'callout',
            text: "Many rent versus buy analyses ignore opportunity cost entirely. Counting it flips the conclusion for a surprising number of buyers, especially in high priced markets where a large down payment sits idle in a slowly appreciating asset.",
          },
        ],
      },
      {
        heading: 'The 5% rule of thumb',
        blocks: [
          {
            type: 'p',
            text: "A fast sanity check before you run the full math: the true annual cost of owning runs about **5% of the home value** each year, roughly 1% property taxes, 1% maintenance, and 3% opportunity cost on your equity. Now compare that to your annual rent.",
          },
          {
            type: 'svg',
            name: 'five-percent-rule',
            caption: 'The 5% rule: compare your annual rent to 5% of the purchase price.',
          },
          {
            type: 'table',
            headers: ['Your situation', 'Usually smarter'],
            rows: [
              ['Annual rent under 5% of the purchase price', 'Rent'],
              ['Annual rent over 5% of the purchase price', 'Buy'],
              ['Planning to stay under 5 years', 'Rent'],
              ['Planning to stay 7 or more years', 'Buy'],
              ['Down payment would earn more than home appreciation', 'Rent'],
              ['You value mobility or minimal maintenance', 'Rent'],
            ],
          },
          {
            type: 'p',
            text: "Worked out: a $400,000 home with annual rent of $18,000 has a price to rent ratio where rent is 4.5% of the price, slightly under the 5% threshold, so renting edges out on this rule. If the same home rents for $24,000 a year, that is 6% of the price, and buying looks smarter. The rule is a filter, not a verdict, but it is remarkably good at catching the obvious cases fast.",
          },
          {
            type: 'callout',
            text: "The 5% rule works best in stable markets and breaks down when appreciation is unusually fast or slow. Use it as a first filter, then run the real math for your price, rent, and rate.",
          },
        ],
      },
      {
        heading: 'Why your time horizon decides the answer',
        blocks: [
          {
            type: 'p',
            text: "Buying is **front loaded with one time costs**: closing fees, inspections, and often 5 to 7% in total transaction costs that you will pay again when you sell. Amortizing those over two to three years usually leaves renting ahead, while over five to seven or more years ownership tends to pull ahead as the equity builds and the one time costs fade into the background.",
          },
          {
            type: 'svg',
            name: 'break-even',
            caption: 'The break even point is where owning catches up to renting.',
          },
          {
            type: 'list',
            items: [
              '**Under 2 years:** renting almost always wins',
              '**2 to 5 years:** likely renting wins, unless the market is unusually strong',
              '**5 to 7 years:** the tipping point, so run the real numbers',
              '**7 or more years:** buying usually wins on the math',
            ],
          },
          {
            type: 'p',
            text: "If there is a real chance you will move for a job, family, or a city change within five years, renting is usually the lower risk play. The transaction costs of buying and selling are the heaviest weight in the decision, and the shorter your stay, the heavier they feel. **Your break even date is the single most useful number in this entire decision.**",
          },
          {
            type: 'p',
            text: "A helpful way to think about it: every year you own the home you amortize the closing costs a little further, build a little more equity, and capture a year of appreciation. Every year you rent you keep the flexibility and the invested down payment. The break even date is the year those two lines cross, and past it, each additional year tips the scales more firmly toward buying.",
          },
        ],
      },
      {
        heading: 'Hidden costs that sink buyer budgets',
        blocks: [
          {
            type: 'list',
            items: [
              '**Repairs and replacements** such as a new roof or HVAC running $10,000 to $25,000 with little warning',
              '**The gap between asking price and move in ready** where paint, floors, and fixes add up fast',
              '**Escrow surprises** when property tax and insurance estimates are low in year one',
              '**Rate and escrow increases** where costs rise over time and year one numbers underestimate years five and ten',
              '**Opportunity cost** of the down payment and of the maintenance money that could have been invested',
            ],
          },
          {
            type: 'p',
            text: "The hidden cost that hurts most people is the timeline. A buyer who runs the numbers at a 6% mortgage rate and 2% appreciation is making decisions today that will play out over ten years. Rates, taxes, and insurance all move in that window, and the year five numbers can look very different from the year one numbers that convinced you to sign.",
          },
          {
            type: 'callout',
            text: "A good analysis includes these explicitly. The {{calc:rent-vs-buy-calculator:rent vs buy calculator}} accounts for down payment, closing costs, maintenance, taxes, insurance, appreciation, and what your money could earn instead, then gives you your break even date.",
          },
        ],
      },
      {
        heading: 'When renting is genuinely smarter',
        blocks: [
          {
            type: 'list',
            items: [
              '**You value mobility** and a new job, city, or lifestyle change is on the horizon',
              '**Prices are stretched** and price to rent ratios near historic highs favor renting',
              '**You are not ready for maintenance** because repairs, contractors, and weekend DIY are not free or fun',
              '**Your down payment beats the house** when market returns exceed likely home appreciation',
              '**You would be house poor** and ownership costs squeeze savings, investing, and emergency funds',
              '**Your career is early** and income is still growing faster than your housing needs are stable',
            ],
          },
          {
            type: 'p',
            text: "None of that is shameful. Homeownership is a lifestyle choice as much as an investment. What is irrational is buying because rent is dead money when the numbers say otherwise, because renting is buying the option to relocate, invest, and avoid maintenance, and that option has real value that shows up in the math.",
          },
          {
            type: 'p',
            text: "The most expensive mistake in this entire decision is making it emotionally. A house is the largest purchase most people ever make, and it is surrounded by family pressure, social norms, and the myth that renters are wasting money. The antidote is the same for everyone: run your own numbers, with your own down payment, your own rent, and your own time horizon, and let the break even date speak.",
          },
          {
            type: 'callout',
            text: "Run your own numbers, not the neighborhood. The {{calc:rent-vs-buy-calculator:rent vs buy calculator}} needs only your rent, price, down payment, and planned stay to give you a clear answer in under a minute.",
          },
        ],
      },
      {
        heading: 'How to run your own comparison in four steps',
        blocks: [
          {
            type: 'list',
            items: [
              '**Step 1, gather your numbers.** Rent, purchase price, down payment, mortgage rate, planned years of stay, and expected appreciation.',
              '**Step 2, estimate the annual cost of owning.** Mortgage payments plus property tax, insurance, maintenance at 1%, and HOA.',
              '**Step 3, add the one time and opportunity costs.** Closing costs, plus what your down payment would earn invested each year.',
              '**Step 4, compare totals over your planned stay.** If owning is cheaper over that horizon and you can comfortably cover the cash flow, buying wins.',
            ],
          },
          {
            type: 'p',
            text: "The comparison is only honest if it runs over your actual planned stay, because the first years of owning are dominated by transaction costs and the later years are dominated by equity and appreciation. A two year comparison and a ten year comparison of the same house can reach opposite conclusions, and both can be correct for their own horizon.",
          },
          {
            type: 'callout',
            text: "Pair the rent versus buy decision with the {{calc:mortgage-payment-calculator:mortgage payment calculator}} for your exact payment, and the {{calc:compound-interest-calculator:compound interest calculator}} to see what your down payment would grow to invested instead.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is it better to rent or buy in 2026?',
        a: 'There is no universal answer. It depends on your price to rent ratio, mortgage rate, how long you will stay, and what your down payment could earn invested. In most markets, staying under five years favors renting, and seven or more years tends to favor buying.',
      },
      {
        q: 'What is the rent versus buy break even point?',
        a: 'The break even point is the number of years you must stay in a home before buying becomes cheaper than renting, after closing costs, maintenance, taxes, insurance, and the opportunity cost of your down payment. The rent versus buy calculator computes it for your specific numbers.',
      },
      {
        q: 'What is the 5% rule for renting versus buying?',
        a: 'A rule of thumb: the true annual cost of owning is roughly 5% of the home value, including taxes, maintenance, and opportunity cost. If your annual rent is less than 5% of the purchase price, renting usually wins, and if it is more, buying tends to win.',
      },
      {
        q: 'How much of my income should go to housing?',
        a: 'A common guideline is 25 to 30% of gross income for total housing costs. Lenders often allow more, but the strict rule protects your other financial goals, saving, investing, and emergencies, from being squeezed by the house.',
      },
      {
        q: 'Is buying a house worth it if I might move in 3 years?',
        a: 'Usually not. The one time costs of buying and selling, often 5 to 7% on each side, rarely amortize over three years, so renting typically wins unless you expect unusually fast appreciation in your market.',
      },
      {
        q: 'Does mortgage interest deduction change the rent versus buy math?',
        a: 'It helps owners but less than people assume. The standard deduction now exceeds what most people save in mortgage interest, so many homeowners receive no extra tax benefit at all. Only itemizers above the standard deduction actually capture it.',
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
