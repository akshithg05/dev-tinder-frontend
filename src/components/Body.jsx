import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useEffect, useState } from "react";

export default function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  async function fetchUser() {
    try {
      setLoading(true);
      const loggedInUser = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      dispatch(addUser(loggedInUser?.data?.data?.user));
    } catch (err) {
      console.log(err);
      const status = err?.response?.status;

      if (status === 401) {
        // Unauthorized → go to login unless already at /error
        if (location.pathname !== "/error") navigate("/login");
      } else {
        // Other errors → show error page
        if (location.pathname !== "/error") navigate("/error");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <NavBar />
      <div>
        {loading ? (
          <div className="grid place-items-center min-h-full">
            <span className="loading  loading-spinner loading-xl"></span>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
    </div>
  );
}
