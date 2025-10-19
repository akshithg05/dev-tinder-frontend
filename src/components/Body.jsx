import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Body() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
