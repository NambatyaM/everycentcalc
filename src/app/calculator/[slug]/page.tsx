import { calculators, getCalculatorBySlug, getAllSlugs, getCategoryBySlug } from '@/lib/calculators';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import AffiliateBanner from '@/components/AffiliateBanner';
import SelfEmploymentTaxCalc from '@/components/calcs/SelfEmploymentTax';
import QuarterlyTaxCalc from '@/components/calcs/QuarterlyTax';
import FreelancerRateCalc from '@/components/calcs/FreelancerRate';
import RentVsBuyCalc from '@/components/calcs/RentVsBuy';
import BreakEvenCalc from '@/components/calcs/BreakEven';
import MortgageCalc from '@/components/calcs/Mortgage';
import SideHustleTaxCalc from '@/components/calcs/SideHustleTax';
import FreelanceTaxSetAsideCalc from '@/components/calcs/FreelanceTaxSetAside';
import LlcVsSolePropCalc from '@/components/calcs/LlcVsSoleProp';
import TaxDeductionTrackerCalc from '@/components/calcs/TaxDeductionTracker';
import FreelanceVsEmployeeCalc from '@/components/calcs/FreelanceVsEmployee';
import FreelanceProjectProfitabilityCalc from '@/components/calcs/FreelanceProjectProfitability';
import EtsyProfitCalc from '@/components/calcs/EtsyProfit';
import RentalPropertyRoiCalc from '@/components/calcs/RentalPropertyRoi';
import CashOnCashReturnCalc from '@/components/calcs/CashOnCashReturn';
import StartupRunwayCalc from '@/components/calcs/StartupRunway';
import SaasUnitEconomicsCalc from '@/components/calcs/SaasUnitEconomics';
import SavingsGoalCalc from '@/components/calcs/SavingsGoal';
import BusinessLoanCalc from '@/components/calcs/BusinessLoan';
import GenericCalc from '@/components/calcs/Generic';
import QuarterlyTaxPenaltyCalc from '@/components/calcs/QuarterlyTaxPenalty';
import FreelancerEffectiveTaxRateCalc from '@/components/calcs/FreelancerEffectiveTaxRate';
import HealthInsuranceDeductionCalc from '@/components/calcs/HealthInsuranceDeduction';
import HomeOfficeDeductionCalc from '@/components/calcs/HomeOfficeDeduction';
import IncomeTax1099Calc from '@/components/calcs/IncomeTax1099';
import SeTaxVsFicaCalc from '@/components/calcs/SeTaxVsFica';
import QbiDeductionCalc from '@/components/calcs/QbiDeduction';
import FreelanceProjectRateCalc from '@/components/calcs/FreelanceProjectRate';
import FreelancerSavingsRateCalc from '@/components/calcs/FreelancerSavingsRate';
import FreelanceHourlyVsProjectCalc from '@/components/calcs/FreelanceHourlyVsProject';
import FreelanceNetWorthCalc from '@/components/calcs/FreelanceNetWorth';
import DoorDashProfitCalc from '@/components/calcs/DoorDashProfit';
import UberEatsProfitCalc from '@/components/calcs/UberEatsProfit';
import PrintOnDemandProfitCalc from '@/components/calcs/PrintOnDemandProfit';
import AmazonFbaProfitCalc from '@/components/calcs/AmazonFbaProfit';
import YoutubeRevenueCalc from '@/components/calcs/YoutubeRevenue';
import OnlineCourseProfitCalc from '@/components/calcs/OnlineCourseProfit';
import FreelanceWriterRateCalc from '@/components/calcs/FreelanceWriterRate';
import GraphicDesignerRateCalc from '@/components/calcs/GraphicDesignerRate';
import PodcastIncomeCalc from '@/components/calcs/PodcastIncome';
import SocialMediaManagerRateCalc from '@/components/calcs/SocialMediaManagerRate';
import HouseAffordabilityCalc from '@/components/calcs/HouseAffordability';
import MortgageAffordabilityCalc from '@/components/calcs/MortgageAffordability';
import AgentCommissionCalc from '@/components/calcs/AgentCommission';
import PropertyRoiCalc from '@/components/calcs/PropertyRoi';
import RentalYieldCalc from '@/components/calcs/RentalYield';
import MortgageInterestCalc from '@/components/calcs/MortgageInterest';
import HomeEquityCalc from '@/components/calcs/HomeEquity';
import DscrLoanCalc from '@/components/calcs/DscrLoan';
import RealEstateFlipProfitCalc from '@/components/calcs/RealEstateFlipProfit';
import CapRateCalc from '@/components/calcs/CapRate';
import SCorpSalaryCalc from '@/components/calcs/SCorpSalary';
import LlcTaxSavingsCalc from '@/components/calcs/LlcTaxSavings';
import CCorpVsSCorpCalc from '@/components/calcs/CCorpVsSCorp';
import EntityFormationCostCalc from '@/components/calcs/EntityFormationCost';
import PayrollTaxCalc from '@/components/calcs/PayrollTax';
import CashFlowCalc from '@/components/calcs/CashFlow';
import BusinessLoanInterestCalc from '@/components/calcs/BusinessLoanInterest';
import RevenueGrowthCalc from '@/components/calcs/RevenueGrowth';
import ExpenseRatioCalc from '@/components/calcs/ExpenseRatio';
import ClientInvoiceCalc from '@/components/calcs/ClientInvoiceCalc';
import InvestmentReturnCalc from '@/components/calcs/InvestmentReturn';
import StockPortfolioReturnCalc from '@/components/calcs/StockPortfolioReturn';
import EtfFeeCalculatorCalc from '@/components/calcs/EtfFeeCalculator';
import RetirementGapCalc from '@/components/calcs/RetirementGap';
import InflationAdjustedCalc from '@/components/calcs/InflationAdjusted';
import SideHustleIncomeTaxCalc from '@/components/calcs/SideHustleIncomeTax';
import EmergencyFundCalc from '@/components/calcs/EmergencyFund';
import DebtAvalancheVsSnowballCalc from '@/components/calcs/DebtAvalancheVsSnowball';
import RothVsTraditionalCalc from '@/components/calcs/RothVsTraditional';
import InvestmentDiversificationCalc from '@/components/calcs/InvestmentDiversification';

