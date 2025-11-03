const COMPANY_NAME = "DevTinder";

export default function Refunds() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Refund and Cancellation Policy
          </h1>
        </div>
      </header>

      <section className="flex grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <p className="text-gray-700 text-base sm:text-lg">
            At {COMPANY_NAME}, we strive to ensure that all users have a smooth
            and satisfactory experience using our platform. Since we provide
            digital subscription-based services, this Refund and Cancellation
            Policy outlines the terms regarding cancellations and refunds.
          </p>

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium">
                1. Subscription Cancellation
              </h2>
              <p className="text-gray-700">
                Users may cancel their subscription at any time through their
                account settings. Once cancelled, you will continue to have
                access to the premium features until the end of your current
                billing cycle. Your subscription will not renew automatically
                after that period.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">2. Refund Policy</h2>
              <p className="text-gray-700">
                As our services are digital and subscription-based, we generally
                do not offer refunds once a payment is completed. However,
                refunds may be considered in cases of accidental duplicate
                charges or technical errors in billing. To request a review,
                please contact our support team with relevant transaction
                details.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">
                3. Trial and Promotional Periods
              </h2>
              <p className="text-gray-700">
                If a free trial or promotional period is offered, users can
                cancel before the trial ends to avoid charges. Once the paid
                subscription period begins, normal refund rules apply.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">4. Payment Disputes</h2>
              <p className="text-gray-700">
                In the event of a payment dispute, users are encouraged to
                contact us directly at
                <a
                  className="text-indigo-600 hover:underline ml-1"
                  href="mailto:support@devtinder.example"
                >
                  support@devtinder.example
                </a>{" "}
                before contacting their bank or payment provider. We will work
                to resolve any issues promptly and fairly.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">5. Policy Updates</h2>
              <p className="text-gray-700">
                {COMPANY_NAME} reserves the right to modify or update this
                policy at any time. Any changes will be posted on this page with
                an updated “Last updated” date.
              </p>
            </div>
          </div>

          <p className="text-gray-600 text-sm pt-4 border-t">
            Note: This policy applies to all subscription purchases made
            directly through the
            {COMPANY_NAME} platform. Third-party payment gateway terms (such as
            Razorpay’s refund policies) may also apply.
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
