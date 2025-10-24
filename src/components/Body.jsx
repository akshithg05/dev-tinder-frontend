import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useEffect, useState } from "react";

export default function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store?.user);

  const [loading, setLoading] = useState(false);

  async function fetchUser() {
    try {
      const loggedInUser = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      dispatch(addUser(loggedInUser?.data?.data?.user));
    } catch (err) {
      const status = err?.response?.status;

      if (status === 401 || status === 404) {
        if (location.pathname !== "/error") navigate("/login");
      } else {
        if (location.pathname !== "/error") navigate("/error");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <NavBar />
      <div className="h-full">
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
