import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makePayment } from "../../../services/paymentService";
import { FaCreditCard } from "react-icons/fa";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  
  const bookingId = location.state?.bookingId;
  const fare = location.state?.amount || 0;

  const [amount, setAmount] = useState(fare);
  const [loading, setLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false); 

  useEffect(() => {
    
    if (!bookingId && !paymentDone) {
      alert("No booking selected. Please book seats first.");
      navigate("/user-dashboard/bookings");
    }
  }, [bookingId, paymentDone, navigate]);

  const handlePayment = async () => {
    if (amount <= 0) {
      alert("Amount must be greater than zero!");
      return;
    }

    try {
      setLoading(true);
      await makePayment({ bookingId, amount });
      setPaymentDone(true); 
      alert("✅ Payment successful!");
      
      
      setTimeout(() => {
        navigate("/user-dashboard/bookings", {
          state: { updatedBookingId: bookingId, paymentDone: true },
        });
      }, 500);
    } catch (err) {
      alert(err.response?.data?.Error || "Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(to right, #f0f4ff, #e2e8f0)" }}
    >
      <div
        className="card shadow-lg p-5 rounded-4"
        style={{ maxWidth: "420px", width: "100%", border: "none" }}
      >
        <div className="text-center mb-4">
          <FaCreditCard size={50} className="text-primary mb-2" />
          <h2 className="fw-bold">Secure Payment</h2>
          <p className="text-muted">Complete your booking payment below</p>
        </div>

        <div className="mb-4">
          <p className="mb-1">
            <strong>Booking ID:</strong>{" "}
            <span className="text-primary">{bookingId || "N/A"}</span>
          </p>
          <p className="mb-0">
            <strong>Total Amount:</strong>{" "}
            <span className="text-success">₹{fare}</span>
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="form-label fw-semibold">
            Enter Amount
          </label>
          <input
            id="amount"
            type="number"
            className="form-control shadow-sm"
            value={amount}
            min={0}
            onChange={(e) => setAmount(e.target.value)}
            style={{ borderRadius: "12px" }}
          />
        </div>

        <button
          className="btn btn-primary w-100 fw-bold py-2"
          onClick={handlePayment}
          disabled={loading || !bookingId || paymentDone}
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            fontSize: "1.1rem",
          }}
        >
          {loading
            ? "Processing..."
            : paymentDone
            ? "Payment Done ✅"
            : "Pay Now"}
        </button>

        {paymentDone && (
          <p className="text-success text-center mt-3 fw-bold">
            🎉 Payment Completed Successfully!
          </p>
        )}
      </div>
    </div>
  );
}
