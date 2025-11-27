import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

export default function Premium() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [membershipType, setMembershipType] = useState(null);

  async function handlePaymentClick(membershipType) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/payment/create-checkout-session`,
        { membershipType },
        { withCredentials: true }
      );

      window.location.href = data.url;

      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }

  async function verifyPremium() {
    try {
      setLoading(true);
      const data = await axios.get(`${BASE_URL}/payment/verify-payment`, {
        withCredentials: true,
      });
      setIsUserPremium(data?.data?.isPremium);
      setMembershipType(data?.data?.membershipType);

      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    verifyPremium();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full mt-10 gap-6 px-4 md:px-10">
      {loading && !error && (
        <div className="w-full flex flex-col items-center justify-center mt-10">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      )}

      {error && <h1>{error?.message}</h1>}

      {!loading && !error && isUserPremium && (
        <div className="w-full flex flex-col items-center justify-center mt-10">
          {membershipType === "SILVER" && (
            <div className="card bg-base-200 shadow-md rounded-2xl p-6 text-center max-w-md">
              <h1 className="text-2xl font-bold mb-3">Silver Member</h1>

              <p className="text-sm opacity-80 mb-5">
                You're currently a Silver member. Upgrade to Gold for unlimited
                swipes— pay only the Silver price difference.
              </p>

              <button
                className="btn btn-accent w-full"
                onClick={() => handlePaymentClick("UPGRADE_TO_GOLD")}
              >
                Upgrade to Gold
              </button>

              <button
                className="btn btn-outline w-full mt-3"
                onClick={() => (window.location.href = "/feed")}
              >
                Go to Home
              </button>
            </div>
          )}

          {(membershipType === "GOLD" ||
            membershipType === "UPGRADE_TO_GOLD") && (
            <div className="card bg-base-200 shadow-md rounded-2xl p-6 text-center max-w-md">
              <h1 className="text-2xl font-bold mb-3">
                You're Already a Premium Member
              </h1>

              <p className="text-sm opacity-80 mb-5">
                Thank you for supporting us! You already have access to all
                premium features.
              </p>

              <button
                className="btn btn-primary w-full"
                onClick={() => (window.location.href = "/")}
              >
                Go to Home
              </button>
            </div>
          )}
        </div>
      )}

      {!loading && !error && !isUserPremium && (
        <>
          <div className="card bg-base-200 shadow-md rounded-2xl flex-1">
            <div className="card-body items-center text-center">
              <h1 className="text-2xl font-bold mb-3">Silver Membership</h1>

              <ul className="space-y-2">
                <li>Blue tick</li>
                <li>100 swipes per day</li>
              </ul>

              <button
                onClick={() => handlePaymentClick("SILVER")}
                className="btn btn-primary w-full mt-4"
                disabled={loading}
              >
                Buy Silver
              </button>
            </div>
          </div>

          <div className="md:hidden divider">OR</div>

          <div className="hidden md:flex items-center px-4 font-bold">OR</div>

          <div className="card bg-base-200 shadow-md rounded-2xl flex-1">
            <div className="card-body items-center text-center">
              <h1 className="text-2xl font-bold mb-3">Gold Membership</h1>

              <ul className="space-y-2">
                <li>Blue tick</li>
                <li>Infinite swipes per day</li>
              </ul>

              <button
                onClick={() => handlePaymentClick("GOLD")}
                className="btn btn-accent w-full mt-4"
                disabled={loading}
              >
                Buy Gold
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
