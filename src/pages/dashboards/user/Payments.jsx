// src/pages/Payment.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makePayment } from "../../../services/paymentService";
import { FaCreditCard } from "react-icons/fa";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingId = location.state?.bookingId;
  const totalAmount = location.state?.amount || 0;
  const seatCount = location.state?.seatCount || 0;
  const seatNumbers = location.state?.seatNumbers || [];

  const [amount, setAmount] = useState(totalAmount);
  const [loading, setLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  useEffect(() => {
    if (!bookingId && !paymentDone) {
      alert("No booking selected. Please book seats first.");
      navigate("/user-dashboard/bookings");
    }
  }, [bookingId, paymentDone, navigate]);

  const handlePayment = async () => {
    if (amount <= 0) return alert("Amount must be greater than zero!");

    try {
      setLoading(true);
      await makePayment({ bookingId, amount });
      setPaymentDone(true);
      alert("✅ Payment successful!");

      // Pass seat numbers and amount to MyBookings
      setTimeout(() => {
        navigate("/user-dashboard/bookings", {
          state: {
            updatedBookingId: bookingId,
            paymentDone: true,
            seatCount,
            totalAmount: amount,
            seatNumbers,
          },
        });
      }, 500);
    } catch {
      alert("Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(to right, #f0f4ff, #e2e8f0)" }}
    >
      <div className="card shadow-lg p-5 rounded-4" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="text-center mb-4">
          <FaCreditCard size={50} className="text-primary mb-2" />
          <h2 className="fw-bold">Secure Payment</h2>
          <p className="text-muted">Complete your booking payment below</p>
        </div>

        <div className="mb-4">
          <p><strong>Booking ID:</strong> {bookingId || "N/A"}</p>
          <p><strong>Seats Booked:</strong> {seatCount}</p>
          <p><strong>Seat Numbers:</strong> {seatNumbers.join(", ")}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
        </div>

        <input
          type="number"
          className="form-control mb-3"
          value={amount}
          min={0}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button
          className="btn btn-primary w-100"
          onClick={handlePayment}
          disabled={loading || !bookingId || paymentDone}
        >
          {loading ? "Processing..." : paymentDone ? "Payment Done ✅" : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
