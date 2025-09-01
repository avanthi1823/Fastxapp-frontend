import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makePayment } from "../../../services/paymentService";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const bookingId = location.state?.bookingId || query.get("bookingId");
  const fare = location.state?.amount || query.get("amount") || 0;

  const [amount, setAmount] = useState(fare);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bookingId) {
      alert("No booking selected. Please book seats first.");
      navigate("/user-dashboard/bookings");
    }
  }, [bookingId, navigate]);

  const handlePayment = async () => {
    if (amount <= 0) {
      alert("Amount must be greater than zero!");
      return;
    }

    try {
      setLoading(true);
      await makePayment({ bookingId, amount });
      alert("✅ Payment successful!");
      navigate("/user-dashboard/bookings", { state: { updatedBookingId: bookingId } });
    } catch (err) {
      alert(err.response?.data?.Error || "Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">💳 Payment</h2>
        <div className="mb-3">
          <p><strong>Booking ID:</strong> {bookingId}</p>
          <p><strong>Amount:</strong> ₹{fare}</p>
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Enter Amount</label>
          <input
            id="amount"
            type="number"
            className="form-control"
            value={amount}
            min={0}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          className="btn btn-success w-100"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
