const COMPANY_NAME = "DevTinder";

export default function Terms() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Terms and Conditions
          </h1>
        </div>
      </header>

      <section className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <p className="text-gray-700 text-base sm:text-lg">
            Welcome to {COMPANY_NAME}. By using our website and services, you
            agree to comply with and be bound by the following Terms and
            Conditions. Please read them carefully.
          </p>

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing or using our platform, you agree to these Terms. If
                you do not agree, please discontinue use of the website
                immediately.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">2. Use of Service</h2>
              <p className="text-gray-700">
                You agree to use our services only for lawful purposes. You must
                not engage in any activity that could harm, disable, or
                interfere with our systems or other users’ experience.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">3. Accounts and Security</h2>
              <p className="text-gray-700">
                You are responsible for maintaining the confidentiality of your
                login credentials and for all activities that occur under your
                account.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">4. Intellectual Property</h2>
              <p className="text-gray-700">
                All content, trademarks, and code on this website are the
                property of {COMPANY_NAME} and may not be reproduced or
                distributed without prior written consent.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">
                5. Limitation of Liability
              </h2>
              <p className="text-gray-700">
                {COMPANY_NAME} will not be held liable for any damages arising
                from the use or inability to use our services. Users assume full
                responsibility for their use of the website.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">6. Modifications</h2>
              <p className="text-gray-700">
                We reserve the right to update or modify these Terms at any
                time. Continued use of the website after such changes implies
                acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">7. Contact Us</h2>
              <p className="text-gray-700">
                For any questions regarding these Terms, please contact us at
                <a
                  className="text-indigo-600 hover:underline ml-1"
                  href="mailto:support@devtinder.example"
                >
                  support@devtinder.example
                </a>
                .
              </p>
            </div>
          </div>

          <p className="text-gray-600 text-sm pt-4 border-t">
            Note: These Terms are a general template and should be reviewed to
            ensure they align with your platform’s actual policies and
            operations.
          </p>
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
