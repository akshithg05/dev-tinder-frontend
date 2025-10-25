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

  const navigate = useNavigate();

  async function fetchConnectionRequests() {
    try {
      setError(false);
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/user/requests/pending`, { withCredentials: true });
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
      await axios.post(`${BASE_URL}/request/review/${action}/${id}`, {}, { withCredentials: true });
      setRequestState(action);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err);
      setConnectionRequests(prevState);
      setRequestState("failed");
    }
  }

  useEffect(() => {
    fetchConnectionRequests();
  }, []);

  return (
    <>
      {showToast && (
        <div className="toast toast-center toast-top">
          <div className={`alert ${requestState === "accepted" ? "alert-success" : "alert-error"}`}>
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
        <h1 className="font-bold text-2xl px-5 py-3">No pending requests found!</h1>
      ) : (
        <div>
          <h1 className="text-2xl font-bold px-5 py-3">Pending connection requests</h1>
          <div className="flex justify-center mb-5">
            <div className="flex flex-col justify-center gap-4 overflow-y-auto max-h-[80vh] px-3 w-full sm:w-auto">
              {connectionRequests.map((request) => (
                <div
                  key={request?._id}
                  className="card card-side bg-base-300 shadow-sm w-full sm:w-[90%] md:w-[700px] flex-shrink-0"
                >
                  <figure>
                    <img className="w-30" src={request?.fromUserId?.photoUrl} alt="photo" />
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
