import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

export default function Premium() {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  async function handlePaymentClick(membershipType) {
    try {
      setLoading(true);
      const data = await axios.post(
        `${BASE_URL}/payment/create`,
        {
          membershipType,
        },
        { withCredentials: true }
      );

      const { keyId, amount, currency, notes, orderId } = data?.data;
      // Open Razorpay dialogue box

      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: currency,
        name: "DevTinder",
        description: "Connect to fellow developers",
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes?.firstName + " " + notes?.lastName,
          email: notes?.emailId,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options); // This Razorpay comes from the script tag added to the head of index.html
      rzp.open();

      setPaymentData(data?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full mt-10 gap-6 px-4 md:px-10">
      {/* Silver */}
      <div className="card bg-base-200 shadow-md rounded-2xl flex-1">
        <div className="card-body items-center text-center">
          <h1 className="text-2xl font-bold mb-3">Silver Membership</h1>

          <ul className="space-y-2">
            <li>Blue tick</li>
            <li>100 swipes per day</li>
            <li>3 months membership</li>
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

      {/* Divider for mobile */}
      <div className="md:hidden divider">OR</div>

      {/* Divider for desktop */}
      <div className="hidden md:flex items-center px-4 font-bold">OR</div>

      {/* Gold */}
      <div className="card bg-base-200 shadow-md rounded-2xl flex-1">
        <div className="card-body items-center text-center">
          <h1 className="text-2xl font-bold mb-3">Gold Membership</h1>

          <ul className="space-y-2">
            <li>Blue tick</li>
            <li>Infinite swipes per day</li>
            <li>6 months membership</li>
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
    </div>
  );
}
