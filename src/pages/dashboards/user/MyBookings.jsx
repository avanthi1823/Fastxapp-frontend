import React, { useEffect, useState } from "react";
import { getUserBookings, cancelBooking } from "../../../services/userService";
import { getPaymentDetails } from "../../../services/paymentService";
import { formatDate, formatCurrency } from "../../../utils/format";
import { useLocation } from "react-router-dom";

export default function MyBookings() {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ total: 0, cancelled: 0 });

  useEffect(() => {
    async function loadBookings() {
      const b = await getUserBookings();

      const enriched = await Promise.all(
        b.map(async (booking) => {
          try {
            const payment = await getPaymentDetails(booking.bookingId);
            // ✅ Only Cancelled or Not Paid
            let status =
              booking.status === "Cancelled" ? "Cancelled" : "Not Paid";

            return {
              ...booking,
              status,
              seatNumbers:
                booking.seatNumbers?.length
                  ? booking.seatNumbers
                  : location.state?.seatNumbers || [],
            };
          } catch {
            return {
              ...booking,
              status:
                booking.status === "Cancelled" ? "Cancelled" : "Not Paid",
              seatNumbers:
                booking.seatNumbers?.length
                  ? booking.seatNumbers
                  : location.state?.seatNumbers || [],
            };
          }
        })
      );

      setBookings(enriched);
      setStats({
        total: enriched.length,
        cancelled: enriched.filter((x) => x.status === "Cancelled").length,
      });
    }

    loadBookings();
  }, [location.state?.updatedBookingId, location.state?.seatNumbers]);

  const handleCancel = async (id) => {
    await cancelBooking(id);
    alert("❌ Booking cancelled");
    setBookings((prev) =>
      prev.map((b) =>
        b.bookingId === id ? { ...b, status: "Cancelled" } : b
      )
    );
    setStats((prev) => ({ ...prev, cancelled: prev.cancelled + 1 }));
  };

  if (!bookings.length)
    return (
      <div className="text-center py-5">
        <img
          src="/empty-bookings.png"
          alt="No Bookings"
          style={{ width: "200px", opacity: 0.7 }}
        />
        <p className="mt-3 fw-bold text-muted">No trips yet. Start booking!</p>
      </div>
    );

  return (
    <div className="container my-4">
      {/* Stats Row */}
      <div className="row g-3 mb-5">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 text-center p-4 h-100">
            <i className="bi bi-ticket fs-2 text-primary"></i>
            <h4 className="fw-bold mt-2">{stats.total}</h4>
            <p className="mb-0 text-muted">Total Bookings</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm border-0 text-center p-4 h-100">
            <i className="bi bi-x-circle fs-2 text-danger"></i>
            <h4 className="fw-bold mt-2">{stats.cancelled}</h4>
            <p className="mb-0 text-muted">Cancelled</p>
          </div>
        </div>
      </div>

      {/* Booking Cards */}
      <div className="row g-4">
        {bookings.map((b) => (
          <div className="col-md-6" key={b.bookingId}>
            <div className="card shadow-lg rounded-4 h-100 hover-shadow">
              {/* Header */}
              <div
                className={`card-header text-white d-flex justify-content-between align-items-center rounded-top-4 ${
                  b.status === "Cancelled"
                    ? "bg-danger"
                    : "bg-primary" // ✅ Not Paid is now blue
                }`}
              >
                <h6 className="mb-0">{b.route}</h6>
                <span className="badge bg-light text-dark">{b.status}</span>
              </div>

              {/* Body */}
              <div className="card-body">
                <p className="mb-1">
                  <strong>Bus:</strong> {b.busName}
                </p>
                <p className="mb-1">
                  <strong>Date:</strong> {formatDate(b.bookingDate)}
                </p>
              <p className="mb-2">
  <strong>Seats:</strong>{" "}
  {b.seatNumbers.length > 0
    ? b.seatNumbers.map((seat) => (
        <span key={seat} className="badge bg-secondary me-1 mb-1">
          {seat}
        </span>
      ))
    : "N/A"}
</p>

                <p className="fw-bold fs-5 text-success mb-0">
                  Fare: {formatCurrency(b.fare)}
                </p>
              </div>

              {/* Footer */}
              {b.status !== "Cancelled" && (
                <div className="card-footer bg-light d-flex justify-content-end">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleCancel(b.bookingId)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          .hover-shadow:hover {
            transform: translateY(-5px);
            transition: all 0.2s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