const CALC_COMPONENTS: Record<string, React.FC> = {
  'self-employment-tax-calculator': SelfEmploymentTaxCalc,
  'quarterly-tax-calculator': QuarterlyTaxCalc,
  'side-hustle-tax-calculator': SideHustleTaxCalc,
  'freelance-income-tax-calculator': FreelanceTaxSetAsideCalc,
  'freelance-tax-deduction-calculator': TaxDeductionTrackerCalc,
  'freelancer-rate-calculator': FreelancerRateCalc,
  'freelancer-profitability-calculator': FreelanceProjectProfitabilityCalc,
  'freelancer-retirement-savings-calculator': SavingsGoalCalc,
  'etsy-profit-calculator': EtsyProfitCalc,
  'freelance-vs-employment-calculator': FreelanceVsEmployeeCalc,
  'rent-vs-buy-calculator': RentVsBuyCalc,
  'rental-property-calculator': RentalPropertyRoiCalc,
  'mortgage-payment-calculator': MortgageCalc,
  'llc-vs-sole-proprietor-tax-calculator': LlcVsSolePropCalc,
  'break-even-calculator': BreakEvenCalc,
  'startup-runway-calculator': StartupRunwayCalc,
  'business-debt-payoff-calculator': BusinessLoanCalc,
  'saas-metrics-calculator': SaasUnitEconomicsCalc,
  'rental-cash-flow-calculator': CashOnCashReturnCalc,
  'quarterly-tax-penalty-calculator': QuarterlyTaxPenaltyCalc,
  'freelancer-effective-tax-rate-calculator': FreelancerEffectiveTaxRateCalc,
  'self-employed-health-insurance-deduction-calculator': HealthInsuranceDeductionCalc,
  'home-office-deduction-calculator': HomeOfficeDeductionCalc,
  '1099-income-tax-calculator': IncomeTax1099Calc,
  'se-tax-vs-fica-calculator': SeTaxVsFicaCalc,
  'freelancer-qbi-deduction-calculator': QbiDeductionCalc,
  'freelance-project-rate-calculator': FreelanceProjectRateCalc,
  'freelancer-savings-rate-calculator': FreelancerSavingsRateCalc,
  'freelance-hourly-vs-project-calculator': FreelanceHourlyVsProjectCalc,
  'freelance-net-worth-calculator': FreelanceNetWorthCalc,
  'doordash-profit-calculator': DoorDashProfitCalc,
  'uber-eats-profit-calculator': UberEatsProfitCalc,
  'print-on-demand-profit-calculator': PrintOnDemandProfitCalc,
  'amazon-fba-profit-calculator': AmazonFbaProfitCalc,
  'youtube-revenue-calculator': YoutubeRevenueCalc,
  'online-course-profit-calculator': OnlineCourseProfitCalc,
  'freelance-writer-rate-calculator': FreelanceWriterRateCalc,
  'freelance-graphic-designer-rate-calculator': GraphicDesignerRateCalc,
  'podcast-income-calculator': PodcastIncomeCalc,
  'social-media-manager-rate-calculator': SocialMediaManagerRateCalc,
  'house-affordability-calculator': HouseAffordabilityCalc,
  'mortgage-affordability-calculator': MortgageAffordabilityCalc,
  'real-estate-agent-commission-calculator': AgentCommissionCalc,
  'property-investment-roi-calculator': PropertyRoiCalc,
  'rental-yield-calculator': RentalYieldCalc,
  'mortgage-interest-calculator': MortgageInterestCalc,
  'home-equity-calculator': HomeEquityCalc,
  'dscr-loan-calculator': DscrLoanCalc,
  'real-estate-flipping-profit-calculator': RealEstateFlipProfitCalc,
  'cap-rate-calculator': CapRateCalc,
  's-corp-salary-calculator': SCorpSalaryCalc,
  'llc-tax-savings-calculator': LlcTaxSavingsCalc,
  'c-corp-vs-s-corp-calculator': CCorpVsSCorpCalc,
  'entity-formation-cost-calculator': EntityFormationCostCalc,
  'payroll-tax-calculator': PayrollTaxCalc,
  'cash-flow-calculator': CashFlowCalc,
  'business-loan-interest-calculator': BusinessLoanInterestCalc,
  'revenue-growth-calculator': RevenueGrowthCalc,
  'expense-ratio-calculator': ExpenseRatioCalc,
  'client-invoice-calculator': ClientInvoiceCalc,
  'investment-return-calculator': InvestmentReturnCalc,
  'stock-portfolio-return-calculator': StockPortfolioReturnCalc,
  'etf-fee-calculator': EtfFeeCalculatorCalc,
  'retirement-savings-gap-calculator': RetirementGapCalc,
  'inflation-adjusted-calculator': InflationAdjustedCalc,
  'side-hustle-income-tax-calculator': SideHustleIncomeTaxCalc,
  'emergency-fund-calculator': EmergencyFundCalc,
  'debt-avalanche-vs-snowball-calculator': DebtAvalancheVsSnowballCalc,
  'roth-vs-traditional-calculator': RothVsTraditionalCalc,
  'investment-diversification-calculator': InvestmentDiversificationCalc,
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) return {};

  return {
    title: `${calc.name} — Free Online Calculator`,
    description: calc.description,
    keywords: calc.keywords,
    openGraph: {
      title: `${calc.name} | EveryCentCalc`,
      description: calc.description,
      type: 'website',
      url: `https://everycentcalc.biz.id/calculator/${calc.slug}/`,
    },
    alternates: {
      canonical: `https://everycentcalc.biz.id/calculator/${calc.slug}/`,
    },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) notFound();

  const CalcComponent = CALC_COMPONENTS[slug] || GenericCalc;
  const cat = getCategoryBySlug(calc.categorySlug);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: calc.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use the ${calc.name}`,
    description: calc.description,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter your information',
        text: 'Input the relevant financial figures into the calculator fields.',
      },
      {
        '@type': 'HowToStep',
        name: 'Get your results',
        text: 'Review the calculated results, breakdowns, and recommendations.',
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://everycentcalc.biz.id' },
      ...(cat ? [{ '@type': 'ListItem', position: 2, name: cat.name, item: `https://everycentcalc.biz.id/${cat.slug}/` }] : []),
      { '@type': 'ListItem', position: cat ? 3 : 2, name: calc.name, item: `https://everycentcalc.biz.id/calculator/${calc.slug}/` },
    ],
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: calc.name,
    description: calc.description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    url: `https://everycentcalc.biz.id/calculator/${calc.slug}/`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const related = calculators.filter((c) => c.category === calc.category && c.slug !== calc.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <nav className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          {cat && (
            <>
              <Link href={`/${cat.slug}/`} className="hover:underline">{cat.icon} {cat.name.replace(' Calculators', '')}</Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span style={{ color: 'var(--text-primary)' }}>{calc.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{calc.icon}</span>
                <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                  {calc.name}
                </h1>
              </div>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {calc.description}
              </p>
            </div>

            <div
              className="rounded-2xl border p-5 md:p-8 mb-8"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-md)' }}
            >
              <CalcComponent />
            </div>

            {calc.affiliate && (
              <AffiliateBanner
                title={calc.affiliate.title}
                description={calc.affiliate.description}
                cta={calc.affiliate.cta}
                href={calc.affiliate.href}
                icon={calc.affiliate.icon}
                badge={calc.affiliate.badge}
              />
            )}

            <div className="mb-10">
              <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
                Frequently Asked Questions
              </h2>
              {calc.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border-b py-1"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <summary
                    className="flex justify-between items-center py-4 cursor-pointer font-medium list-none"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {faq.q}
                    <span
                      className="ml-2 transition-transform group-open:rotate-45 text-xl font-light flex-shrink-0"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>

            <div className="mb-10 p-6 rounded-xl border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                {calc.question}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {calc.answer}
              </p>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div
              className="sticky top-20 rounded-xl border p-5"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <h3 className="font-bold mb-4 text-sm" style={{ color: 'var(--text-primary)' }}>
                Related Calculators
              </h3>
              <ul className="space-y-2.5">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/calculator/${r.slug}/`}
                      className="flex items-center gap-2 text-sm hover:text-[var(--brand)] transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="text-base">{r.icon}</span>
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
                <h4 className="font-semibold text-xs mb-2" style={{ color: 'var(--text-primary)' }}>
                  {cat?.icon} {cat?.name.replace(' Calculators', '')}
                </h4>
                <Link
                  href={`/${calc.categorySlug}/`}
                  className="text-sm hover:text-[var(--brand)] transition-colors"
                  style={{ color: 'var(--brand)' }}
                >
                  View all {cat?.name.replace(' Calculators', '')} →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
    </>
  );
}
