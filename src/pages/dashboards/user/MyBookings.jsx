import React, { useEffect, useState } from "react";
import { getUserBookings, cancelBooking } from "../../../services/userService";
import { formatDate, formatCurrency } from "../../../utils/format";
import { useLocation } from "react-router-dom";

export default function MyBookings() {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);

  // Detect if coming from Payment page
  const justPaidBookingId = location.state?.updatedBookingId;
  const paymentDone = location.state?.paymentDone;

  useEffect(() => {
    async function loadBookings() {
      const data = await getUserBookings();

     // src/pages/MyBookings.jsx
const enriched = data.map((booking) => {
  const isJustPaid = booking.bookingId === justPaidBookingId;
  const status = isJustPaid ? "Paid" : booking.status;

  const seatCount = isJustPaid
    ? location.state?.seatCount
    : booking.seats?.length || 1;

  const totalFare = isJustPaid
    ? location.state?.totalAmount
    : booking.seats?.length > 0
    ? booking.seats.reduce((sum, s) => sum + s.fare, 0)
    : booking.fare;

  const seatNumbers = isJustPaid
    ? location.state?.seatNumbers
    : booking.seats?.map((s) => s.seatNumber) || [];

  return { ...booking, status, seatCount, totalFare, seatNumbers };
});


      setBookings(enriched);
      setTotalBookings(enriched.length);

      // Show payment success alert once
      if (paymentDone && justPaidBookingId) {
        alert("✅ Payment completed successfully!");
      }
    }

    loadBookings();
  }, [justPaidBookingId, paymentDone]); // Re-run when coming back from Payment

  // Handle booking cancellation
  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      alert("❌ Booking cancelled and refund initiated");

      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === id ? { ...b, status: "Cancelled" } : b
        )
      );
    } catch (err) {
      alert("Failed to cancel booking. Try again!");
    }
  };

  // Empty bookings state
  if (!bookings.length)
    return (
      <div className="text-center py-5">
        
        <h5 className="mt-4 fw-bold text-muted">No Trips Yet</h5>
        <p className="text-secondary">Start booking your journey today 🚍</p>
      </div>
    );

  return (
    <div className="container my-4">
      {/* Total Bookings */}
      <div className="d-flex justify-content-center mb-5">
        <div
          className="card shadow-sm border-0 text-center p-4"
          style={{ width: "200px" }}
        >
          <i className="bi bi-ticket fs-2 text-primary"></i>
          <h4 className="fw-bold mt-2">{totalBookings}</h4>
          <p className="mb-0 text-muted">Total Bookings</p>
        </div>
      </div>

      {/* Booking Cards */}
      <div className="row g-4">
        {bookings.map((b) => (
          <div className="col-md-6" key={b.bookingId}>
            <div
              className={`card shadow-lg rounded-4 h-100 booking-card ${
                b.bookingId === justPaidBookingId ? "border-success border-3" : ""
              }`}
            >
              {/* Header */}
              <div
                className={`card-header text-white d-flex justify-content-between align-items-center rounded-top-4 ${
                  b.status === "Cancelled" ? "bg-danger" : ""
                }`}
                style={{
                  backgroundColor:
                    b.status === "Cancelled" ? "" : "#835353ff",
                }}
              >
                <h6 className="mb-0">
                  <i className="bi bi-geo-alt me-2"></i>
                  {b.route}
                </h6>
                <span
                  className={`badge ${
                    b.status === "Cancelled"
                      ? "bg-light text-danger"
                      : "bg-light text-success"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              {/* Body */}
              <div className="card-body">
                <p className="mb-1">
                  <strong>Bus:</strong> {b.busName}
                </p>
                <p className="mb-1">
                  <strong>Date:</strong> {formatDate(b.bookingDate)}
                </p>
                <p className="mb-1">
                  <strong>Booking ID:</strong> {b.bookingId}
                </p>
                <p className="mb-1">
                  <strong>Seats Booked:</strong> {b.seatCount}
                </p>
                <p className="fw-bold fs-5 text-success mb-0">
                  {formatCurrency(b.totalFare)}
                </p>
              </div>

              {/* Footer */}
              {b.status !== "Cancelled" && (
                <div className="card-footer bg-light d-flex justify-content-end">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleCancel(b.bookingId)}
                  >
                    <i className="bi bi-x-circle me-1"></i> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Hover effect */}
      <style>
        {`
          .booking-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .booking-card:hover {
            transform: translateY(-6px);
            box-shadow: 0px 8px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
}
