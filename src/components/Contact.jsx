const SUPPORT_EMAIL = "support@devtinder.example";
const COMPANY_NAME = "DevTinder";

export default function Contact() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">Contact Us</h1>
        </div>
      </header>

      <section className="flex grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <p className="text-gray-700 text-base sm:text-lg">
            We'd love to hear from you! Whether you have a question, feedback,
            or need support, reach out to us using the details below.
          </p>

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium">Email</h2>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-indigo-600 hover:underline break-all"
              >
                {SUPPORT_EMAIL}
              </a>
            </div>

            <div>
              <h2 className="text-lg font-medium">Address</h2>
              <p className="text-gray-700">
                {COMPANY_NAME} Pvt. Ltd.
                <br />
                #123, MG Road,
                <br />
                Bengaluru, Karnataka, India
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">Business Hours</h2>
              <p className="text-gray-700">
                Monday to Friday: 9:00 AM – 6:00 PM IST
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Send us a message
            </a>
          </div>
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
