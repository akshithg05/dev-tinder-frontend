import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

export default function Requests() {
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [requestState, setRequestState] = useState(null);
  const [isUserPremium, setIsUserPremium] = useState(false);

  const navigate = useNavigate();

  async function fetchConnectionRequests() {
    try {
      setError(false);
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/user/requests/pending`, {
        withCredentials: true,
      });
      setConnectionRequests(res?.data?.pendingRequests);
    } catch (err) {
      setError(true);
      navigate("/error");
    } finally {
      setLoading(false);
    }
  }

  async function reviewRequest(id, action) {
    const prevState = [...connectionRequests];
    setConnectionRequests((prev) => prev.filter((req) => req._id !== id));
    try {
      await axios.post(
        `${BASE_URL}/request/review/${action}/${id}`,
        {},
        { withCredentials: true }
      );
      setRequestState(action);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err);
      setConnectionRequests(prevState);
      setRequestState("failed");
    }
  }

  async function verifyPremium() {
    try {
      setLoading(true);
      const data = await axios.get(`${BASE_URL}/payment/verify-payment`, {
        withCredentials: true,
      });
      setIsUserPremium(data?.data?.isPremium);

      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    verifyPremium();
  }, []);

  useEffect(() => {
    fetchConnectionRequests();
  }, []);

  if (!isUserPremium && !loading && !error) {
    return (
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <div className="card bg-base-200 shadow-md rounded-2xl p-6 text-center max-w-md">
          {connectionRequests.length > 0 && (
            <>
              <h1 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2">
                You have
                <span className="px-3 py-1 bg-primary text-white rounded-full animate-pulse text-xl shadow">
                  {connectionRequests.length}
                </span>
                {connectionRequests.length === 1 ? "request" : "requests"}
              </h1>
            </>
          )}

          <h1 className="text-2xl font-bold mb-3">
            You're not a Premium Member
          </h1>

          <p className="text-sm opacity-80 mb-5">
            Go to the premium tab and upgrade your account for premium
            membership to view your requests
          </p>

          <button
            className="btn btn-primary w-full"
            onClick={() => (window.location.href = "/premium")}
          >
            Upgrade to premium today!
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showToast && (
        <div className="toast toast-center toast-top">
          <div
            className={`alert ${
              requestState === "accepted" ? "alert-success" : "alert-error"
            }`}
          >
            <span>Connection request {requestState}</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center mt-75">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : error ? (
        <>Something went wrong</>
      ) : connectionRequests.length === 0 ? (
        <div className="flex justify-center mt-75">
          <h1 className="font-bold text-2xl ">No pending requests found!</h1>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold px-5 py-3">
            Pending connection requests
          </h1>
          <div className="flex justify-center mb-5">
            <div className="flex flex-col justify-center gap-4 overflow-y-auto max-h-[80vh] px-3 w-full sm:w-auto">
              {connectionRequests.map((request) => (
                <div
                  key={request?._id}
                  className="card card-side bg-base-300 shadow-sm w-full sm:w-[90%] md:w-[700px] flex-shrink-0"
                >
                  <figure>
                    <img
                      className="w-30"
                      src={request?.fromUserId?.photoUrl}
                      alt="photo"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title font-bold">{`${request?.fromUserId?.firstName} ${request?.fromUserId?.lastName}`}</h2>
                    <p>{request?.fromUserId?.about}</p>
                    <p>{`${request?.fromUserId?.age}, ${request?.fromUserId?.gender}`}</p>

                    <div className="card-actions justify-end">
                      <button
                        disabled={loading}
                        className="btn btn-soft btn-success cursor-pointer"
                        onClick={() => reviewRequest(request?._id, "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        disabled={loading}
                        className="btn btn-soft btn-error cursor-pointer"
                        onClick={() => reviewRequest(request?._id, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
