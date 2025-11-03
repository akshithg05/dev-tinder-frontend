const COMPANY_NAME = "DevTinder";

export default function Shipping() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Shipping Policy
          </h1>
        </div>
      </header>

      <section className="flex grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <p className="text-gray-700 text-base sm:text-lg">
            At {COMPANY_NAME}, we aim to provide a smooth and transparent
            shipping experience for all users who make purchases through our
            platform. This Shipping Policy outlines how we process, dispatch,
            and deliver your orders.
          </p>

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium">1. Processing Time</h2>
              <p className="text-gray-700">
                Orders are typically processed within{" "}
                <strong>1–2 business days</strong> after confirmation. In case
                of high demand or technical issues, there may be slight delays,
                and users will be notified promptly.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">2. Delivery Time</h2>
              <p className="text-gray-700">
                Standard delivery timelines are usually{" "}
                <strong>3–7 business days</strong> within India, depending on
                your location and the availability of logistics partners.
                International shipping timelines may vary based on customs and
                regulations.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">3. Shipping Charges</h2>
              <p className="text-gray-700">
                Shipping charges, if applicable, are displayed at checkout
                before confirming your order. We may offer free shipping for
                certain products or promotional periods.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">4. Tracking Information</h2>
              <p className="text-gray-700">
                Once your order is dispatched, a tracking link will be shared
                via email or SMS. You can use this link to monitor your shipment
                status in real time.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">5. Delays & Exceptions</h2>
              <p className="text-gray-700">
                Delivery may be delayed due to unforeseen circumstances such as
                weather, transportation issues, or regional restrictions. We
                appreciate your patience and understanding in such cases.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">
                6. Contact for Shipping Support
              </h2>
              <p className="text-gray-700">
                For queries or concerns related to your shipment, please reach
                out to our support team at{" "}
                <a
                  className="text-indigo-600 hover:underline"
                  href="mailto:support@devtinder.example"
                >
                  support@devtinder.example
                </a>
                .
              </p>
            </div>
          </div>

          <p className="text-gray-600 text-sm pt-4 border-t">
            Note: This policy may be updated periodically to reflect changes in
            our logistics or service providers. Please check this page for the
            latest version.
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
