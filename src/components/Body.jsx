import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Body() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
