import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../store/userSlice";

export default function NavBar() {
  const loggedInUser = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  async function handleLogOut() {
    try {
      setLoading(true);
      setModalOpen(true);
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      setLoading(false);
    } catch (err) {
      setError(err);
      setModalOpen(true);
    }
  }

  return (
    <>
      {error && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={"Error"}
        >
          There was an error while logging out!
        </Modal>
      )}
      {!error && (
        <Modal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            navigate("/login");
          }}
          title={"Log out"}
        >
          {loading ? (
            <div className="grid place-items-center min-h-full">
              <span className="loading  loading-spinner loading-xl"></span>
            </div>
          ) : (
            <div>Logged out successfully!</div>
          )}
        </Modal>
      )}
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/feed">
            DevTinder
          </Link>
        </div>
        <div className="flex gap-2">
          {loggedInUser && (
            <div className="dropdown dropdown-end mx-5">
              <div className="flex">
                <p className="text-center pt-1 pr-3">
                  Hi {loggedInUser?.firstName}
                </p>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        loggedInUser?.photoUrl ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="justify-between">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="justify-between">
                    Requests
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogOut();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
