import NavBar from "./NavBar";
import Footer from "./Footer";
export default function Error() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <NavBar />
      <div className="grid place-items-center min-h-full">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-error mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-gray-500 mb-6">Sorry, the page you’re looking for doesn’t exist or has been moved.</p>
          <a href="/feed" className="btn btn-primary">
            Go Back Home
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
