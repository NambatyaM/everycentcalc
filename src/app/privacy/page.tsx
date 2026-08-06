import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | EveryCentCalc',
  description: 'Privacy policy for EveryCentCalc — how we collect, use, and protect your data.',
  alternates: { canonical: '/privacy/' },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8" style={{ color: 'var(--text-primary)' }}>
          Privacy Policy
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Last updated: July 27, 2026
        </p>

        <div className="space-y-8" style={{ color: 'var(--text-secondary)' }}>
          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to EveryCentCalc (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate the website everycentcalc.biz.id (the &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our financial calculators.
            </p>
            <p className="leading-relaxed mt-2">
              By using the Service, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. Information We Collect</h2>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Information You Provide</h3>
            <p className="leading-relaxed">
              Our calculators allow you to input financial data such as income, expenses, tax rates, and other numerical values. This data is processed entirely in your browser and is <strong>never transmitted to our servers</strong>. We do not store, log, or have access to any values you enter into our calculators.
            </p>
            <h3 className="text-lg font-semibold mb-2 mt-4" style={{ color: 'var(--text-primary)' }}>Automatically Collected Information</h3>
            <p className="leading-relaxed">
              When you visit our website, we may automatically collect certain information, including:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>IP address (anonymized)</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website or search terms</li>
              <li>Pages visited and time spent on each page</li>
              <li>Date and time of visit</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. How We Use Your Information</h2>
            <p className="leading-relaxed">We use the automatically collected information to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Operate and maintain the Service</li>
              <li>Improve user experience and website performance</li>
              <li>Analyze usage trends and aggregate traffic patterns</li>
              <li>Detect and prevent security threats</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Cookies and Third-Party Services</h2>
            <p className="leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience. Third-party services we use include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Google Analytics</strong> — to analyze website traffic and usage patterns. Google may collect information about your visits across websites.</li>
              <li><strong>Ad Networks</strong> — we display advertisements through third-party ad networks. These networks may use cookies and web beacons to serve ads based on your prior visits to our website or other websites.</li>
            </ul>
            <p className="leading-relaxed mt-2">
              You can opt out of personalized advertising by visiting the{" "}
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)' }}>
                Digital Advertising Alliance opt-out page
              </a>{" "}
              or{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)' }}>
                Google Ads Settings
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. Data Sharing</h2>
            <p className="leading-relaxed">
              We do <strong>not</strong> sell, trade, or rent your personal information. We may share anonymized, aggregated data that cannot be used to identify you with third parties for analytics, advertising, or research purposes.
            </p>
            <p className="leading-relaxed mt-2">
              We may disclose information if required by law, or if we believe in good faith that such action is necessary to comply with legal processes, protect our rights, or ensure the safety of our users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. Data Security</h2>
            <p className="leading-relaxed">
              We implement reasonable administrative, technical, and physical security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>7. Your Rights</h2>
            <p className="leading-relaxed">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="leading-relaxed mt-2">
              To exercise any of these rights, please contact us at the email address below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>8. Children&apos;s Privacy</h2>
            <p className="leading-relaxed">
              The Service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us so we can take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>9. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. Your continued use of the Service after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>10. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Email: privacy@everycentcalc.biz.id</li>
              <li>Website: <a href="https://everycentcalc.biz.id" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)' }}>everycentcalc.biz.id</a></li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
