const SUPPORT_EMAIL = "support@devtinder.example";
const COMPANY_NAME = "DevTinder";
const LAST_UPDATED = "November 3, 2025";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">Privacy Policy</h1>
          <p className="mt-1 text-sm text-gray-600">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="space-y-6 prose prose-sm sm:prose lg:prose-lg max-w-none">
            <p>
              {COMPANY_NAME} ("we", "us", "our") respects your privacy and is
              committed to protecting your personal data. This Privacy Policy
              explains what information we collect, why we collect it, and how
              we use and protect it when you use our website and services.
            </p>

            <h2>1. Information We Collect</h2>
            <ul>
              <li>
                <strong>Account & Profile Data:</strong> name, email address,
                profile details you provide during sign-up.
              </li>
              <li>
                <strong>Authentication & Security:</strong> hashed passwords,
                login timestamps, IP addresses, device and browser metadata.
              </li>
              <li>
                <strong>Payment Information:</strong> when you make a purchase
                we use a third-party payment processor (e.g. Razorpay). We do
                not store raw card numbers or banking details on our servers.
              </li>
              <li>
                <strong>Usage Data:</strong> analytics, feature usage, crash
                reports, and performance data to help improve the service.
              </li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use personal information to provide, secure, and improve our
              services, to process transactions, and to communicate with you
              (account notices, security alerts, and support). We also use
              aggregated, anonymized data for analytics and product improvement.
            </p>

            <h2>3. Payment Processing</h2>
            <p>
              Payment transactions are handled by our payment partner (for
              example, Razorpay). We only share the minimum information required
              to the payment processor to complete the transaction. We do not
              store your full payment card information on our servers. Please
              review the payment processor's Privacy Policy for full details.
            </p>

            <h2>4. Cookies & Tracking</h2>
            <p>
              We use cookies and similar technologies to provide and personalize
              the service, remember your preferences, and analyze site usage.
              You can control cookie preferences in your browser, but disabling
              cookies may affect site functionality.
            </p>

            <h2>5. Sharing & Disclosure</h2>
            <p>
              We will not sell your personal information. We may share data with
              third-party service providers who perform functions on our behalf
              (e.g. hosting, payments, analytics), and when required by law
              (e.g. lawful requests from authorities).
            </p>

            <h2>6. Data Retention & Security</h2>
            <p>
              We retain personal data only as long as necessary for the purposes
              described here or to comply with legal obligations. We employ
              technical and organizational measures to protect data (encryption
              in transit, secure storage, access controls), but no method is
              100% secure — if you suspect a security issue, contact us
              immediately.
            </p>

            <h2>7. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the right to access,
              rectify, or delete your personal data, or to object to certain
              processing. To exercise these rights, contact us at the email
              below.
            </p>

            <h2>8. International Transfers</h2>
            <p>
              We may transfer data across borders to service providers and cloud
              infrastructure providers. Where required, we take steps to ensure
              appropriate safeguards are in place for such transfers.
            </p>

            <h2>9. Children</h2>
            <p>
              Our services are not intended for children under 13. We do not
              knowingly collect personal information from children. If we become
              aware we have collected data from a child without parental
              consent, we will take steps to delete it.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              For questions, data access requests, or concerns about this
              policy, contact us at
              <a
                className="text-indigo-600 hover:underline"
                href={`mailto:${SUPPORT_EMAIL}`}
              >
                {" "}
                {SUPPORT_EMAIL}
              </a>
              .
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We’ll post the
              updated policy on this page and update the “Last updated” date at
              the top.
            </p>

            <div className="mt-4 border-t pt-4">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> This page is a general template for
                informational use and should be reviewed to ensure it matches
                your actual data collection and processing practices and legal
                obligations. If your product processes sensitive data or targets
                users in jurisdictions with stricter privacy laws (e.g. GDPR,
                CCPA), we recommend consulting legal counsel.
              </p>
            </div>
          </div>
        </article>

        <div className="mt-6 flex justify-center">
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Contact support
          </a>
        </div>
      </section>

      <footer className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
