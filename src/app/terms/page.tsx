import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for EveryCentCalc — rules and conditions for using our calculators and website.',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8" style={{ color: 'var(--text-primary)' }}>
          Terms of Service
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Last updated: July 27, 2026
        </p>

        <div className="space-y-8" style={{ color: 'var(--text-secondary)' }}>
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using EveryCentCalc (the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. Description of Service</h2>
            <p className="leading-relaxed">
              EveryCentCalc provides free online financial calculators for informational and educational purposes. The Service is designed to help users estimate taxes, evaluate investments, and make financial planning decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. Not Financial or Tax Advice</h2>
            <p className="leading-relaxed">
              <strong>The Service does not provide financial, tax, legal, or investment advice.</strong> All calculations, results, and information provided by the Service are estimates based on simplified models and general assumptions. They should not be used as the sole basis for any financial decision.
            </p>
            <p className="leading-relaxed mt-2">
              Always consult with a qualified financial advisor, tax professional, or legal counsel before making financial decisions. Individual circumstances vary, and the calculators may not account for all relevant factors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Accuracy of Calculations</h2>
            <p className="leading-relaxed">
              While we strive for accuracy, the calculators use simplified models and publicly available tax rates that may not reflect your specific situation. Tax laws, interest rates, and financial regulations change frequently. The 2026 IRS figures used are based on published guidance but may be subject to amendments.
            </p>
            <p className="leading-relaxed mt-2">
              We do not guarantee the accuracy, completeness, or timeliness of any calculations or information provided by the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. User Responsibilities</h2>
            <p className="leading-relaxed">You agree to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Use the Service only for lawful purposes</li>
              <li>Not attempt to disrupt or overload the Service</li>
              <li>Not use automated tools to scrape or mass-download content</li>
              <li>Verify all calculations independently before making financial decisions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content, code, design, and branding on the Service are the property of EveryCentCalc and are protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>7. Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by law, EveryCentCalc shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. This includes, but is not limited to, financial losses resulting from decisions made based on calculator outputs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>8. Third-Party Links</h2>
            <p className="leading-relaxed">
              The Service may contain links to third-party websites. We are not responsible for the content, privacy practices, or accuracy of external sites. Use third-party links at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>9. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated date. Continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>10. Contact</h2>
            <p className="leading-relaxed">
              For questions about these Terms, contact us at:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Email: hello@everycentcalc.biz.id</li>
              <li>Website: <a href="https://everycentcalc.biz.id" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)' }}>everycentcalc.biz.id</a></li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
